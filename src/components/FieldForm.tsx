//  @flow
import React, { useContext, useState } from "react";
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
import { ADD_FIELD, EDIT_FIELD } from "../actions";

const defaultData = {
  id: uuid(),
  name: "",
  label: "",
  type: "",
  isTitle: false
};

function FieldForm({
  onClose,
  initialValues,
  open = false
}: {
  onClose?: Function;
  initialValues?: iField;
  open: boolean;
}) {
  const [state, setState] = useState(initialValues || defaultData);
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
    if (onClose) onClose();
  }

  function handleSubmit() {
    dispatch({
      field: { ...state },
      type: initialValues ? EDIT_FIELD : ADD_FIELD
    });
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {!!initialValues ? initialValues.label : "Add Field"}
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
