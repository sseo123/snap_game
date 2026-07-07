// import { useState, useEffect } from "react";
// import { Container, Typography, Box, Button, Grid } from "@mui/material";
// import { CardContent, Card, ToggleButton } from "@mui/material";
// import { ToggleButtonGroup, TextField } from "@mui/material";
// import * as React from "react";
// import StockCard from "./StockCard";
// import InitialPage from "./InitialPage";
// import GameOverPage from "./GameOverPage";
// import RulesPage from "./RulesPage";

// const funds = [
//   { code: "125497", name: "stock 1", risk: "HIGH" },
//   { code: "100080", name: "stock 2", risk: "HIGH" },
//   { code: "100177", name: "stock 3", risk: "HIGH" },
//   { code: "120827", name: "stock 4", risk: "MEDIUM" },
//   { code: "119731", name: "stock 5", risk: "MEDIUM" },
//   { code: "118968", name: "stock 6", risk: "LOW" },
// ];

// const NUM_ROUNDS = 5;

// const fetchHistoryForPeriod = (startDate, endDate) => {
//   return Promise.all(
//     funds.map((fund) =>
//       fetch(
//         `https://api.mfapi.in/mf/${fund.code}?startDate=${startDate}&endDate=${endDate}`,
//       )
//         .then((res) => {
//           if (!res.ok) throw new Error(`Error fetching ${fund.code}`);
//           return res.json();
//         })
//         .then((data) => ({ ...fund, history: data.data })),
//     ),
//   );
// };

// function parseMfapiDate(dateStr) {
//   const [day, month, year] = dateStr.split("-").map(Number);
//   return new Date(year, month - 1, day);
// }

// function findClosestEntry(history, targetDateStr) {
//   const target = new Date(targetDateStr);
//   let closest = null;
//   let closestDiff = Infinity;

//   for (const entry of history) {
//     const diff = Math.abs(parseMfapiDate(entry.date) - target);
//     if (diff < closestDiff) {
//       closestDiff = diff;
//       closest = entry;
//     }
//   }
//   return closest;
// }

// function buildRounds(period) {
//   const startYear = parseInt(period.startDate.split("-")[0], 10);
//   let rounds = [];

//   for (let i = 0; i < NUM_ROUNDS; i++) {
//     rounds.push({
//       targetStartDate: `${startYear + i}-06-01`,
//       targetEndDate: `${startYear + i + 1}-08-01`,
//     });
//   }

//   return rounds;
// }

// function insertScore(leaderboard, name, score) {
//   const newEntry = { name, score };
//   const res = [];
//   let inserted = false;

//   for (let i = 0; i < leaderboard.length; i++) {
//     if (!inserted && score >= leaderboard[i].score) {
//       res.push(newEntry);
//       inserted = true;
//     }
//     res.push(leaderboard[i]);
//   }
//   if (!inserted) {
//     res.push(newEntry);
//   }
//   return res;
// }

// function App() {
//   const [started, setStarted] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [rules, setRules] = useState(false);

//   const [selectedPeriod, setSelectedPeriod] = useState(null);
//   const [fundHistories, setFundHistories] = useState(null);
//   const [rounds, setRounds] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [currentRoundDates, setCurrentRoundDates] = useState(null); // actual matched dates for display
//   const [amount, setAmount] = useState({});
//   const [buyOrSellMap, setBuyOrSellMap] = useState({});
//   const [portfolio, setPortfolio] = useState({ cash: 100000 });

//   const [dateIndex, setDateIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [revealed, setRevealed] = useState(false);
//   const [lastPayouts, setLastPayouts] = useState({}); // code -> payout, for showing results after reveal

//   const [leaderboard, setLeaderboard] = useState([]);
//   const [playerName, setPlayerName] = useState("");

//   const handleRestart = () => {
//     setStarted(false);
//     setGameOver(false);
//     setRules(false);

//     setSelectedPeriod(null);
//     setFundHistories(null);
//     setRounds([]);
//     setStocks([]);
//     setCurrentRoundDates(null);
//     setAmount({});
//     setBuyOrSellMap({});
//     setPortfolio({ cash: 100000 });

