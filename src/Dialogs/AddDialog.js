import React from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function AddDialog({
  dialogState,
  closeDialog,
  fields,
  onAdd,
  setNew,
}) {
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setNew((prevRouter) => ({
      ...prevRouter,
      [id]: value,
    }));
  };

  return (
    <Dialog open={dialogState} onClose={closeDialog}>
      <DialogTitle>Add a New Device</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={fields.name}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="type"
          label="Type"
          type="text"
          fullWidth
          variant="standard"
          value={fields.type}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="ip"
          label="IP Address"
          type="text"
          fullWidth
          variant="standard"
          value={fields.ip}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          value={fields.username}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={fields.password}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={onAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
