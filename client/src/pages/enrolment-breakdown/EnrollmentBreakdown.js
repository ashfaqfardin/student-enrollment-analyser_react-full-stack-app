import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/table/DataTable";
import "./enrollmentBreakDown.css"

export default function EnrollmentBreakdown() {
  const [data, setData] = useState([]);
  const [semesterNyear, setsemesterNyear] = useState([]);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

  const handleBtnSubmit = () => {
    axios
      .get(`/detailed-enrollment-breakdown/${semester}/${year}`)
      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    axios.get("/semesters&Years-on-database").then((response) => {
      setsemesterNyear(response.data);
    });
  }, []);

  const header = [
    "Enrollment",
    "SBE",
    "SELS",
    "SETS",
    "SLASS",
    "SPPH",
    "Total",
  ];

  console.log(data);
  return (
    <div className="enrollment-break-pageContainer">
      <div className="enrollment-break-dropDown_bar_container">
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

      <div className="enrollment-break-tbl-container">
        <div className="table_container">
          <DataTable data={data} header={header}></DataTable>
        </div>
      </div>
    </div>
  );
}
