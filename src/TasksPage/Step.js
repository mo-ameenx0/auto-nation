import React from "react";

import {
  Container,
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Step({ stepTitle }) {
  return (
    <Accordion sx={{ my: 2 }} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
      >
        <Typography sx={{ padding: 2 }} variant="h6">
          {stepTitle}
        </Typography>
      </AccordionSummary>
      <Container sx={{ margin: 3 }}>Hello this is testing</Container>
    </Accordion>
  );
}
