import * as React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function Sidebar({ routes, state, toggleSidebar }) {
  return (
    <Drawer
      open={state}
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {routes.map((item, index) => (
            <ListItem key={item.NAME}>
              <ListItemButton component={Link} to={item.PATH}>
                <ListItemIcon>{item.ICON}</ListItemIcon>
                <ListItemText primary={item.NAME} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
