import React from "react";

import { Stack, IconButton, Paper, Typography, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import Step from "./Step";

export default function Task({ taskTitle }) {
  return (
    <Paper
      sx={{
        margin: 4,
        padding: 2,
        elevation: 3,
        borderRadius: 2, // Rounded corners
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center" // Align items vertically
        spacing={2} // Consistent spacing between items in the stack
      >
        <Typography variant="h5">{taskTitle}</Typography>
        <IconButton aria-label="edit task" size="large">
          <EditIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="column" spacing={2}>
        <Step stepTitle="Step1" />
        <Step stepTitle="Step2" />
        <Step stepTitle="Step3" />
        <Step stepTitle="Step4" />
      </Stack>
    </Paper>
  );
}
