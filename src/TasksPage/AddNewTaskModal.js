import React from "react";
import {
  Container,
  TextField,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddNewTaskModal({ state, setState }) {
  const [taskName, setTaskName] = React.useState("");
  const [steps, setSteps] = React.useState([{ id: Date.now(), name: "" }]);

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleStepNameChange = (id, event) => {
    const newSteps = steps.map((step) => {
      if (step.id === id) {
        return { ...step, name: event.target.value };
      }
      return step;
    });
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { id: Date.now(), name: "" }]);
  };

  const handleRemoveStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the form submission,
    // typically sending the data to a server or state management store
    console.log({ taskName, steps });
  };
  return (
    <Modal
      open={state}
      onClose={setState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component="main" maxWidth="sm">
        <Paper style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h6">Create a New Task</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Task Name"
              value={taskName}
              onChange={handleTaskNameChange}
              margin="normal"
            />
            {steps.map((step, index) => (
              <Box key={step.id} display="flex" alignItems="center" marginY={2}>
                <TextField
                  fullWidth
                  label={`Step ${index + 1}`}
                  value={step.name}
                  onChange={(event) => handleStepNameChange(step.id, event)}
                  margin="normal"
                />
                <IconButton onClick={() => handleRemoveStep(step.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              type="button"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddStep}
              sx={{ my: 2 }}
            >
              Add Step
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Task
            </Button>
          </form>
        </Paper>
      </Container>
    </Modal>
  );
}
