import React from "react";
import {
  Container,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import DevicesTable from "../HomePage/DevicesTable";
import Topology from "./Topology";

const steps = ["Devices Selection", "Topology"];

export default function TopologyPage() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [selectedDevices, setSelectedDevices] = React.useState([]);

  const handleReset = () => {
    setSelectedDevices([]);
    setActiveStep(0);
  };
  const handleNext = () => {
    if (activeStep === 1) {
      handleReset();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const runTasks = () => {
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
            <Topology devices={selectedDevices} />
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={runTasks}>
                Go Back
              </Button>
            </Box>
          </Box>
        );
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
