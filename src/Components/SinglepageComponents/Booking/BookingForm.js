import React, { useState, useEffect } from "react";
import "./CSS/BookingForm.css";
import { useGlobalContext } from "../../Context";
import Customaxios from "../../Axios";
import { Authaxios } from "../../Axios";
import OTP from "../../Auth/OTP";
import Axios from "axios";
import { Button, TextField, InputAdornment } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
function BookingForm() {
  const { userdetail, setuserdetail, otp, setbooknow } = useGlobalContext();
  const [number, setnumber] = useState();
  const [username, setusername] = useState();

  const [success, setsuccess] = useState(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      const tok = localStorage.getItem("axynghkwngasd");
      if (userdetail.length === 0) {
        if (tok) {
          setloading(true);
          Authaxios.get("account/userdetail")
            .then((res) => {
              // setuserdetail(res.data.user);
              console.log(res.data);
              setregisterdata({
                phone: res.data.Phone,
                fullname: res.data.username,
                email: res.data.email,
              });
              setphonevalidate("verified");
              setbooknow(true);
              setusername(res.data.username);
              setnumber(parseInt(res.data.Phone));
              setsuccess(true);
              setuserdetail(res.data);
              setloading(false);
            })
            .catch((error) => {
              setsuccess(false);
              setuserdetail([]);
              setloading(false);
            });
        } else {
          setloading(false);
        }
      } else {
        if (userdetail.Phone !== undefined) {
          setphonevalidate("verified");
          setbooknow(true);
          setsuccess(true);
          setusername(userdetail.username);
          setnumber(parseInt(userdetail.Phone));
          setregisterdata({
            phone: userdetail.Phone,
            fullname: userdetail.username,
            email: userdetail.email,
          });
          setloading(false);
        }
      }
    };
    fetchdata();
    return () => {
      source.cancel();
    };
  }, [userdetail, setbooknow, setuserdetail]);
  const initialRegisterData = Object.freeze({
    phone: "",
    password: "",
    fullname: "",
    email: "",
  });

  const [registerdata, setregisterdata] = useState(initialRegisterData);
  const [uservalidate, setuservalidate] = useState("");
  const [phonevalidate, setphonevalidate] = useState("");
  const [emailvalidate, setemailvalidate] = useState("");
  const [status, setstatus] = useState(false);
  const handleChanges = (e) => {
    if (e.target.name === "phone") {
      if (number) {
        if (e.target.value.trim().toString() === number.toString()) {
          setphonevalidate("verified");
        }
      } else {
        var term = e.target.value.trim();
        var re = new RegExp(
          "^(984|986|985|974|975|980|981|982|961|988|972|963)\\d{7}$"
        );
        if (re.test(term)) {
          setphonevalidate("validate");
        } else {
          setphonevalidate("invalid");
        }
      }
    } else if (e.target.name === "fullname") {
      if (e.target.value.length < 5) {
        setuservalidate("invalid");
      } else {
        setuservalidate("validate");
      }
    } else if (e.target.name === "email") {
      var ter = e.target.value.trim();

      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (validRegex.test(ter)) {
        setemailvalidate("validate");
      } else {
        setemailvalidate("invalid");
      }
    }
    setregisterdata({
      ...registerdata,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [time, settime] = useState(0);

  const sendotp = () => {
    if (
      (uservalidate === "validate" && emailvalidate === "validate") ||
      username
    ) {
      Customaxios.post("api/bookotp/", {
        phone: registerdata.phone,
        fullname: registerdata.fullname,
        email: registerdata.email,
      }).then((res) => {
        setstatus("sent");
        settime(0);
      });
    } else {
      if (registerdata.fullname.length === 0) {
        setuservalidate("invalid");
      } else {
        setemailvalidate("invalid");
      }
    }
  };
  const checkotp = () => {
    Customaxios.post(`api/check_otp/`, {
      otp: otp,
      phone: registerdata.phone,
    }).then((res) => {
      sessionStorage.setItem("n", registerdata.phone);
      sessionStorage.setItem("e", registerdata.email);
      sessionStorage.setItem("u", registerdata.fullname);
      setphonevalidate("verified");
      setstatus("verified");
      setbooknow(true);
    });
  };
  if (time < 30) {
    setTimeout(() => {
      increment();
    }, 1000);

    function increment() {
      settime(time + 1);
    }
  }

  return (
    <>
      {loading && <h1>loading</h1>}
      {loading || (
        <div className="booking__form">
          <span className="booking_form_desc">
            {success || (
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "500",
                  lineHeight: "1.2",
                }}
              >
                No account no Problem
              </span>
            )}
            {success || (
              <span>You can book without creating your account </span>
            )}
          </span>
          {success || (
            <div>
              <form className="booking__form">
                <div className="upper_form">
                  <span className="booking_form_input">
                    <span className="booking_form_input_header">Full Name</span>
                    <TextField
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="input"
                      onChange={handleChanges}
                      variant="outlined"
                      required
                      error={uservalidate === "invalid" ? true : false}
                      helperText={`${
                        uservalidate === "invalid" ? "Invalid Username" : ""
                      }`}
                    />
                  </span>
                  <span className="booking_form_input">
                    <span className="booking_form_input_header">Email</span>
                    <TextField
                      name="email"
                      id="email"
                      className="input"
                      onChange={handleChanges}
                      variant="outlined"
                      required
                      error={emailvalidate === "invalid" ? true : false}
                      helperText={`${
                        emailvalidate === "invalid"
                          ? "Invalid Email Address"
                          : ""
                      }`}
                    />
                  </span>
                </div>
                <div className="upper_form">
                  <span className="booking_form_input">
                    <span className="booking_form_input_header">
                      Mobile Number
                    </span>
                    <TextField
                      variant="outlined"
                      required
                      id="username"
                      name="phone"
                      onChange={handleChanges}
                      className="input"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {phonevalidate === "validate" ? (
                              <Button onClick={sendotp}>Send</Button>
                            ) : phonevalidate === "verified" ? (
                              <Button
                                endIcon={
                                  <CheckCircleIcon style={{ color: "blue" }} />
                                }
                              >
                                Verified
                              </Button>
                            ) : (
                              ""
                            )}
                          </InputAdornment>
                        ),
                      }}
                      error={phonevalidate === "invalid" ? true : false}
                      helperText={`${
                        phonevalidate === "invalid"
                          ? " Invalid Phone Number"
                          : ""
                      }`}
                    />
                  </span>
                  {status === "sent" && (
                    <span className="booking_form_input">
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="booking_form_input_header">Otp</span>

                        {time < 30 ? (
                          time + " sec"
                        ) : (
                          <Button onClick={sendotp} variant="outlined">
                            Send Again
                          </Button>
                        )}
                      </span>

                      <OTP registerdata={registerdata} />
                      {status === "sent" ? (
                        <Button variant="outlined" onClick={checkotp}>
                          Check Otp
                        </Button>
                      ) : (
                        ""
                      )}
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default BookingForm;
