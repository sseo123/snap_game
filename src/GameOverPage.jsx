import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";

function GameOverPage({ total, restart, leaderboard }) {
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

        <Box sx={{ maxWidth: 400, mx: "auto" }}>
          {leaderboard.map((entry, i) => (
            <Typography key={i} align="center">
              {i + 1}. {entry.name} — $
              {entry.score.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          ))}
        </Box>

        <Box align="center">
          <Button onClick={restart}>Restart Game</Button>
        </Box>
      </Container>
    </>
  );
}

export default GameOverPage;
