import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";

import Header from "../../components/Header";

const UserStats = () => {


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USER STATISTICS" subtitle="Statistics of top ranking users" />

    </Box>
  );
};

export default UserStats;
