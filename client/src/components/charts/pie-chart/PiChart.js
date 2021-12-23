import React from "react";
import "./piChart.css";
import { PieChart, Pie,Legend, Tooltip } from "recharts";

export default function PiChart({ data }) {
  return (
    <div className="pi_container">
      
      <div className="pi_sub-container s">
        <PieChart width={320} height={270}>
          <Pie
            dataKey="classroom6"
            isAnimationActive={true}
            data={data}
            cx={150}
            cy={150}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
      <div className="pi_sub-container l">
        <PieChart width={320} height={270}>
          <Pie
            dataKey="classroom7"
            isAnimationActive={true}
            data={data}
            cx={150}
            cy={150}
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
