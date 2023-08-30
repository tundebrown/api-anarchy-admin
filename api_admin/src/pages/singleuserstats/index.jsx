import React, { useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserStatsInfoQuery } from "../../state/api";
import WidgetSummary from "../../components/WidgetSummary";
import Iconify from "../../components/Iconify";

import Header from "../../components/Header";
import GamePlayStats from "../../components/GamePlayStats";
import UserInfo from "../../components/UserInfo";

const SingleUserStats = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { id } = useParams();
  const [userStats, setUserStats] = useState({});
  const [userInfo, setUserInfo] = useState({});

  // console.log("The user id is: " + id);

  const { data, isLoading } = useGetUserStatsInfoQuery(id);

  // console.log(data)

  if(isLoading){
    return (
      <Box m="1.5rem 2.5rem">
        <Header
          title="Loading"
          subtitle=""
        />
      </Box>
    );
  } 
  
  if (data?.userStats[0] && data?.userInfo[0]) {
    // setUserStats(data.userStats[0]);
    // setUserInfo(data.userInfo)
    // console.log(data.userStats[0]);

    return (
      <Box m="1.5rem 2.5rem">
        <Header
          title="User Statistics and Information"
          subtitle={`Username: ${data && data.userStats[0].username}`}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <WidgetSummary
              title="total Time Spent"
              total={`${data && data.userStats[0].totalTimeSpent} Hrs`}
              color="error"
              icon={"uiw:time"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WidgetSummary
              title="Total Deaths"
              total={data && data.userStats[0].totalDeaths}
              color="info"
              icon={"game-icons:death-skull"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WidgetSummary
              title="Total Kills"
              total={data && data.userStats[0].totalKills}
              color="warning"
              icon={"game-icons:overkill"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WidgetSummary
              title="Total Tokens"
              total={data && data.userStats[0].totalTokens}
              color="error"
              icon={"radix-icons:tokens"}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={4} sx={{ mt: 3 }}>
          <GamePlayStats
            title="User Gameplay Stats"
            chartLabels={["kills", "Deaths", "Time", "Tokens"]}
            chartData={[
              {
                name: "Death Match",
                data: [
                  data && data.userStats[0].totalKills,
                  data && data.userStats[0].totalDeaths,
                  data && data.userStats[0].totalTimeSpent,
                  data && data.userStats[0].totalTokens,
                ],
              },
              {
                name: "Battle Royale",
                data: [
                  301,
                  140,
                  380,
                  210,
                ],
              },
              {
                name: "Mission",
                data: [
                  201,
                  400,
                  280,
                  310,
                ],
              },
            ]}
            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
          />

          <UserInfo
            title="User Information"
            list={[
              {
                name: "Country",
                value: data && data.userInfo[0].country,
                icon: (
                  <Iconify icon={"ion:location"} color="#1877F2" width={32} />
                ),
              },
              {
                name: "State",
                value: data && data.userInfo[0].state,
                icon: (
                  <Iconify
                    icon={"gis:search-country"}
                    color="#DF3E30"
                    width={32}
                  />
                ),
              },
              {
                name: "Friends",
                value: data && data.userInfo[0].friends,
                icon: (
                  <Iconify
                    icon={"carbon:friendship"}
                    color="#006097"
                    width={32}
                  />
                ),
              },
              {
                name: "Status",
                value: data && data.userInfo[0].status,
                icon: (
                  <Iconify
                    icon={"fluent-mdl2:sync-status-solid"}
                    color={
                      data && data.userInfo[0].status === "Active"
                        ? "#1C9CEA"
                        : "#ff0000"
                    }
                    width={32}
                  />
                ),
              },
              {
                name: "Ip",
                value: data && data.userInfo[0].ip,
                icon: (
                  <Iconify
                    icon={"material-symbols:bring-your-own-ip-rounded"}
                    color="#006346"
                    width={32}
                  />
                ),
              },
              {
                name: "Devicetype",
                value: data && data.userInfo[0].devicetype,
                icon: (
                  <Iconify icon={"ri:device-fill"} color="#00f334" width={32} />
                ),
              },
            ]}
          />
        </Grid>

        {/* <Header title="User Info" subtitle="" /> */}
      </Box>
    );
  } 
  
  if(!data?.userStats[0] || !data?.userInfo[0]){
    return (
      <Box m="1.5rem 2.5rem">
        <Header
          title="User Statistics and Information"
          subtitle="No user info and stats for this user"
        />
      </Box>
    );
  }
};

export default SingleUserStats;
