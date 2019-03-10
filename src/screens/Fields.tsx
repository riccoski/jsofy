import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";
import { Route, Switch } from "react-router-dom";
import FieldForm from "../components/FieldForm";
import { iField, Store } from "../App";

const DeleteConfirmation = ({
  onClose,
  onConfirm,
  open,
  title
}: {
  onClose: any;
  onConfirm: any;
  open: boolean;
  title: string;
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are your sure you want to delete {title}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button name="cancel" onClick={onClose} variant="raised">
        Cancel
      </Button>
      <Button
        color="secondary"
        name="save"
        onClick={onConfirm}
        variant="raised"
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

function Field({
  id,
  isTitle = false,
  label,
  onClick,
  onDelete
}: {
  id: string;
  isTitle: Boolean;
  label: string;
  onClick: Function;
  onDelete: Function;
}) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    onClick(id);
  }

  function handleConfirm() {
    onDelete(id);
  }

  function handleDelete() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <ListItem onClick={handleClick}>
        <label>{label}</label> {isTitle && <StarIcon />}
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <DeleteConfirmation
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={label}
      />
    </>
  );
}

function Fields({ history }: { history: any }) {
  const { dispatch, fields }: { dispatch: any; fields: iField[] } = useContext(
    Store
  );
  function handleClick(id: string) {
    history.push(`/fields/edit/${id}`);
  }

  function handleDelete(fieldId: string) {
    dispatch({
      type: "DELETE_FIELD",
      fieldId
    });
  }

  return (
    <div style={{ position: "relative", width: "700px", margin: "4em auto" }}>
      <h2>Manage Fields</h2>
      <Paper elevation={8} style={{ color: "black", marginBottom: "1.5em" }}>
        <List>
          {fields.map((field, index: number) => (
            <>
              <Field
                key={field.id}
                {...field}
                onClick={handleClick}
                onDelete={handleDelete}
              />
              {index + 1 != fields.length && <Divider />}
            </>
          ))}
        </List>
      </Paper>
      <Button
        color="primary"
        name="loginButton"
        onClick={() => history.push("/content")}
        variant="raised"
      >
        Manage Content
      </Button>
      <Button
        aria-label="add"
        onClick={() => history.push("/fields/add")}
        variant="raised"
      >
        Add Field
      </Button>
      <Switch>
        <Route path="/fields/edit/:id" component={FieldForm} />
        <Route path="/fields/add" component={FieldForm} />
      </Switch>
    </div>
  );
}

export default Fields;
