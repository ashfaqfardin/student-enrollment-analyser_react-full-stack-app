import React from "react";
import "./piChart.css";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#854262", "#DE3163","purple","violet","green","#red"];

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
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <h5 style={{paddingLeft:"115px",color:"#0854DA"}}>Class-size 06</h5>
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
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <h5 style={{paddingLeft:"115px",color:"#0854DA"}}>Class-size 07</h5>
      </div>
    </div>
  );
}
