import React from 'react'
import { reset, Field, reduxForm } from 'redux-form'
import { Input } from 'semantic-ui-react';
import validate from "./Helpers/Validator";


class AddnewForm extends React.Component {

  Input({ input, meta: { touched, error }, ...custom }) {
    const hasError = touched && error !== undefined;
    return (
      <React.Fragment>
        <Input
          error={hasError}
          fluid
          {...input}
          {...custom} />
        {hasError && <div class="error-message">{error}</div>}
      </React.Fragment>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="addForm">
          <div className="inputFields">
            <div className="chield">
              <Field name="name" component={this.Input} placeholder="Full name" />
            </div>
            <div className="chield">
              <Field name="email" component={this.Input} placeholder="E-mail address" />
            </div>
            <div className="chield">
              <Field name="phone" component={this.Input} placeholder="Phone number" />
            </div>
          </div>
          <div className="submitButton">
            <button type="submit">Add new</button>
          </div>
        </div>
      </form>
    )
  }
}

// clear table after successful added
const afterSubmit = (result, dispatch) => dispatch(reset('contact'));

export default reduxForm({
  // a unique name for the form
  form: 'contact',
  validate,
  onSubmitSuccess: afterSubmit,
})(AddnewForm)