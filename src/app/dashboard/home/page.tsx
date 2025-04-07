"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography } from "@mui/material";

interface Business {
  id: string;
  entity_name: string;
  email: string;
  mercoa_entity_id: string;
  mercoa_user_id: string;
  is_on_boarded: boolean;
}

export default function Home() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/EntityInfo`, { method: "GET" });
        const data = await res.json();
        if (data.business) {
          setBusiness(data.business);
        }
        console.log("Business data:", data.business);
      } catch (err) {
        console.error("Error fetching business data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  // Redirect to onboarding if the business is not onboarded
  useEffect(() => {
    if (business && !business.is_on_boarded) {
      router.push("/onboarding");
    }
  }, [business, router]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography align="center">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to MyCoa, {business?.entity_name}
      </Typography>
      <Typography variant="body1" align="center">
        We're excited to have you on board! Use the navigation above to manage your invoices, update your account
        details, and more.
      </Typography>
    </Container>
  );
}
