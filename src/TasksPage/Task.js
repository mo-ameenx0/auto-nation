import React from "react";

import { Stack, IconButton, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import Step from "./Step";

export default function Task({ taskTitle }) {
  return (
    <Paper sx={{ margin: 4 }} elevation={3}>
      <Stack
        sx={{ mx: 2 }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Typography sx={{ padding: 2 }} variant="h5">
          {taskTitle}
        </Typography>
        <IconButton>
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Step stepTitle="Step1" />
      <Step stepTitle="Step2" />
      <Step stepTitle="Step3" />
      <Step stepTitle="Step4" />
    </Paper>
  );
}
