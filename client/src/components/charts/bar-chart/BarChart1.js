import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line
} from "recharts";

export default function BarChart1({ data }) {
  
  return (
    <div>
      <ComposedChart
        width={500}
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
        <XAxis dataKey="enrollment"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="SBE" fill="#FF5396" background={{ fill: "#eee" }} />
        <Bar dataKey="SELS" fill="#DDBBFF" />
        <Bar dataKey="SETS" fill="green" />
        <Bar dataKey="SLASS" fill="orange" />
        <Bar dataKey="SPPH" fill="#19697b" />
        <Line type="monotone" dataKey="TOTAL" stroke="#ff7300" />
        </ComposedChart>
    </div>
  );
}
