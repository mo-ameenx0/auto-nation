import React from "react";

import {
  Container,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Step({ stepTitle }) {
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
          {stepTitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Container>
          <Typography sx={{ my: 2 }}>Hello this is testing</Typography>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}
