// src/app//onboarding/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

export default function OnboardingPage() {
  const router = useRouter();

  // Form state for KYB/business details
  const [businessName, setBusinessName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send these details to your API to create/update your business record
    console.log("Onboarding data:", { businessName, legalName, email, phone, address });

    // Set onbaording status to true
    try {
      const res1 = await fetch("/api/createMercoaC2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ legalName, email }),
      });
      const data1 = await res1.json();
      if (!res1.ok) {
        setError(data1.error || "Failed to onboard business");
        return;
      }

      // Success!
      router.push("/dashboard/home");
    } catch (err) {
      console.error("Network or unexpected error:", err);
      setError("Something went wrong. Please try again.");
    }

    // Simulate success by redirecting to the home page once onboarding is complete
    router.push("/dashboard/home");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Onboarding
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please fill out your business details to complete onboarding.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Legal Name"
          value={legalName}
          onChange={(e) => setLegalName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Complete Onboarding
        </Button>
      </Box>
    </Container>
  );
}
