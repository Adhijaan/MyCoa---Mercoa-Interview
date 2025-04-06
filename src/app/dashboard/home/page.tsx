// src/app/dashboard/home/page.tsx
import React from "react";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to MyCoa
      </Typography>
      <Typography variant="body1" align="center">
        We're excited to have you on board! Use the navigation above to manage your invoices, update your account
        details, and more.
      </Typography>
    </Container>
  );
}
