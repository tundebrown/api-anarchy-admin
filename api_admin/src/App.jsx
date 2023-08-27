import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Friendships from "./pages/friendships";
import Guests from "./pages/guest";
import Match from "./pages/match";
import Locations from "./pages/locations";
import UserStats from "./pages/userstats";
import GuestStats from "./pages/gueststats";
import MatchStats from "./pages/matchstats";
import Admin from "./pages/admin";
import Login from "./pages/login";
import CreateAdmin from "./pages/createadmin";
import SingleUserStats from "./pages/singleuserstats";
import SingleFriendStats from "./pages/singlefriendstats";
import GlobalContext from "./GlobalContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PageNotFound from "./components/PageNotFound";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";

function App() {
  const mode = useSelector((state) => state.global.mode); // from react redux to grab the global state
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [adminData, setAdminData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/authadmin`,
      }).then((res) => {
        if (res.data) {
          setAdminData(res.data);
          setIsLoggedIn(true);
          // console.log(res.data);
        }
      });
    };

    getUser();
  }, []);
  // console.log(isLoggedIn);

  // const contextValue = {
  //   firstName: "Brown",
  //   lastName: "Tunde",
  //   email: "tunde@gmail.com",
  //   role: "super-admin",
  // };
  return (
    <div className="app">
      <GlobalContext.Provider value={adminData}>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route element={<Layout />}>
                {isLoggedIn === true ? (
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                ) : null}
                {isLoggedIn ? (
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                ) : null}
                {isLoggedIn ? (
                  <Route path="/dashboard" element={<Dashboard />} />
                ) : null}
                {isLoggedIn ? (
                  <Route path="/users" element={<Users />} />
                ) : null}
                {isLoggedIn ? (
                  <Route path="/guest" element={<Guests />} />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/match" element={<Match />} />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/locations" element={<Locations />} />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/userstats" element={<UserStats />} />
                ) : null}

                {isLoggedIn ? (
                  <Route
                    path="/singleuserstats/:id"
                    element={<SingleUserStats />}
                  />
                ) : null}

{isLoggedIn ? (
                  <Route
                    path="/singlefriendstats/:id"
                    element={<SingleFriendStats />}
                  />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/gueststats" element={<GuestStats />} />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/matchstats" element={<MatchStats />} />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/admin" element={<Admin />} />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/createadmin" element={<CreateAdmin />} />
                ) : null}

                {isLoggedIn ? (
                  <Route path="/friendship" element={<Friendships />} />
                ) : null}
              </Route>

              {isLoggedIn === false ? (
                <Route path="/login" element={<Login />} />
              ) : null}
              {isLoggedIn === false ? (
                <Route path="/" element={<Navigate to="/login" replace />} />
              ) : null}
              {isLoggedIn === false ? (
                <Route path="*" element={<Navigate to="/login" replace />} />
              ) : null}
            </Routes>
          </ThemeProvider>
        </HashRouter>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
