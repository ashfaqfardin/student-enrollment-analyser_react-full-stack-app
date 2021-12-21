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
          onChange={(e) => {
            semester = e.target.value.split(",")[0];
            year = e.target.value.split(",")[1];
          }}
        >
          <option>choose The semester here</option>
          {semesterNyear.map((item) => (
            <option value={[item.semester, item.year]}>
              {item.semester + item.year}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Get Data</button>
      </div>
      <div className="tbl_Chart-container">
        <div className="table_container">
          <DataTable data={data} header={header}></DataTable>
        </div>
        <div className="chart_container">
          <PiChart data={data.slice(0, -1)}></PiChart>
        </div>
      </div>
    </div>
  );
}
