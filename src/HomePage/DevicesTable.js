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

  const handleSelect = (event, id) => {
    const selectedIndex = selectedDevices.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedDevices, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedDevices.slice(1));
    } else if (selectedIndex === selectedDevices.length - 1) {
      newSelected = newSelected.concat(selectedDevices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedDevices.slice(0, selectedIndex),
        selectedDevices.slice(selectedIndex + 1)
      );
    }

    setSelectedDevices(newSelected);
  };

  const isSelected = (id) => selectedDevices.indexOf(id) !== -1;

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
            const isItemSelected = isSelected(row._id);
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
                    onChange={(event) => handleSelect(event, row._id)}
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
