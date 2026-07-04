import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";
import * as React from "react";
import StockCard from "./StockCard";
import InitialPage from "./InitialPage";
import GameOverPage from "./GameOverPage";

const funds = [
  { code: "125497", name: "HDFC 100", risk: "HIGH" },
  { code: "120166", name: "SBI Technologys", risk: "HIGH" },
  { code: "119777", name: "Axis Midcap", risk: "HIGH" },
  { code: "119565", name: "SBI Gold", risk: "MEDIUM" },
  { code: "149257", name: "ICICI Silver", risk: "MEDIUM" },
  { code: "103734", name: "Quantum Liquid Bond", risk: "LOW" },
];

const dates = [
  { start: "2023-01-01", end: "2023-01-28" },
  { start: "2023-01-28", end: "2023-03-28" },
  { start: "2023-03-28", end: "2023-05-26" },
  { start: "2023-05-26", end: "2023-06-28" },
  { start: "2023-06-28", end: "2023-08-28" },
];

function App() {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [stocks, setStocks] = useState([]);
  const [amount, setAmount] = useState({});
  const [buyOrSellMap, setBuyOrSellMap] = useState({});
  const [portfolio, setPortfolio] = useState({ cash: 100000, holdings: {} });

  const [dateIndex, setDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [shareAmount, setShareAmount] = useState(0);

  const handleAmountChange = (code, value) => {
    setAmount((prev) => ({ ...prev, [code]: value }));
  };

  const handleBuyOrSellChange = (code, value) => {
    setBuyOrSellMap((prev) => ({ ...prev, [code]: value }));
  };

  const handleReveal = () => {
    setRevealed(true);
    let newPortfolio = { ...portfolio, holdings: { ...portfolio.holdings } };

    stocks.forEach((stock) => {
      const investAmount = parseFloat(amount[stock.code]);
      const action = buyOrSellMap[stock.code] || "Buy";
      const price = parseFloat(stock.initial);

      if (!investAmount || investAmount <= 0) {
        return;
      }

      const currShares = newPortfolio.holdings[stock.code] || 0;

      if (action === "Buy") {
        if (investAmount <= newPortfolio.cash) {
          newPortfolio.cash -= investAmount;
          newPortfolio.holdings[stock.code] = currShares + investAmount / price;
        } else {
          console.log(`Not enough cash for ${stock.name}`);
        }
      } else {
        const sharesToSell = investAmount / price;
        if (sharesToSell <= currShares) {
          newPortfolio.cash += investAmount;
          newPortfolio.holdings[stock.code] = currShares - sharesToSell;
        } else {
          console.log(`Not enough shares of ${stock.name} to sell`);
        }
      }
    });

    setPortfolio(newPortfolio);
    setAmount({});
  };

  const handleNext = () => {
    if (dateIndex < dates.length - 1) {
      setDateIndex(dateIndex + 1);
    } else {
      setGameOver(true);
    }

    setRevealed(false);
  };

  // api call to get stocks
  const fetchStocks = (start, end) => {
    return Promise.all(
      funds.map((fund) =>
        fetch(
          `https://api.mfapi.in/mf/${fund.code}?startDate=${start}&endDate=${end}`,
        )
          .then((res) => {
            if (!res.ok) throw new Error(`Error fetching ${fund.code}`);
            return res.json();
          })
          .then((data) => {
            const priceData = data.data;
            const start_price = priceData[priceData.length - 1].nav;
            const end_price = priceData[0].nav;
            console.log(start_price, end_price);
            setLoading(false);
            return { ...fund, initial: start_price, eventual: end_price };
          }),
      ),
    );
  };

  useEffect(() => {
    setLoading(true);
    const { start, end } = dates[dateIndex];
    fetchStocks(start, end)
      .then((results) => setStocks(results))
      .catch((error) => console.error(error));
  }, [dateIndex]);

  const calculateNetWorth = () => {
    let sum = 0;

    for (let i = 0; i < stocks.length; i++) {
      let sharesOwned = portfolio.holdings[stocks[i].code] || 0;
      let currentPrice = revealed
        ? parseFloat(stocks[i].eventual) || 0
        : parseFloat(stocks[i].initial) || 0;
      sum += sharesOwned * currentPrice;
    }

    return portfolio.cash + sum;
  };

  if (gameOver) {
    const finalNetWorth = calculateNetWorth();
    return <GameOverPage finalNetWorth={finalNetWorth} />;
  } else if (started) {
    // when the game starts page
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
          <Typography align="center" variant="h5">
            Cash: $
            {portfolio.cash.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>

          <Typography align="center" variant="h5">
            Net Worth: $
            {!loading
              ? calculateNetWorth().toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "Calculating . . ."}
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
                sharesOwned={portfolio.holdings[stock.code]}
              />
            ))}
          </Grid>

          <Box align="center">
            {!revealed ? (
              <Button sx={{ m: 1 }} onClick={handleReveal}>
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
  } else {
    return <InitialPage onStart={() => setStarted(true)} />;
  }
}

export default App;
