import * as React from "react";
import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import RouterIcon from "@mui/icons-material/Router";
import TaskIcon from "@mui/icons-material/Task";
import HubIcon from "@mui/icons-material/Hub";
import BackupIcon from "@mui/icons-material/Backup";

import Sidebar from "./Sidebar";
import HomePage from "./HomePage/HomePage";
import RoutersPage from "./RoutersPage/RoutersPage";
import TasksPage from "./TasksPage/TasksPage";
import TopologyPage from "./TopologyPage/TopologyPage";
import BackupPage from "./BackupPage/BackupPage";
import NotFoundPage from "./OtherPages/NotFoundPage";
import "./App.css";

const HOME = "Home";
const ROUTERS = "Routers";
const TASKS = "Tasks";
const TOPOLOGY = "Topology";
const BACKUP = "Backup";

const ROUTES = [
  {
    NAME: HOME,
    PATH: "/",
    ICON: <HomeIcon />,
    ELEMENT: <HomePage />,
  },
  {
    NAME: ROUTERS,
    PATH: ROUTERS,
    ICON: <RouterIcon />,
    ELEMENT: <RoutersPage />,
  },
  {
    NAME: TASKS,
    PATH: TASKS,
    ICON: <TaskIcon />,
    ELEMENT: <TasksPage />,
  },
  {
    NAME: TOPOLOGY,
    PATH: TOPOLOGY,
    ICON: <HubIcon />,
    ELEMENT: <TopologyPage />,
  },
  {
    NAME: BACKUP,
    PATH: BACKUP,
    ICON: <BackupIcon />,
    ELEMENT: <BackupPage />,
  },
];

function App() {
  const [sideBarState, setSideBarState] = React.useState(false);

  const toggleSidebar = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSideBarState(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar
        routes={ROUTES}
        state={sideBarState}
        toggleSidebar={toggleSidebar}
      />
      <Routes>
        {ROUTES.map((item, index) => (
          <Route key={item.NAME} path={item.PATH} element={item.ELEMENT} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default App;
