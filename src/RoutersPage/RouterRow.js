import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import endpoints from "../endpoints";

export default function RouterRow({ router, onRemove }) {
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleConfirmRemove = async () => {
    const response = await fetch(endpoints.deleteRouter + `/${router._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Success:", result);
    onRemove(router._id);
    setOpenConfirm(false);
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
          {/* Other router details */}
          <Tooltip title="Remove router">
            <IconButton
              aria-label={`Remove ${router.name}`}
              onClick={handleOpenConfirm}
              sx={{ marginTop: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Card>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Removal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this router?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleConfirmRemove} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
