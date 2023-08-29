import React, { useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFriendInfoQuery } from "../../state/api";
import WidgetSummary from "../../components/WidgetSummary";
import FriendsChart from "../../components/FriendsChart";
import FriendsList from "../../components/FriendsList";
// import { Helmet } from 'react-helmet-async';
import { faker } from "@faker-js/faker";
import Iconify from "../../components/Iconify";

import Header from "../../components/Header";
import GamePlayStats from "../../components/GamePlayStats";
import UserInfo from "../../components/UserInfo";

const SingleFriendStats = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { id } = useParams();
  const [userStats, setUserStats] = useState({});
  const [userInfo, setUserInfo] = useState({});

  // console.log("The user id is: " + id);

  const { data, isLoading } = useGetFriendInfoQuery(id);

  // console.log(data)

  if (isLoading) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Loading" subtitle="" />
      </Box>
    );
  }

  //   friendsId, status, friendsUsernames, username

  if (data.dataOfFriends[0] && data.username) {
    // setUserStats(data.userStats[0]);
    // setUserInfo(data.userInfo)
    // console.log(data.userStats[0]);

    return (
      <Box m="1.5rem 2.5rem">
        <Header
          title="Friends Statistics and Information"
          subtitle={`Username: ${data && data.username}`}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <FriendsChart
              title="Friends Added"
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
                // {
                //   name: "Team A",
                //   type: "column",
                //   fill: "solid",
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: "Friends",
                  type: "area",
                  fill: "gradient",
                  data: [2, 7, 3, 5, 2, 1, 8, 4],
                },
                // {
                //   name: "Team C",
                //   type: "line",
                //   fill: "solid",
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <FriendsList
                  title={`friends of ${data && data.username}`}
                  list={[...data.dataOfFriends].map((_, index) => ({
                    id: faker.string.uuid(),
                    title: _.username,
                    description: _.status,
                    image: `/assets/images/avatars/avatar_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                  }))}
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={6}>
                
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>

        {/* <Header title="User Info" subtitle="" /> */}
      </Box>
    );
  }

  if (!data.dataOfFriends[0]) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header
          title="Friends Statistics and Information"
          subtitle="No friends found for this user"
        />
      </Box>
    );
  }
};

export default SingleFriendStats;
