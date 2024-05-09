import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import endpoints from "../endpoints";

export default function TaskExecutor({ devices, tasks }) {
  const [commandResults, setCommandResults] = useState({});

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

      let res = await response.json();
      setCommandResults((prev) => ({ ...prev, [device._id + task._id]: res }));
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    tasks.forEach((task) => {
      devices.forEach((device) => {
        executeTaskOnDevice(device, task);
      });
    });
  }, [devices, tasks]);

  return (
    <Box>
      {devices.map((device) => (
        <Card key={device._id} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
              {device.name} ({device.ip})
            </Typography>
            <Typography color="textSecondary" sx={{ marginBottom: 1 }}>
              Type: {device.type}
            </Typography>
            {tasks.map((task, index) => (
              <Accordion key={task._id} sx={{ margin: "10px 0" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`task-content-${task._id}`}
                  id={`task-header-${task._id}`}
                >
                  <Typography>{task.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {task.steps.map((step, stepIndex) => (
                    <React.Fragment key={step.id}>
                      {step.commands.map((command, commandIndex) => {
                        const key = `${step.id}-${commandIndex}`;
                        const response = commandResults[
                          device._id + task._id
                        ]?.[commandIndex]?.response || <CircularProgress />;
                        return (
                          <div key={key}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              sx={{ marginTop: 2 }}
                            >
                              <strong>{command}</strong>
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                whiteSpace: "pre-wrap",
                                margin: "8px 0 20px",
                              }}
                            >
                              {response}
                            </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
