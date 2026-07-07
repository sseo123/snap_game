// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   ToggleButtonGroup,
//   ToggleButton,
// } from "@mui/material";

// function StockCard({
//   stock,
//   amount,
//   buyOrSell,
//   onAmountChange,
//   onBuyOrSellChange,
//   uLoading,
//   revealed,
//   payout,
// }) {
//   const priceChange = parseFloat(stock.eventual) - parseFloat(stock.initial);
//   const percentChange = (priceChange / stock.initial) * 100;

//   let isUp = false;
//   if (priceChange >= 0) {
//     isUp = true;
//   }

//   const changeColor = isUp ? "success.main" : "error.main";
//   const sign = isUp ? "+" : "-";

//   const investedAmount = parseFloat(amount);
//   const gainLoss =
//     payout !== undefined && !isNaN(investedAmount)
//       ? payout - investedAmount
//       : null;
//   const gainLossColor =
//     gainLoss !== null
//       ? gainLoss >= 0
//         ? "success.main"
//         : "error.main"
//       : undefined;

//   return (
//     <Card sx={{ maxWidth: 350, m: 1 }}>
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {stock.name} ({stock.risk})
//         </Typography>

//         {!uLoading ? (
//           <>
//             <Typography gutterBottom variant="h6" component="div">
//               Current price: $
//               {parseFloat(stock.initial).toFixed(2).toLocaleString("en-US")}
//             </Typography>

//             {revealed && (
//               <>
//                 <Typography gutterBottom variant="body1">
//                   New price: ${parseFloat(stock.eventual).toFixed(2)}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ color: changeColor, fontWeight: "bold" }}
//                 >
//                   {sign}${priceChange.toFixed(2)} ({sign}
//                   {percentChange.toFixed(2)}%) this period
//                 </Typography>

//                 {gainLoss !== null && (
//                   <Typography
//                     variant="body1"
//                     sx={{ color: gainLossColor, fontWeight: "bold", mt: 1 }}
//                   >
//                     {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)} (
//                     {buyOrSell})
//                   </Typography>
//                 )}
//               </>
//             )}
//           </>
//         ) : (
//           <Typography gutterBottom variant="h6" component="div">
//             Loading...
//           </Typography>
//         )}

//         <Typography gutterBottom variant="h6" component="div">
//           Shares:{" "}
//           {!isNaN(investedAmount) && investedAmount > 0
//             ? (investedAmount / parseFloat(stock.initial)).toFixed(2)
//             : "--"}
//           <br />
//           Total Cost:{" "}
//           {!isNaN(investedAmount)
//             ? `$${investedAmount.toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}`
//             : "--"}
//         </Typography>
//       </CardContent>

//       <TextField
//         type="number"
//         label="Amount to invest ($)"
//         value={amount}
//         onChange={(e) => onAmountChange(stock.code, e.target.value)}
//         sx={{ m: 1 }}
//         disabled={revealed}
//       />

//       <ToggleButtonGroup
//         color="primary"
//         value={buyOrSell}
//         exclusive
//         onChange={(e, val) => val && onBuyOrSellChange(stock.code, val)}
//         aria-label="buy or short"
//         sx={{ m: 1 }}
//         disabled={revealed}
//       >
//         <ToggleButton value="Buy">Buy</ToggleButton>
//         <ToggleButton value="Sell">Short</ToggleButton>
//       </ToggleButtonGroup>
//     </Card>
//   );
// }

// export default StockCard;

import { Card, CardContent, Typography, Box, TextField, ToggleButtonGroup, ToggleButton, Chip, Divider, } from "@mui/material";
import { TrendingUp, TrendingDown } from "lucide-react";

const GOLD = "#C9A84C";
const GREEN = "#22C55E";
const RED = "#EF4444";
const AMBER = "#F59E0B";

const riskStyle = {
  HIGH: { color: RED, bg: "rgba(239,68,68,0.12)" },
  MEDIUM: { color: AMBER, bg: "rgba(245,158,11,0.12)" },
  LOW: { color: GREEN, bg: "rgba(34,197,94,0.12)" },
};

