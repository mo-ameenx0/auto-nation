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
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddNewTaskModal({ open, onClose }) {
  const [taskName, setTaskName] = React.useState("");
  const [steps, setSteps] = React.useState([
    { id: Date.now(), name: "", command: "" },
  ]);

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleStepChange = (id, event) => {
    const { name, value } = event.target;
    setSteps(
      steps.map((step) => {
        if (step.id === id) {
          return { ...step, [name]: value };
        }
        return step;
      })
    );
  };

  const handleAddStep = () => {
    setSteps([...steps, { id: Date.now(), name: "", command: "" }]);
  };

  const handleRemoveStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ taskName, steps });
    // Send the data to a server or state management store
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component={Paper} sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Create a New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Name"
            value={taskName}
            onChange={handleTaskNameChange}
            margin="normal"
          />
          {steps.map((step, index) => (
            <Box key={step.id} sx={{ my: 2 }}>
              <TextField
                fullWidth
                label={`Step ${index + 1} Name`}
                name="name"
                value={step.name}
                onChange={(event) => handleStepChange(step.id, event)}
                margin="normal"
              />
              <TextField
                fullWidth
                label={`Step ${index + 1} Command`}
                name="command"
                value={step.command}
                onChange={(event) => handleStepChange(step.id, event)}
                margin="normal"
              />
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => handleRemoveStep(step.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              {index < steps.length - 1 && <Divider />}
            </Box>
          ))}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={2}
          >
            <Button
              type="button"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddStep}
            >
              Add Step
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Task
            </Button>
          </Box>
        </form>
      </Container>
    </Modal>
  );
}
