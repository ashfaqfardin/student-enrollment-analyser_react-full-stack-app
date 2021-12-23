import React, { useEffect, useState } from "react";
import "./AvailableResourceSummery.css";
import axios from "axios";
import DataTable from "../../components/table/DataTable";

export default function AvailableResourceSummeries() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    axios.get(`/available-resources`).then((response) => {
      setData(response.data);
    });

    axios.get(`/available-resources-summary`).then((response) => {
      setData2(response.data);
    });
  }, []);

    const header = [
      "Class size",
      "IUB resource",
      "Capacity"
    ];

    const header2 = [
      "            ",
      "Total capacity",
    ];

  return (
    <div className="aResourse_summeries_pageContainer">
      <div className="aResourse_summeries_tbl_container">
        <div className="ars_table1_container">
          <DataTable data={data} header={header}></DataTable>
        </div>
        <div className="ars_table2_container">
          <DataTable data={data2} header={header2}></DataTable>
        </div>
      </div>
    </div>
  );
}
