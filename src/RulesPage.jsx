// import { Container, Typography, Box, Button, Grid } from "@mui/material";
// import { CardContent, Card, ToggleButton } from "@mui/material";
// import { ToggleButtonGroup, TextField } from "@mui/material";
// import { useState } from "react";

// function RulesPage({ onStart }) {
//   return (
//     <>
//       <Container maxWidth="lg">
//         <Typography variant="h2" align="center" sx={{ py: 2 }}>
//           Here's the Game:
//         </Typography>
//         <Typography align="center" variant="body1" component="div">
//           <ul>
//             <li>
//               Within the 5 year time period you've selected, you will try to
//               invest in the best stock to make the highest profit!
//             </li>
//             <li>
//               Each day represents 1 year, you get 5 days, and at the end of each
//               day, all your investments (whether gain or loss) are returned to
//               your bank account
//             </li>
//             <li>
//               You have the option to either buy a stock (hoping it will go up),
//               short a stock (hopinh it will go down) or don't do anything to the
//               stock
//             </li>
//             <li>
//               Your trades will be submitted once you click the "submit trades"
//               button
//             </li>
//             <li>
//               You can't invest more money than you have in your bank account,
//               and you start with $100,000
//             </li>
//             <li>Try to make as much money as possible</li>
//             <li>Good luck!</li>
//           </ul>
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Button variant="contained" size="large" onClick={onStart}>
//             Get Started
//           </Button>
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default RulesPage;

import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { ChevronRight } from "lucide-react";

const GOLD = "#C9A84C";

const rules = [
  "You will invest across a 5-year market window, one year at a time — five rounds total.",
  "Each round, you allocate capital across six funds with varying risk profiles.",
  "Choose to go Long (buy, hoping the price rises) or Short (sell, hoping it falls).",
  "At the end of each round, all positions are closed and your P&L is settled to cash.",
  "You cannot invest more than your available cash — manage your bankroll wisely.",
  "You start with $100,000. Your goal: grow it as high as possible.",
  "Submit your trades with the button below the cards. Good luck.",
];

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

function RulesPage({ onStart }) {
  return (
    <Box
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 6 }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: GOLD, display: "block", mb: 1.5 }}
          >
            How to Play
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, mb: 1.5 }}
          >
            The Rules of the Game
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Good luck Snap Academies.
          </Typography>
        </Box>

        <GoldRule />

        <Stack spacing={1.5} sx={{ mb: 5 }}>
          {rules.map((rule, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 1.5,
                bgcolor: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "background 0.15s",
                "&:hover": { bgcolor: "rgba(201,168,76,0.05)" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: GOLD,
                  minWidth: 22,
                  mt: 0.15,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.65 }}
              >
                {rule}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={onStart}
            endIcon={<ChevronRight size={16} />}
            sx={{ py: 1.4, px: 5 }}
          >
            {"I'm Ready And Going To Win"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default RulesPage;
