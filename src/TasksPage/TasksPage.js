import React from "react";
import { Container, Grid, Button } from "@mui/material";

import AddNewTaskModal from "./TaskModal";
import Task from "./Task";

import endpoints from "../endpoints";

export default function TasksPage() {
  const [tasks, setTasks] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch(endpoints.getTasks);
      const tasks = await response.json();

      setTasks(tasks);
    } catch (error) {
      console.error("failed to fetch tasks:", error);
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const handleRemoveTask = (taskId) => {
    const updatedRouters = tasks.filter((router) => router._id !== taskId);
    setTasks(updatedRouters);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            New Task
          </Button>
        </Grid>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={task._id}>
            <Task task={task} onRemove={handleRemoveTask} />
          </Grid>
        ))}
      </Grid>
      <AddNewTaskModal open={openModal} onClose={handleCloseModal} />
    </Container>
  );
}
