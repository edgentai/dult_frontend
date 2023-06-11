import React from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts";

const data = [
  { name: "Ticketing Issue", value1: 8, value2: 4, value3: 6, value4: 8 },
  { name: "Crew", value1: 4, value2: 8, value3: 12, value4: 16 },
  { name: "Vehicle related", value1: 6, value2: 12, value3: 18, value4: 24 },
  { name: "Route", value1: 5, value2: 10, value3: 15, value4: 20 },
  { name: "Pass seat", value1: 7, value2: 14, value3: 21, value4: 28 },
];

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"]; // Custom colors for each bar chart

const StackedBarChart = () => {
  return (
    <BarChart width={500} height={300} data={data} layout="vertical">
      <XAxis type="number" orientation="top" />
      <YAxis type="category" dataKey="name" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value1" stackId="a" fill={colors[0]} />
      <Bar dataKey="value2" stackId="a" fill={colors[1]} />
      <Bar dataKey="value3" stackId="a" fill={colors[2]} />
      <Bar dataKey="value4" stackId="a" fill={colors[3]} />
    </BarChart>
  );
};

export default StackedBarChart;
