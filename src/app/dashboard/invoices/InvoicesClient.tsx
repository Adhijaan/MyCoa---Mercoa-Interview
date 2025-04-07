// "use client";

// import dynamic from "next/dynamic";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";

// // Dynamically import the MercoaWrapper with SSR disabled.
// const MercoaWrapper = dynamic(() => import("@/components/MercoaWrapper"), { ssr: false });

// export default function InvoicesClient() {
//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h3" align="center" gutterBottom>
//         Invoices
//       </Typography>
//       <Typography variant="body1" align="center">
//         We've partnered with Mercoa to provide you with a seamless invoicing experience.
//       </Typography>
//       <MercoaWrapper mercoaJWT=""/>
//     </Container>
//   );
// }