//     setDateIndex(0);
//     setLoading(false);
//     setRevealed(false);
//     setLastPayouts({});
//   };

//   const handleAmountChange = (code, value) => {
//     setAmount((prev) => ({ ...prev, [code]: value }));
//   };

//   const handleBuyOrSellChange = (code, value) => {
//     setBuyOrSellMap((pnrev) => ({ ...prev, [code]: value }));
//   };

//   const handleRules = (period, name) => {
//     setSelectedPeriod(period);
//     setRules(true);
//     setPlayerName(name);
//   };

//   const handleStart = (period) => {
//     setStarted(true);
//   };

//   const handleReveal = () => {
//     let remainingCash = portfolio.cash;
//     const payouts = {};
//     let breakoutEarly = false;
//     let totalInvestedAmount = 0;

//     stocks.forEach((stock) => {
//       const investAmount = parseFloat(amount[stock.code]);

//       if (investAmount) {
//         totalInvestedAmount += investAmount;
//       }

//       if (totalInvestedAmount > portfolio.cash) {
//         console.log("Not enough cash");
//         breakoutEarly = true;
//         return;
//       }
//     });

//     if (breakoutEarly) {
//       return;
//     }

//     stocks.forEach((stock) => {
//       const investAmount = parseFloat(amount[stock.code]);
//       const action = buyOrSellMap[stock.code] || "Buy";
//       const initialPrice = parseFloat(stock.initial);
//       const eventualPrice = parseFloat(stock.eventual);

//       if (!investAmount || investAmount <= 0) {
//         return;
//       }

//       const priceRatio = eventualPrice / initialPrice;

//       const payout =
//         action === "Buy"
//           ? investAmount * priceRatio
//           : Math.max(0, investAmount * (2 - priceRatio));

//       remainingCash = remainingCash - investAmount + payout;
//       payouts[stock.code] = payout;
//     });

//     setRevealed(true);
//     setPortfolio({ cash: remainingCash });
//     setLastPayouts(payouts);
//   };

//   const handleNext = () => {
//     if (dateIndex < rounds.length - 1) {
//       setDateIndex(dateIndex + 1);
//     } else {
//       setLeaderboard((prev) => insertScore(prev, playerName, portfolio.cash));
//       setGameOver(true);
//     }

//     setRevealed(false);
//     setLastPayouts({});
//     setAmount({});
//   };

//   useEffect(() => {
//     if (!selectedPeriod) return;

//     setLoading(true);
//     fetchHistoryForPeriod(selectedPeriod.startDate, selectedPeriod.endDate)
//       .then((histories) => {
//         console.log(histories);
//         setFundHistories(histories);
//         setRounds(buildRounds(selectedPeriod));
//       })
//       .catch((error) => console.error(error));
//   }, [selectedPeriod]);

//   useEffect(() => {
//     if (!fundHistories || rounds.length === 0) return;

//     const round = rounds[dateIndex];
//     let matchedStartDate = null;
//     let matchedEndDate = null;

//     const roundStocks = fundHistories.map((fund) => {
//       const startEntry = findClosestEntry(fund.history, round.targetStartDate);
//       const endEntry = findClosestEntry(fund.history, round.targetEndDate);

//       if (startEntry) {
//         matchedStartDate = startEntry.date;
//       }
//       if (endEntry) {
//         matchedEndDate = endEntry.date;
//       }

//       return {
//         code: fund.code,
//         name: fund.name,
//         risk: fund.risk,
//         initial: startEntry?.nav,
//         eventual: endEntry?.nav,
//       };
//     });

//     setStocks(roundStocks);
//     setCurrentRoundDates({ start: matchedStartDate, end: matchedEndDate });
//     setLoading(false);
//   }, [fundHistories, rounds, dateIndex]);

