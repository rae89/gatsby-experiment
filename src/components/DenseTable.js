import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(key, value) {
  return { key, value };
}

export default function DenseTable({ metadata }) {
  const rows = [];
  for (var key in metadata) {
    var row = createData(key, metadata[key]);
    rows.push(row);
  }
  return (
    <TableContainer
      style={{
        border: "5px solid rebeccapurple",
        borderRadius: 5,
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
