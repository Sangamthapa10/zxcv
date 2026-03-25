import React, { useState } from "react";
import { TextField, Button, useMediaQuery } from "@mui/material";
import Customaxios from "../../Axios";
import "./CSS/logincomponent.css";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../Context";
import Logo from "../../Logo";
import Adminsvg from "../../SvgComponents/Adminsvg";
function LoginComponent() {
  const { setkeymodal, setmailmodal, setmailtext, setkeydata, setuserdetail } =
    useGlobalContext();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setmailmodal(true);
    setmailtext("loading");
    Customaxios.post(`account/owner_token/`, {
      grant_type: "password",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      username: formData.username,
      password: formData.password,
    })
      .then((res) => {
        setmailmodal(false);
        localStorage.setItem("axynghkwngasd", res.data.token.access_token);
        localStorage.setItem("axolkhgyuthebs", res.data.token.refresh_token);
        localStorage.setItem("time", res.data.token.expires_in);
        localStorage.setItem("adminuser", Math.random(9999));
        history.push("/adminhome");
        setuserdetail(res.data.user);
        localStorage.setItem("ownern", res.data.property_n);
        localStorage.setItem("ownerc", formData.username);
        if (res.data.booking) {
          setkeydata(res.data.booking);
          setkeymodal(true);
          localStorage.setItem("notice", res.data.booking.length);
        } else {
          localStorage.setItem("notice", 0);
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };
  const tab_screen = useMediaQuery("(max-width:800px)");

  return (
    <div className="admin_login_body">
      {tab_screen || (
        <div className="admin_svg_container">
          <Adminsvg />
        </div>
      )}
      <div className="ad_login">
        <div className="ad_login_logo">
          <Logo />
        </div>
        <div className="login_container">
          <h1>sign-in</h1>
          <form>
            <h5>Phone</h5>
            <TextField
              variant="outlined"
              required
              id="username"
              placeholder="Enter PhoNE"
              name="username"
              autoFocus
              onChange={handleChange}
              className="input"
            />
            <h5>Password</h5>
            <TextField
              variant="outlined"
              required
              name="password"
              placeholder="Enter Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              className="input"
              InputLabelProps={{
                shrink: false,
              }}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="outlined"
              fullWidth
              style={{ textTransform: "none", marginTop: "15px" }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
