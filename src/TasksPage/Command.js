import React from "react";
import { Paper, TextField, Box, Typography } from "@mui/material";

export default function Command({ command }) {
  const parseCommand = (command) => {
    const regex = /{([^}]+)}/g; // Regular expression to find {input_field_name}
    let match;
    const parts = [];
    let lastIndex = 0;

    while ((match = regex.exec(command))) {
      if (lastIndex < match.index) {
        parts.push(
          <Typography component="span" key={`text-${lastIndex}`}>
            {command.slice(lastIndex, match.index)}
          </Typography>
        );
      }

      const textWidth = match[1].length * 8 + 50;

      parts.push(
        <TextField
          key={match[1]}
          label={match[1]}
          variant="outlined"
          size="small"
          margin="dense"
          style={{
            width: `${textWidth}px`,
            marginLeft: 8,
            verticalAlign: "bottom",
          }}
        />
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < command.length) {
      parts.push(
        <Typography component="span" key={`text-${lastIndex}`}>
          {command.slice(lastIndex)}
        </Typography>
      );
    }

    return parts;
  };

  return (
    <Paper variant="outlined" style={{ padding: "16px", margin: "8px 0" }}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        {parseCommand(command)}
      </Box>
    </Paper>
  );
}
