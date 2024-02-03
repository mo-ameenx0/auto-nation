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
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import RouterIcon from "@mui/icons-material/Router";
import TaskIcon from "@mui/icons-material/Task";
import HubIcon from "@mui/icons-material/Hub";
import BackupIcon from "@mui/icons-material/Backup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Sidebar from "./Sidebar";
import HomePage from "./HomePage";
import RoutersPage from "./RoutersPage/RoutersPage";
import TasksPage from "./TasksPage/TasksPage";
import TopologyPage from "./TopologyPage/TopologyPage";
import BackupPage from "./BackupPage/BackupPage";
import AddNewTaskModal from "./TasksPage/TaskModal";
import NotFoundPage from "./RoutingPages.js/NotFoundPage";
import "./App.css";

const HOME = "Home";
const ROUTERS = "Routers";
const TASKS = "Tasks";
const TOPOLOGY = "TOPOLOGY";
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
  const location = useLocation(ROUTERS);
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{
              borderRadius: 5, // Rounded corners
              padding: "6px 16px", // Adjust padding as needed
              textTransform: "uppercase", // Uppercase button text
              boxShadow: "none", // Remove box shadow
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AddCircleOutlineIcon sx={{ fontSize: "1rem" }} />{" "}
              <Typography variant="button" component="span">
                New Task
              </Typography>
            </Box>
          </Button>
          <AddNewTaskModal open={openModal} onClose={handleCloseModal} />
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
          <Route key={item.NAME} path={item.PATH} element={item.ELEMENT} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default App;
