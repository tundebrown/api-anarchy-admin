import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const  PageNotFound = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        404
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        PAGE NOT FOUND!
      </Typography>
    </Box>
  );
};

export default PageNotFound;
