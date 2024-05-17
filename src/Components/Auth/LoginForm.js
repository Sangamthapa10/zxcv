import React, { useEffect, useState } from "react";
import "./CSS/LoginForm.css";
import Customaxios from "../Axios";
import { useGlobalContext } from "../Context";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { TextField, Button } from "@material-ui/core";

//icons
import SettingsIcon from "@material-ui/icons/Settings";
import FacebookIcon from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import GoogleIcon from "../CustomIcons/GoogleIcon";
// const LightTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: theme.palette.common.white,
//     color: "rgba(0, 0, 0, 0.87)",
//     boxShadow: theme.shadows[1],
//     fontSize: 11,
//   },
// }));
const LoginForm = () => {
  const { setlogin, setuserdetail, setresetpw } = useGlobalContext();
  const [loading, setloading] = useState(false);
  const history = useHistory();
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

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/ ;secure";
  }
  function generate_token(length) {
    //edit the token allowed characters
    var a =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  }

  const [alerton, setalerton] = useState({
    alert: false,
    alerttext: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    alert("sangam")
    Customaxios.post(`account/token/`, {
      grant_type: "password",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      username: formData.username,
      password: formData.password,
    })
      .then((res) => {
        localStorage.setItem("axynghkwngasd", res.data.token.access_token);
        localStorage.setItem("refresh", res.data.token.refresh_token);
        localStorage.setItem("time", res.data.token.expires_in);
        localStorage.setItem("user", res.data.user.username);
        localStorage.setItem(
          "ab",
          generate_token(res.data.token.access_token.length)
        );

        localStorage.setItem(
          "a",
          generate_token(res.data.token.access_token.length)
        );
        localStorage.setItem(
          "acdef",
          generate_token(res.data.token.access_token.length)
        );
        setuserdetail(res.data.user);
        setCookie(
          "a",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "ab",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "ac",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "ad",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "da",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "dea",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "qa",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "ga",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "ja",
          generate_token(res.data.token.access_token.length),
          3600
        );
        setCookie(
          "acesstoken",
          res.data.token.access_token,
          res.data.token.expires_in
        );
        setCookie("refresh_token", res.data.refresh_token, 3600);
        console.log(res.data);
        setloading(false);
        setlogin(false);
      })
      .catch((error) => {
        alert(error)
        setloading(false);
        setalerton({
          alert: true,
          alerttext: "Invalid Phone or Password",
        });
      });
  };
  useEffect(() => {
    if (alerton.alert) {
      setTimeout(function one() {
        setalerton({
          alert: false,
          alerttext: "",
        });
      }, 6000);
    }
  }, [alerton.alert]);
  return (
    <form className="signin_form">
      {alerton.alert && (
        <span style={{ position: "absolute", top: "10px", left: 0, right: 0 }}>
          <Alert severity="error">{alerton.alerttext}</Alert>
        </span>
      )}
      <h1 style={{ fontWeight: "bold", margin: 0 }}>Sign in</h1>

      <div className="social-container">
        <span className="social">
          <FacebookIcon className="social_icons" style={{ color: "blue" }} />
        </span>

        <span className="social">
          <GoogleIcon />
        </span>

        <span className="social">
          <Instagram style={{ color: "rgba(253, 29, 29, 1)" }} />
        </span>

        <span className="social">
          <FacebookIcon className="social_icons" />
        </span>
      </div>
      <span className="option_login">or use your account</span>

      <TextField
        variant="outlined"
        required
        label="Enter Username"
        name="username"
        autoFocus
        onChange={handleChange}
        className="input"
        margin="normal"
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={handleChange}
        className="input"
      />
      <span style={{ cursor: "pointer" }} onClick={() => setresetpw(true)}>
        Forgot your password?
      </span>
      <button type="submit" onClick={handleSubmit} className="sign-button">
        {loading ? (
          <div className="loading_btn">
            <div className="dot1"> </div>
            <div className="dot2"></div>
            <div className="dot3"></div>
          </div>
        ) : (
          "Sign In"
        )}
      </button>
      <span
        style={{
          marginTop: "5%",
          padding: "8px 12px",
          display: "grid",
          gridGap: "12px",
        }}
      >
        <span style={{ display: "flex" }}>
          <span className="bor_left"></span>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            Or Sign In as{" "}
          </p>
          <span className="bor_right"></span>
        </span>

        <Button
          onClick={() => {
            setlogin(false);
            history.push("/adminlogin");
          }}
          endIcon={<SettingsIcon />}
          style={{
            textTransform: "none",
            placeSelf: "start",
            background: "#8b0000",
            color: "#fff",
          }}
          variant="contained"
        >
          Property Owner
        </Button>
      </span>
    </form>
  );
};

export default LoginForm;
