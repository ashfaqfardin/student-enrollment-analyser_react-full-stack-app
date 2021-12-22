import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/table/DataTable";
import './ClassDist.css';
import BarChart1 from "../../components/charts/bar-chart/BarChart1";

export default function ClassDistribution() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/class-size-distributions/spring/2020").then((response) => {
      setData(response.data);
    });
  }, []);

  console.log(data)
  const header = ["Enrollment", "SBE", "SELS", "SETS","SLASS","SPPH","Total"];
  return (
    <div>
      <div className="page-container">
        <div className="table_container">
          <DataTable data={data} header={header}></DataTable>
        </div>
        <div>
          <BarChart1></BarChart1>
        </div>
      </div>
    </div>
  );
}
