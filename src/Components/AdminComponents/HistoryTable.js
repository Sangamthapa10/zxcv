import React from "react";
import { useGlobalContext } from "../Context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

function HistoryTable() {
  const { chartdata } = useGlobalContext();
  let month = chartdata.filter((swine) => swine.mn);
  let total_money = month.reduce(function (acc, curr) {
    return acc + curr.b;
  }, 0);
  let total_booking = month.reduce(function (acc, curr) {
    return acc + curr.a;
  }, 0);
  let total_cancelled = month.reduce(function (acc, curr) {
    return acc + curr.c;
  }, 0);

  return (
    <div>
      <Table stickyHeader={true}>
        <TableHead>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Booking</TableCell>
          <TableCell align="center">Cancelled</TableCell>
          <TableCell align="center">SuccessFull Booking</TableCell>
          <TableCell align="center">Avg Days Stayed</TableCell>
          <TableCell align="center">Total Money</TableCell>
        </TableHead>
        {month.map((mapped, index) => {
          return (
            <TableBody
              style={
                index % 2 ? { background: "#fdffe0" } : { background: "white" }
              }
            >
              <TableCell align="center">{mapped.mn}</TableCell>
              <TableCell align="center">{mapped.a}</TableCell>
              <TableCell align="center">{mapped.c}</TableCell>
              <TableCell align="center">{mapped.a - mapped.c}</TableCell>
              <TableCell align="center">{Math.round(mapped.d)}</TableCell>
              <TableCell align="center">NPR {mapped.b}</TableCell>
            </TableBody>
          );
        })}
        <TableRow>
          <TableCell align="center">Total</TableCell>
          <TableCell align="center">{total_booking}</TableCell>
          <TableCell align="center">{total_cancelled}</TableCell>
          <TableCell align="center">
            {total_booking - total_cancelled}
          </TableCell>
          <TableCell align="center">---</TableCell>
          <TableCell align="center">{total_money}</TableCell>
        </TableRow>
      </Table>
    </div>
  );
}

export default HistoryTable;
