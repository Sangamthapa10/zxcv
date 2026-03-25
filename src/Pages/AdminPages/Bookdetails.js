import React, { useState, useEffect } from "react";
import { Authaxios } from "../../Components/Axios";

import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const Bookdetails = () => {
  const { id } = useParams();
  const [book, setbookdetail] = useState([]);
  function tconvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  useEffect(() => {
    Authaxios.get(`/api/owner_pbook_detail/${parseInt(id)}/`).then((res) => {
      let b = Object.assign([], [res.data]);
      setbookdetail(b);
      console.log(b);
    });
  }, [id]);
  return (
    <div className="admin_dash">
      <AdminSidebar />
      <div className="admin_book_details">
        {book.map((mapped) => {
          const {
            property_meal,
            total_price,
            room_price,
            total_room,
            bookid,
            check_in_time,
            check_out_time,
            id,
            user,
            hotel,
            booked_date,
            check_in_date,
            check_out_date,
          } = mapped;
          return (
            <div className="book_success_body" key={id}>
              <div className="book_success_head">
                <h3>Booking Id:{bookid}</h3>
                <h3>
                  Booked By {user.username} on {booked_date}{" "}
                </h3>
              </div>
              <div className="book_success_hdetails">
                <div className="book_success_left_details">
                  <h1>{hotel.Name}</h1>
                  <p>{hotel.Address}</p>
                  <p>{hotel.description}</p>
                </div>
                <img
                  className="book_hotel_dp"
                  src={hotel.hotel_dp.img}
                  alt="hotel_dp"
                />
              </div>
              <hr></hr>
              <div className="book_success_bdetails">
                <span>
                  <h5>Guest</h5> :
                  <h6 className="bdetails_property">{user.username}</h6>
                </span>
                <span>
                  <h5>Check In</h5>
                  <h6 className="bdetails_property">{check_in_date}</h6>
                </span>
                <span>
                  <h5>Check Out</h5>
                  <h6 className="bdetails_property">{check_out_date}</h6>
                </span>
                <span>
                  <h5>Email</h5>
                  <h6 className="bdetails_property">{user.email}</h6>
                </span>
                <span>
                  <h5>Phone</h5>
                  <h6 className="bdetails_property">{user.Phone}</h6>
                </span>
                <span>
                  <h5>Check in time</h5>
                  <h6 className="bdetails_property">
                    {tconvert(check_in_time.slice(0, 5))}
                  </h6>
                </span>
                <span>
                  <h5>Check out time</h5>
                  <h6 className="bdetails_property">
                    {tconvert(check_out_time.slice(0, 5))}
                  </h6>
                </span>
              </div>
              <hr></hr>

              <div className="book_success_pdetails">
                <h3>Payment Details</h3>
                <div className="book_success_pdetails_body">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontSize: "25px" }}>
                          Room Charge
                        </TableCell>
                        <TableCell style={{ fontSize: "25px" }}>
                          {total_room} Room * NPR {room_price}
                        </TableCell>
                        <TableCell style={{ fontSize: "25px" }}>
                          NPR {room_price}
                        </TableCell>
                      </TableRow>
                      {property_meal &&
                        property_meal.map((meal) => {
                          return (
                            <TableRow>
                              <TableCell style={{ fontSize: "25px" }}>
                                {meal.name}
                              </TableCell>
                              <TableCell style={{ fontSize: "25px" }}>
                                Desc in nice and short
                              </TableCell>
                              <TableCell style={{ fontSize: "25px" }}>
                                {meal.price}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                  <span className="book_success_total">
                    <h1>Total Price</h1>
                    <h1>NPR {total_price}</h1>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookdetails;
