import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { Authaxios } from "../Axios";
import { useGlobalContext } from "../Context";
import OTP from "../Auth/OTP";
function ChangeNumber() {
  const { otp, setcinfo_open, userdetail, setuserdetail } = useGlobalContext();
  const [number, setnumber] = useState("");
  const [phonevalidate, setphonevalidate] = useState("");
  const [otpm, setotpm] = useState("");
  const changenumber = (e) => {
    setnumber(e.target.value);
    if (e.target.value.length > 9) {
      var terms = e.target.value.trim();
      var res = new RegExp(
        "^(984|986|985|974|975|980|981|982|961|988|972|963)\\d{7}$"
      );
      if (res.test(terms)) {
        setphonevalidate("validate");
      } else {
        setphonevalidate("invalid");
      }
    }
  };
  const Submit = () => {
    Authaxios.post(`account/otp/`, {
      phone: number,
    }).then((res) => {
      if (res.data.detail !== "Phone number already exists") {
        setotpm("otp");
      }
    });
  };
  const checkotp = () => {
    Authaxios.post(`account/edituser/`, {
      number: number,
      otp: otp,
    }).then((res) => {
      setcinfo_open(false);
      setuserdetail({
        ...userdetail,
        Phone: number,
      });
    });
  };
  return (
    <form style={{ display: "grid", gridGap: "15px" }}>
      <TextField
        variant="outlined"
        required
        label="Enter Number"
        name="fname"
        autoFocus
        value={number}
        onChange={(e) => changenumber(e)}
        className="input"
        margin="normal"
        error={phonevalidate === "invalid" ? true : false}
        helperText={`${
          phonevalidate === "invalid" ? " Invalid Phone Number" : ""
        }`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">+977</InputAdornment>
          ),
        }}
      />
      {otpm === "otp" && <h5>Enter the otp we just sent to {number}</h5>}
      <div style={{ width: "30vw" }}>{otpm === "otp" && <OTP />}</div>
      <Button
        onClick={otp ? checkotp : Submit}
        color="primary"
        variant="contained"
      >
        Verify
      </Button>
    </form>
  );
}

export default ChangeNumber;
