import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmationDialog from "../Dialogs/ConfirmationDialog";

import endpoints from "../endpoints";

export default function RouterRow({ router, onRemove }) {
  const [dialogState, setDialogState] = React.useState(false);
  const openDialog = () => setDialogState(true);
  const closeDialog = () => setDialogState(false);

  const handleDialogConfirm = async () => {
    const response = await fetch(endpoints.deleteRouter + `/${router._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Success:", result);
    onRemove(router._id);
    closeDialog();
  };
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card raised sx={{ margin: 2 }}>
        <CardContent sx={{ padding: 2 }}>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            {router.name}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ marginBottom: 1 }}
          >
            <strong>Type:</strong> {router.type}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ marginBottom: 1 }}
          >
            <strong>IP:</strong> {router.ip}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ marginBottom: 2 }}
          >
            <strong>Username:</strong> {router.username}
          </Typography>
          <Tooltip title="Remove router">
            <IconButton
              aria-label={`Remove ${router.name}`}
              onClick={openDialog}
              sx={{ marginTop: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Card>
      <ConfirmationDialog
        message={"Are you sure you want to remove this router?"}
        dialogState={dialogState}
        closeDialog={closeDialog}
        handleConfirm={handleDialogConfirm}
      />
    </Grid>
  );
}
