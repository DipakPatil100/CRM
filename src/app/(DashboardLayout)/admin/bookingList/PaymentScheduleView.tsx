import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  stage: string,
  adjustedAmount: number,
  baseAmount: number,
  date: number
) {
  return { stage, adjustedAmount, baseAmount, date };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function PaymentScheduleView({ paymentData }: any) {

    console.log(paymentData, "PAYMEEEEEEEEEEEEEE")
  return paymentData.lenght !== 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 120 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Stage</TableCell>
            <TableCell align="left">Adjusted Amount&nbsp;(g)</TableCell>
            <TableCell align="left">Base Amount&nbsp;(g)</TableCell>
            <TableCell align="left">Date&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentData.map((row: any) => (
            <TableRow
              key={row?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell> */}
              <TableCell align="left">{row.stage}</TableCell>
              <TableCell align="left">{row.adjustedAmount}</TableCell>
              <TableCell align="left">{row.baseAmount}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    "Payment Not Scheduled"
  );
}
