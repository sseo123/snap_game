import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";
import * as React from "react";
import StockCard from "./StockCard";

const funds = [
  { code: "125497", name: "HDFC 100", risk: "HIGH" },
  { code: "120166", name: "SBI Technologys", risk: "HIGH" },
  { code: "119777", name: "Axis Midcap", risk: "HIGH" },
  { code: "119565", name: "SBI Gold", risk: "MEDIUM" },
  { code: "149257", name: "ICICI Silver", risk: "MEDIUM" },
  { code: "103734", name: "Quantum Liquid Bond", risk: "LOW" },
];

const dates = [
  { name: " 2013", start: "2013-01-01", end: "2013-06-30" },
  { name: " 2016", start: "2016-01-01", end: "2016-06-30" },
  { name: " 2018", start: "2018-01-01", end: "2018-06-30" },
  { name: " 2020", start: "2020-03-01", end: "2020-09-01" },
  { name: " 2021 ", start: "2021-01-01", end: "2021-06-30" },
];

function App() {
  const [started, setStarted] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [amount, setAmount] = useState({});
  const [buyOrSellMap, setBuyOrSellMap] = useState({});
  const [portfolio, setPortfolio] = useState({ cash: 100000, holdings: {} });

  const handleAmountChange = (code, value) => {
    setAmount((prev) => ({ ...prev, [code]: value }));
  };

  const handleBuyOrSellChange = (code, value) => {
    setBuyOrSellMap((prev) => ({ ...prev, [code]: value }));
  };

  const handleNext = () => {
    let newPortfolio = { ...portfolio, holdings: { ...portfolio.holdings } };

    stocks.forEach((stock) => {
      const investAmount = parseFloat(amount[stock.code]);
      const action = buyOrSellMap[stock.code] || "Buy";
      const price = parseFloat(stock.eventual);

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
    setAmount({}); // reset all input fields for next round
  };

  // api call
  useEffect(() => {
    Promise.all(
      funds.map((fund) =>
        fetch(
          `https://api.mfapi.in/mf/${fund.code}?startDate=2023-01-02&endDate=2023-06-01`,
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

            return { ...fund, initial: start_price, eventual: end_price };
          }),
      ),
    )
      .then((results) => setStocks(results))
      .catch((error) => console.error(error));
  }, []);

  if (started) {
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

          <Grid container spacing={2} justifyContent="center">
            {stocks.map((stock) => (
              <StockCard
                key={stock.code}
                stock={stock}
                amount={amount[stock.code] || ""}
                buyOrSell={buyOrSellMap[stock.code] || "Buy"}
                onAmountChange={handleAmountChange}
                onBuyOrSellChange={handleBuyOrSellChange}
              />
            ))}
          </Grid>

          <Box align="center">
            <Button sx={{ m: 1 }} onClick={handleNext}>
              Next
            </Button>
            <Typography>Cash: ${portfolio.cash.toFixed(2)}</Typography>
          </Box>
        </Container>
      </>
    );
  }
  // starting/inital page
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

        <Box align="center">
          <Button sx={{ m: 1 }} onClick={() => setStarted(true)}>
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;

const historical_snapshots = [];
