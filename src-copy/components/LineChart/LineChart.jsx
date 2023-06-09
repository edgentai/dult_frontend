import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const series = [
  {
    name: "Series 1",
    data: [
      { category: "01 APR", value: 0 },
      { category: "02 APR", value: 4 },
      { category: "03 APR", value: 2 },
      { category: "04 APR", value: 4 },
      { category: "05 APR", value: 2 },
      { category: "06 APR", value: 4 },
      { category: "07 APR", value: 2 }
    ]
  },{
    name: "Series 2",
    data: [
      { category: "01 APR", value: 0 },
      { category: "02 APR", value: 5 },
      { category: "03 APR", value: 2 },
      { category: "04 APR", value: 6 },
      { category: "05 APR", value: 3 },
      { category: "06 APR", value: 6 },
      { category: "07 APR", value: 3 }
    ]
  }
];

export default function App() {
  return (
    <LineChart width={500} height={300}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="category"
        type="category"
        allowDuplicatedCategory={false}
      />
      <YAxis dataKey="value" />
      <Tooltip />
      <Legend />
      {series.map((s) => (
        <Line dataKey="value" data={s.data} name={s.name} key={s.name} />
      ))}
    </LineChart>
  );
}
