import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  styled,
  Paper,
  TextField,
} from "@mui/material";

const time_periods = [
  { label: "2013 - 2018", startDate: "2013-01-01", endDate: "2018-01-01" },
  { label: "2015 - 2020", startDate: "2015-01-01", endDate: "2020-01-01" },
  { label: "2018 - 2023", startDate: "2018-01-01", endDate: "2023-01-01" },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function InitialPage({ onStart, leaderboard }) {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [name, setName] = useState("");

  const handlePeriodChange = (e, value) => {
    if (value) {
      setSelectedPeriod(value);
    }
  };

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

        <Box>
          <TextField
            id="standard-basic"
            label="Name (first and last)"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Typography align="center" variant="h6" sx={{ mt: 4, mb: 1 }}>
          Pick a time period to jump into
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            color="primary"
            value={selectedPeriod}
            exclusive
            onChange={handlePeriodChange}
            aria-label="time period"
          >
            {time_periods.map((period) => (
              <ToggleButton key={period.label} value={period}>
                {period.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            disabled={!selectedPeriod || !name}
            onClick={() => onStart(selectedPeriod, name)}
          >
            Get Started
          </Button>
        </Box>

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
      </Container>
    </>
  );
}

export default InitialPage;
