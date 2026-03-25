import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import Customaxios from "../Components/Axios";
import "./CSS/Enlist.css";
import Arrivedsvg from "../Components/SvgComponents/Arrivedsvg";
import Oneofusvg from "../Components/SvgComponents/Oneofus";
import Agreementsvg from "../Components/SvgComponents/Aggrementsvg";
function Enlist() {
  const initialFormData = Object.freeze({
    hotel: "",
    address: "",
    contact: "",
  });

  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(formData);
    Customaxios.post(`api/addhotelsuggest/`, {
      hotel: formData.hotel,
      address: formData.address,
      contact: formData.number,
      type: "enroll",
    }).then((res) => {});
  };
  return (
    <div className="enlist_body">
      <div className="enlist_gradients">
        <div className="enlist_form_container">
          <div className="enlist_header">Become one of us</div>
          <form className="enlist_form">
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Enter Name"
              name="hotel"
              autoFocus
              onChange={handleChange}
              className="input"
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Enter Phone Number"
              name="number"
              autoFocus
              onChange={handleChange}
              className="input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+977</InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Enter Address"
              name="address"
              autoFocus
              onChange={handleChange}
              className="input"
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Total Rooms"
              name="trooms"
              autoFocus
              onChange={handleChange}
              className="input"
            />
            <Button
              fullWidth
              style={{ backgroundColor: "#1ab64f", color: "#fff" }}
              variant="contained"
              onClick={submit}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      <div className="why_us">
        <h1>Why Join Us ?</h1>
        <div className="Categorys">
          <div className="category_poster">
            <img
              className="category_img"
              src="https://wallpapershome.com/images/pages/pic_h/655.jpg"
              alt="ther"
            />
            <div className="category_info">
              <h2>Anoynomous shit</h2>
              <h4>
                desc of anyoadhaskjdhaskjdhd adoihadiuayshdasd afkjhsdfkuhsdf
              </h4>
            </div>
          </div>
          <div className="category_poster">
            <img
              className="category_img"
              src="https://wallpapershome.com/images/pages/pic_h/655.jpg"
              alt="ther"
            />
            <div className="category_info">
              <h2>Anoynomous shit</h2>
              <h4>
                desc of anyoadhaskjdhaskjdhd adoihadiuayshdasd afkjhsdfkuhsdf
              </h4>
            </div>
          </div>
          <div className="category_poster">
            <img
              className="category_img"
              src="https://wallpapershome.com/images/pages/pic_h/655.jpg"
              alt="ther"
            />
            <div className="category_info">
              <h2>Anoynomous shit</h2>
              <h4>
                desc of anyoadhaskjdhaskjdhd adoihadiuayshdasd afkjhsdfkuhsdf
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="steptobeus_container">
        <div className="stepstobeus_title">
          <h3>Steps to Part of us</h3>
          <p>Onboarding with us is a hassle-free three step process</p>
        </div>
        <div className="stepstobeus">
          <div>
            <h1>Step 1</h1>
            <div>
              <h3>Sign In With us</h3>
              <span className="step_icon">
                <Agreementsvg />
              </span>
            </div>
          </div>
          <div>
            <h1>Step 2</h1>
            <div>
              <h3>We Arrive at your destination</h3>
              <span className="step_icon">
                <Arrivedsvg />
              </span>
            </div>
          </div>
          <div>
            <h1>Step 3</h1>
            <div>
              <h3> You Become one of us</h3>
              <span className="step_icon">
                <Oneofusvg />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enlist;
