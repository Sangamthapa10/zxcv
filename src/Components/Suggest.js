import React, { useState } from "react";
import { useGlobalContext } from "./Context";
import Customaxios from "./Axios";
import { Modal, TextField, Button, InputAdornment } from "@mui/material";
//icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      <div className="suggest_form_modal">
        <div className="gallery_modal_head">
          <div className="close_modal_container">
            <ArrowBackIosIcon
              onClick={() => setsuggestmodal(false)}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="suggest_form_details">
          <h2>Can't find your hotel?</h2>
          <h2>Share the details and we'll add it for you</h2>
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
