import React, { useEffect, useState } from "react";
import './ResourceSummeries.css';
import axios from "axios";
import DataTable from "../../components/table/DataTable";

export default function ResourceSummeries() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [semesterNyear, setsemesterNyear] = useState([]);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

  const handleBtnSubmit = () => {
    axios.get(`/usage-of-resources/${semester}/${year}`).then((response) => {
      setData(response.data);
    });

    axios.get(`/usage-of-resources-summary/${semester}/${year}`).then((response) => {
        setData2(response.data);
      });
    
  };


  useEffect(() => {
    axios.get("/semesters&Years-on-database").then((response) => {
      setsemesterNyear(response.data);
    });
  }, []);



  const header = [
    "          ",
    "Sum",
    "Avg Enroll",
    "Avg Room",
    "Difference",
    "Unused%"
  ];

  const header2 = [
    "          ",
    `${semester}`
  ];

  console.log(data);
  return (
    <div className="resourse_summeries_pageContainer">
      <div className="resourse_summeries_dropDown_bar_container">
        <select
          className="dropDown_bar"
          onChange={(e) => {
            setSemester(e.target.value.split(",")[0]);
            setYear(e.target.value.split(",")[1]);
          }}
        >
          <option>Choose semester & year</option>
          {semesterNyear.map((item) => (
            <option
              key={item.semester + item.year}
              value={[item.semester, item.year]}
            >
              {item.semester + " " + item.year}
            </option>
          ))}
        </select>

        <button className="btn" onClick={handleBtnSubmit}>
          View Reports
        </button>
      </div>

      <div className="resourse_summeries_tbl_container">
        <div className="rs_table1_container">
         <h4>Usage of the resources</h4>
          <DataTable data={data} header={header}></DataTable>
        </div>
        <div className="rs_table2_container">
         <h4>Summeries</h4>
          <DataTable data={data2} header={header2}></DataTable>
        </div>
      </div>
    </div>
  );
}
