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

//0088FE", "#00C49F", "#FFBB28", "#FF8042", "#854262", "#DE3163","purple","violet","green","#red"


export default function LineChart1({ data}) {
  return (
    <div>
      <LineChart
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
        <Line
          dataKey="SBE"
          stroke="#00C49F"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line  dataKey="SETS" stroke="#FFBB28" strokeWidth={2}/>
        <Line  dataKey="SELS" stroke="#FF8042" strokeWidth={2}/>
        <Line  dataKey="SLASS" stroke="#854262" strokeWidth={2}/>
        <Line  dataKey="SPPH" stroke="#DE3163" strokeWidth={2}/>
        <Line  dataKey="Total" stroke="gray" strokeWidth={2}/>
      </LineChart>
    </div>
  );
}
