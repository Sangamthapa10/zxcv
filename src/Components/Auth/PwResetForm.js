import React, { useState } from "react";
import Customaxios from "../Axios";
import { useGlobalContext } from "../Context";
import Otp from "./OTP";
//material ui
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
//icons
import LockIcon from "@mui/icons-material/Lock";
const PwResetForm = () => {
  const { otp, setlogin, setresetpw } = useGlobalContext();
  const initialFormData = Object.freeze({
    phone: "",
    new_password1: "",
    new_password2: "",
  });
  const [formData, setformData] = useState(initialFormData);
  const [alert, setalert] = useState(false);
  const [alerttext, setalerttext] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, seterror] = useState(false);
  const handleChange = (e) => {
    setalert(false);

    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handlepwChange = (e) => {
    setalert(false);

    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    if (formData.new_password1 === formData.new_password2) {
      seterror(true);
    } else {
      seterror(false);
    }
  };
  const handleSubmit = (e) => {
    setalert(false);
    setloading(true);
    e.preventDefault();
    Customaxios.post(`/account/resetpw/`, {
      phone: formData.phone,
      password: formData.new_password2,
      otp: otp,
    })
      .then((res) => {
        setloading(false);
        setlogin(false);
        setresetpw(false);
      })
      .catch((error) => {
        setloading(false);
      });
  };
  const [show, setshow] = useState("");
  const check_user = (e) => {
    setalert(false);
    setloading(true);
    e.preventDefault();
    Customaxios.post("/account/PasswordResetView/", {
      phone: formData.phone,
    })
      .then((res) => {
        setloading(false);
        if (res.status === 200) {
          setshow("otp");
          setalert(false);
        }
      })
      .catch((error) => {
        setalert(true);
        setloading(false);
        setalerttext("Not Found Create Account Instead");
      });
  };
  const check_otp = (e) => {
    setloading(true);
    setalert(false);
    e.preventDefault();
    if (otp.length === 4) {
      Customaxios.post(`/account/check_otp/`, {
        pwchange: true,
        phone: formData.phone,
        otp: otp,
      })
        .then((res) => {
          setloading(false);
          if (res.data.status === "success") {
            setshow("ch_pw");
          } else if (res.data.status === "otp_expired") {
            setalert(true);
            setalerttext("Otp Expired Request Another");
          }
        })
        .catch((error) => {
          setalert(true);
          setloading(false);
          setalerttext("Wrong Otp");
        });
    } else {
      setalert(true);
      setalerttext("Please Enter Code");
      setloading(false);
    }
  };

  const [time, settime] = useState(0);
  if (time < 30) {
    show === "otp" &&
      setTimeout(() => {
        increment();
      }, 1000);

    function increment() {
      settime(time + 1);
    }
  }
  return (
    <div className="password_reset_form_container">
      {alert && (
        <Alert style={{ position: "absolute", top: "14px" }} severity="error">
          {alerttext}
        </Alert>
      )}

      {show === "ch_pw" ? (
        <>
          <div style={{ placeSelf: "start" }}>
            <h4 style={{ textAlign: "start" }}>Change Your Password</h4>
            <p>
              A strong password helps prevent unauthorized access to your
              account
            </p>
          </div>
          <form className="signup_input">
            <TextField
              margin="normal"
              autoComplete="new-password"
              variant="outlined"
              name="new_password1"
              label="new_password1"
              id="new_password1"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              autoComplete="new-password"
              fullWidth
              error={errors ? "er" : ""}
              helperText={errors ? "Password Does Not Match" : ""}
              variant="outlined"
              required
              name="new_password2"
              label="new_password2"
              id="new_password2"
              onChange={handlepwChange}
            />
            <Button
              fullWidth
              style={{ textTransform: "none", marginTop: "15px" }}
              margin="normal"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="loading_btn">
                  <div className="dot1"> </div>
                  <div className="dot2"></div>
                  <div className="dot3"></div>
                </div>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </>
      ) : show === "otp" ? (
        <form className="otp_container_form">
          <div style={{ placeSelf: "start" }}>
            <h3>
              Please check your phone for a text message with your code. Your
              code is 4 characters in length
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                placeSelf: "start",
              }}
            >
              Enter Your Code We Sent to {formData.phone}
            </span>
            {time < 30 ? (
              <span className="timer_otp">{time} Sec</span>
            ) : (
              <Button
                size="small"
                onClick={check_user}
                style={{ textTransform: "none" }}
                variant="outlined"
              >
                Send Again
              </Button>
            )}
          </div>
          <div style={{ height: "110px" }}>
            <Otp />
          </div>
          <div
            style={{
              gridTemplateColumns: "max-content",
              display: "grid",
              width: "100%",
              placeContent: "end",
              gridGap: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
              type="submit"
              onClick={check_otp}
            >
              {loading ? (
                <div className="loading_btn">
                  <div className="dot1"> </div>
                  <div className="dot2"></div>
                  <div className="dot3"></div>
                </div>
              ) : (
                " Check Otp"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <form style={{ width: "100%" }}>
          <LockIcon style={{ width: "30%", height: "auto" }} />
          <h2 style={{ fontWeight: "bolder" }}>Forgot Your Password ? </h2>
          <span>
            <p>Enter your phone number linked to your account</p>
          </span>
          <TextField
            fullWidth
            variant="outlined"
            required
            label="Mobile No"
            name="phone"
            autoFocus
            onChange={handleChange}
            className="input"
            margin="normal"
          />
          <div
            style={{
              gridTemplateColumns: "max-content max-content",
              display: "grid",
              width: "100%",
              placeContent: "end",
              gridGap: "16px",
            }}
          >
            <Button
              onClick={() => setresetpw(false)}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={check_user}
              variant="contained"
              color="primary"
            >
              {loading ? (
                <div className="loading_btn">
                  <div className="dot1"> </div>
                  <div className="dot2"></div>
                  <div className="dot3"></div>
                </div>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PwResetForm;
