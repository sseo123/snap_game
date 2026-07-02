// import { useState } from "react";
// import {
//   Button,
//   TextField,
//   Container,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   ToggleButtonGroup,
//   ToggleButton,
//   Divider,
//   Stack,
//   Paper,
// } from "@mui/material";
// import DataCard from "./DataCards";

// const funds = [
//   { code: "125497", name: "HDFC 100", risk: "HIGH" },
//   { code: "120166", name: "SBI Technologys", risk: "HIGH" },
//   { code: "119777", name: "Axis Midcap", risk: "HIGH" },
//   { code: "119565", name: "SBI Gold", risk: "MEDIUM" },
//   { code: "149257", name: "ICICI Silver", risk: "MEDIUM" },
//   { code: "103734", name: "Quantum Liquid Bond", risk: "LOW" },
// ];

// const historical_snapshots = [
//   { slide: 0, name: "Start Game", start: null, end: null},
//   { slide: 1, name: "The 2013 Commodity Spike", start: "2013-01-01", end: "2013-06-30", when: "1/1/2023  - 6/10/2023", },
//   { slide: 2, name: "The 2016 Tech Expansion", start: "2016-01-01", end: "2016-06-30", },
//   { slide: 3, name: "The 2018 Midcap Correction", start: "2018-01-01", end: "2018-06-30", },
//   { slide: 4, name: "The 2020 Pandemic V-Recovery", start: "2020-03-01", end: "2020-09-01", },
//   { slide: 5, name: "The 2021 Post-Lockdown Bull Run", start: "2021-01-01", end: "2021-06-30", },
//   { name: "Done", start: "Done", end: "Done" },
// ];

// function App() {
//   const [switchTimeline, setSwitchTimeline] = useState(0);
//   const [stockData, setStockData] = useState({});

//   function handleSwitchTimeline() {
//     const nextIndex = (switchTimeline + 1) % historical_snapshots.length;
//     const nextSnapshot = historical_snapshots[nextIndex];

//     setSwitchTimeline(nextIndex);

//     funds.forEach((fund) => {
//       fetchFundPrice(fund.code, nextSnapshot.start, nextSnapshot.end);
//       console.log(fund.code)
//     });
//   }

//   const requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   //api calls
//   function fetchFundPrice(code, start, end) {
//     fetch(
//       `https://api.mfapi.in/mf/${code}?startDate=${start}&endDate=${end}`,
//       requestOptions,
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const history = data.data;
//         const startPrice = history[history.length - 1]?.nav;
//         const endPrice = history[0]?.nav;

//         setStockData((price) => ({
//           ...price,
//           [code]: { startPrice, endPrice },
//         }));

//         console.log(data)
//       })
//       .catch((error) => console.log(error));
//   }

//   return (
//     <>
//       <Typography
//         variant="h4"
//         align="center"
//         color="text.primary"
//         sx={{ py: 2 }}
//       >
//         {historical_snapshots.map((curr_timeline, index) => {
//           if (index !== switchTimeline) {
//             return null;
//           }
//           return (
//             <span key={curr_timeline.slide}>
//               {curr_timeline.name}
//               <br />
//               {curr_timeline.when}
//             </span>
//           );
//         })}
//       </Typography>

//       <Box align="center" spacing={2} direction="row">
//         <Button onClick={handleSwitchTimeline} variant="contained">
//           Submit
//         </Button>
//       </Box>

//       <Grid container spacing={3} sx={{ py: 1 }}>
//         {/* {funds.map((fund) => ( */}
//           <Grid key={fund.code}>
//             < asset={fund} nav={stockData[fund.code]} />
//           </Grid>
//         {/* ))} */}
//       </Grid>
//     </>
//   );
// }

// export default App;


// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import ToggleButton from "@mui/material/ToggleButton";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Divider from "@mui/material/Divider";

// const RISK_COLOR = {
//   HIGH: "error",
//   MEDIUM: "warning",
//   LOW: "success",
// };

// const RISK_DESCRIPTION = {
//   HIGH: "Larger swings, larger potential upside. Equity-heavy exposure.",
//   MEDIUM: "Moderate volatility. Commodity-backed exposure.",
//   LOW: "Capital preservation focused. Debt/liquid fund exposure.",
// };

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };

// export default function DataCard({ asset, action, nav }) {
//   const [open, setOpen] = React.useState(false);
//   //   const handleOpen = () => setOpen(true);
//   //   const handleClose = () => setOpen(false);

//   return (
//     <Card variant="outlined" sx={{ height: "100%" }}>
//       <CardContent>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="flex-start"
//           mb={1}
//         >
//           <Typography variant="subtitle1" fontWeight={600}>
//             {asset.name}
//           </Typography>
//           <Chip
//             label={asset.risk}
//             size="small"
//             color={RISK_COLOR[asset.risk]}
//             variant="outlined"
//           />
//         </Stack>

//         <Stack spacing={0.5} mb={2}>
//           <Typography variant="body2" color="text.secondary">
//             Start NAV: {nav?.startPrice ? `$ ${nav.startPrice}` : "—"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             End NAV: {nav?.endPrice ? `$ ${nav.endPrice}` : "—"}
//           </Typography>
//         </Stack>

//         <Stack spacing={1.5}>
//           <TextField
//             type="number"
//             name="quantity"
//             label="Amount"
//             size="small"
//             fullWidth
//             value={quantity}
//             onChange={(e) => onQuantityChange(asset.code, e.target.value)}
//           />

//           <ToggleButtonGroup
//             value={action}
//             exclusive
//             fullWidth
//             size="small"
//             onChange={(_, newAction) => onActionChange(asset.code, newAction)}
//           >
//             <ToggleButton value="BUY">Buy</ToggleButton>
//             <ToggleButton value="SELL">Sell</ToggleButton>
//           </ToggleButtonGroup>
//         </Stack>
//       </CardContent>

//       <CardActions>
//         <Button size="small" onClick={handleOpen}>
//           Fund Details
//         </Button>

//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="fund-detail-title"
//           aria-describedby="fund-detail-description"
//         >
//           <Box sx={modalStyle}>
//             <Typography id="fund-detail-title" variant="h5" gutterBottom>
//               {asset.name}
//             </Typography>

//             <Chip
//               label={`${asset.risk} RISK`}
//               color={RISK_COLOR[asset.risk]}
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             <Typography id="fund-detail-description" color="text.secondary" gutterBottom>
//               {RISK_DESCRIPTION[asset.risk]}
//             </Typography>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="body2" color="text.secondary">
//               Scheme Code: {asset.code}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Current Order: {action ?? "HOLD"} {quantity && `(${quantity})`}
//             </Typography>

//             <Button onClick={handleClose} sx={{ mt: 3 }} fullWidth variant="outlined">
//               Close
//             </Button>
//           </Box>
//         </Modal>
//       </CardActions>
//     </Card>
//   );
// }
