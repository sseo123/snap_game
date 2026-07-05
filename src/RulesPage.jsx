import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { CardContent, Card, ToggleButton } from "@mui/material";
import { ToggleButtonGroup, TextField } from "@mui/material";
import { useState } from "react";

function RulesPage({ onStart }) {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ py: 2 }}>
          Here's the Game:
        </Typography>
        <Typography align="center" variant="body1" component="div">
          <ul>
            <li>
              Within the 5 year time period you've selected, you will try to
              invest in the best stock to make the highest profit!
            </li>
            <li>
              Each day represents 1 year, you get 5 days, and at the end of each
              day, all your investments (whether gain or loss) are returned to
              your bank account
            </li>
            <li>
              You have the option to either buy a stock (hoping it will go up),
              short a stock (hopinh it will go down) or don't do anything to the
              stock
            </li>
            <li>
              Your trades will be submitted once you click the "submit trades"
              button
            </li>
            <li>
              You can't invest more money than you have in your bank account,
              and you start with $100,000
            </li>
            <li>Try to make as much money as possible</li>
            <li>Good luck!</li>
          </ul>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large" onClick={onStart}>
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default RulesPage;
