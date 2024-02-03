import React from "react";

import { Stack, IconButton, Paper, Typography, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import AddNewTaskModal from "./TaskModal";
import Step from "./Step";

export default function Task({ task }) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Paper
      sx={{
        margin: 4,
        padding: 2,
        elevation: 3,
        borderRadius: 2, // Rounded corners
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center" // Align items vertically
        spacing={2} // Consistent spacing between items in the stack
      >
        <Typography variant="h5">{task.taskName}</Typography>
        <AddNewTaskModal
          task={task}
          open={openModal}
          onClose={handleCloseModal}
        />
        <IconButton
          aria-label="edit task"
          size="large"
          onClick={handleOpenModal}
        >
          <EditIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="column" spacing={2}>
        {task.steps.map((step) => (
          <Step step={step} key={step.id} />
        ))}
      </Stack>
    </Paper>
  );
}
