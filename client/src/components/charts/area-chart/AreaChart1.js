import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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
        <Legend verticalAlign="bottom" height={36}/>
        <Area
          dataKey="SBE"
          stackId="1"
          stroke="red"
          fill="red"
        />
        <Area
          dataKey="SETS"
          stackId="1"
          stroke="green"
          fill="green"
        />
        <Area
          
          dataKey="SELS"
          stackId="1"
          stroke="Blue"
          fill="Blue"
        />
        <Area
          
          dataKey="SLASS"
          stackId="1"
          stroke="orange"
          fill="orange"
        />
        <Area
          
          dataKey="SPPH"
          stackId="1"
          stroke="gray"
          fill="gray"
        />
        <Area
          
          dataKey="Total"
          stackId="1"
          stroke="#F7CAAC"
          fill="#F7CAAC"
        />
      </AreaChart>
    </div>
  );
}
