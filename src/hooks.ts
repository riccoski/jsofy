import { useState } from "react";

export function useToggleState(initialState: boolean = false) {
  const [open, setOpen] = useState(initialState);

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleToggle() {
    setOpen(!open);
  }

  return [open, handleToggle, handleOpen, handleClose];
}
