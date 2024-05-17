import React, { useState } from "react";
import { useGlobalContext } from "./Context";
import Customaxios from "./Axios";
import { Modal, TextField, Button, InputAdornment } from "@material-ui/core";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
function Suggest() {
  const initialformData = Object.freeze({
    hotel: "",
    address: "",
    contact: "",
    email: "",
  });

  const [formData, setformData] = useState(initialformData);
  const { suggestmodal, setsuggestmodal } = useGlobalContext();
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const submit = (e) => {
    e.preventDefault();
    Customaxios.post("/api/addhotelsuggest/", {
      hotel: formData.hotel,
      address: formData.address,
      contact: formData.contact,
      type: "suggest",
    }).then((res) => {
      setsuggestmodal(false);
    });
  };
  return (
    <Modal
      style={{
        display: "grid",
        placeItems: "center",
        placeContent: "center",
      }}
      open={suggestmodal}
      onClose={() => setsuggestmodal(false)}
    >
      <div className="suggest_form_modal">
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            backgroundColor: "#fff",
          }}
          className="gallery_modal_head"
        >
          <div
            className="close_modal_container"
            style={{
              padding: "10px",
              backgroundColor: "#fff",
            }}
          >
            <ArrowBackIosIcon
              onClick={() => setsuggestmodal(false)}
              style={{
                width: "30px",
                height: "30px",
                color: "rgb(34, 34, 34)",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="suggest_form_details">
          <h2>Didnt Find Your Favourite Hotel? We will get it for you</h2>
          <h2>Enter the details of hotel u want to see with us</h2>
        </div>

        <form className="suggest_form">
          <span className="suggest_form_cont">
            <h4>Enter the Name of hotel</h4>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Enter Name"
              name="name"
              autoFocus
              onChange={handleChange}
              className="input"
            />
          </span>
          <span className="suggest_form_cont">
            <h4>Enter Phone number (if you have any)</h4>
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
          </span>
          <span className="suggest_form_cont">
            <h4>Enter Precise Address of hotel</h4>
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
          </span>

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
    </Modal>
  );
}

export default Suggest;
