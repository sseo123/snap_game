import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";

function GameOverPage({ portfolio }) {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ py: 2 }}>
          Game Over!
        </Typography>
        <Typography align="center" variant="h5">
          Final Cash: ${portfolio.cash.toFixed(2)}
        </Typography>
        {/* net worth calc comes next, see note below */}
      </Container>
    </>
  );
}

export default GameOverPage;
