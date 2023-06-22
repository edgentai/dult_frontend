import React from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts";

const data = [
  { name: "Ticketing Issue", value1: 12 },
  { name: "Crew behaviour", value1: 14 },
  { name: "Vehicle related", value2: 8 },
  { name: "Route", value4: 15 },
  { name: "Pass/reserved seat", value5: 16 },
  { name: "Facility related", value2: 14 },
  { name: "App/website related", value1: 5 },
  { name: "Others", value6: 3 },
];

const colors = ["#F6828C"];

const SimpleBarChart = () => {
  return (
    <BarChart width={800} height={400} data={data} layout="vertical">
      <XAxis type="number" orientation="top" />
      <YAxis type="category" dataKey="" margin={{ left: 20 }} />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="value1" stackId="a" fill={colors[0]} barGap={40} />
      <Bar dataKey="value2" stackId="a" fill={colors[0]} barGap={10} />
      <Bar dataKey="value3" stackId="a" fill={colors[0]} barGap={10} />
      <Bar dataKey="value4" stackId="a" fill={colors[0]} barGap={10} />
      <Bar dataKey="value5" stackId="a" fill={colors[0]} barGap={10} />
      <Bar dataKey="value6" stackId="a" fill={colors[0]} barGap={10} />
    </BarChart>
  );
};

export default SimpleBarChart;
