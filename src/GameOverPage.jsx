import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";

function GameOverPage({ total, restart }) {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ py: 2 }}>
          Game Over!
        </Typography>
        <Typography align="center" variant="h5">
          Final Amount: $
          {total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          !!
        </Typography>

        <Box align="center">
          <Button onClick={restart}>Restart Game</Button>
        </Box>
      </Container>
    </>
  );
}

export default GameOverPage;
