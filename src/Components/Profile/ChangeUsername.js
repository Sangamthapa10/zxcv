import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Authaxios } from "../Axios";
import { useGlobalContext } from "../Context";
const ChangeUsername = () => {
  const { setcinfo_open, userdetail, setuserdetail } = useGlobalContext();
  const initialFormData = Object.freeze({
    fname: "",
    lname: "",
  });

  const [formdata, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setformData({
      ...formdata,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const Submit = () => {
    Authaxios.post("/account/edituser/", {
      username: formdata.fname + " " + formdata.lname,
    }).then((res) => {
      alert(res);
      if (res.status === 200) {
        setcinfo_open(false);
        setuserdetail({
          ...userdetail,
          username: formdata.fname + " " + formdata.lname,
        });
      }
    });
  };
  return (
    <form>
      <TextField
        variant="outlined"
        required
        id="fname"
        label="First Name"
        name="fname"
        autoFocus
        onChange={handleChange}
        className="input"
        margin="normal"
      />
      <TextField
        margin="normal"
        variant="outlined"
        required
        name="lname"
        label="Last Name"
        type="text"
        id="lname"
        onChange={handleChange}
        className="input"
      />
      <Button onClick={Submit} color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};
export default ChangeUsername;
