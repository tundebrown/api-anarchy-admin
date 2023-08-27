import React, { useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUsersByModeQuery } from "../../state/api";
import WidgetSummary from "../../components/WidgetSummary";
import FriendsChart from "../../components/FriendsChart";
import FriendsList from "../../components/FriendsList";
// import { Helmet } from 'react-helmet-async';
import { faker } from "@faker-js/faker";
import Iconify from "../../components/Iconify";

import Header from "../../components/Header";
import GamePlayStats from "../../components/GamePlayStats";
import UserInfo from "../../components/UserInfo";
import ModePieChart from "../../components/ModePieChart";

const MatchStats = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // const { id } = useParams();
  // const [data, setData] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  // console.log("The user id is: " + id);

  const { data, isLoading } = useGetUsersByModeQuery();

  // console.log(data)

  if (isLoading) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Loading" subtitle="" />
      </Box>
    );
  }

  //   friendsId, status, friendsUsernames, username

  if (data) {
    // setUserStats(data.userStats[0]);
    // setUserInfo(data.userInfo)
    console.log(data?.userbymode);

    return (
      <Box m="1.5rem 2.5rem">
        <Header
          title="Match Statistics"
          subtitle=""
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <FriendsChart
              title="Match Mode Chart"
              //   subheader="(+43%) than last year"
              chartLabels={[
                "01/01/2023",
                "02/01/2023",
                "03/01/2023",
                "04/01/2023",
                "05/01/2023",
                "06/01/2023",
                "07/01/2023",
                "08/01/2023",
                // "09/01/2023",
                // "10/01/2023",
                // "11/01/2023",
              ]}
              chartData={[
                {
                  name: "DeathMatch",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21],
                },
                {
                  name: "Battle Royale",
                  type: "area",
                  fill: "gradient",
                  data: [28, 71, 31, 53, 29, 40, 18, 49],
                },
                {
                  name: "Mission",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <ModePieChart
              title="Match Mode User %"
              chartData={data?.userbymode}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>

        {/* <Header title="User Info" subtitle="" /> */}
      </Box>
    );
  }

  if (!data) {
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

export default MatchStats;
