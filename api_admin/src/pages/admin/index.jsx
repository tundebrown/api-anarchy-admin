import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";

import Header from "../../components/Header";

const Admin = () => {


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMIN" subtitle="list of all admin and their roles" />

    </Box>
  );
};

export default Admin;
