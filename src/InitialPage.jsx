import { Container, Typography, Box, Button } from "@mui/material";

function InitialPage({ onStart }) {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          Stock Market Simulator
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
        >
          Test out your
          <Box component="span" sx={{ color: "success.main" }}>
            {" "}
            investing
          </Box>{" "}
          skills
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large" onClick={onStart}>
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default InitialPage;
