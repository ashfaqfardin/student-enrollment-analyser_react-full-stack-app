const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "seas",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});



app.get("/classroom-requirements-data/:semester/:year", (req, res) => {
const {semester, year} = req.params;
let sql = `SELECT
CASE WHEN enrolled BETWEEN 1 AND 10 then '1-10'
     WHEN enrolled BETWEEN 11 AND 20 then '11-20'
     WHEN enrolled BETWEEN 21 AND 30 then '21-30'
     WHEN enrolled BETWEEN 31 AND 35 then '31-35'
     WHEN enrolled BETWEEN 36 AND 40 then '36-40'
     WHEN enrolled BETWEEN 41 AND 50 then '41-50'
     WHEN enrolled BETWEEN 51 AND 55 then '51-55'
     WHEN enrolled BETWEEN 56 AND 65 then '56-65'
END AS classsize,
COUNT(section) AS sections,
COUNT(section) / 12 AS classroom6,
COUNT(section) / 14 AS classroom7
FROM course_section
WHERE semester = '${semester}' AND year = ${year}
GROUP BY classsize
HAVING classsize IS NOT NULL
UNION
SELECT 'Total' AS classsize, 
COUNT(section) AS sections, 
COUNT(section) / 12 AS classroom6, 
COUNT(section) / 14 AS classroom7
FROM course_section
WHERE enrolled BETWEEN 1 AND 65 AND semester = '${semester}' AND year = ${year}`;

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/detailedenrollmenttable/:semester/:year", (req, res) => {
  //let arr = [];
  const {semester, year} = req.params;
  let temp;
  let m;
  let tempsql = `SELECT max(enrolled) as Max_enrolled From course_section where semester='${semester}' and year=${year};`;
  let query1 = db.query(tempsql, (err, results) => {
    if (err) throw err;
    var string=JSON.stringify(results);
    var temp =  JSON.parse(string);
    m = parseInt(temp[0].Max_enrolled);
    let sql="";
    for(let i=1; i<=m; i++){
      sql += `SELECT '${i}' as Enrollment, COUNT(CASE WHEN c.school_title='SBE' THEN 'SBE' END) AS SBE, COUNT(CASE WHEN c.school_title='SELS' THEN 'SELS' END) AS SELS, COUNT(CASE WHEN c.school_title='SETS' THEN 'SBE' END) AS SETS, COUNT(CASE WHEN c.school_title='SLASS' THEN 'SLASS' END) AS SLASS, COUNT(CASE WHEN c.school_title='SPPH' THEN 'SPPH' END) AS SPPH, COUNT(cs.courseId) AS Total FROM course_section as cs, course as c WHERE semester = '${semester}' AND year = ${year} AND cs.courseId=c.courseId AND cs.blocked IN ('-1', '0') AND enrolled='${i}' UNION `; 
    }
    sql += `SELECT 'Total' as Enrollment, COUNT(CASE WHEN c.school_title='SBE' THEN 'SBE' END) AS SBE, COUNT(CASE WHEN c.school_title='SELS' THEN 'SELS' END) AS SELS, COUNT(CASE WHEN c.school_title='SETS' THEN 'SBE' END) AS SETS, COUNT(CASE WHEN c.school_title='SLASS' THEN 'SLASS' END) AS SLASS, COUNT(CASE WHEN c.school_title='SPPH' THEN 'SPPH' END) AS SPPH, COUNT(cs.courseId) AS Total FROM course_section as cs, course as c WHERE semester = '${semester}' AND year = ${year} AND cs.courseId=c.courseId AND cs.blocked IN ('-1', '0') ;`; 
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
          res.send(results);
      });
  });
});

app.get("/", (req, res) => {

  let sql = `SELECT CONCAT(CS.year, CASE WHEN CS.semester='Autumn' THEN "3" WHEN CS.semester='Spring' THEN "1" WHEN CS.semester='Summer' THEN "2" END, CS.semester) as Semester, 
  SUM(CASE WHEN C.school_title='SBE' THEN CS.enrolled*C.credit_hour END) as SBE, 
  SUM(CASE WHEN C.school_title='SETS' THEN CS.enrolled*C.credit_hour END) as SETS, 
  SUM(CASE WHEN C.school_title='SELS' THEN CS.enrolled*C.credit_hour END) as SELS, 
  SUM(CASE WHEN C.school_title='SLASS' THEN CS.enrolled*C.credit_hour END) as SLASS, 
  SUM(CASE WHEN C.school_title='SPPH' THEN CS.enrolled*C.credit_hour END) as SPPH,
  SUM(CS.enrolled*C.credit_hour) as Total, 
  ((SUM(CS.enrolled*C.credit_hour) - (SELECT SUM(course_section.enrolled*course.credit_hour) FROM course_section, course WHERE course_section.year=CS.year-1 AND course_section.semester=CS.semester AND course_section.courseId=course.courseId AND course_section.blocked IN ('-1', '0')))/SUM(CS.enrolled*C.credit_hour))*100 as DIFFERENCE 
  FROM course_section as CS, course as C WHERE CS.courseId=C.courseId AND CS.blocked IN ('-1', '0') GROUP BY year, semester ORDER BY semester;`;
            
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
  });

app.get("/semesters&Years-on-database", (req, res) => {

  let sql = `SELECT DISTINCT semester, year
  FROM course_section;`;
  
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
  });


app.get("/api", (req, res) => {
  res.json({ message: "Hello IUB from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
