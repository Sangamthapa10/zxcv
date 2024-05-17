import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Customaxios from "../Components/Axios";
import Logo from "../Components/Logo";
import { useGlobalContext } from "../Components/Context";
import { useHistory } from "react-router-dom";
const BookForm = () => {
  const history = useHistory();
  const { setbookingconfirmed } = useGlobalContext();

  const initialFormData = Object.freeze({
    number: "",
    bid: "",
  });

  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Customaxios.get(`/api/booking/${formData.bid}/${formData.number}`)
      .then((res) => {
        let b = Object.assign([], [res.data]);
        setbookingconfirmed({
          data: b,
          fetcherror: false,
        });
        history.push(
          `/Booking/Confirmed/id=${res.data.bookid}/contact=${res.data.Contact}`
        );
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div style={{ paddingTop: "60px" }}>
      <div
        style={{
          gridAutoColumns: "40%",
          border: "none",
          justifyContent: "center",
        }}
        className="ad_login"
      >
        <div style={{ width: "100px", margin: "auto" }}>
          <Logo />
        </div>

        <div className="login_container">
          <h2>Check Your Bookings</h2>
          <form style={{ display: "grid", gridGap: "16px" }}>
            <TextField
              variant="outlined"
              required
              id="username"
              label={"Enter Number"}
              name="number"
              autoFocus
              autoComplete="new-password"
              onChange={handleChange}
              className="input"
            />
            <TextField
              variant="outlined"
              required
              name="bid"
              label={"Booking Id"}
              autoComplete="new-password"
              onChange={handleChange}
              className="input"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="outlined"
              fullWidth
              style={{ textTransform: "none", marginTop: "15px" }}
            >
              Find Booking
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BookForm;
