import React from "react";
import { Paper, TextField, Box, Typography } from "@mui/material";

export default function Command({ command, commandIdx, onCommandChange }) {
  const [fieldValues, setFieldValues] = React.useState({});
  const commandRef = React.useRef(command);
  const onCommandChangeRef = React.useRef(onCommandChange);

  React.useEffect(() => {
    commandRef.current = command;
    onCommandChangeRef.current = onCommandChange;
  }, [command, onCommandChange]); // This effect updates refs when props change

  React.useEffect(() => {
    let updatedCommand = commandRef.current;
    Object.keys(fieldValues).forEach((fieldName) => {
      updatedCommand = updatedCommand.replace(
        `{${fieldName}}`,
        fieldValues[fieldName]
      );
    });
    if (onCommandChangeRef.current) {
      onCommandChangeRef.current(updatedCommand, commandIdx);
    }
  }, [fieldValues, commandIdx]); // This effect now only depends on fieldValues and commandIdx

  const handleChange = (fieldName) => (event) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: event.target.value,
    }));
  };

  const parseCommand = (commandToParse) => {
    const regex = /{([^}]+)}/g;
    let match;
    const parts = [];
    let lastIndex = 0;

    while ((match = regex.exec(commandToParse))) {
      if (lastIndex < match.index) {
        parts.push(
          <Typography component="span" key={`text-${lastIndex}`}>
            {commandToParse.slice(lastIndex, match.index)}
          </Typography>
        );
      }

      const fieldName = match[1];
      const textWidth = fieldName.length * 8 + 50;

      parts.push(
        <TextField
          key={fieldName}
          label={fieldName}
          variant="outlined"
          size="small"
          margin="dense"
          style={{
            width: `${textWidth}px`,
            marginLeft: 8,
            verticalAlign: "bottom",
          }}
          value={fieldValues[fieldName] || ""}
          onChange={handleChange(fieldName)}
        />
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < commandToParse.length) {
      parts.push(
        <Typography component="span" key={`text-${lastIndex}`}>
          {commandToParse.slice(lastIndex)}
        </Typography>
      );
    }

    return parts;
  };

  return (
    <Paper variant="outlined" style={{ padding: "16px", margin: "8px 0" }}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        {parseCommand(commandRef.current)}
      </Box>
    </Paper>
  );
}
