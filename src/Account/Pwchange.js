import React, { useState } from "react";
import { Authaxios } from "../Components/Axios";
import { useGlobalContext } from "../Components/Context";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

const Pwchange = () => {
  const { setmailmodal, setmailtext, setalert, setalerttext, setalerttype } =
    useGlobalContext();
  const [passwordnotmatch, setpasswordnotmatch] = useState("");
  const history = useHistory();
  const initialFormData = Object.freeze({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });
  const [formData, setformData] = useState(initialFormData);

  const handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "new_password2") {
      console.log("S");
      if (e.target.value.trim() === formData.new_password1) {
        setpasswordnotmatch("validate");
      } else {
        setpasswordnotmatch("invalid");
      }
    }
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const [show, setshow] = useState("");

  const handleSubmit = (e) => {
    console.log(formData);

    e.preventDefault();
    if (formData.old_password.length > 0 && passwordnotmatch === "validate") {
      setmailmodal(true);
      setmailtext("loading");
      Authaxios.post(`/account/pwchange/`, {
        old_password: formData.old_password,
        new_password1: formData.new_password1,
        new_password2: formData.new_password2,
      })
        .then((res) => {
          setshow("");
          setmailmodal("false");
          setalert(true);
          setalerttext("Password Changed Successfully");
          setalerttype("success");
        })
        .catch((error) => {
          setalert(true);
          setalerttext("Error");
          setalerttype("error");
          setmailmodal(false);
        });
    } else {
      if (formData.old_password.length === 0) {
        alert("s");
        setpasswordnotmatch("emptypw");
      } else if (formData.new_password1.length === 0) {
        setpasswordnotmatch("emptynew");
        alert("q");
      } else if (formData.new_password1 !== formData.new_password2) {
        setpasswordnotmatch("invalid");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100vw",
          backgroundColor: "#fff",
        }}
        className="gallery_modal_head"
      >
        <div
          className="close_personal__container"
          style={{
            padding: "10px",

            backgroundColor: "#fff",
          }}
        >
          <ArrowBackIosIcon
            onClick={() => history.goBack()}
            style={{
              width: "30px",
              height: "30px",
              color: "rgb(34, 34, 34)",
              cursor: "pointer",
            }}
          />
          <h4>Security</h4>
        </div>
      </div>
      <div className="personal_info_btn_tiles">
        <div className="usernam personal_info_component">
          <span className="personal_info_main">
            <span className="personal_info_headtag">Password</span>
            <span className="personal_info_detail">*********</span>
          </span>
          {show === "changepassword" ? (
            <CloseIcon onClick={() => setshow("")} />
          ) : (
            <EditIcon
              onClick={() => setshow("changepassword")}
              style={{ color: "lightgray" }}
            />
          )}
        </div>
      </div>
      {show === "changepassword" && (
        <form
          style={{
            display: "grid",
            gridAutoColumns: "35%",
            paddingLeft: "40px",
            gridGap: "20px 20px",
            marginBottom: "10vh",
            paddingTop: "30px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "16px",
                paddingBottom: "10px",
                color: "rgb(72, 72, 72) !important",
              }}
            >
              Old Password
            </p>
            <TextField
              autoComplete="off"
              fullWidth
              id="old_password"
              label="Enter old_password"
              name="old_password"
              onChange={handleChange}
              variant="outlined"
              required
              helperText={`${
                passwordnotmatch === "emptypw"
                  ? "Must contain 8 characters and have 1 number"
                  : ""
              }`}
              error={passwordnotmatch === "emptypw" ? true : false}
            />
          </div>
          <div>
            <p style={{ fontSize: "16px", paddingBottom: "10px" }}>
              New Password
            </p>
            <TextField
              autoComplete="off"
              variant="outlined"
              name="new_password1"
              label="new_password1"
              id="new_password1"
              onChange={handleChange}
              required
              fullWidth
              helperText={`${
                passwordnotmatch === "invalid"
                  ? "Password do not match"
                  : passwordnotmatch === "emptynew"
                  ? "Must contain 8 characters and have 1 number"
                  : ""
              }`}
              error={
                passwordnotmatch === "invalid"
                  ? true
                  : passwordnotmatch === "emptynew"
                  ? true
                  : false
              }
            />
          </div>
          <div>
            <p style={{ fontSize: "16px", paddingBottom: "10px" }}>
              New Password Again
            </p>
            <TextField
              autoComplete="off"
              fullWidth
              onChange={handleChange}
              helperText={`${
                passwordnotmatch === "invalid"
                  ? "Password do not match"
                  : passwordnotmatch === "empty"
                  ? "Must contain 8 characters and have 1 number"
                  : ""
              }`}
              variant="outlined"
              required
              name="new_password2"
              label="new_password2"
              id="new_password2"
              error={
                passwordnotmatch === "invalid"
                  ? true
                  : passwordnotmatch === "empty"
                  ? true
                  : false
              }
            />
          </div>
          <Button
            style={{ textTransform: "none" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Change Password
          </Button>
        </form>
      )}
    </div>
  );
};

export default Pwchange;
