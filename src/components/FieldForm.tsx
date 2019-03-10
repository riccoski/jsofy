//  @flow
import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Input,
  InputLabel,
  Select,
  TextField
} from "@material-ui/core";
import uuid from "uuid/v4";

import { Store, iField } from "../App";
import { ADD_FIELD } from "../actions";

const defaultData = {
  id: uuid(),
  name: "",
  label: "",
  type: "",
  isTitle: false
};

function FieldForm({
  history,
  initialValues = defaultData
}: {
  history: any;
  initialValues: iField;
}) {
  const [state, setState] = useState(initialValues);
  const {
    dispatch,
    typeOptions = []
  }: { dispatch: any; typeOptions: any[] } = useContext(Store);

  function handleChange(event: any) {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  }

  function handleClose() {
    history.push("/fields");
  }

  function handleSubmit() {
    dispatch({
      ...state,
      type: ADD_FIELD
    });

    handleClose();
  }
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        {!!state.label.length ? state.label : "Add Field"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please edit the Field with the field options below...
        </DialogContentText>
        <InputLabel htmlFor="edt-name">Key</InputLabel>
        <TextField
          id="edt-name"
          name="name"
          placeholder="name"
          defaultValue={state.name || ""}
          style={{ display: "block", marginBottom: "1em" }}
          onChange={handleChange}
        />
        <InputLabel htmlFor="edt-label">Label</InputLabel>
        <TextField
          id="edt-label"
          name="label"
          placeholder="Label"
          defaultValue={state.label || ""}
          style={{ display: "block", marginBottom: "1em" }}
          onChange={handleChange}
        />
        <InputLabel htmlFor="age-simple">Type</InputLabel>
        <Select
          name="type"
          value={state.type || ""}
          native={true}
          input={
            <Input
              id="age-simple"
              name="type"
              style={{ display: "block" }}
              onChange={handleChange}
            />
          }
        >
          {typeOptions.map(({ label, value }: any, index: number) => (
            <option key={`opt_${index}`} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <DialogActions>
          <Button name="cancel" onClick={handleClose} variant="raised">
            Cancel
          </Button>
          <Button
            color="secondary"
            name="save"
            onClick={handleSubmit}
            variant="raised"
          >
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default FieldForm;
