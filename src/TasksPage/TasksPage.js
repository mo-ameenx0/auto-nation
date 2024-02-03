import React from "react";
import { Container, Grid } from "@mui/material";

import Task from "./Task";

export default function TasksPage() {
  const [tasks, setTasks] = React.useState([]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={task.id}>
            <Task task={task} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
