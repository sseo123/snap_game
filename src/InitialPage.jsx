// import { useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   ToggleButtonGroup,
//   ToggleButton,
//   Grid,
//   styled,
//   Paper,
//   TextField,
// } from "@mui/material";

// const time_periods = [
//   { label: "2013 - 2018", startDate: "2013-01-01", endDate: "2018-01-01" },
//   { label: "2015 - 2020", startDate: "2015-01-01", endDate: "2020-01-01" },
//   { label: "2018 - 2023", startDate: "2018-01-01", endDate: "2023-01-01" },
// ];

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: (theme.vars ?? theme).palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

// function InitialPage({ onStart, leaderboard }) {
//   const [selectedPeriod, setSelectedPeriod] = useState(null);
//   const [name, setName] = useState("");

//   const handlePeriodChange = (e, value) => {
//     if (value) {
//       setSelectedPeriod(value);
//     }
//   };

//   return (
//     <>
//       <Container maxWidth="lg">
//         <Typography
//           variant="h2"
//           align="center"
//           color="text.primary"
//           sx={{ py: 2 }}
//         >
//           Stock Market Simulator
//         </Typography>
//         <Typography
//           variant="h5"
//           align="center"
//           color="text.secondary"
//           sx={{ mx: 10 }}
//         >
//           Test out your
//           <Box component="span" sx={{ color: "success.main" }}>
//             {" "}
//             investing
//           </Box>{" "}
//           skills
//         </Typography>

//         <Box>
//           <TextField
//             id="standard-basic"
//             label="Name (first and last)"
//             variant="standard"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </Box>
//         <Typography align="center" variant="h6" sx={{ mt: 4, mb: 1 }}>
//           Pick a time period to jump into
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//           <ToggleButtonGroup
//             color="primary"
//             value={selectedPeriod}
//             exclusive
//             onChange={handlePeriodChange}
//             aria-label="time period"
//           >
//             {time_periods.map((period) => (
//               <ToggleButton key={period.label} value={period}>
//                 {period.label}
//               </ToggleButton>
//             ))}
//           </ToggleButtonGroup>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="contained"
//             size="large"
//             disabled={!selectedPeriod || !name}
//             onClick={() => onStart(selectedPeriod, name)}
//           >
//             Get Started
//           </Button>
//         </Box>

//         <Box sx={{ maxWidth: 400, mx: "auto" }}>
//           {leaderboard.map((entry, i) => (
//             <Typography key={i} align="center">
//               {i + 1}. {entry.name} — $
//               {entry.score.toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </Typography>
//           ))}
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default InitialPage;

import { useState } from "react";
import { Container, Typography, Box, Button, ToggleButtonGroup, ToggleButton, TextField, Stack, } from "@mui/material";
import { ChevronRight, BarChart2, Trophy } from "lucide-react";

const GOLD = "#C9A84C";
const GREEN = "#22C55E";
const RED = "#EF4444";

const time_periods = [
  { label: "2013 – 2018", startDate: "2013-01-01", endDate: "2018-01-01" },
  { label: "2015 – 2020", startDate: "2015-01-01", endDate: "2020-01-01" },
  { label: "2018 – 2023", startDate: "2018-01-01", endDate: "2023-01-01" },
];

function formatMoney(n) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function GoldRule() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 3 }}>
      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(201,168,76,0.18)" }} />
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: GOLD,
          opacity: 0.5,
        }}
      />
      <Box sx={{ width: 24, height: "1px", bgcolor: GOLD, opacity: 0.35 }} />
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: GOLD,
          opacity: 0.5,
        }}
      />
      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(201,168,76,0.18)" }} />
    </Box>
  );
}

function LeaderboardSection({ leaderboard }) {
  if (leaderboard.length === 0) return null;
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="overline"
        sx={{ color: GOLD, display: "block", textAlign: "center", mb: 2 }}
      >
        Rankings
      </Typography>
      <Stack spacing={0.5} sx={{ maxWidth: 420, mx: "auto" }}>
        {leaderboard.map((entry, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.25,
              borderRadius: 1,
              bgcolor:
                i === 0 ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.025)",
              border:
                i === 0
                  ? "1px solid rgba(201,168,76,0.2)"
                  : "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 700,
                fontSize: "0.75rem",
                color: i === 0 ? GOLD : "#8B8FA8",
                minWidth: 24,
              }}
            >
              #{i + 1}
            </Typography>
            {i === 0 && <Trophy size={13} color={GOLD} />}
            <Typography sx={{ flex: 1, fontWeight: 500, fontSize: "0.85rem" }}>
              {entry.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "0.8rem",
                color: entry.score >= 100000 ? GREEN : RED,
                fontWeight: 500,
              }}
            >
              ${formatMoney(entry.score)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function InitialPage({ onStart, leaderboard }) {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [name, setName] = useState("");

  return (
    <Box
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 6 }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `1.5px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: GOLD,
              }}
            >
              <BarChart2 size={18} />
            </Box>
            <Typography
              variant="overline"
              sx={{ color: GOLD, fontSize: "0.65rem", letterSpacing: "0.22em" }}
            >
              Market Simulator
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.2rem", md: "3rem" },
              mb: 1.5,
              lineHeight: 1.15,
            }}
          >
            <Box component="span" sx={{ color: "#d4af37" }}>
              Snap
            </Box>{" "}
            Stocks Game
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 380,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Who's the best investor in the Snap Academies . . .
          </Typography>
        </Box>

        <GoldRule />

        <Stack spacing={3}>
          <TextField
            label="Your Name + Academy (Shawn Seo - SEA)"
            placeholder="First and last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <Box>
            <Typography
              variant="overline"
              sx={{ color: "#8B8FA8", display: "block", mb: 1.5 }}
            >
              Select A Time Period To Invest In
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={selectedPeriod}
              exclusive
              onChange={(_, val) => val && setSelectedPeriod(val)}
              aria-label="time period"
              sx={{ width: "100%" }}
            >
              {time_periods.map((period) => (
                <ToggleButton
                  key={period.label}
                  value={period}
                  sx={{ flex: 1, py: 1.25 }}
                >
                  {period.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <Button
            variant="contained"
            size="large"
            disabled={!selectedPeriod || !name.trim()}
            onClick={() => onStart(selectedPeriod, name.trim())}
            endIcon={<ChevronRight size={16} />}
            sx={{ py: 1.4 }}
          >
            Enter the Market
          </Button>
        </Stack>

        <LeaderboardSection leaderboard={leaderboard} />
      </Container>
    </Box>
  );
}

export default InitialPage;
