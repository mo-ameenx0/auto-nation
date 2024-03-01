import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Snackbar,
  Alert,
} from "@mui/material";
import endpoints from "../endpoints";

const TaskExecutor = ({ devices, tasks }) => {
  console.log(tasks);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [errors, setErrors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const executeTaskOnDevice = async (device, task) => {
    try {
      const combinedCommands = task.steps.reduce(
        (acc, step) => acc.concat(step.commands),
        []
      );

      const response = await fetch(endpoints.executeCommands, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: device.ip,
          username: device.username,
          password: device.password,
          commands: combinedCommands,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      // Handle response if needed
    } catch (error) {
      setErrors((prev) => [
        ...prev,
        { task: task.id, device: device.id, error: error.message },
      ]);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (
      currentDeviceIndex < devices.length &&
      currentTaskIndex < tasks.length
    ) {
      const currentDevice = devices[currentDeviceIndex];
      const currentTask = tasks[currentTaskIndex];
      executeTaskOnDevice(currentDevice, currentTask);

      // Prepare for the next iteration
      const nextDeviceIndex = currentDeviceIndex + 1;
      if (nextDeviceIndex >= devices.length) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setCurrentDeviceIndex(0);
      } else {
        setCurrentDeviceIndex(nextDeviceIndex);
      }
    }
  }, [currentDeviceIndex, currentTaskIndex, devices, tasks]);

  return (
    <Box>
      <List>
        {devices.map((device, index) => (
          <ListItem key={device._id}>
            <ListItemText primary={`Device ${index + 1}`} />
            {index === currentDeviceIndex && currentTaskIndex < tasks.length ? (
              <ListItemIcon>
                <CircularProgress size={24} />
              </ListItemIcon>
            ) : (
              <ListItemIcon />
            )}
            <ListItemText primary={`t${currentTaskIndex + 1}`} />
          </ListItem>
        ))}
      </List>
      {errors.map((error, index) => (
        <Snackbar
          key={index}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Error in task {error.task} on device {error.device}: {error.error}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default TaskExecutor;
