import React from "react";
import {
  Container,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import DevicesTable from "./DevicesTable";
import TaskSelection from "./TaskSelection";
import TaskExecutor from "./TaskExecutor";

const steps = ["Select Tasks", "Run Tasks"];

export default function HomePage() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [selectedDevices, setSelectedDevices] = React.useState([]);
  const [selectedTasks, setSelectedTasks] = React.useState([]);

  const handleReset = () => {
    setSelectedDevices([]);
    setSelectedTasks([]);
    setActiveStep(0);
  };
  const handleNext = () => {
    if (activeStep === steps.length) {
      handleReset();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const runTasks = () => {
    console.log(
      "Executing tasks:",
      selectedTasks,
      "on devices:",
      selectedDevices
    );
    handleNext();
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box>
            <Box mb={4}>
              <DevicesTable
                selectedDevices={selectedDevices}
                setSelectedDevices={setSelectedDevices}
              />
            </Box>
            <Box mb={4}>
              <TaskSelection
                selectedTasks={selectedTasks}
                setSelectedTasks={setSelectedTasks}
              />
            </Box>

            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={runTasks}>
                Run
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <TaskExecutor devices={selectedDevices} tasks={selectedTasks} />
            <Button variant="contained" color="primary" onClick={handleReset}>
              Go Back
            </Button>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {getStepContent(activeStep)}
    </Container>
  );
}
