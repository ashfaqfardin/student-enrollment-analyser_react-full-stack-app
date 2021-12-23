import React from "react";
import "./DataTable.css";

export default function DataTable({ data, header }) {
  let dataM = [];
  data.forEach((e) => {
    dataM.push(Object.values(e));
  });

  return (
    <div className="table_layout">
      <table>
        <tbody>
          <tr className="tr">
            {header.map((row) => (
              <th className="cell" key={row}>{row}</th>
            ))}
          </tr>

          {dataM.map((row) => (
            <tr className="tr" key={row}>
              {row.map((col) => (
                <td className="cell" key={col}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
