import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClassroomRequirement.css";
import DataTable from "../../components/table/DataTable";
import PiChart from "../../components/charts/pie-chart/PiChart";

export default function ClassroomRequirement() {
  const [data, setData] = useState([]);
  const [semesterNyear, setSemesterNyear] = useState([]);
  // const [semester, setSemester] = useState("");
  // const [year, setYear] = useState("");
  let semester, year;


  const handleSubmit = () => {
    axios
      .get(`/classroom-requirements-data/${semester}/${year}`)
      .then((response) => {
        setData(response.data);
      });
  };



  useEffect(() => {
    axios.get("/semesters&Years-on-database").then((response) => {
      setSemesterNyear(response.data);
    });
  }, []);


  const header = ["Class Size", "Sections", "Classroom-6", "Classroom-7"];
  

  return (
    <div className="page-container">

      <div className="dropDown_container">
        <select
           className="dropDown_bar"
           onChange={(e) => {
            semester = e.target.value.split(",")[0];
            year = e.target.value.split(",")[1];
          }}
        >
          <option>Choose semester & year</option>
          {semesterNyear.map((item) => (
            <option className="option_sec"
              value={[item.semester, item.year]}>
              {item.semester +" "+ item.year}
            </option>
          ))}
        </select>
        <button className="btn"onClick={handleSubmit}>View Reports</button>
      </div>


      <div className="tbl_Chart-container">

        <div className="table_container">
          <h4>Classroom requirement as per course offering (Summary)</h4>
          <DataTable data={data} header={header}></DataTable>
        </div>

        <div className="chart_container">
          <PiChart data={data.slice(0, -1)}></PiChart>
        </div>

      </div>


    </div>
  );
}
