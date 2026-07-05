import {
  Card,
  CardContent,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

function StockCard({
  stock,
  amount,
  buyOrSell,
  onAmountChange,
  onBuyOrSellChange,
  uLoading,
  revealed,
  payout,
}) {
  const priceChange = parseFloat(stock.eventual) - parseFloat(stock.initial);
  const percentChange = (priceChange / stock.initial) * 100;

  let isUp = false;
  if (priceChange >= 0) {
    isUp = true;
  }

  const changeColor = isUp ? "success.main" : "error.main";
  const sign = isUp ? "+" : "-";

  const investedAmount = parseFloat(amount);
  const gainLoss =
    payout !== undefined && !isNaN(investedAmount)
      ? payout - investedAmount
      : null;
  const gainLossColor =
    gainLoss !== null
      ? gainLoss >= 0
        ? "success.main"
        : "error.main"
      : undefined;

  return (
    <Card sx={{ maxWidth: 350, m: 1 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {stock.name} ({stock.risk})
        </Typography>

        {!uLoading ? (
          <>
            <Typography gutterBottom variant="h6" component="div">
              Current price: $
              {parseFloat(stock.initial).toFixed(2).toLocaleString("en-US")}
            </Typography>

            {revealed && (
              <>
                <Typography gutterBottom variant="body1">
                  New price: ${parseFloat(stock.eventual).toFixed(2)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: changeColor, fontWeight: "bold" }}
                >
                  {sign}${priceChange.toFixed(2)} ({sign}
                  {percentChange.toFixed(2)}%) this period
                </Typography>

                {gainLoss !== null && (
                  <Typography
                    variant="body1"
                    sx={{ color: gainLossColor, fontWeight: "bold", mt: 1 }}
                  >
                    {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)} (
                    {buyOrSell})
                  </Typography>
                )}
              </>
            )}
          </>
        ) : (
          <Typography gutterBottom variant="h6" component="div">
            Loading...
          </Typography>
        )}

        <Typography gutterBottom variant="h6" component="div">
          Shares:{" "}
          {!isNaN(investedAmount) && investedAmount > 0
            ? (investedAmount / parseFloat(stock.initial)).toFixed(2)
            : "--"}
          <br />
          Total Cost:{" "}
          {!isNaN(investedAmount)
            ? `$${investedAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : "--"}
        </Typography>
      </CardContent>

      <TextField
        type="number"
        label="Amount to invest ($)"
        value={amount}
        onChange={(e) => onAmountChange(stock.code, e.target.value)}
        sx={{ m: 1 }}
        disabled={revealed}
      />

      <ToggleButtonGroup
        color="primary"
        value={buyOrSell}
        exclusive
        onChange={(e, val) => val && onBuyOrSellChange(stock.code, val)}
        aria-label="buy or short"
        sx={{ m: 1 }}
        disabled={revealed}
      >
        <ToggleButton value="Buy">Buy</ToggleButton>
        <ToggleButton value="Sell">Short</ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
}

export default StockCard;
