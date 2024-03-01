import React from "react";
import { Container, Grid, Button } from "@mui/material";

import AddDialog from "../Dialogs/AddDialog";
import RouterRow from "./RouterRow";
import endpoints from "../endpoints";

export default function RoutersPage() {
  const [routers, setRouters] = React.useState([]);

  const [dialogState, setDialogState] = React.useState(false);
  const openDialog = () => setDialogState(true);
  const closeDialog = () => setDialogState(false);

  const [newRouter, setNewRouter] = React.useState({
    name: "",
    type: "",
    ip: "",
    username: "",
    password: "",
  });

  React.useEffect(() => {
    fetchRouters();
  }, []);

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

  const handleAddNewRouter = async (routerData) => {
    try {
      await fetch(endpoints.insertRouter, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRouter),
      });
      closeDialog();
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
        <Button variant="contained" color="primary" onClick={openDialog}>
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
      <AddDialog
        dialogState={dialogState}
        fields={newRouter}
        onAdd={handleAddNewRouter}
        closeDialog={closeDialog}
        setNew={setNewRouter}
      />
    </Container>
  );
}
