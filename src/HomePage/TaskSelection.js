import React from "react";
import { Chip, Stack, Paper, Box } from "@mui/material";
import endpoints from "../endpoints";
import Task from "../TasksPage/Task";
const TaskSelection = ({ selectedTasks, setSelectedTasks }) => {
  const [tasks, setTasks] = React.useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(endpoints.getTasks);
      const devices = await response.json();

      setTasks(devices);
    } catch (error) {
      console.error("failed to fetch tasks:", error);
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = (task) => {
    const currentIndex = selectedTasks.indexOf(task);
    const newSelectedTasks = [...selectedTasks];

    if (currentIndex === -1) {
      newSelectedTasks.push(task);
    } else {
      newSelectedTasks.splice(currentIndex, 1);
    }

    setSelectedTasks(newSelectedTasks);
  };

  return (
    <Box>
      <Paper style={{ padding: "10px", marginBottom: "20px" }} key={1234}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tasks.map((task) => (
            <Chip
              key={task._id}
              label={task.name}
              onClick={() => handleToggle(task)}
              color={selectedTasks.includes(task) ? "primary" : "default"}
              clickable
            />
          ))}
        </Stack>
      </Paper>
      {selectedTasks.map((task, index) => (
        <Box key={task._id} mb={index !== selectedTasks.length - 1 ? 4 : 0}>
          <Task task={task} />
        </Box>
      ))}
    </Box>
  );
};

export default TaskSelection;
