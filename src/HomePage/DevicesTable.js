import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import endpoints from "../endpoints";

export default function DevicesTable({ selectedDevices, setSelectedDevices }) {
  const [endDevices, setDevices] = React.useState([]);

  const fetchDevices = async () => {
    try {
      const response = await fetch(endpoints.getRouters);
      const devices = await response.json();
      setDevices(devices);
    } catch (error) {
      console.error("failed to fetch routers:", error);
    }
  };

  React.useEffect(() => {
    fetchDevices();
  }, []);

  const handleSelect = (event, device) => {
    const isSelected = selectedDevices.some((d) => d._id === device._id);

    if (isSelected) {
      setSelectedDevices(selectedDevices.filter((d) => d._id !== device._id));
    } else {
      setSelectedDevices([...selectedDevices, device]);
    }
  };

  const isSelected = (device) =>
    selectedDevices.some((d) => d._id === device._id);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>Router Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>IP</TableCell>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {endDevices.map((row) => {
            const isItemSelected = isSelected(row);
            return (
              <TableRow
                key={row._id}
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onChange={(event) => handleSelect(event, row)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.ip}</TableCell>
                <TableCell>{row.username}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
