import React from "react";

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Command from "./Command";

export default function Step({ step, onCommandChange }) {
  function handleCommandChange(updatedCommand, commandIdx) {
    if (onCommandChange) {
      onCommandChange(step.id, commandIdx, updatedCommand);
    }
  }
  return (
    <Accordion
      sx={{
        my: 2,
        boxShadow: "none",
        borderColor: "divider",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        sx={{
          "&.Mui-expanded": { minHeight: 48 },
          ".MuiAccordionSummary-content.Mui-expanded": { margin: "12px 0" },
        }}
      >
        <Typography
          variant="h6"
          sx={{ width: "100%", flexShrink: 0, flexGrow: 1 }}
        >
          {step.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {step.commands.map((command, cmdIndex) => (
          <Command
            command={command}
            commandIdx={cmdIndex}
            onCommandChange={handleCommandChange}
            key={cmdIndex}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
