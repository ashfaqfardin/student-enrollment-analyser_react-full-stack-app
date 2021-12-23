import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


export default function AreaChart2({data}) {
  return (
    <div>
      <AreaChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Semester" />
        <YAxis />
        <Tooltip />
        <Area
          
          dataKey="CSE"
          stackId="1"
          stroke="#8884d8"
          fill="red"
        />
        <Area
          
          dataKey="EEE"
          stackId="2"
          stroke="#82ca9d"
          fill="blue"
        />
        <Area
          
          dataKey="PS"
          stackId="3"
          stroke="#ffc658"
          fill="orange"
        />
      </AreaChart>
    </div>
  );
}
