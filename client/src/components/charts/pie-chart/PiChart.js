import React from "react";
import "./piChart.css";
import { PieChart, Pie,Legend, Tooltip } from "recharts";

export default function PiChart({ data }) {
  return (
    <div className="pi_container">
      <div className="pi_sub-container">
        <PieChart width={450} height={320}>
          <Pie
            dataKey="classroom6"
            isAnimationActive={true}
            data={data}
            cx={220}
            cy={170}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend verticalAlign="top" height={30}/>
        </PieChart>
      </div>
      <div className="pi_sub-container">
        <PieChart width={450} height={350}>
          <Pie
            dataKey="classroom7"
            isAnimationActive={true}
            data={data}
            cx={220}
            cy={170}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
