import React from "react";

import {
  Stack,
  IconButton,
  Paper,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmationDialog from "../Dialogs/ConfirmationDialog";
import AddNewTaskModal from "./TaskModal";
import Step from "./Step";

import endpoints from "../endpoints";

export default function Task({ task, onRemove }) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [dialogState, setDialogState] = React.useState(false);
  const openDialog = () => setDialogState(true);
  const closeDialog = () => setDialogState(false);

  const handleDialogConfirm = async () => {
    const response = await fetch(endpoints.deleteTask + `/${task._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Success:", result);
    closeDialog();
    onRemove(task._id);
  };

  return (
    <Paper
      sx={{
        padding: 2,
        elevation: 3,
        borderRadius: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h5">{task.taskName}</Typography>
        <Box>
          <IconButton
            aria-label="edit task"
            size="large"
            onClick={handleOpenModal}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete task"
            size="large"
            onClick={openDialog}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="column" spacing={2}>
        {task.steps.map((step) => (
          <Step step={step} key={step.id} />
        ))}
      </Stack>
      <ConfirmationDialog
        message={"Are you sure you want to remove this task?"}
        dialogState={dialogState}
        closeDialog={closeDialog}
        handleConfirm={handleDialogConfirm}
      />
      <AddNewTaskModal
        task={task}
        open={openModal}
        onClose={handleCloseModal}
      />
    </Paper>
  );
}