//   if (gameOver) {
//     const total = portfolio.cash;
//     return (
//       <GameOverPage
//         total={total}
//         restart={handleRestart}
//         leaderboard={leaderboard}
//       />
//     );
//   } else if (started) {
//     return (
//       <>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h2"
//             align="center"
//             color="text.primary"
//             sx={{ py: 2 }}
//           >
//             Welcome to the Game
//           </Typography>
//           <Typography
//             variant="h5"
//             align="center"
//             color="text.secondary"
//             sx={{ mx: 10 }}
//           >
//             Let's play
//             <Box component="span" sx={{ color: "success.main" }}>
//               {" "}
//               investing
//             </Box>{" "}
//             Game
//           </Typography>

//           {currentRoundDates && (
//             <Typography
//               align="center"
//               variant="subtitle1"
//               color="text.secondary"
//             >
//               Round {dateIndex + 1} of {rounds.length}:{" "}
//               {currentRoundDates.start} &rarr; {currentRoundDates.end}
//             </Typography>
//           )}

//           <Typography align="center" variant="h5">
//             Spendable Money: $
//             {portfolio.cash.toLocaleString("en-US", {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}
//           </Typography>

//           <Grid container spacing={2}>
//             {(loading ? funds : stocks).map((stock) => (
//               <StockCard
//                 key={stock.code}
//                 stock={stock}
//                 amount={amount[stock.code] || ""}
//                 buyOrSell={buyOrSellMap[stock.code] || "Buy"}
//                 onAmountChange={handleAmountChange}
//                 onBuyOrSellChange={handleBuyOrSellChange}
//                 uLoading={loading}
//                 revealed={revealed}
//                 payout={lastPayouts[stock.code]}
//               />
//             ))}
//           </Grid>

//           <Box align="center">
//             {!revealed ? (
//               <Button sx={{ m: 1 }} onClick={handleReveal} disabled={loading}>
//                 Submit Stock Selection
//               </Button>
//             ) : (
//               <Button sx={{ m: 1 }} onClick={handleNext}>
//                 Next Day
//               </Button>
//             )}
//           </Box>
//         </Container>
//       </>
//     );
//   } else if (rules) {
//     return <RulesPage onStart={handleStart} />;
//   } else {
//     return <InitialPage onStart={handleRules} leaderboard={leaderboard} />;
//   }
// }

// export default App;

import { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Box, Button, Stack, Chip, } from "@mui/material";
import { TrendingUp, TrendingDown, Trophy, RotateCcw, ChevronRight, BarChart2, } from "lucide-react";
import StockCard from "./StockCard.jsx";
import InitialPage from "./InitialPage.jsx";
import RulesPage from "./RulesPage.jsx";
import GameOverPage from "./GameOverPage.jsx";

// ─── Palette ─────────────────────────────────────────────────────────────────

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C86A";
const GOLD_DARK = "#8B6914";
const NAVY = "#080C16";
const NAVY_PAPER = "#0F1624";
const GREEN = "#22C55E";
const RED = "#EF4444";

