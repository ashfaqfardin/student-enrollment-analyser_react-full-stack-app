// import React, { useEffect, useState } from 'react'
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// export default function DataTable({data, header}) {

 
 
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             {
//               header.map(hd => <TableCell >{hd}</TableCell>)
//             }
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row) => (
//             <TableRow
//               key={row.classsize}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.classsize}
//               </TableCell>
//               <TableCell >{row.sections}</TableCell>
//               <TableCell >{row.classroom6}</TableCell>
//               <TableCell>{row.classroom7}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }