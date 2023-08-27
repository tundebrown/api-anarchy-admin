import { Box, Grid, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// import "./pieChartBox.scss";

const data = [
  { name: "Mobile", value: 400, color: "#0088FE" },
  { name: "Desktop", value: 300, color: "#00C49F" },
  { name: "Laptop", value: 300, color: "#FFBB28" },
  { name: "Tablet", value: 200, color: "#FF8042" },
];

const SingleUserPieChart = () => {
  return (
    <Box>
      <Typography>Leads by Source</Typography>
      <Box className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Grid container spacing ={2}>
        {data.map((item) => (
          <Box key={item.name}>
            <Box>
              <Box style={{ backgroundColor: item.color }} />
              <Typography>{item.name}</Typography>
            </Box>
            <Typography>{item.value}</Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default SingleUserPieChart;