// ─── MUI Theme ───────────────────────────────────────────────────────────────

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: GOLD,
      light: GOLD_LIGHT,
      dark: GOLD_DARK,
      contrastText: "#0A0A0A",
    },
    secondary: { main: "#4A90D9", contrastText: "#fff" },
    success: { main: GREEN, contrastText: "#fff" },
    error: { main: RED, contrastText: "#fff" },
    background: { default: NAVY, paper: NAVY_PAPER },
    text: { primary: "#E8E2D4", secondary: "#8B8FA8", disabled: "#374151" },
    divider: "rgba(201, 168, 76, 0.12)",
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 500 },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 500 },
    h5: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 500 },
    h6: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 500 },
    overline: {
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: "0.18em",
      fontSize: "0.62rem",
      fontWeight: 500,
    },
    caption: {
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: "0.05em",
    },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `radial-gradient(ellipse at 25% 15%, rgba(201,168,76,0.05) 0%, transparent 55%),
                       radial-gradient(ellipse at 75% 85%, rgba(74,144,217,0.04) 0%, transparent 50%),
                       ${NAVY}`,
          minHeight: "100vh",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#151D30",
          border: "1px solid rgba(201,168,76,0.12)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            borderColor: "rgba(201,168,76,0.28)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: "0.05em",
          borderRadius: 4,
          padding: "10px 28px",
          transition: "all 0.2s ease",
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
          color: "#0A0A0A",
          boxShadow: "0 2px 16px rgba(201,168,76,0.25)",
          "&:hover": {
            background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
            boxShadow: "0 4px 24px rgba(201,168,76,0.4)",
            transform: "translateY(-1px)",
          },
          "&.Mui-disabled": {
            background: "rgba(201,168,76,0.15)",
            color: "rgba(201,168,76,0.35)",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(201,168,76,0.4)",
          color: GOLD,
          "&:hover": { borderColor: GOLD, background: "rgba(201,168,76,0.08)" },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          letterSpacing: "0.03em",
          borderColor: "rgba(201,168,76,0.18)",
          color: "#8B8FA8",
          fontSize: "0.8rem",
          padding: "8px 20px",
          transition: "all 0.15s ease",
          "&.Mui-selected": {
            backgroundColor: "rgba(201,168,76,0.12)",
            color: GOLD,
            borderColor: "rgba(201,168,76,0.45)",
            "&:hover": { backgroundColor: "rgba(201,168,76,0.18)" },
          },
          "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
          "&.Mui-disabled": {
            borderColor: "rgba(201,168,76,0.08)",
            color: "#374151",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(201,168,76,0.2)" },
            "&:hover fieldset": { borderColor: "rgba(201,168,76,0.4)" },
            "&.Mui-focused fieldset": { borderColor: GOLD },
          },
          "& .MuiInputLabel-root": { color: "#8B8FA8" },
          "& .MuiInputLabel-root.Mui-focused": { color: GOLD },
          "& .MuiOutlinedInput-input": {
            fontFamily: '"JetBrains Mono", monospace',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "rgba(201,168,76,0.12)" } },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 500,
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
          height: 22,
        },
      },
    },
  },
});

// ─── Game constants ───────────────────────────────────────────────────────────

const funds = [
  { code: "125497", name: "Industrial Startup Mutual Fund", risk: "HIGH" },
  { code: "100080", name: "Financial Bank Equities", risk: "HIGH" },
  { code: "100177", name: "Energy & Power Index Fund", risk: "HIGH" },
  { code: "120827", name: "Healthcare & Manufacturing Fund", risk: "HIGH" },
  { code: "119731", name: "E-Commerce Fund", risk: "HIGH" },
  { code: "118968", name: "Computational Fund", risk: "HIGH" },
];

const NUM_ROUNDS = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseMfapiDate(dateStr) {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function findClosestEntry(history, targetDateStr) {
  const target = new Date(targetDateStr);
  let closest = null;
  let closestDiff = Infinity;
  for (const entry of history) {
    const diff = Math.abs(
      parseMfapiDate(entry.date).getTime() - target.getTime(),
    );
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = entry;
    }
  }
  return closest;
}

function buildRounds(period) {
  const startYear = parseInt(period.startDate.split("-")[0], 10);
  return Array.from({ length: NUM_ROUNDS }, (_, i) => ({
    targetStartDate: `${startYear + i}-06-01`,
    targetEndDate: `${startYear + i + 1}-08-01`,
  }));
}

function insertScore(leaderboard, name, score) {
  const newEntry = { name, score };
  const res = [];
  let inserted = false;
  for (const entry of leaderboard) {
    if (!inserted && score >= entry.score) {
      res.push(newEntry);
      inserted = true;
    }
    res.push(entry);
  }
  if (!inserted) res.push(newEntry);
  return res;
}

function fetchHistoryForPeriod(startDate, endDate) {
  return Promise.all(
    funds.map((fund) =>
      fetch(
        `https://api.mfapi.in/mf/${fund.code}?startDate=${startDate}&endDate=${endDate}`,
      )
        .then((res) => {
          if (!res.ok) throw new Error(`Error fetching ${fund.code}`);
          return res.json();
        })
        .then((data) => ({ ...fund, history: data.data })),
    ),
  );
}

