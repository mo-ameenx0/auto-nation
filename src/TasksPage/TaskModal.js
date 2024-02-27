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
import endpoints from "../endpoints";

export default function AddNewTaskModal({ open, onClose, task }) {
  const [taskName, setTaskName] = React.useState(task ? task.taskName : "");
  const [steps, setSteps] = React.useState(
    task ? task.steps : [{ id: Date.now(), name: "", commands: [""] }]
  );

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
    setSteps([...steps, { id: Date.now(), name: "", commands: [""] }]);
  };

  const handleRemoveStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleCommandChange = (stepId, commandIndex, event) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          const newCommands = [...step.commands];
          newCommands[commandIndex] = event.target.value;
          return { ...step, commands: newCommands };
        }
        return step;
      })
    );
  };

  const handleAddCommand = (stepId) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return { ...step, commands: [...step.commands, ""] };
        }
        return step;
      })
    );
  };

  const handleRemoveCommand = (stepId, commandIndex) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          const newCommands = step.commands.filter(
            (_, index) => index !== commandIndex
          );
          return { ...step, commands: newCommands };
        }
        return step;
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // update task base on id
      var response = null;
      if (task) {
        const _id = task._id;
        response = await fetch(endpoints.updateTask + `/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskName, steps }),
        });
      }
      // insert new task
      else {
        response = await fetch(endpoints.inserTasks, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskName, steps }),
        });
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
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
          {task ? "Edit Task" : "Create a New Task"}
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
              {step.commands.map((command, cmdIndex) => (
                <Box key={cmdIndex} display="flex" alignItems="center" mt={2}>
                  <TextField
                    fullWidth
                    label={`Step ${index + 1} Command ${cmdIndex + 1}`}
                    value={command}
                    onChange={(event) =>
                      handleCommandChange(step.id, cmdIndex, event)
                    }
                    margin="normal"
                  />
                  <IconButton
                    onClick={() => handleRemoveCommand(step.id, cmdIndex)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => handleAddCommand(step.id)}
                sx={{ my: 1 }}
              >
                Add Command
              </Button>
              <Divider sx={{ my: 1 }} />
              <IconButton
                onClick={() => handleRemoveStep(step.id)}
                sx={{ my: 1 }}
              >
                <DeleteIcon />
              </IconButton>
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
