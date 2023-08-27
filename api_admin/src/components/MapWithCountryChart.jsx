import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Box,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";
import { FixedSizeList } from "react-window";

const MapWithCountryChart = ({ userStatistics }) => {
  const [activeCountry, setActiveCountry] = useState(null);

  const chartData = {
    labels: userStatistics.map((stat) => stat.country),
    datasets: [
      {
        label: "Number of Users",
        data: userStatistics.map((stat) => stat.users),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  const Row = ({ index, style }) => (
    <div style={style}>
      {`${userStatistics[index].country}: ${userStatistics[index].users} users`}
    </div>
  );

  return (
    <Box>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userStatistics.map((stat, index) => (
          <Marker
            key={index}
            position={[stat.lat, stat.lng]}
            onClick={() => setActiveCountry(stat)}
          >
            <Popup>{`${stat.country}: ${stat.users} users`}</Popup>
          </Marker>
        ))}
        {activeCountry && (
          <Box mt={2}>
            <h3>Chart for {activeCountry.country}</h3>
            <Bar data={chartData} />
          </Box>
        )}
      </MapContainer>

      <Box
        mt={0}
        p={2}
        sx={{
          width: "100%",
          height: 200,
          //   maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            {/* <Paper>xs=2</Paper> */}
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Typography variant="h3" gutterBottom>
              Key
            </Typography>

            <FixedSizeList
              height={110}
              width={360}
              overscanCount={5}
              itemCount={userStatistics.length}
              itemSize={30}
            >
              {Row}
            </FixedSizeList>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            {/* <Paper>xs=2</Paper> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MapWithCountryChart;
