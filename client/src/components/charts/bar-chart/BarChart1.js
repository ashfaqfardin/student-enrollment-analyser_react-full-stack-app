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

export default function BarChart1() {
  const data = [
    {
        "enrollment": "1-10",
        "SBE": 6,
        "SELS": 26,
        "SETS": 54,
        "SLASS": 58,
        "SPPH": 12,
        "TOTAL": 156
    },
    {
        "enrollment": "11-20",
        "SBE": 15,
        "SELS": 33,
        "SETS": 69,
        "SLASS": 61,
        "SPPH": 53,
        "TOTAL": 231
    },
    {
        "enrollment": "21-30",
        "SBE": 23,
        "SELS": 31,
        "SETS": 48,
        "SLASS": 44,
        "SPPH": 9,
        "TOTAL": 155
    },
    {
        "enrollment": "31-35",
        "SBE": 25,
        "SELS": 9,
        "SETS": 59,
        "SLASS": 25,
        "SPPH": 13,
        "TOTAL": 131
    },
    {
        "enrollment": "36-40",
        "SBE": 43,
        "SELS": 12,
        "SETS": 43,
        "SLASS": 38,
        "SPPH": 2,
        "TOTAL": 138
    },
    {
        "enrollment": "41-50",
        "SBE": 84,
        "SELS": 16,
        "SETS": 44,
        "SLASS": 31,
        "SPPH": 0,
        "TOTAL": 175
    },
    {
        "enrollment": "51-55",
        "SBE": 21,
        "SELS": 2,
        "SETS": 22,
        "SLASS": 7,
        "SPPH": 0,
        "TOTAL": 52
    },
    {
        "enrollment": "56-60",
        "SBE": 0,
        "SELS": 2,
        "SETS": 3,
        "SLASS": 1,
        "SPPH": 0,
        "TOTAL": 6
    },
    {
        "enrollment": "60+",
        "SBE": 1,
        "SELS": 0,
        "SETS": 1,
        "SLASS": 0,
        "SPPH": 0,
        "TOTAL": 2
    }
]
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
        <Bar dataKey="SBE" fill="#8884d8" background={{ fill: "#eee" }} />
        <Bar dataKey="SELS" fill="#82ca9d" />
        <Bar dataKey="SETS" fill="#82ca9d" />
        <Bar dataKey="SLASS" fill="#82ca9d" />
        <Bar dataKey="SPPH" fill="#82ca9d" />
        <Line type="monotone" dataKey="TOTAL" stroke="#ff7300" />
        </ComposedChart>
    </div>
  );
}
