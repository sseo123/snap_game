// StockCard/StockCard.jsx
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
  sharesOwned,
}) {
  const priceChange = parseFloat(stock.eventual) - parseFloat(stock.initial);
  const percentChange = (priceChange / stock.initial) * 100;

  const currentPrice = revealed
    ? parseFloat(stock.eventual)
    : parseFloat(stock.initial);
  const currentShareValue = sharesOwned * (currentPrice || 0);

  let isUp = false;
  if (priceChange >= 0) {
    isUp = true;
  }

  const changeColor = isUp ? "success.main" : "error.main";
  const sign = isUp ? "+" : "";

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

            <Typography gutterBottom variant="h6" component="div">
              Amount owned: $
              {sharesOwned
                ? currentShareValue.toFixed(2).toLocaleString("en-US")
                : "--"}
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
              </>
            )}
          </>
        ) : (
          <Typography gutterBottom variant="h6" component="div">
            Loading...
          </Typography>
        )}
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
        onChange={(e, val) => onBuyOrSellChange(stock.code, val)}
        aria-label="buy or sell"
        sx={{ m: 1 }}
        disabled={revealed}
      >
        <ToggleButton value="Buy">Buy</ToggleButton>
        <ToggleButton value="Sell">Sell</ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
}

export default StockCard;
