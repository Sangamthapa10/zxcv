import React, { useEffect, useState } from "react";
import "./CSS/Booked.css";
import { Authaxios } from "../Components/Axios";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { purple, red, blue } from "@mui/material/colors";
import ApartmentIcon from "@mui/icons-material/Apartment";

const theme = createTheme(
  palette: {
    primary: purple,
    error: red,
    secondary: blue,
  },
});
const Booked = () => {
  const [searchterm, setsearchterm] = useState("");
  const [booking, setbooking] = useState([]);
  const [no, setno] = useState(14);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setno(event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const tok = localStorage.getItem("axynghkwngasd");
    if (tok) {
      Authaxios.get(
        `/api/property_booking/?no=${no}&search=${searchterm}&page=${page}`
      ).then((res) => {
        let a = res.data;
        let b = a.results;
        setbooking(b);
      });
    }
  }, [searchterm, no, page]);

  return (
    <div>
      <div className="search_bar_book">
        <input type="text" onChange={(e) => setsearchterm(e.target.value)} />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> User</TableCell>
            <TableCell> Check In</TableCell>
            <TableCell> Check out</TableCell>
            <TableCell> Room Type</TableCell>
            <TableCell> Total Price</TableCell>
            <TableCell> Payment Method</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        {booking.map((mapped) => {
          return (
            <TableBody>
              <TableCell>{mapped.user.username}</TableCell>
              <TableCell>{mapped.check_in_date}</TableCell>
              <TableCell>{mapped.check_out_date}</TableCell>
              <TableCell>{mapped.room.name}</TableCell>
              <TableCell>{mapped.total_price}</TableCell>
              <TableCell>{mapped.payment_options}</TableCell>
              <TableCell>
                <ThemeProvider theme={theme}>
                  <Button
                    color={
                      mapped.booking_status === "booked"
                        ? "primary"
                        : mapped.booking_status === "checked_in"
                        ? "error"
                        : "secondary"
                    }
                    variant="contained"
                    style={{ textTransform: "none" }}
                  >
                    {mapped.booking_status}
                  </Button>
                </ThemeProvider>
              </TableCell>
            </TableBody>
          );
        })}
        <TablePagination
          rowsPerPageOptions={[8, 20, 30]}
          component="div"
          count={booking.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onChangePage={handleChangePage}
        />
      </Table>
    </div>
  );
};

export default Booked;
