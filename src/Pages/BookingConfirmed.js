import React, { useEffect, useState } from "react";
import "./CSS/BookingConfirmed.css";
import { useParams, useHistory } from "react-router-dom";
import Customaxios from "../Components/Axios";
import { useGlobalContext } from "../Components/Context";
import Logo from "../Components/Logo";
import Error from "../Components/searchpage/Error";
import {
  TableRow,
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
} from "@material-ui/core";
// Icons
import FileCopyIcon from "@material-ui/icons/FileCopy";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
function BookingConfirmed() {
  const { bookingconfirmed, setbookingconfirmed, setmailmodal, setmailtext } =
    useGlobalContext();
  const { id } = useParams();
  const { contact } = useParams();
  const [othermodal, setothermodal] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (bookingconfirmed.data[0] === undefined) {
      setmailmodal(true);
      setmailtext("loading");
      Customaxios.get(`/api/booking/${id}/${contact}`)
        .then((res) => {
          let b = Object.assign([], [res.data]);
          setmailmodal(false);
          console.log(b);
          setbookingconfirmed({
            data: b,
            fetcherror: false,
          });
          if (res.data.booking_for_other === true) {
            setothermodal(true);
          }
        })
        .catch((error) => {
          setbookingconfirmed({
            data: [],
            fetcherror: true,
          });
          setmailmodal(false);
        });
    } else {
      if (bookingconfirmed.data[0].bookid !== id) {
        setmailmodal(true);
        setmailtext("loading");
        Customaxios.get(`/api/booking/${id}/${contact}`).then((res) => {
          let b = Object.assign([], [res.data]);
          setmailmodal(false);

          setbookingconfirmed({
            data: b,
            fetcherror: false,
          });
          if (res.data.booking_for_other === true) {
            setothermodal(true);
          }
        });
      }
    }
  }, [
    id,
    setmailmodal,
    setmailtext,
    bookingconfirmed.length,
    setbookingconfirmed,
    contact,
    bookingconfirmed,
  ]);
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
  const copy = (e) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      e.target.textContent = "Copied";
    }
  };
  function post(t, bid) {
    var url = window.location.href;
    var arr = url.split("/");
    var domain = arr[0] + "//" + arr[2];
    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
      amt: t,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: t,
      pid: bid,
      scd: "epay_payment",
      su: domain + "/paymentVerification/",
      fu: window.location.href,
    };
    alert(params);
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }
  return (
    <>
      {bookingconfirmed.fetcherror ? (
        <Error type="bconfirm" />
      ) : (
        <div className="booking_body">
          <div onClick={() => history.push("/")} className="top_">
            <Logo />
          </div>
          <Modal
            style={{
              display: "grid",
              placeItems: "center",
              placeContent: "center",
              outline: "none !important",
            }}
            open={othermodal}
            onClose={() => setothermodal(false)}
          >
            <div style={{ padding: "40px", background: "#fff" }}>
              <TextField
                variant="outlined"
                fullWidth
                value={window.location.href}
              />
              <Button
                endIcon={<FileCopyIcon />}
                variant="contained"
                color="primary"
                onClick={copy}
              >
                Copy
              </Button>
              <Button
                endIcon={<WhatsAppIcon />}
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                style={{ textTransform: "none" }}
              >
                <a
                  className="share_links"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/?text=${window.location.href}`}
                >
                  Send whatsapp
                </a>
              </Button>
            </div>
          </Modal>

          <div className="booking_success_detail">
            {bookingconfirmed.data.map((mapped, i) => {
              const {
                per_room_price,
                room,
                meals,
                total_price,
                room_price,
                payment_options,
                total_room,
                bookid,
                check_in_time,
                check_out_time,
                hotel,
                booked_date,
                check_in_date,
                check_out_date,
                fullname,
                Contact,
                days_stayed,
              } = mapped;
              let meal = meals;
              return (
                <div className="book_success_body" key={i + 1}>
                  <div>
                    <div className="book_success_head">
                      <span className="booking_top">
                        <h5>Booking Id:</h5>
                        <h5>{bookid}</h5>
                      </span>
                      <span className="booking_top">
                        <h5>Booked By</h5>
                        <h5>
                          {fullname} on {booked_date}{" "}
                        </h5>
                      </span>
                    </div>
                    <div className="book_success_hdetails">
                      <img
                        style={{ objectFit: "cover" }}
                        className="book_hotel_dp"
                        src={room.room_dp.img}
                        alt="hotel_dp"
                      />
                      <div className="book_success_left_details">
                        <h1>{hotel.Name}</h1>
                        <p>{hotel.Address}</p>
                        <p>{hotel.description}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: "26px" }}>
                    <h5>Booking Details</h5>
                    <div className="book_success_bdetails">
                      <span>
                        <h5>Guest</h5>
                        <h6 className="bdetails_property">{fullname}</h6>
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
                        <h5>Phone</h5>
                        <h6 className="bdetails_property">{Contact}</h6>
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
                      {mapped.room_key_active === true &&
                        mapped.room_key !== undefined && (
                          <>
                            <span>
                              <h5>Room Key</h5>
                              <h6 className="bdetails_property">
                                {mapped.room_key.roomkey}
                              </h6>
                            </span>

                            <span>
                              <h5>Room No.</h5>
                              <h6 className="bdetails_property">
                                {mapped.room_key.roomno}
                              </h6>
                            </span>
                          </>
                        )}
                    </div>
                    <hr></hr>

                    <div className="book_success_pdetails">
                      <h3 style={{ paddingTop: "10px" }}>Payment Details</h3>
                      <div className="book_success_pdetails_body">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="m_table">
                                Room Charge
                              </TableCell>
                              <TableCell className="m_table">
                                {total_room} Room * NPR
                                {per_room_price} * {days_stayed} days
                              </TableCell>
                              <TableCell className="m_table">
                                NPR {room_price}
                              </TableCell>
                            </TableRow>
                            {meal &&
                              meal.map((meal, i) => {
                                return (
                                  <TableRow key={i + 1}>
                                    <TableCell className="m_table">
                                      {meal.meal.name}
                                    </TableCell>
                                    <TableCell className="m_table">
                                      {meal.meal.price} * {meal.quantity} Plates
                                    </TableCell>
                                    <TableCell className="m_table">
                                      {meal.meal.price * meal.quantity}
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
                      <div className="book_success_pstatus">
                        <p>
                          {` Your payment option is ${payment_options}. You will receive a
                    call from us closer to the check-in date to confirm your
                    arrival. In case of no response, the booking may be
                    canceled. Pay NPR${total_price} online now for smoother check-in
                    experience.`}
                        </p>
                        <Button
                          onClick={() => post(total_price, bookid)}
                          fullWidth
                          variant="contained"
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default BookingConfirmed;
