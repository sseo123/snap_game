import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const time_periods = [
  { label: "2013 - 2018", startDate: "2013-01-01", endDate: "2018-01-01" },
  { label: "2015 - 2020", startDate: "2015-01-01", endDate: "2020-01-01" },
  { label: "2018 - 2023", startDate: "2018-01-01", endDate: "2023-01-01" },
];

function InitialPage({ onStart }) {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

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
            disabled={!selectedPeriod}
            onClick={() => onStart(selectedPeriod)}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default InitialPage;
