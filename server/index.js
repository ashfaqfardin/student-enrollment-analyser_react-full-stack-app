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




app.get("/class-size-distributions/:semester/:year", (req, res) => {
  const {semester, year} = req.params;
  let sql = `SELECT
       CASE WHEN enrolled BETWEEN 1 AND 10 THEN '1-10'
       WHEN enrolled BETWEEN 11 AND 20 THEN '11-20'
       WHEN enrolled BETWEEN 21 AND 30 THEN '21-30'
       WHEN enrolled BETWEEN 31 AND 35 THEN '31-35'
       WHEN enrolled BETWEEN 36 AND 40 THEN '36-40'
       WHEN enrolled BETWEEN 41 AND 50 THEN '41-50'
       WHEN enrolled BETWEEN 51 AND 55 THEN '51-55'
       WHEN enrolled BETWEEN 56 AND 60 THEN '56-60'
       WHEN enrolled > 60 THEN '60+' 
       END AS enrollment,
       COUNT(CASE WHEN course.school_title='SBE' THEN 'SBE' END) AS SBE,
       COUNT(CASE WHEN course.school_title='SELS' THEN 'SELS' END) AS SELS,
       COUNT(CASE WHEN course.school_title='SETS' THEN 'SETS' END) AS SETS,
       COUNT(CASE WHEN course.school_title='SLASS' THEN 'SLASS' END) AS SLASS,
       COUNT(CASE WHEN course.school_title='SPPH' THEN 'SPPH' END) AS SPPH,
       COUNT(course_section.courseId) AS TOTAL
       FROM course_section, course
       WHERE semester = '${semester}' AND year = '${year}' AND course_section.courseId=course.courseId
       GROUP BY enrollment
       HAVING enrollment IS NOT NULL;`;
  
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });




