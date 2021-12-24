import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function BarChart2({ data }) {
  
  return (
    <div>
      <ComposedChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="classsize"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="IUB_resources" fill="#4472c4" background={{ fill: "#eee" }} />
        <Bar dataKey="semester" fill="#ED7D31" />
        </ComposedChart>
    </div>
  );
}
