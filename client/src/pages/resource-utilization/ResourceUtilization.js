import React, { useEffect, useState } from "react";
import "./ResourceUtilization.css"
import axios from "axios";
import DataTable from "../../components/table/DataTable";
import BarChart2 from "../../components/charts/bar-chart/BarChart2";






export default function ResourceUtilization() {



  const [data, setData] = useState([]);
  const [semesterNyear, setsemesterNyear] = useState([]);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");





  const handleBtnSubmit = () => {
    axios.get(`/resources-utilization/${semester}/${year}`).then((response) => {
      setData(response.data);
    });
    
  };




  useEffect(() => {
    axios.get("/semesters&Years-on-database").then((response) => {
      setsemesterNyear(response.data);
    });
  }, []);



  const header = ["Class size", "IUB resource",  `${semester}`, "Difference"];

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

      <div className="resourceUtilization_tbl_container">
        <div className="ru_table1_container">
          <h4>Availability and course offering comparison</h4>
          <DataTable data={data} header={header}></DataTable>
        </div>
        <div className="ru_chart_container">
          <h4>Resource utilization in {semester +" "+ year}</h4>
          <BarChart2 data={data} ></BarChart2>
        </div>
      </div>
    </div>
  );
}
