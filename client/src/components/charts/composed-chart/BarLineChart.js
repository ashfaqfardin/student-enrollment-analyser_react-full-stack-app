import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export default function BarLineChart({ data }) {
  
  return (
    <div>
      <ComposedChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Semester" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="DIFFERENCE" barSize={20} fill="Orange" />
        <Line dataKey="Total" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
}