function formatMoney(n) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function StockCard({ stock, amount, buyOrSell, onAmountChange, onBuyOrSellChange, uLoading, revealed, payout, }) {
  const priceChange = parseFloat(stock.eventual) - parseFloat(stock.initial);
  const percentChange = (priceChange / stock.initial) * 100;
  const isUp = priceChange >= 0;
  const changeColor = isUp ? GREEN : RED;
  const sign = isUp ? "+" : "";
  const investedAmount = parseFloat(amount);
  const gainLoss =
    payout !== undefined && !isNaN(investedAmount)
      ? payout - investedAmount
      : null;
  const gainLossColor =
    gainLoss !== null ? (gainLoss >= 0 ? GREEN : RED) : undefined;
  const risk = stock.risk;

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flex: 1, p: 2.5, "&:last-child": { pb: 2.5 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "#8B8FA8",
                display: "block",
                mb: 0.25,
                fontSize: "0.58rem",
              }}
            >
              Fund
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.2 }}
            >
              {stock.name}
            </Typography>
          </Box>
          <Chip
            label={risk}
            size="small"
            sx={{
              color: riskStyle[risk]?.color ?? "#8B8FA8",
              bgcolor: riskStyle[risk]?.bg ?? "transparent",
              border: `1px solid ${riskStyle[risk]?.color ?? "#8B8FA8"}30`,
              mt: 0.5,
            }}
          />
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        {/* Price content */}
        {uLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: GOLD,
                opacity: 0.6,
                animation: "pulse 1.5s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%,100%": { opacity: 0.3 },
                  "50%": { opacity: 0.8 },
                },
              }}
            />
            <Typography sx={{ color: "#8B8FA8", fontSize: "0.8rem" }}>
              Loading data…
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="overline"
                sx={{ color: "#8B8FA8", fontSize: "0.58rem" }}
              >
                Entry Price
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  color: "#E8E2D4",
                  lineHeight: 1.2,
                }}
              >
                ${parseFloat(stock.initial).toFixed(2)}
              </Typography>
            </Box>

            {revealed && (
              <Box
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: isUp
                    ? "rgba(34,197,94,0.06)"
                    : "rgba(239,68,68,0.06)",
                  border: `1px solid ${changeColor}22`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: "#8B8FA8", fontSize: "0.55rem" }}
                  >
                    Exit Price
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {isUp ? (
                      <TrendingUp size={12} color={GREEN} />
                    ) : (
                      <TrendingDown size={12} color={RED} />
                    )}
                    <Typography
                      sx={{
                        color: changeColor,
                        fontFamily: '"JetBrains Mono"',
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      {sign}
                      {percentChange.toFixed(2)}%
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "1rem",
                    color: changeColor,
                    fontWeight: 500,
                  }}
                >
                  ${parseFloat(stock.eventual).toFixed(2)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "0.72rem",
                    color: changeColor,
                    opacity: 0.8,
                    mt: 0.25,
                  }}
                >
                  {sign}${Math.abs(priceChange).toFixed(2)} per unit
                </Typography>
              </Box>
            )}

            {/* Shares / Cost */}
            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: "#8B8FA8", fontSize: "0.55rem" }}
                >
                  Shares
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "0.78rem",
                    color: "#E8E2D4",
                  }}
                >
                  {!isNaN(investedAmount) && investedAmount > 0
                    ? (investedAmount / parseFloat(stock.initial)).toFixed(3)
                    : "—"}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: "#8B8FA8", fontSize: "0.55rem" }}
                >
                  Spending 
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "0.78rem",
                    color: "#E8E2D4",
                  }}
                >
                  {!isNaN(investedAmount) && investedAmount > 0
                    ? `$${formatMoney(investedAmount)}`
                    : "—"}
                </Typography>
              </Box>
            </Box>

            {/* P&L */}
            {revealed && gainLoss !== null && !isNaN(investedAmount) && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 1.5,
                  py: 1,
                  borderRadius: 1,
                  bgcolor:
                    gainLoss >= 0
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(239,68,68,0.1)",
                  border: `1px solid ${gainLossColor}30`,
                  mb: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#8B8FA8",
                    fontWeight: 500,
                  }}
                >
                  P&L ({buyOrSell})
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: gainLossColor,
                  }}
                >
                  {gainLoss >= 0 ? "+" : ""}${formatMoney(gainLoss)}
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* Controls */}
        <Box sx={{ mt: "auto" }}>
          <TextField
            type="number"
            label="Invest ($)"
            value={amount}
            onChange={(e) => onAmountChange(stock.code, e.target.value)}
            fullWidth
            size="small"
            disabled={revealed}
            inputProps={{ min: 0, step: 100 }}
            sx={{ mb: 1.5 }}
          />
          <ToggleButtonGroup
            color="primary"
            value={buyOrSell}
            exclusive
            onChange={(_, val) => val && onBuyOrSellChange(stock.code, val)}
            disabled={revealed}
            sx={{ width: "100%" }}
            size="small"
          >
            <ToggleButton value="Buy" sx={{ flex: 1, gap: 0.5 }}>
              <TrendingUp size={13} /> Buy
            </ToggleButton>
            <ToggleButton value="Sell" sx={{ flex: 1, gap: 0.5 }}>
              <TrendingDown size={13} /> Short
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StockCard;
