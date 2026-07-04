import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";

function GameOverPage({ finalNetWorth }) {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ py: 2 }}>
          Game Over!
        </Typography>
        <Typography align="center" variant="h5">
          Final Net Worth: $
          {finalNetWorth.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          !!
        </Typography>
        {/* net worth calc comes next, see note below */}
      </Container>
    </>
  );
}

export default GameOverPage;
