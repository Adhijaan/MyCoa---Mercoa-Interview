// src/app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyCoa Dashboard
          </Typography>
          <Button color="inherit" component={Link} href="/dashboard/home">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/dashboard/invoices">
            Invoices
          </Button>
          <Button color="inherit" component={Link} href="/dashboard/account">
            Account
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
