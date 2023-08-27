import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  Person,
  Settings,
  LocationOn,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "../../state/api";
import StatBox from "../../components/StatBox";
import { fToNow } from '../../utils/formatTime';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();


  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);


  };

  const handleUserReport = () => {
    navigate("/users");
  }

  const handleFriendReport = () => {
    navigate("/friendship");
  }

  const handleMatchReport = () => {
    navigate("/match");
  }



  const columns = [
    {
      field: "_id",
      headerName: '#', 
      filterable: false,
      renderCell:(index) => index.api.getRowIndex(index.row._id) + 1
    },
    {
      field: "username",
      headerName: "User Name",
      flex: 1,
    },
    {
      field: "walletAddress",
      headerName: "Wallet",
      flex: 1,
    },
    {
      field: "appversion",
      headerName: "App Version",
      flex: 1,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 1,
      renderCell: (params) => {
        const formattedDate = fToNow(params.row.createdAt); // Calculate array length here
        return <span>{formattedDate}</span>;
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to Anarchy API dashboard" />

        <Box>
          <Button
          onClick={handleClick}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",

              "&:hover": { color: theme.palette.secondary.light, border: "solid", borderColor: theme.palette.secondary.light, borderWidth: "1px" },
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
          
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleUserReport}>User Report</MenuItem>
              <MenuItem onClick={handleFriendReport}>Friends Report</MenuItem>
              <MenuItem onClick={handleMatchReport}>Match Report</MenuItem>
            </Menu>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Users"
          value={data && data.totalUsers}
          increase="+2%"
          description="Since last month"
          icon={
            <Person
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Active Users"
          // value={data && data.totalGuest}
          value={data && data.totalActiveUsers}
          increase="+1%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box> */}
        <StatBox
          title="Friends Created"
          // value={data && data.totalMatch}
          value={data && data.totalFriendship}
          increase="+3%"
          description="Since last month"
          icon={
            <Settings
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Games Played"
          // value={data && data.totalCountries}
          value={data && data.totalGameplayed}
          increase="+1%"
          description="Since last month"
          icon={
            <LocationOn
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
  
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <Header title="" subtitle="Users" />
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.users) || []}
            columns={columns}
          />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
