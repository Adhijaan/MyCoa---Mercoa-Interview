"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography } from "@mui/material";
import MercoaWrapper from "@/components/MercoaWrapper";
import { set } from "@mercoa/javascript/core/schemas";
export default function Home() {
  const [mercoaJWT, setMercoaJWT] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/mercoaJWT`, { method: "GET" });
        const data = await res.json();
        if (!data.jwt) {
          setError("Failed to fetch Mercoa JWT");
          return;
        }

        setMercoaJWT(data.jwt);
      } catch (err) {
        console.error("Error fetching business data", err);
        setError("Failed to connet to Mercoa");
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography align="center">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography align="center" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Invoices
      </Typography>
      <Typography variant="body1" align="center">
        We've partnered with Mercoa to provide you with a seamless invoicing experience.
      </Typography>
      <Container sx={{ py: 4 }}>
        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : error ? (
          <Typography align="center" color="error">
            {error}
          </Typography>
        ) : (
          <MercoaWrapper mercoaJWT={mercoaJWT} />
        )}
      </Container>
    </Container>
  );
}

// // No need for "use client" here because this is a Server Component that only renders a Client Component.
// import InvoicesClient from "./InvoicesClient";

// export default function InvoicesPage() {
//   return <InvoicesClient />;
// }

// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import dynamic from "next/dynamic";

// // Dynamically load the client-only Mercoa wrapper
// const MercoaWrapper = dynamic(() => import("@/components/MercoaWrapper"), {
//   ssr: false,
// });

// export default function InvoicesPage() {
//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h3" align="center" gutterBottom>
//         Invoices
//       </Typography>
//       <Typography variant="body1" align="center" gutterBottom>
//         We’ve partnered with Mercoa to provide you with a seamless invoicing experience.
//       </Typography>

//       {/* Render Mercoa session here since findDOMNode issues*/}
//       <MercoaWrapper />
//     </Container>
//   );
// }
