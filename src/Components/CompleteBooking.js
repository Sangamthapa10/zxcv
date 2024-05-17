import React from "react";
import Button from "@material-ui/core/Button";
import "./CSS/CompleteBooking.css";
import { Authaxios } from "./Axios";
import { useParams, useHistory } from "react-router-dom";
function CompleteBooking() {
  const { hotelid } = useParams();
  const { selected_room } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { roomcount } = useParams();
  const { guestcount } = useParams();
  const history = useHistory();
  let roomid = parseInt(selected_room);
  let check = new Date(check_in);
  let checkout = new Date(check_out);
  let days = checkout.getDay() - check.getDay();
  const Book = () => {
    console.log(days);
    Authaxios.post("api/book/", {
      property: hotelid,
      room: roomid,
      check_in_date: check_in,
      check_out_date: check_out,
      guest_count: guestcount,
      total_room: roomcount,
      price: 3000,
      status: "booked",
      payment_options: "pay_at_hotel",
      day_stayed: days,
    }).then((res) => {
      history.push(`/Booking/Confirmed/id=${res.data.id}`);
    });
  };

  return (
    <div className="complete_booking_form">
      <div className="btn_group">
        <Button variant="outlined">Pay at Hotel</Button>
        <Button variant="outlined">Pay Now</Button>
      </div>
      <div className="selected">
        <h1>Pay at Hotel</h1>
        <Button
          size="large"
          style={{ backgroundColor: "green", color: "white" }}
          variant="contained"
          onClick={Book}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default CompleteBooking;
