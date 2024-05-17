import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
import { Authaxios } from "../../Axios";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button, TextField } from "@material-ui/core";
import "./CSS/AdminPropertyRoom.css";
function AdminPropertyRoom() {
  const { setadminimg, setalerttype, setalert, setalerttext } =
    useGlobalContext();
  const initialFormData = Object.freeze({
    name: "",
    bed_count: "",
    desc: "",
    price: "",
    total_room: "",
    room_amneties: "",
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
    Authaxios.post("/api/modify_request/asd/", {
      add_room: true,
      name: formData.name,
      bed_count: formData.bed_count,
      desc: formData.desc,
      price: formData.price,
      total_room: formData.total_room,
      room_amneties: "",
      default_room: false,
    }).then((res) => {
      setadminimg(false);
      setalert(true);
      setalerttype("success");
      setalerttext("Posted we will contact u soon");
      console.log("yes");
    });
  };

  return (
    <div className="admin_property_room_body">
      <span className="admin_back_header_room">
        <ArrowBackIosIcon
          onClick={() => setadminimg(false)}
          className="back_header_icon"
          style={{
            width: "30px",
            height: "30px",
            color: "rgb(34, 34, 34)",
            cursor: "pointer",
          }}
        />
        <div className="back_header_text">
          <h3 className="back_header_text">Add Room Options</h3>
        </div>
      </span>
      <form className="admin_addroom_form">
        <TextField
          onChange={handleChange}
          fullWidth
          variant="outlined"
          label="Enter Room Name"
          name="name"
        />
        <TextField
          onChange={handleChange}
          fullWidth
          variant="outlined"
          label="Enter Total Beds in Room"
          name="bed_count"
        />
        <TextField
          onChange={handleChange}
          fullWidth
          variant="outlined"
          label="Enter Description"
          name="desc"
        />
        <TextField
          fullWidth
          onChange={handleChange}
          variant="outlined"
          label="Enter Room Price"
          name="price"
        />
        <TextField
          onChange={handleChange}
          fullWidth
          variant="outlined"
          label="Enter Total Room"
          name="total_room"
        />
        <Button variant="outlined" color="primary" onClick={submit}>
          Add Room{" "}
        </Button>
      </form>
    </div>
  );
}

export default AdminPropertyRoom;