function formatMoney(n) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── GameScreen ───────────────────────────────────────────────────────────────

function GameScreen({ dateIndex, rounds, currentRoundDates, portfolio, loading, stocks, amount, buyOrSellMap, revealed, lastPayouts, onAmountChange, onBuyOrSellChange, onReveal, onNext, }) {
  const cashColor =
    portfolio.cash >= 100000 ? GREEN : portfolio.cash >= 80000 ? GOLD : RED;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Sticky header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
          bgcolor: "rgba(8,12,22,0.88)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          py: 1.5,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Left: round info */}
            <Box>
              <Typography
                variant="overline"
                sx={{ color: GOLD, fontSize: "0.58rem" }}
              >
                Round {dateIndex + 1} / {NUM_ROUNDS}
              </Typography>
              {currentRoundDates && (
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "0.72rem",
                    color: "#8B8FA8",
                    mt: 0.25,
                  }}
                >
                  {currentRoundDates.start} → {currentRoundDates.end}
                </Typography>
              )}
              <Box sx={{ display: "flex", gap: 0.5, mt: 0.75 }}>
                {Array.from({ length: NUM_ROUNDS }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: i < dateIndex ? 16 : i === dateIndex ? 20 : 8,
                      height: 3,
                      borderRadius: 2,
                      bgcolor: i <= dateIndex ? GOLD : "rgba(201,168,76,0.2)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Center: logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: GOLD,
              }}
            >
              <BarChart2 size={18} />
              <Typography
                variant="overline"
                sx={{
                  color: GOLD,
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                }}
              >
                Snap Stock Game
              </Typography>
            </Box>

            {/* Right: cash */}
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="overline"
                sx={{ color: "#8B8FA8", fontSize: "0.55rem" }}
              >
                Available Cash
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  fontWeight: 700,
                  color: cashColor,
                  lineHeight: 1.2,
                }}
              >
                ${formatMoney(portfolio.cash)}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{ color: GOLD, display: "block", mb: 0.5 }}
          >
            Allocate Your Portfolio
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {revealed
              ? "Results are in. Review your positions below."
              : "Select a position and amount for each fund you want to trade. Place your trade amounts, then click submit trade at the bottom to lock it in "}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: 2.5,
            mb: 4,
          }}
        >
          {(loading ? funds : stocks).map((stock) => (
            <StockCard
              key={stock.code}
              stock={stock}
              amount={amount[stock.code] || ""}
              buyOrSell={buyOrSellMap[stock.code] || "Buy"}
              onAmountChange={onAmountChange}
              onBuyOrSellChange={onBuyOrSellChange}
              uLoading={loading}
              revealed={revealed}
              payout={lastPayouts[stock.code]}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
          {!revealed ? (
            <Button
              variant="contained"
              size="large"
              onClick={onReveal}
              disabled={loading}
              sx={{ minWidth: 220, py: 1.5 }}
              endIcon={<ChevronRight size={16} />}
            >
              Submit Trades
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={onNext}
              sx={{ minWidth: 220, py: 1.5 }}
              endIcon={
                dateIndex < NUM_ROUNDS - 1 ? (
                  <ChevronRight size={16} />
                ) : (
                  <Trophy size={15} />
                )
              }
            >
              {dateIndex < NUM_ROUNDS - 1
                ? "Next Year →"
                : "View Final Results"}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [rules, setRules] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [fundHistories, setFundHistories] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [currentRoundDates, setCurrentRoundDates] = useState(null);
  const [amount, setAmount] = useState({});
  const [buyOrSellMap, setBuyOrSellMap] = useState({});
  const [portfolio, setPortfolio] = useState({ cash: 100000 });
  const [dateIndex, setDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [lastPayouts, setLastPayouts] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const handleRestart = () => {
    setStarted(false);
    setGameOver(false);
    setRules(false);
    setSelectedPeriod(null);
    setFundHistories(null);
    setRounds([]);
    setStocks([]);
    setCurrentRoundDates(null);
    setAmount({});
    setBuyOrSellMap({});
    setPortfolio({ cash: 100000 });
    setDateIndex(0);
    setLoading(false);
    setRevealed(false);
    setLastPayouts({});
  };

  const handleAmountChange = (code, value) =>
    setAmount((prev) => ({ ...prev, [code]: value }));
  const handleBuyOrSellChange = (code, value) =>
    setBuyOrSellMap((prev) => ({ ...prev, [code]: value }));
  const handleRules = (period, name) => {
    setSelectedPeriod(period);
    setRules(true);
    setPlayerName(name);
  };
  const handleStart = () => setStarted(true);

  const handleReveal = () => {
    let totalInvested = 0;
    for (const stock of stocks) {
      const amt = parseFloat(amount[stock.code]);
      if (amt) totalInvested += amt;
    }
    if (totalInvested > portfolio.cash) return;

    let remainingCash = portfolio.cash;
    const payouts = {};
    for (const stock of stocks) {
      const amt = parseFloat(amount[stock.code]);
      if (!amt || amt <= 0) continue;
      const action = buyOrSellMap[stock.code] || "Buy";
      const priceRatio = parseFloat(stock.eventual) / parseFloat(stock.initial);
      const payout =
        action === "Buy"
          ? amt * priceRatio
          : Math.max(0, amt * (2 - priceRatio));
      remainingCash = remainingCash - amt + payout;
      payouts[stock.code] = payout;
    }
    setRevealed(true);
    setPortfolio({ cash: remainingCash });
    setLastPayouts(payouts);
  };

  const handleNext = () => {
    if (dateIndex < rounds.length - 1) {
      setDateIndex(dateIndex + 1);
    } else {
      setLeaderboard((prev) => insertScore(prev, playerName, portfolio.cash));
      setGameOver(true);
    }
    setRevealed(false);
    setLastPayouts({});
    setAmount({});
  };

  useEffect(() => {
    if (!selectedPeriod) return;
    setLoading(true);
    fetchHistoryForPeriod(selectedPeriod.startDate, selectedPeriod.endDate)
      .then((histories) => {
        setFundHistories(histories);
        setRounds(buildRounds(selectedPeriod));
      })
      .catch(console.error);
  }, [selectedPeriod]);

  useEffect(() => {
    if (!fundHistories || rounds.length === 0) return;
    const round = rounds[dateIndex];
    let matchedStart = null;
    let matchedEnd = null;
    const roundStocks = fundHistories.map((fund) => {
      const startEntry = findClosestEntry(fund.history, round.targetStartDate);
      const endEntry = findClosestEntry(fund.history, round.targetEndDate);
      if (startEntry) matchedStart = startEntry.date;
      if (endEntry) matchedEnd = endEntry.date;
      return {
        code: fund.code,
        name: fund.name,
        risk: fund.risk,
        initial: startEntry?.nav,
        eventual: endEntry?.nav,
      };
    });
    setStocks(roundStocks);
    setCurrentRoundDates({ start: matchedStart, end: matchedEnd });
    setLoading(false);
  }, [fundHistories, rounds, dateIndex]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {gameOver ? (
        <GameOverPage
          total={portfolio.cash}
          restart={handleRestart}
          leaderboard={leaderboard}
        />
      ) : started ? (
        <GameScreen
          dateIndex={dateIndex}
          rounds={rounds}
          currentRoundDates={currentRoundDates}
          portfolio={portfolio}
          loading={loading}
          stocks={stocks}
          amount={amount}
          buyOrSellMap={buyOrSellMap}
          revealed={revealed}
          lastPayouts={lastPayouts}
          onAmountChange={handleAmountChange}
          onBuyOrSellChange={handleBuyOrSellChange}
          onReveal={handleReveal}
          onNext={handleNext}
        />
      ) : rules ? (
        <RulesPage onStart={handleStart} />
      ) : (
        <InitialPage onStart={handleRules} leaderboard={leaderboard} />
      )}
    </ThemeProvider>
  );
}

export default App;
