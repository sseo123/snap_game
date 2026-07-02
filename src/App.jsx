import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";
import * as React from "react";

const funds = [
  { code: "125497", name: "HDFC 100", risk: "HIGH" },
  { code: "120166", name: "SBI Technologys", risk: "HIGH" },
  { code: "119777", name: "Axis Midcap", risk: "HIGH" },
  { code: "119565", name: "SBI Gold", risk: "MEDIUM" },
  { code: "149257", name: "ICICI Silver", risk: "MEDIUM" },
  { code: "103734", name: "Quantum Liquid Bond", risk: "LOW" },
];

function App() {
  const [started, setStarted] = useState(false);
  const [stockPrice, setStockPrice] = useState({});

  // buying or selling stock
  const [buyOrSell, setBuyOrSell] = React.useState("Buy");
  const handleBuyOrSell = (event, userChoice) => {
    setBuyOrSell(userChoice);
  };

  const [investAmount, setInvestAmount] = useState(0);
  const [portfolio, setPortfolio] = useState({ cash: 100000, shares: 0 });

  // api call
  useEffect(() => {
    fetch(
      `https://api.mfapi.in/mf/125497?startDate=2023-01-02&endDate=2023-06-01`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        const stock_price = data.data;
        const start_price = stock_price[stock_price.length - 1].nav;
        const end_price = stock_price[0].nav;

        const stock_name = data.meta.fund_house;

        setStockPrice({
          inital: start_price,
          eventual: end_price,
          name: stock_name,
        });
        console.log(start_price);
        console.log(end_price);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleNext = () => {
    const investAmount = parseFloat(amount);
    const price = parseFloat(stockPrice.price.eventual);

    if (investAmount > 0) {
      if (buyOrSell === "Buy") {
        if (investAmount <= porfolio.cash) {
          setPortfolio({
            cash: portfolio.cash - investAmount,
            shares: portfolio.shares + investAmount / price,
          });
        } else {
          console.log("not enough cash");
          return;
        }
      } else {
        const sharesToSell = investAmount / price;
        if (sharesToSell <= portfolio.shares) {
          setPortfolio({
            cash: portfolio.cash + investAmount,
            shares: portfolio.shares - sharesToSell,
          });
        } else {
          console.log("Not enough shares");
          return;
        }
      }
    }
    setInvestAmount("");
  };

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

          <Grid>
            <Card sx={{ maxWidth: 350 }}>
              <CardContent>
                {stockPrice.name ? (
                  <Typography gutterBottom variant="h5" component="div">
                    {" "}
                    name: {stockPrice.name}
                  </Typography>
                ) : (
                  <Typography gutterBottom variant="h5" component="div">
                    name: loading..
                  </Typography>
                )}
                {stockPrice.inital ? (
                  <Typography gutterBottom variant="h5" component="div">
                    The inital stock price is: ${stockPrice.inital}
                  </Typography>
                ) : (
                  <Typography gutterBottom variant="h5" component="div">
                    {" "}
                    The inital stock price is: loading...
                  </Typography>
                )}
                {stockPrice.eventual ? (
                  <Typography gutterBottom variant="h5" component="div">
                    The later stock price is: ${stockPrice.eventual}
                  </Typography>
                ) : (
                  <Typography gutterBottom variant="h5" component="div">
                    The later stock price is: loading...
                  </Typography>
                )}
              </CardContent>

              <TextField
                type="number"
                name="quantity"
                label="Amount to invest ($)"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
              />

              <ToggleButtonGroup
                color="primary"
                value={buyOrSell}
                exclusive
                onChange={handleBuyOrSell}
                aria-label="Platform"
              >
                <ToggleButton value="web">Buy</ToggleButton>
                <ToggleButton value="android">Sell</ToggleButton>
              </ToggleButtonGroup>
            </Card>
          </Grid>

          <Box align="center">
            <Button sx={{ m: 1 }} onClick={handleNext}>
              Next
            </Button>
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

const historical_snapshots = [
  {
    slide: 1,
    name: "The 2013 Commodity Spike",
    start: "2013-01-01",
    end: "2013-06-30",
    when: "1/1/2023  - 6/10/2023",
  },
  {
    slide: 2,
    name: "The 2016 Tech Expansion",
    start: "2016-01-01",
    end: "2016-06-30",
  },
  {
    slide: 3,
    name: "The 2018 Midcap Correction",
    start: "2018-01-01",
    end: "2018-06-30",
  },
  {
    slide: 4,
    name: "The 2020 Pandemic V-Recovery",
    start: "2020-03-01",
    end: "2020-09-01",
  },
  {
    slide: 5,
    name: "The 2021 Post-Lockdown Bull Run",
    start: "2021-01-01",
    end: "2021-06-30",
  },
];
