import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";
import * as React from "react";
import StockCard from "./StockCard";
import InitialPage from "./InitialPage";
import GameOverPage from "./GameOverPage";
import RulesPage from "./RulesPage";

const funds = [
  { code: "125497", name: "stock 1", risk: "HIGH" },
  { code: "100080", name: "stock 2", risk: "HIGH" },
  { code: "100177", name: "stock 3", risk: "HIGH" },
  { code: "120827", name: "stock 4", risk: "MEDIUM" },
  { code: "119731", name: "stock 5", risk: "MEDIUM" },
  { code: "118968", name: "stock 6", risk: "LOW" },
];

const NUM_ROUNDS = 5;

const fetchHistoryForPeriod = (startDate, endDate) => {
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
};

function parseMfapiDate(dateStr) {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function findClosestEntry(history, targetDateStr) {
  const target = new Date(targetDateStr);
  let closest = null;
  let closestDiff = Infinity;

  for (const entry of history) {
    const diff = Math.abs(parseMfapiDate(entry.date) - target);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = entry;
    }
  }
  return closest;
}

function buildRounds(period) {
  const startYear = parseInt(period.startDate.split("-")[0], 10);
  let rounds = [];

  for (let i = 0; i < NUM_ROUNDS; i++) {
    rounds.push({
      targetStartDate: `${startYear + i}-06-01`,
      targetEndDate: `${startYear + i + 1}-08-01`,
    });
  }

  return rounds;
}

function insertScore(leaderboard, name, score) {
  const newEntry = { name, score };
  const res = [];
  let inserted = false;

  for (let i = 0; i < leaderboard.length; i++) {
    if (!inserted && score >= leaderboard[i].score) {
      res.push(newEntry);
      inserted = true;
    }
    res.push(leaderboard[i]);
  }
  if (!inserted) {
    res.push(newEntry);
  }
  return res;
}

function App() {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [rules, setRules] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [fundHistories, setFundHistories] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [currentRoundDates, setCurrentRoundDates] = useState(null); // actual matched dates for display
  const [amount, setAmount] = useState({});
  const [buyOrSellMap, setBuyOrSellMap] = useState({});
  const [portfolio, setPortfolio] = useState({ cash: 100000 });

  const [dateIndex, setDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [lastPayouts, setLastPayouts] = useState({}); // code -> payout, for showing results after reveal

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

  const handleAmountChange = (code, value) => {
    setAmount((prev) => ({ ...prev, [code]: value }));
  };

  const handleBuyOrSellChange = (code, value) => {
    setBuyOrSellMap((prev) => ({ ...prev, [code]: value }));
  };

  const handleRules = (period, name) => {
    setSelectedPeriod(period);
    setRules(true);
    setPlayerName(name);
  };

  const handleStart = (period) => {
    setStarted(true);
  };

  const handleReveal = () => {
    let remainingCash = portfolio.cash;
    const payouts = {};
    let breakoutEarly = false;
    let totalInvestedAmount = 0;

    stocks.forEach((stock) => {
      const investAmount = parseFloat(amount[stock.code]);

      if (investAmount) {
        totalInvestedAmount += investAmount;
      }

      if (totalInvestedAmount > portfolio.cash) {
        console.log("Not enough cash");
        breakoutEarly = true;
        return;
      }
    });

    if (breakoutEarly) {
      return;
    }

    stocks.forEach((stock) => {
      const investAmount = parseFloat(amount[stock.code]);
      const action = buyOrSellMap[stock.code] || "Buy";
      const initialPrice = parseFloat(stock.initial);
      const eventualPrice = parseFloat(stock.eventual);

      if (!investAmount || investAmount <= 0) {
        return;
      }

      const priceRatio = eventualPrice / initialPrice;

      const payout =
        action === "Buy"
          ? investAmount * priceRatio
          : Math.max(0, investAmount * (2 - priceRatio));

      remainingCash = remainingCash - investAmount + payout;
      payouts[stock.code] = payout;
    });

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
        console.log(histories);
        setFundHistories(histories);
        setRounds(buildRounds(selectedPeriod));
      })
      .catch((error) => console.error(error));
  }, [selectedPeriod]);

  useEffect(() => {
    if (!fundHistories || rounds.length === 0) return;

    const round = rounds[dateIndex];
    let matchedStartDate = null;
    let matchedEndDate = null;

    const roundStocks = fundHistories.map((fund) => {
      const startEntry = findClosestEntry(fund.history, round.targetStartDate);
      const endEntry = findClosestEntry(fund.history, round.targetEndDate);

      if (startEntry) {
        matchedStartDate = startEntry.date;
      }
      if (endEntry) {
        matchedEndDate = endEntry.date;
      }

      return {
        code: fund.code,
        name: fund.name,
        risk: fund.risk,
        initial: startEntry?.nav,
        eventual: endEntry?.nav,
      };
    });

    setStocks(roundStocks);
    setCurrentRoundDates({ start: matchedStartDate, end: matchedEndDate });
    setLoading(false);
  }, [fundHistories, rounds, dateIndex]);

  if (gameOver) {
    const total = portfolio.cash;
    return (
      <GameOverPage
        total={total}
        restart={handleRestart}
        leaderboard={leaderboard}
      />
    );
  } else if (started) {
    return (
      <>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            sx={{ py: 2 }}
          >
            Welcome to the Game
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ mx: 10 }}
          >
            Let's play
            <Box component="span" sx={{ color: "success.main" }}>
              {" "}
              investing
            </Box>{" "}
            Game
          </Typography>

          {currentRoundDates && (
            <Typography
              align="center"
              variant="subtitle1"
              color="text.secondary"
            >
              Round {dateIndex + 1} of {rounds.length}:{" "}
              {currentRoundDates.start} &rarr; {currentRoundDates.end}
            </Typography>
          )}

          <Typography align="center" variant="h5">
            Spendable Money: $
            {portfolio.cash.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>

          <Grid container spacing={2}>
            {(loading ? funds : stocks).map((stock) => (
              <StockCard
                key={stock.code}
                stock={stock}
                amount={amount[stock.code] || ""}
                buyOrSell={buyOrSellMap[stock.code] || "Buy"}
                onAmountChange={handleAmountChange}
                onBuyOrSellChange={handleBuyOrSellChange}
                uLoading={loading}
                revealed={revealed}
                payout={lastPayouts[stock.code]}
              />
            ))}
          </Grid>

          <Box align="center">
            {!revealed ? (
              <Button sx={{ m: 1 }} onClick={handleReveal} disabled={loading}>
                Submit Stock Selection
              </Button>
            ) : (
              <Button sx={{ m: 1 }} onClick={handleNext}>
                Next Day
              </Button>
            )}
          </Box>
        </Container>
      </>
    );
  } else if (rules) {
    return <RulesPage onStart={handleStart} />;
  } else {
    return <InitialPage onStart={handleRules} leaderboard={leaderboard} />;
  }
}

export default App;
