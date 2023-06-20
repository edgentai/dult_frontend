import React from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts";

const data = [
  { name: "Ticketing Issue", value1: 12, value2: 10, value3: 8, value4: 7, value5: 5, value6: 3 },
  { name: "Crew behaviour", value1: 14, value3: 10 },
  { name: "Vehicle related", value2: 8, value1: 6 },
  { name: "Route", value4: 15 },
  { name: "Pass/reserved seat", value5: 16 },
  { name: "Facility related", value2: 14 },
  { name: "App/website related", value1: 5 },
  { name: "Others", value6: 3 },
];

const colors = ["#F6828C", "#F6E382", "#9182F6", "#F682EA", "#064A94", "#007AFF"];

const StackedBarChart = () => {
  return (
    <BarChart width={1000} height={300} data={data} layout="vertical">
      <XAxis type="number" orientation="top" />
      <YAxis type="category" dataKey="name" margin={{ left: 20 }} />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="value1" stackId="a" fill={colors[0]} barGap={40} />
      <Bar dataKey="value2" stackId="a" fill={colors[1]} barGap={10} />
      <Bar dataKey="value3" stackId="a" fill={colors[2]} barGap={10} />
      <Bar dataKey="value4" stackId="a" fill={colors[3]} barGap={10} />
      <Bar dataKey="value5" stackId="a" fill={colors[4]} barGap={10} />
      <Bar dataKey="value6" stackId="a" fill={colors[5]} barGap={10} />
    </BarChart>
  );
};

export default StackedBarChart;
