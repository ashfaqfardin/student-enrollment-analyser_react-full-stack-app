import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


export default function AreaChart1({data}) {
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
          
          dataKey="SBE"
          stackId="1"
          stroke="#8884d8"
          fill="red"
        />
        <Area
          
          dataKey="SETS"
          stackId="2"
          stroke="#82ca9d"
          fill="blue"
        />
        <Area
          
          dataKey="SELS"
          stackId="3"
          stroke="#ffc658"
          fill="orange"
        />
        <Area
          
          dataKey="SLASS"
          stackId="4"
          stroke="#ffc658"
          fill="green"
        />
        <Area
          
          dataKey="SPPH"
          stackId="5"
          stroke="#ffc658"
          fill="gray"
        />
        <Area
          
          dataKey="Total"
          stackId="6"
          stroke="#ffc658"
          fill="tomato"
        />
      </AreaChart>
    </div>
  );
}
