import React from "react";

const editModes = {
  view: props => (
    <React.Fragment>
      <button onClick={props.onEdit} className="actionButton">
        <img src="icons8-edit-30.png" alt="submit" />
      </button>
      <button onClick={props.onDelete} className="actionButton">
        <img src="icons8-remove-30.png" alt="submit" />
      </button>
    </React.Fragment>
  ),
  edit: props => (
    <React.Fragment>
      <div className="editAction">
        <div className="cancleAction">
          <button onClick={props.onCancel} className="cancelButton">
            Cancel
          </button>
        </div>
        <div className="saveAction">
          <button type="submit" className="saveButton">
            Save
        </button>
        </div>
      </div>
    </React.Fragment>
  )
};

export default function ActionsCell(props) {
  const {
    mode,
    actions: { onEdit, onCancel, onDelete }
  } = props.columnProps.rest;
  const Buttons = editModes[mode];
  return <Buttons onEdit={() => onEdit(props.index)} onCancel={onCancel} onDelete={onDelete} />;
}