import React from "react";
import { Container, Grid } from "@mui/material";

import Task from "./Task";

export default function TasksPage() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {["Task1", "Task2", "Task3"].map((item) => (
          <Grid item xs={12} sm={6} key={item}>
            <Task taskTitle={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
