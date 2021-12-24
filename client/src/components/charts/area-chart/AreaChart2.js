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
          stroke="red"
          fill="red"
        />
        <Area
          
          dataKey="EEE"
          stackId="2"
          stroke="Green"
          fill="Green"
        />
        <Area
          
          dataKey="PS"
          stackId="3"
          stroke="blue"
          fill="blue"
        />
        <Legend verticalAlign="bottom" height={36}/>
      </AreaChart>
    </div>
  );
}
