//  @flow
import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { Store, iField } from "../App";
import { History } from "history";
import { DELETE_ITEM } from "../actions";

interface ConfirmProps {
  open: boolean;
  text: string;
  title: string;
  onCancel?: any;
  onConfirm: any;
  onClose: any;
}

const Confirm = ({
  open,
  text,
  title,
  onCancel,
  onConfirm,
  onClose
}: ConfirmProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="raised" name="cancel" onClick={onCancel}>
        Cancel
      </Button>
      <Button
        variant="raised"
        color="secondary"
        name="save"
        onClick={onConfirm}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

interface DataItemProps {
  history?: History;
  itemId: string;
  url: string;
  onDelete: any;
  index: number;
  isLast: boolean;
  isSelected: boolean;
  position: number;
  secondTitle?: string;
  title: string;
  onSelect: any;
}

function DataItem({
  history,
  itemId,
  url,
  onDelete,
  isLast,
  isSelected,
  position,
  secondTitle,
  title,
  onSelect
}: DataItemProps) {
  const { dispatch } = useContext(Store);
  function handleClick() {
    history!.push(url);
  }

  function handleDelete() {
    onDelete(itemId);
  }

  const styles = {
    cursor: "pointer",
    borderBottom: "none"
  };

  if (!isLast) styles.borderBottom = "1px solid #efefef";

  return (
    <>
      <ListItem style={styles}>
        <Checkbox
          checked={isSelected}
          onClick={onSelect}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText
          onClick={handleClick}
          primary={`${position}. ${title}`}
          secondary={secondTitle}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}

interface Props {
  history: History;
}

function Content({ history }: Props) {
  const { dispatch, items } = useContext(Store);
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState();

  function handleSelect(index: number) {
    setSelected([...selected, index]);
  }

  function handleDeleteSelected() {
    dispatch({
      type: "DELETE_SELECTED_ITEMS",
      selected
    });
  }

  function handleDelete(itemId: string) {
    dispatch({
      type: DELETE_ITEM,
      itemId
    });
  }

  return (
    <div style={{ position: "relative", width: "700px", margin: "4em auto" }}>
      <h2>Add, Edit &amp; Delete</h2>
      {!!selected && (
        <div>
          <Button
            variant="raised"
            type="submit"
            name="EditFields"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
        </div>
      )}
      {!!items.length && (
        <Paper elevation={8} style={{ color: "black" }}>
          <List>
            {items.map((item: iField, index) => (
              <DataItem
                isLast={items.length === index + 1}
                key={item.id}
                itemId={item.id}
                index={index}
                position={index + 1}
                isSelected={selected.includes(index)}
                onSelect={handleSelect}
                title={item.name}
                onDelete={handleDelete}
                url={`/content/${item.id}`}
              />
            ))}
          </List>
        </Paper>
      )}
      {!items.length && <p>Please add some content</p>}
    </div>
  );
}

export default Content;
