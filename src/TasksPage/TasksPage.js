import React from "react";
import { Container, Grid } from "@mui/material";

import endpoints from "../endpoints";
import Task from "./Task";

export default function TasksPage() {
  const [tasks, setTasks] = React.useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(endpoints.getTasks);
      const tasks = await response.json();

      setTasks(tasks);
    } catch (error) {
      console.error("failed to fetch tasks:", error);
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={task._id}>
            <Task task={task} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
