import React from 'react';
import './App.css';
import set from "lodash/fp/set";
import { Field } from "redux-form";
import Table from "react-table";
import fakeData from './fakeData';
import ActionsCell from "./components/ActionsCell";
import FormProvider from "./components/FormProvider";
import HighlightCell from "./components/HighlightCell";
import AddnewForm from "./components/AddnewForm";

export default class App extends React.Component {

  state = { 
    data: fakeData(20), // loading 20 rendom data
    editing: null, // initial edit value
    displaySuccess: 'none'  // Success tost bydefualt none
  };

  // Define Actions
  getActionProps = (gridState, rowProps) =>
    (rowProps && {
      mode: this.state.editing === rowProps.original ? "edit" : "view",
      actions: {
        onEdit: () => this.setState({ editing: rowProps.original }),
        onCancel: () => this.setState({ editing: null }),
        onDelete: () => {
          this.setState({data: this.state.data.filter(function(_r, index) { 
             return index !== rowProps.index 
           })});
        }
      }
    }) ||
    {};


    // custom component
    editableComponent = ({ input,meta: { touched, error }, editing, value, ...rest}) => {
      const Component = editing ? "input" : "span";
      const hasError = touched && error !== undefined;
      const children =
        (!editing && <HighlightCell value={value} {...rest} />) || undefined;
      return(
        <React.Fragment>
            <Component error={hasError} {...input} {...rest} children={children} /> 
          {hasError && editing && <div class="error-message">{error}</div>}
        </React.Fragment>
      );
    };

    // Defining Editable props
    editableColumnProps = {
      Cell: props => {
        const editing = this.state.editing === props.original;
        const fieldProps = {
          component: this.editableComponent,
          editing,
          props
        };
       return <Field name={props.column.id} {...fieldProps}/>;
      }
    };

  columns =
    [
      { Header: "Name", accessor: "name", ...this.editableColumnProps, filterable: false},
      { Header: "E-mail address", accessor: "email",...this.editableColumnProps, filterable: false},
      { Header: "Phone number", accessor: "phone", ...this.editableColumnProps, filterable: false},
      {
        Header: "", sortable: false,
        maxWidth: 200,
        filterable: false,
        getProps: this.getActionProps,
        Cell: ActionsCell
      }
    ];

  // handle Edition 
  handleSubmit = values => {
    this.setState(state => {
      const index = this.state.data.indexOf(this.state.editing);
      return {
        data: set(`[${index}]`, values, state.data)
      };
    });
  };

  // handle Addition
  handleNewEntry =  values => {
    const item = {
      id: this.state.data.length + 1,
      name: values.name,
      email: values.email,
      phone: values.phone
    };
    this.setState({
      data: [...this.state.data, item],
      displaySuccess: 'block'
    })

    setTimeout(function(){
      this.setState({displaySuccess: 'none'});
    }.bind(this), 1000)
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <div className="logoBox">
              <div className="blankSquare"></div>
              <div className="companyName">Loard Software
              </div>
            </div>
          </div>
        </div>
        <div className="manual-container">
          <div className="table-header">List of participants</div>
          <div className="successMessage" style={{display: this.state.displaySuccess}}> Added successfully </div>
          <div className="table-view-add">  
            <AddnewForm onSubmit={this.handleNewEntry}/>
          </div>
          <div className="table-view-List">
            <FormProvider
              form="inline"
              onSubmit={this.handleSubmit}
              onSubmitSuccess={() => this.setState({ editing: null })}
              initialValues={this.state.editing}
              enableReinitialize
            >
              {formProps => {
                return (
                  <form onSubmit={formProps.handleSubmit}>
                    <Table
                      columns={this.columns}
                      data={this.state.data}
                      showPagination={false}
                      pageSize={this.state.data.length}
                      defaultSorted={[
                        {
                          id: "name",
                          asce: true
                        }
                      ]}
                    />
                  </form>
                );
              }}
            </FormProvider>

          </div>
        </div>
      </div>
    );
  }
}
