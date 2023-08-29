import React, { useState } from "react";

import { Box, useTheme, Grid} from "@mui/material";
import { useGetOverallUserStatsQuery } from "../../state/api";
import { useGetUsersByCountryQuery } from "../../state/api";

import Header from "../../components/Header";
import MapWithCountryChart from '../../components/MapWithCountryChart';
import HighScore from "../../components/HighScore";

const UserStats = () => {
  const { data, isLoading } = useGetOverallUserStatsQuery();
  // const { dataCountry, isLoadingDataCountry } = useGetUsersByCountryQuery();

  let userStatistics = data && data?.countrydata;


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

  if (data.data[0]) {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USERS STATISTICS" subtitle="Users by country" />

      <MapWithCountryChart userStatistics={userStatistics} />

      <Grid mt={2} item xs={12} md={6} lg={8}>
            <HighScore
              title="High Score (By Kills)"
              subheader=""
              chartData={data.data}
            />
          </Grid>

      {/* <Header title="USER STATISTICS" subtitle="Users by country" /> */}
    </Box>
  );
};


if(!data.data[0]){
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="USERS STATISTICS"
        subtitle="No data found"
      />
    </Box>
  );
}
}

export default UserStats;