app.get("/detailed-enrollment-breakdown/:semester/:year", (req, res) => {
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





// reveue 1st table
app.get("/revenue-of-schools", (req, res) => {

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




  //Usage of the resources -- start
  app.get("/usage-of-resources/:semester/:year", (req, res) => {

    const {semester, year} = req.params;
    let sql = `SELECT
    CASE
          WHEN semester = 'Spring' THEN 'Spring'
          WHEN semester = 'Summer' THEN 'Summer'
          WHEN semester = 'Autumn' THEN 'Autumn'
      END AS 'School',
      SUM(enrolled) AS 'Sum',
      SUM(enrolled)/COUNT(course_section.courseId) AS 'Avg Enroll',
      SUM(classroom.room_capacity)/COUNT(course_section.courseId) AS 'Avg Room',
      (SUM(classroom.room_capacity)/COUNT(course_section.courseId) - SUM(enrolled)/COUNT(course_section.courseId)) AS 'Difference',
      ((SUM(classroom.room_capacity)/COUNT(course_section.courseId) - SUM(enrolled)/COUNT(course_section.courseId))/(SUM(classroom.room_capacity)/COUNT(course_section.courseId)))*100 AS 'Unused %'
      FROM course_section, classroom, course
      WHERE semester = '${semester}' 
      AND year = ${year} 
      AND course_section.roomId = classroom.roomId 
      AND course_section.courseId = course.courseId AND course_section.blocked!='B-0'
      UNION
      SELECT 
      CASE
      WHEN course.school_title='SBE' then 'SBE'
      WHEN course.school_title='SELS' then 'SELS'
      WHEN course.school_title='SETS' then 'SETS'
      WHEN course.school_title='SLASS' then 'SLASS'
      WHEN course.school_title='SPPH' then 'SPPH'
      END AS 'School',
      SUM(enrolled) AS 'Sum',
      SUM(enrolled)/COUNT(course_section.courseId) AS 'Avg Enroll',
      SUM(classroom.room_capacity)/COUNT(course_section.courseId) AS 'Avg Room',
      (SUM(classroom.room_capacity)/COUNT(course_section.courseId) - SUM(enrolled)/COUNT(course_section.courseId)) AS 'Difference',
      ((SUM(classroom.room_capacity)/COUNT(course_section.courseId) - SUM(enrolled)/COUNT(course_section.courseId))/(SUM(classroom.room_capacity)/COUNT(course_section.courseId)))*100 AS 'Unused %'
      FROM course_section, classroom, course
      WHERE semester = '${semester}' 
      AND year = ${year} 
      AND course_section.roomId = classroom.roomId 
      AND course_section.courseId = course.courseId AND course_section.blocked!='B-0'
      GROUP BY School;`       
        let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
      });
    });


    app.get("/usage-of-resources-summary/:semester/:year", (req, res) => {
      const {semester, year} = req.params;
      let sql = `SELECT 'Average of ROOM_CAPACITY' as "", SUM(classroom.room_capacity)/COUNT(course_section.courseId) as Semester FROM course_section, course, classroom WHERE semester= '${semester}' AND year =${year} AND course_section.courseId=course.courseId AND course_section.roomId=classroom.roomId AND course_section.blocked!='B-0' 
      UNION 
      SELECT 'Average of ENROLLED', SUM(enrolled)/COUNT(course_section.courseId) as 'Avg Enrolled' FROM course_section, course, classroom WHERE semester= '${semester}' AND year = ${year} AND course_section.courseId=course.courseId AND course_section.roomId=classroom.roomId AND course_section.blocked!='B-0'
      UNION 
      SELECT 'Average of Unused Space', (SUM(classroom.room_capacity)/COUNT(course_section.courseId) - SUM(enrolled)/COUNT(course_section.courseId)) as 'Avg Unused Space' FROM course_section, course, classroom WHERE semester= '${semester}' AND year = '${year}' AND course_section.courseId=course.courseId AND course_section.roomId=classroom.roomId AND course_section.blocked!='B-0' 
      UNION
      SELECT 'Unused Percent', ((SUM(classroom.room_capacity)/COUNT(course_section.courseId) - SUM(enrolled)/COUNT(course_section.courseId))/(SUM(classroom.room_capacity)/COUNT(course_section.courseId)))*100 as 'Unsed%' FROM course_section, course, classroom
      WHERE semester= '${semester}' AND year = ${year} AND course_section.courseId=course.courseId AND course_section.roomId=classroom.roomId AND course_section.blocked!='B-0';`;
      
        let query = db.query(sql, (err, results) => {
          if (err) throw err;
          console.log(results);
          res.send(results);
        });
      });


      app.get("/available-resources", (req, res) => {
        let sql = `SELECT room_capacity AS 'Class Size',
        COUNT(roomId) AS 'IUB Resource', 
        (room_capacity*COUNT(roomId)) AS 'Capacity'  
        FROM classroom
        GROUP BY room_capacity
        UNION
        SELECT 'Total' AS 'Class Size',
        COUNT(roomId) AS 'IUB Resource',
        SUM(room_capacity) AS 'Capacity'
        FROM classroom;`;
        
          let query = db.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);
          });
        });


      app.get("/available-resources-summary", (req, res) => {
          let sql = `SELECT 'Total Capacity with 6 slot 2 days',
          '',
          SUM(room_capacity) * 12 AS 'Capacity'
          FROM classroom
          UNION
          SELECT 'Total Capacity with 7 slot 2 days',
          '',
          SUM(room_capacity) * 14 AS 'Capacity'
          FROM classroom
          UNION
          SELECT 'Considering 3.5 average course load (6 slot)',
          '',
          ROUND(SUM(room_capacity) * 12 / 3.5, 0) 'Capacity'
          FROM classroom
          UNION
          SELECT 'Considering 3.5 average course load (6 slot)',
          '',
          ROUND(SUM(room_capacity) * 14 / 3.5, 0) 'Capacity'
          FROM classroom;`;
          
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



  app.get("/revenue-of-sets", (req, res) => {

    let sql = `SELECT CONCAT(CS.year, CASE WHEN CS.semester='Autumn' THEN "3" WHEN CS.semester='Spring' THEN "1" WHEN CS.semester='Summer' THEN "2" END, CS.semester) as Semester, 

    SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'CCR%' OR C.courseId LIKE 'CNC%' OR C.courseId LIKE 'CEN%' OR  C.courseId LIKE 'SEN%' OR C.courseId LIKE 'CIS%' OR C.courseId LIKE 'CSC%' OR C.courseId LIKE 'CSE%' THEN CS.enrolled*C.credit_hour END) as CSE,
    
    SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'ETE%' OR C.courseId LIKE 'ECR%' OR C.courseId LIKE 'EEE%' THEN CS.enrolled*C.credit_hour END) as EEE,
    
    SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'PHY%' OR C.courseId LIKE 'MAT%' THEN CS.enrolled*C.credit_hour END) as PS,
    
    SUM(CASE WHEN C.school_title='SETS' THEN CS.enrolled*C.credit_hour END) as SETS,
    
    ((SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'CCR%' OR C.courseId LIKE 'CNC%' OR C.courseId LIKE 'CEN%' OR  C.courseId LIKE 'SEN%' OR C.courseId LIKE 'CIS%' OR C.courseId LIKE 'CSC%' OR C.courseId LIKE 'CSE%' THEN CS.enrolled*C.credit_hour END) - (SELECT SUM(course_section.enrolled*course.credit_hour) FROM course_section, course WHERE course_section.year=CS.year-1 AND course_section.semester=CS.semester AND course.school_title='SETS' AND course_section.courseId=course.courseId  AND course_section.blocked IN ('-1', '0') AND (course.courseId LIKE 'CCR%' OR course.courseId LIKE 'CNC%' OR course.courseId LIKE 'CEN%' OR  course.courseId LIKE 'SEN%' OR course.courseId LIKE 'CIS%' OR course.courseId LIKE 'CSC%' OR course.courseId LIKE 'CSE%')))/SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'CCR%' OR C.courseId LIKE 'CNC%' OR C.courseId LIKE 'CEN%' OR  C.courseId LIKE 'SEN%' OR C.courseId LIKE 'CIS%' OR C.courseId LIKE 'CSC%' OR C.courseId LIKE 'CSE%' THEN CS.enrolled*C.credit_hour END))*100 as 'CSE%',
    
    ((SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'ETE%' OR C.courseId LIKE 'ECR%' OR C.courseId LIKE 'EEE%' THEN CS.enrolled*C.credit_hour END) - (SELECT SUM(course_section.enrolled*course.credit_hour) FROM course_section, course WHERE course_section.year=CS.year-1 AND course_section.semester=CS.semester AND course.school_title='SETS' AND course_section.courseId=course.courseId  AND course_section.blocked IN ('-1', '0') AND (course.courseId LIKE 'ETE%' OR course.courseId LIKE 'ECR%' OR course.courseId LIKE 'EEE%')))/SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'ETE%' OR C.courseId LIKE 'ECR%' OR C.courseId LIKE 'EEE%' THEN CS.enrolled*C.credit_hour END))*100 as 'EEE%',
    
    ((SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'PHY%' OR C.courseId LIKE 'MAT%' THEN CS.enrolled*C.credit_hour END) - (SELECT SUM(course_section.enrolled*course.credit_hour) FROM course_section, course WHERE course_section.year=CS.year-1 AND course_section.semester=CS.semester AND course.school_title='SETS' AND course_section.courseId=course.courseId  AND course_section.blocked IN ('-1', '0') AND (course.courseId LIKE 'PHY%' OR course.courseId LIKE 'MAT%')))/SUM(CASE WHEN C.school_title='SETS' AND C.courseId LIKE 'PHY%' OR C.courseId LIKE 'MAT%' THEN CS.enrolled*C.credit_hour END))*100 as 'PS%',
    
    (SUM(CASE WHEN C.school_title='SETS' THEN CS.enrolled*C.credit_hour END) - (SELECT SUM(course_section.enrolled*course.credit_hour) FROM course_section, course WHERE course_section.year=CS.year-1 AND course_section.semester=CS.semester AND course.school_title='SETS' AND course_section.courseId=course.courseId  AND course_section.blocked IN ('-1', '0')))/(SUM(CASE WHEN C.school_title='SETS' THEN CS.enrolled*C.credit_hour END))*100 as 'SETS%' FROM course_section as CS, course as C WHERE CS.courseId=C.courseId AND CS.blocked IN ('-1', '0') GROUP BY year, semester ORDER BY semester;`;
    
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




