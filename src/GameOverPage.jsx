// import { Container, Typography, Box, Button, Grid } from "@mui/material";
// import { CardContent, Card, ToggleButton } from "@mui/material";
// import { ToggleButtonGroup, TextField } from "@mui/material";

// function GameOverPage({ total, restart, leaderboard }) {
//   return (
//     <>
//       <Container maxWidth="lg">
//         <Typography variant="h2" align="center" sx={{ py: 2 }}>
//           Game Over!
//         </Typography>
//         <Typography align="center" variant="h5">
//           Final Amount: $
//           {total.toLocaleString("en-US", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           })}{" "}
//           !!
//         </Typography>

//         <Box sx={{ maxWidth: 400, mx: "auto" }}>
//           {leaderboard.map((entry, i) => (
//             <Typography key={i} align="center">
//               {i + 1}. {entry.name} — $
//               {entry.score.toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </Typography>
//           ))}
//         </Box>

//         <Box align="center">
//           <Button onClick={restart}>Restart Game</Button>
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default GameOverPage;
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { Trophy, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";

const GOLD = "#C9A84C";
const GREEN = "#22C55E";
const RED = "#EF4444";

function formatMoney(n) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function GoldRule() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 3 }}>
      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(201,168,76,0.18)" }} />
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: GOLD,
          opacity: 0.5,
        }}
      />
      <Box sx={{ width: 24, height: "1px", bgcolor: GOLD, opacity: 0.35 }} />
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: GOLD,
          opacity: 0.5,
        }}
      />
      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(201,168,76,0.18)" }} />
    </Box>
  );
}

function LeaderboardSection({ leaderboard }) {
  if (leaderboard.length === 0) return null;
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="overline"
        sx={{ color: GOLD, display: "block", textAlign: "center", mb: 2 }}
      >
        Rankings
      </Typography>
      <Stack spacing={0.5} sx={{ maxWidth: 420, mx: "auto" }}>
        {leaderboard.map((entry, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.25,
              borderRadius: 1,
              bgcolor:
                i === 0 ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.025)",
              border:
                i === 0
                  ? "1px solid rgba(201,168,76,0.2)"
                  : "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 700,
                fontSize: "0.75rem",
                color: i === 0 ? GOLD : "#8B8FA8",
                minWidth: 24,
              }}
            >
              #{i + 1}
            </Typography>
            {i === 0 && <Trophy size={13} color={GOLD} />}
            <Typography sx={{ flex: 1, fontWeight: 500, fontSize: "0.85rem" }}>
              {entry.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "0.8rem",
                color: entry.score >= 100000 ? GREEN : RED,
                fontWeight: 500,
              }}
            >
              ${formatMoney(entry.score)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function GameOverPage({ total, restart, leaderboard }) {
  const pnl = total - 100000;
  const pnlPct = ((pnl / 100000) * 100).toFixed(2);
  const isWin = pnl >= 0;

  return (
    <Box
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 6 }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "rgba(201,168,76,0.1)",
              border: `1.5px solid ${GOLD}40`,
              mb: 3,
              color: GOLD,
            }}
          >
            <Trophy size={32} />
          </Box>

          <Typography
            variant="overline"
            sx={{ color: GOLD, display: "block", mb: 1.5 }}
          >
            Final Results
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, mb: 3 }}
          >
            {isWin ? "Well Played!" : "Maybe play again ??"}
          </Typography>

          <Box
            sx={{
              display: "inline-block",
              px: 4,
              py: 2.5,
              borderRadius: 2,
              border: `1px solid ${isWin ? GREEN : RED}30`,
              bgcolor: isWin ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)",
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#8B8FA8", fontSize: "0.58rem" }}
            >
              Portfolio Value
            </Typography>
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                fontWeight: 700,
                color: "#E8E2D4",
                lineHeight: 1.1,
                mt: 0.5,
              }}
            >
              ${formatMoney(total)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.75,
                mt: 1,
              }}
            >
              {isWin ? (
                <TrendingUp size={14} color={GREEN} />
              ) : (
                <TrendingDown size={14} color={RED} />
              )}
              <Typography
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "0.85rem",
                  color: isWin ? GREEN : RED,
                  fontWeight: 600,
                }}
              >
                {isWin ? "+" : ""}${formatMoney(Math.abs(pnl))} (
                {isWin ? "+" : ""}
                {pnlPct}%)
              </Typography>
            </Box>
          </Box>
        </Box>

        <GoldRule />

        <LeaderboardSection leaderboard={leaderboard} />

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={restart}
            startIcon={<RotateCcw size={15} />}
            sx={{ py: 1.3, px: 4 }}
          >
            Play Again
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default GameOverPage;
