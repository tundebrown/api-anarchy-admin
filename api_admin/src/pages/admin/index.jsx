import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";

import Header from "../../components/Header";
import { AddModerator } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useGetAdminQuery } from "../../state/api";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";


const Admin = () => {
  const theme = useTheme();

  let navigate = useNavigate();
  const handleAddAdmin = () => {
    let path = `/createadmin`;
    navigate(path);
  };

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAdminQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: '#', 
      filterable: false,
      renderCell:(index) => index.api.getRowIndex(index.row._id) + 1
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
      sortable: false,
    },
    {
      field: "isAdmin",
      headerName: "Role",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ADMIN" subtitle="list of all admin and their roles" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",

              "&:hover": { color: theme.palette.secondary.light, border: "solid", borderColor: theme.palette.secondary.light, borderWidth: "1px" },
            }}
            onClick={handleAddAdmin}
          >
            <AddModerator sx={{ mr: "10px" }} />
            Create Admin
          </Button>
        </Box>
      </FlexBetween>

      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            backgroundColor: theme.palette.primary.light,
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
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.admins) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
