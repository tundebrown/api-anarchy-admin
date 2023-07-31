import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Guests from "./pages/guest";
import Match from "./pages/match";
import Locations from "./pages/locations";
import UserStats from "./pages/userstats";
import GuestStats from "./pages/gueststats";
import MatchStats from "./pages/matchstats";
import Admin from "./pages/admin";
// import Customers from "./pages/customers";
// import Transactions from "scenes/transactions";
// import Geography from "scenes/geography";
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
// import Performance from "scenes/performance";

function App() {
  const mode = useSelector((state) => state.global.mode); // from react redux to grab the global state
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/guest" element={<Guests />} />
              <Route path="/match" element={<Match />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/userstats" element={<UserStats />} />
              <Route path="/gueststats" element={<GuestStats />} />
              <Route path="/matchstats" element={<MatchStats />} />
              <Route path="/admin" element={<Admin />} />
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
