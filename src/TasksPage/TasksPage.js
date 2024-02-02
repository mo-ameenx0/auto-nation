import React from "react";
import { Container, Grid } from "@mui/material";

import Task from "./Task";

export default function TasksPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {["Task1", "Task2", "Task3", "Task4", "Task5"].map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={item}>
            <Task taskTitle={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
