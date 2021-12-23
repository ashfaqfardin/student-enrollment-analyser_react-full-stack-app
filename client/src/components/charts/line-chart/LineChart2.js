import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LineChart2({ data}) {
  return (
    <div>
      <LineChart
        width={1020}
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
        <Line
          dataKey="CSE"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line  dataKey="EEE" stroke="red" strokeWidth={2}/>
        <Line  dataKey="PS" stroke="green" strokeWidth={2}/>
      </LineChart>
    </div>
  );
}
