import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/table/DataTable";
import './ClassDist.css';
import BarChart1 from "../../components/charts/bar-chart/BarChart1";

export default function ClassDistribution() {
  const [classDistData, setClassDistData] = useState([]);
  const [dsemesterNyear, setDsemesterNyear] = useState([]);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");



  const handleBtnSubmit = () => {
    axios
      .get(`/class-size-distributions/${semester}/${year}`)
      .then((response) => {
        setClassDistData(response.data);
      });
  };



  useEffect(() => {
    axios.get("/semesters&Years-on-database").then((response) => {
      setDsemesterNyear(response.data);
    });
  }, []);


  console.log(classDistData);

  const headerForDist = ["Enrollment", "SBE", "SELS", "SETS","SLASS","SPPH","Total"];
  return (

    <div className="page-container">

    <div className="dropDown_container">

      <select
         className="dropDown_bar"
         onChange={(e) => {
          setSemester(e.target.value.split(",")[0]);
          setYear(e.target.value.split(",")[1]);
        }}
      >

        <option>Choose semester & year</option>
        {dsemesterNyear.map((item) => (
          <option
            key={item.semester+item.year}
            value={[item.semester, item.year]}>
            {item.semester +" "+ item.year}
          </option>
        ))}

      </select>

      <button className="btn"onClick={handleBtnSubmit}>View Reports</button>

    </div>


    <div className="tbl_Chart-container">

      <div className="table_container">
        <DataTable data={classDistData} header={headerForDist}></DataTable>
      </div>

      <div className="chart_container">
        <BarChart1 data={classDistData}></BarChart1>
      </div>

    </div>


  </div>
  );
}
