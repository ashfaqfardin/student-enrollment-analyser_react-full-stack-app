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

export default function LineChart1({ data}) {
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
          dataKey="SBE"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line  dataKey="SETS" stroke="red" strokeWidth={2}/>
        <Line  dataKey="SELS" stroke="green" strokeWidth={2}/>
        <Line  dataKey="SLASS" stroke="orange" strokeWidth={2}/>
        <Line  dataKey="SPPH" stroke="blue" strokeWidth={2}/>
        <Line  dataKey="Total" stroke="gray" strokeWidth={2}/>
      </LineChart>
    </div>
  );
}
