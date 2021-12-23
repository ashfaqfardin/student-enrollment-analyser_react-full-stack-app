import React, { useEffect, useState } from "react";
import './RevenueOfSchools.css'
import axios from "axios";
import DataTable from "../../components/table/DataTable";
import LineChart1 from "../../components/charts/line-chart/LineChart1";
import AreaChart1 from "../../components/charts/area-chart/AreaChart1";
import BarLineChart from "../../components/charts/composed-chart/BarLineChart";

export default function RevenueOfSchools() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get("/revenue-of-schools").then((response) => {
        setData(response.data);
    });
  }, []);

  const header = [
    "YearNthSemester",
    "SBE",
    "SETS",
    "SELS",
    "SLASS",
    "SPPH",
    "Total",
    "Change%"
  ];
  return (
    <div className="school_revenue_pageContainer">

      <div className="school_revenue_tblChart_container">
        <div className="table_container">
          <DataTable data={data} header={header}></DataTable>
        </div>
        <div className="lineChart_container">
            <LineChart1 data={data}></LineChart1>
        </div>
        <div className="areaChart_container">
            <AreaChart1 data={data}></AreaChart1>
        </div>
        <div className="barLineChart_container">
            <BarLineChart data={data}></BarLineChart>
        </div>
        
      </div>
    </div>
  );
}
