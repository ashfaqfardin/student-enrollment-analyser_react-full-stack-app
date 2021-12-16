import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClassroomRequirement.css";
import DataTable from "../../components/table/DataTable";
import Pie_Chart from "../../components/charts/pie-chart/Pie_Chart";

export default function ClassroomRequirement() {
  const [data, setData] = useState([]);
  const [semesterNyear, setSemesterNyear] = useState([]);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

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
      <div>
        <select
          onChange={(e) => {
            setSemester(e.target.value.split(",")[0]);
            setYear(e.target.value.split(",")[1]);
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
      <div className="table_container">
        <DataTable data={data} header={header}></DataTable>
      </div>
      <div className="chart_container">
        <Pie_Chart></Pie_Chart>
      </div>
    </div>
  );
}
