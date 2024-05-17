import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
import { Authaxios } from "../../Axios";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
} from "@material-ui/core";
import "./Roomkeyform.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TableRow from "@material-ui/core/TableRow";
// import Axios from "axios";

function Roomkeyform({ id }) {
  const {
    keydata,
    setalerttype,
    setkeyformmodal,
    // alert,
    setalert,
    setalerttext,
  } = useGlobalContext();
  let data = keydata.filter((swine) => swine.id.toString() === id.toString());
  const initialFormData = Object.freeze({
    roomno: "",
    roomkey: "",
  });
  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const Send = (e) => {
    e.preventDefault();
    Authaxios.post("/api/roomkey/", {
      id: data[0].room_key.id,
      roomno: formData.roomno,
      roomkey: formData.roomkey,
    }).then((res) => {
      localStorage.removeItem("notice");
      setkeyformmodal(false);
      setalert(true);
      setalerttype("success");
      setalerttext("Room key and Room No. Added ! Refresh to see the change");
    });
  };
  // const verify = (amount, bookid, payid) => {
  //   var path = "https://uat.esewa.com.np/epay/transrec";

  //   Axios.post(path, {
  //     amt: amount,
  //     rid: bookid,
  //     pid: payid,
  //     scd: "epay_payment",
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       alert(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <div className="room_key_form_body">
      <span className="back_header_room_key">
        <ArrowBackIosIcon
          onClick={() => setkeyformmodal(false)}
          className="back_header_icon"
          style={{
            width: "30px",
            height: "30px",
            color: "rgb(34, 34, 34)",
            cursor: "pointer",
          }}
        />
        <div className="back_header_text">
          <h3 className="back_header_text">Book Your Room Right Away</h3>
        </div>
      </span>

      <div className="room_key_form">
        <div className="booking_details_form">
          <div className="booking_details_modal_detail_container">
            {data.map((mapped, i) => {
              const {
                fullname,
                Contact,
                room,
                check_in_date,
                check_out_date,
                expected_arrival_time,
                total_price,
              } = mapped;
              return (
                <Table key={i + 1}>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: 100 }}> User</TableCell>
                      <TableCell style={{ width: 100 }}> Room Type</TableCell>
                      <TableCell style={{ width: 100 }}> Total Price</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell style={{ width: 100, cursor: "pointer" }}>
                        {fullname}({Contact}){" "}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>{room.name}</TableCell>
                      <TableCell style={{ width: 100 }}>
                        {total_price}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell style={{ width: 100 }}> Check In</TableCell>
                      <TableCell style={{ width: 100 }}> Check Out</TableCell>
                      <TableCell style={{ width: 100 }}>
                        {" "}
                        Expected Arrival
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 100, cursor: "pointer" }}>
                        {check_in_date}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        {check_out_date}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        {expected_arrival_time}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            })}
            {/* <Button
                variant="outlined"
                onClick={() => verify(total_price, id, payment.payment_id)}
              >
                Verify Payment
              </Button> */}
            <div className="room_key_detail_box">
              <h5>Detail</h5>
              <p>
                Long detail here too long and too detail so it can be explained
                carefully
              </p>
            </div>
          </div>
        </div>
        <form className="booking_details_form__">
          <span>
            Enter Room No
            <TextField
              name="roomno"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </span>
          <span>
            Enter Room key
            <TextField
              name="roomkey"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </span>
          <Button type="submit" onClick={Send} variant="outlined" fullWidth>
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Roomkeyform;
