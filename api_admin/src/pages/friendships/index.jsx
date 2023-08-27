import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Popover, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUserQuery } from "../../state/api";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom";
import Iconify from "../../components/Iconify";

const renderUserStatButton = (params) => {
  const navigate = useNavigate();
  return (
      <strong>
          <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                  console.log(params.row._id)
                  navigate(`/singlefriendstats/${params.row._id}`)
              }}
          >
              Friend Details
          </Button>
      </strong>
  )
}

const actionMenu = (params) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleEdit = () =>{
      console.log(params.row._id)
  }

  const handleDelete = () =>{
    console.log(params.row._id)
  }
  return (
    <>
    <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
     <Popover
        open={Boolean(open)}
        anchorEl={open}
         onClose={handleCloseMenu}
         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
           sx: {
               p: 1,
               width: 140,
               '& .MuiMenuItem-root': {
               px: 1,
               typography: 'body2',
              borderRadius: 0.75,
             },
          },
         }}
       >
         <MenuItem onClick={handleEdit}>
           <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
           Edit
         </MenuItem>
    
         <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
           <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
           Delete
         </MenuItem>
       </Popover>
    </>
    )
  }

const Friendships = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetUserQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  console.log(data)


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
      field: "friends",
      headerName: "No of Friends",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const arrayLength = params.row.friends.length; // Calculate array length here
        return <span>{arrayLength}</span>;
      },
    },

    {
        field: 'lastUpdate',
        headerName: 'Action',
        width: 150,
        renderCell: renderUserStatButton,
        disableClickEventBubbling: true,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USERS" subtitle="Entire list of users" />
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
          rows={(data && data.users) || []}
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

export default Friendships;
