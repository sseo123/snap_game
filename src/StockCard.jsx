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
}) {
  return (
    <Card sx={{ maxWidth: 350, m: 1 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {stock.name} ({stock.risk})
        </Typography>

        {stock.eventual ? (
          <Typography gutterBottom variant="h6" component="div">
            Current price: ${stock.eventual}
          </Typography>
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
      />

      <ToggleButtonGroup
        color="primary"
        value={buyOrSell}
        exclusive
        onChange={(e, val) => onBuyOrSellChange(stock.code, val)}
        aria-label="buy or sell"
        sx={{ m: 1 }}
      >
        <ToggleButton value="Buy">Buy</ToggleButton>
        <ToggleButton value="Sell">Sell</ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
}

export default StockCard;
