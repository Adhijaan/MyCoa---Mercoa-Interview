import { Container, Typography } from "@mui/material";
export default function Account() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Account
      </Typography>
      <Typography variant="body1" align="center">
        KYB info here
      </Typography>
    </Container>
  );
}
