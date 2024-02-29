import React from "react";
import {
  Container,
  Grid,
  DialogTitle,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import RouterRow from "./RouterRow";
import endpoints from "../endpoints";

export default function RoutersPage() {
  const [open, setOpen] = React.useState(false);
  const [routers, setRouters] = React.useState([]);
  const [newRouter, setNewRouter] = React.useState({
    name: "",
    ip: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setNewRouter((prevRouter) => ({
      ...prevRouter,
      [id]: value,
    }));
  };

  const fetchRouters = async () => {
    try {
      const response = await fetch(endpoints.getRouters);
      const routers = await response.json();

      console.log(routers);
      setRouters(routers);
    } catch (error) {
      console.error("failed to fetch routers:", error);
    }
  };

  React.useEffect(() => {
    fetchRouters();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRouter = async (routerData) => {
    try {
      const response = await fetch(endpoints.insertRouter, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRouter),
      });
      const result = await response.json();
      console.log("Success:", result);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveRouter = (routerId) => {
    const updatedRouters = routers.filter((router) => router._id !== routerId);
    setRouters(updatedRouters);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid
        item
        xs={12}
        sx={{ margin: 2 }}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Device
        </Button>
      </Grid>
      <Grid container spacing={3}>
        {routers.map((router) => (
          <RouterRow
            key={router._id}
            router={router}
            onRemove={handleRemoveRouter}
          />
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
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
            value={newRouter.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="ip"
            label="IP Address"
            type="text"
            fullWidth
            variant="standard"
            value={newRouter.ip}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={newRouter.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={newRouter.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddRouter}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
