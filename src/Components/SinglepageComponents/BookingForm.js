import React, { useState } from "react";
import "./CSS/BookingForm.css";
import { useGlobalContext } from "../Context";
function BookingForm() {
  const { userdetail } = useGlobalContext();
  const [number, setnumber] = useState(userdetail.phone);
  const [email, setemail] = useState(userdetail.email);
  const [username, setusername] = useState(userdetail.username);
  return (
    <div className="form">
      <div className="upper_form">
        <span>
          <span className="booking_form_user_header">Full Name</span>
          <input
            type="text"
            id="name"
            name="name"
            value={`${userdetail.username ? username : ""}`}
            onChange={(e) => setusername(e.target.value)}
          />
        </span>
        <span>
          <span className="booking_form_user_header">Email Address</span>
          <input
            type="email"
            id="email"
            name="email"
            value={`${userdetail.email ? email : ""}`}
            onChange={(e) => setemail(e.target.value)}
          />
        </span>
      </div>
      <div className="lower_form">
        <span className="booking_form_user_header">Mobile Number</span>
        <input
          type="number"
          id="number"
          name="number"
          value={userdetail.Contact ? number : ""}
          onChange={(e) => setnumber(e.target.value)}
        />
      </div>
    </div>
  );
}

export default BookingForm;
