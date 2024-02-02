import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import RouterIcon from "@mui/icons-material/Router";
import TaskIcon from "@mui/icons-material/Task";
import HubIcon from "@mui/icons-material/Hub";
import BackupIcon from "@mui/icons-material/Backup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Sidebar from "./Sidebar";
import RoutersPage from "./RoutersPage/RoutersPage";
import TasksPage from "./TasksPage/TasksPage";
import TopologyPage from "./TopologyPage/TopologyPage";
import BackupPage from "./BackupPage/BackupPage";
import AddNewTaskModal from "./TasksPage/AddNewTaskModal";
import "./App.css";

const ROUTERS = "Routers";
const TASKS = "Tasks";
const TOPOLOGY = "TOPOLOGY";
const BACKUP = "Backup";

const ROUTES = [
  {
    NAME: ROUTERS,
    ICON: <RouterIcon />,
    ELEMENT: <RoutersPage />,
  },
  {
    NAME: TASKS,
    ICON: <TaskIcon />,
    ELEMENT: <TasksPage />,
  },
  {
    NAME: TOPOLOGY,
    ICON: <HubIcon />,
    ELEMENT: <TopologyPage />,
  },
  {
    NAME: BACKUP,
    ICON: <BackupIcon />,
    ELEMENT: <BackupPage />,
  },
];

function App() {
  const location = useLocation();
  const [sideBarState, setSideBarState] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const toggleSidebar = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSideBarState(open);
  };

  const appBarContent = () => {
    var current_path = location.pathname.substring(1);
    if (current_path === TASKS) {
      return (
        <div>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AddCircleOutlineIcon />
              <Typography>New Task</Typography>
            </Box>
          </Button>
          <AddNewTaskModal state={openModal} setState={handleCloseModal} />
        </div>
      );
    }
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
          {appBarContent()}
        </Toolbar>
      </AppBar>
      <Sidebar
        routes={ROUTES}
        state={sideBarState}
        toggleSidebar={toggleSidebar}
      />
      <Routes>
        {ROUTES.map((item, index) => (
          <Route key={item.NAME} path={item.NAME} element={item.ELEMENT} />
        ))}
      </Routes>
    </Box>
  );
}

export default App;
