import React from "react";

export default function DataTable({ data, header }) {
  
  let dataM = [];
  data.forEach((e) => {
    dataM.push(Object.values(e));
  });


  return (
    <div>
      <table>
      <thead>
          <tr>
          {
              header.map((row)=>(
                <th key={row}>{row}</th>
              ))
          }
        </tr>
        </thead>
        <tbody>
        {
            dataM.map((row)=>(
                <tr>
                    {
                        row.map(col=>(
                            <td key={col}>{col}</td>
                            ))
                    }
                </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  );
}
