import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

export default function NotFoundPage() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        404 Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}
