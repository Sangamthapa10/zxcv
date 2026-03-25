import React, { useState, useRef } from "react";
import "./CSS/CompleteBooking.css";
import Customaxios, { Authaxios } from "../../Axios";
import { useGlobalContext } from "../../Context";
import { useParams, useHistory } from "react-router-dom";
import BookingForm from "./BookingForm";
import ModalDatePicker from "../ModalDatePicker";
import SWidget from "../Widget";
import KhaltiCheckout from "khalti-checkout-web";

import {
  Modal,
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
//icons
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ApartmentIcon from "@mui/icons-material/Apartment";
function CompleteBooking() {
  const bookformref = useRef();
  const { id } = useParams();
  const { name } = useParams();
  const { selectedroom } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { roomcount } = useParams();
  const { guestcount } = useParams();
  const { mealid } = useParams();
  const history = useHistory();
  const {
    setmailmodal,
    setmailtext,
    roomref,
    setm_detail,
    setbigdate,
    singlepage,
    setbookingconfirmed,
    userdetail,
    selectedmeal,
  } = useGlobalContext();
  const [payoption, setpayoption] = useState(false);
  let paid = false;
  const [roomno, setroomno] = useState(false);
  // Date
  const checkin_str = new Date(check_in);
  const check_out_str = new Date(check_out);
  const checkin_raw_date = checkin_str.toUTCString();
  const checkout_raw_date = check_out_str.toUTCString();
  const three =
    checkin_raw_date.split(" ")[0] +
    checkin_raw_date.split(" ")[1] +
    checkin_raw_date.split(" ")[2];
  const four =
    checkout_raw_date.split(" ")[0] +
    checkout_raw_date.split(" ")[1] +
    checkout_raw_date.split(" ")[2];
  // esewa
  var url = window.location.href;
  var arr = url.split("/");
  var domain = arr[0] + "//" + arr[2];

  function post(t) {
    let meal = mealid && mealid.split(",");
    let mealnumberArray = meal && meal.map((el) => parseInt(el));
    var a = localStorage.getItem("axynghkwngasd");
    let ax = a ? Authaxios : Customaxios;
    ax.post("api/book/", {
      property: id.replace(/\s+/g, " ").trim(),
      room: selectedroom.replace(/\s+/g, " ").trim(),
      check_in_date: check_in.replace(/\s+/g, " ").trim(),
      check_out_date: check_out.replace(/\s+/g, " ").trim(),
      guest_count: guestcount.replace(/\s+/g, " ").trim(),
      total_room: roomcount.replace(/\s+/g, " ").trim(),
      booking_for_other: bookother,
      room_key_active: roomno ? true : false,
      mealid: mealnumberArray,
      contact: sessionStorage.getItem("n"),
    }).then((res) => {
      var path = "https://uat.esewa.com.np/epay/main";
      if (res.data.total_price) {
        var params = {
          amt: res.data.total_price,
          psc: 0,
          pdc: 0,
          txAmt: 0,
          tAmt: res.data.total_price,
          pid: res.data.id,
          scd: "epay_payment",
          su: domain + "/paymentVerification/",
          fu: window.location.href,
        };

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in params) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);
          form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
      }
    });
  }
  // const khaltipayment=()=>{

  // }
  const [bookother, setbookother] = useState(false);
  //   booknormal
  const [loading, setloading] = useState(false);
  const [prev, setprev] = useState([]);
  const Book = (s) => {
    if (roomno === false) {
      var a = localStorage.getItem("axynghkwngasd");
      if (a || sessionStorage.getItem("n")) {
        setmailmodal(true);
        setmailtext("loading");
        let ax = a ? Authaxios : Customaxios;
        // let meal = mealid && mealid.split(",");
        // let mealnumberArray = mealid && meal.map((el) => parseInt(el));
        ax.post("api/book/", {
          property: id,
          room: selectedroom,
          check_in_date: check_in,
          check_out_date: check_out,
          guest_count: guestcount,
          total_room: roomcount,
          status: true,
          mealid: selectedmeal,
          booking_for_other: s === "true" ? true : bookother,
          room_key_active: roomno ? true : false,
          contact: sessionStorage.getItem("n"),
        })
          .then((res) => {
            setmailmodal(false);
            if (res.data.statusText === "booking_exitsts") {
              setloading(false);

              setmodal(true);
              setmtype("exists");
              setprev(res.data.data);
            } else {
              let b = Object.assign([], [res.data]);
              setbookingconfirmed({
                data: b,
                fetcherror: false,
              });
              setloading(false);
              history.push(
                `/Booking/Confirmed/id=${res.data.bookid}/contact=${res.data.Contact}`
              );
            }
          })
          .catch((error) => {
            setmailmodal(false);
          });
      } else {
        var elem = document.getElementById("id");
        elem.scrollIntoView();
        setmailmodal(false);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setroomno(true);
      setmtype("roomno");
      setmodal(true);
    } else {
      setroomno(false);
    }
  };
  const [mtype, setmtype] = useState(false);
  const [modal, setmodal] = useState(false);
  const handlebookother = (e) => {
    if (e.target.checked) {
      setbookother(true);
      if (mtype !== "exists") {
        setmtype("asd");

        setmodal(true);
      }
      if (mtype === "exists" && modal === true) {
        setbookother(true);
        setmtype(false);
        setmodal(false);
        Book("true");
      }
    } else {
      setbookother(false);
    }
  };

  const closebookmodal = () => {
    setm_detail(false);
    let m = mealid ? mealid : "";
    history.push(
      `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${m}/bookingmodal=${false}`
    );
  };
  const ScrollToRoom = () => {
    window.scrollTo({ top: roomref.current.offsetTop, behavior: "smooth" });
  };
  const editroom = () => {
    closebookmodal();
    ScrollToRoom();
  };
  const deletebooking = () => {
    setmailmodal(true);
    setmailtext("loading");
    let a = prev.map((mapped) => parseFloat(mapped.id));
    let id = a[0];
    Customaxios.post(`api/changeuserbooking/${id}/`, {
      delete: true,
      deleteid: a,
    }).then((res) => {
      Book();
    });
  };
  //khalti payment

  // let config = {
  //   // replace this key with yours
  //   publicKey: "test_public_key_a2ca46a3c95249b8b41151e01b5e4427",
  //   productIdentity: "1234567890",
  //   productName: "Drogon",
  //   productUrl: "http://gameofthrones.com/buy/Dragons",
  //   eventHandler: {
  //     onSuccess(payload) {
  //       // hit merchant api for initiating verfication
  //       console.log(payload);
  //     },
  //     // onError handler is optional
  //     onError(error) {
  //       // handle errors
  //       console.log(error);
  //     },
  //     onClose() {
  //       console.log("widget is closing");
  //     },
  //   },
  //   paymentPreference: [
  //     "KHALTI",
  //     "EBANKING",
  //     "MOBILE_BANKING",
  //     "CONNECT_IPS",
  //     "SCT",
  //   ],
  // };

  const pay = () => {
    let meal = mealid && mealid.split(",");
    let mealnumberArray = meal && meal.map((el) => parseInt(el));
    var a = localStorage.getItem("axynghkwngasd");
    let ax = a ? Authaxios : Customaxios;
    ax.post("api/book/", {
      property: id.replace(/\s+/g, " ").trim(),
      room: selectedroom.replace(/\s+/g, " ").trim(),
      check_in_date: check_in.replace(/\s+/g, " ").trim(),
      check_out_date: check_out.replace(/\s+/g, " ").trim(),
      guest_count: guestcount.replace(/\s+/g, " ").trim(),
      total_room: roomcount.replace(/\s+/g, " ").trim(),
      booking_for_other: bookother,
      room_key_active: roomno ? true : false,
      mealid: mealnumberArray,
      contact: sessionStorage.getItem("n"),
      status: true,
    }).then((res) => {
      console.log(res.data);
      if (res.data.total_price) {
        let config = {
          // replace this key with yours
          publicKey: "test_public_key_a2ca46a3c95249b8b41151e01b5e4427",
          productIdentity: "1234567890",
          productName: "Dragon",
          productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
          eventHandler: {
            onSuccess(payload) {
              // hit merchant api for initiating verfication
              console.log(payload);
            },
            // onError handler is optional
            onError(error) {
              // handle errors
              console.log(error);
            },
            onClose() {
              console.log("widget is closing");
            },
          },
          paymentPreference: [
            "KHALTI",
            // "EBANKING",
            // "MOBILE_BANKING",
            // "CONNECT_IPS",
            // "SCT",
          ],
        };

        let checkout = new KhaltiCheckout(config);
        checkout.show({ amount: 1000 });
      }
    });
  };
  return (
    <>
      <ModalDatePicker
        start={checkin_str}
        end={check_out_str}
        booking_details={singlepage[0].booking_details}
      />

      <Modal
        style={{ display: "grid", placeContent: "center", placeItem: "center" }}
        open={loading}
        onClose={() => setloading(false)}
      >
        <div style={{}}>
          <div
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              backgroundColor: "#fff",
              borderBottom: "1px solid lightgray",
            }}
            className="gallery_modal_head"
          >
            <div
              className="close_modal_container"
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#fff",
              }}
            >
              <HighlightOffIcon
                onClick={() => setloading(false)}
                style={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(34, 34, 34)",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          <SWidget data={"modal"} />
        </div>
      </Modal>
      <Modal
        style={{ display: "grid", placeContent: "center", placeItem: "center" }}
        open={modal}
        onClose={() => setmodal(false)}
      >
        <div className="mail_body">
          <div
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              background: "#fff",
              zIndex: 6000,
              borderBottom: "1px solid lightgray",
            }}
            className="gallery_modal_head"
          >
            <div
              className="close_modal_container"
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#fff",
              }}
            >
              <HighlightOffIcon
                onClick={() => setmodal(false)}
                style={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(34, 34, 34)",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          {mtype === "exists" ? (
            <div>
              <section className="section">
                <h3>Welcome!</h3>

                <p>You already have booking for the same date</p>
                <p>
                  If you are trying to change date or add meals then you can
                  edit your booking. If you are trying to change room then you
                  can delete previous bookings and book again and lastly if you
                  are booking more rooms for someone else for the same date you
                  can enable booking for others.
                </p>
                <div className="book_options__">
                  Booking For Others ?
                  <Switch
                    checked={bookother}
                    onChange={handlebookother}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "15px",
                  }}
                >
                  <h5>Details</h5>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      onClick={() => history.push("/booking")}
                      style={{ textTransform: "none" }}
                      variant="outlined"
                    >
                      Edit this bookings
                    </Button>
                    <Button
                      onClick={deletebooking}
                      style={{ textTransform: "none", marginLeft: "15px" }}
                      variant="outlined"
                    >
                      Cancel this and book new
                    </Button>
                  </span>
                </span>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell> User</TableCell>
                      <TableCell> Check In</TableCell>
                      <TableCell> Check out</TableCell>
                      <TableCell> Room Type</TableCell>
                      <TableCell> Total Price</TableCell>
                      <TableCell> Payment Method</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prev.map((mapped, i) => {
                      return (
                        <TableRow key={i + 1}>
                          <TableCell>{mapped.fullname}</TableCell>
                          <TableCell>{mapped.check_in_date}</TableCell>
                          <TableCell>{mapped.check_out_date}</TableCell>
                          <TableCell>{mapped.room.name}</TableCell>
                          <TableCell>{mapped.total_price}</TableCell>
                          <TableCell>{mapped.payment_options}</TableCell>
                          <TableCell>{mapped.booking_status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </section>
            </div>
          ) : (
            <div className="mail_container">
              <section className="section">
                <h3>Welcome!</h3>
                {mtype === "roomno" ? (
                  <p>You will get room key which can be used to check in</p>
                ) : (
                  <p>Booking for other details bla bla</p>
                )}
              </section>
            </div>
          )}
        </div>
      </Modal>
      <div className="complete_booking_form">
        {singlepage.map((mappe, i) => {
          const { room_option, key_room } = mappe;
          let default_room = mappe.room_option.filter(
            (swine) => swine.default_room === "d"
          );
          let roomselect = selectedroom
            ? parseInt(selectedroom)
            : default_room[0].id;
          let room = room_option.filter((swine) => swine.id === roomselect);
          let meals =
            mealid &&
            mappe.propertymeals.filter((swine) => mealid.includes(swine.id));
          const s = mealid ? meals.reduce((s, { price }) => s + price, 0) : 0;

          return (
            <div className="booking_form_details" key={i + 1}>
              <div className="booking_detail_t_">
                <h3 style={{ fontWeight: "750", fontSize: "1.4rem" }}>
                  Booking Details
                </h3>
                <span className="sm_booking_details">
                  <span className="sm_booking_details_">
                    <h3 className="sm_booking_details_head">Dates</h3>
                    <span className="sm_booking_details__">
                      {three}-{four}
                    </span>
                  </span>
                  <Button
                    onClick={() => setbigdate(true)}
                    style={{
                      textTransform: "none",
                      textDecoration: "underline",
                      fontWeight: "800",
                    }}
                  >
                    Edit
                  </Button>
                </span>
                <span className="sm_booking_details">
                  <span className="sm_booking_details_">
                    <h3 className="sm_booking_details_head">Guest & Room</h3>

                    <span className="sm_booking_details__">
                      {guestcount} Guest,{roomcount} Room
                    </span>
                  </span>

                  <Button
                    onClick={() => setloading(true)}
                    style={{
                      textTransform: "none",
                      textDecoration: "underline",
                      fontWeight: "800",
                    }}
                  >
                    Edit
                  </Button>
                </span>
                <span className="sm_booking_details">
                  <span className="sm_booking_details_">
                    <h3 className="sm_booking_details_head">Room Type</h3>
                    <span className="sm_booking_details__">{room[0].name}</span>
                  </span>
                  <Button
                    onClick={editroom}
                    style={{
                      textTransform: "none",
                      textDecoration: "underline",
                      fontWeight: "800",
                    }}
                  >
                    Edit
                  </Button>
                </span>
                {selectedmeal && (
                  <span className="sm_booking_details">
                    <span className="sm_booking_details_">
                      <h3 className="sm_booking_details_head">Added Meals</h3>
                      {selectedmeal.map((item, i) => {
                        return (
                          <span key={i} className="sm_booking_details__">
                            {item.name} * {item.quantity}
                          </span>
                        );
                      })}
                    </span>
                    <Button
                      onClick={editroom}
                      style={{
                        textTransform: "none",
                        textDecoration: "underline",
                        fontWeight: "800",
                      }}
                    >
                      Edit
                    </Button>
                  </span>
                )}
                <div className="switch_container">
                  {key_room && (
                    <>
                      <hr />
                      <div className="book_option">
                        <div className="book_options__">
                          Pay and get Room no. Right Now
                          <Switch
                            checked={roomno}
                            onChange={handleChange}
                            name="checkedA"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </div>
                        {roomno && (
                          <div>
                            <h6>
                              After Succesfull Payment You will Get Room no. and
                              room lock key.
                            </h6>
                          </div>
                        )}
                      </div>
                      <hr />
                    </>
                  )}
                  <div>
                    <div className="book_options__">
                      Booking For Others ?
                      <Switch
                        checked={bookother}
                        onChange={handlebookother}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </div>
                    {bookother && (
                      <div>
                        <h6>
                          After Succesfull Payment You will Get BookingID and
                          key which can be shown at Reception
                        </h6>{" "}
                      </div>
                    )}
                  </div>
                </div>
                <hr />
              </div>
              {userdetail.Phone !== null ||
                (undefined && (
                  <div className="booking_detail_t_">
                    <h3 style={{ fontWeight: "750", fontSize: "1.4rem" }}>
                      User Details
                    </h3>
                    <span className="sm_booking_details">
                      <span className="sm_booking_details_">
                        <h3 className="sm_booking_details_head">Fullname</h3>
                        <span className="sm_booking_details__">
                          {userdetail.username}
                        </span>
                      </span>
                      <Button
                        style={{
                          textTransform: "none",
                          textDecoration: "underline",
                          fontWeight: "800",
                        }}
                      >
                        Edit
                      </Button>
                    </span>

                    <span className="sm_booking_details">
                      <span className="sm_booking_details_">
                        <h3 className="sm_booking_details_head">Number</h3>
                        <span className="sm_booking_details__">
                          {userdetail.Phone}
                        </span>
                      </span>
                      <Button
                        style={{
                          textTransform: "none",
                          textDecoration: "underline",
                          fontWeight: "800",
                        }}
                      >
                        Edit
                      </Button>
                    </span>
                    <hr />
                  </div>
                ))}

              <div className="payment_options_btns">
                <h3 className="sel_pay_title">Select Payment Options</h3>
                <div className="btn_group_pay_option">
                  <Button
                    size="large"
                    endIcon={<AttachMoneyIcon />}
                    onClick={() => setpayoption(!payoption)}
                    variant="contained"
                    className={`${paid ? "selected_pay_option_btn" : ""}`}
                    color="primary"
                  >
                    Pay Now
                  </Button>
                  <Button
                    onClick={(e) => Book(e, s + room[0].price)}
                    endIcon={<ApartmentIcon />}
                    size="large"
                    style={{ backgroundColor: "green", color: "white" }}
                    variant="contained"
                    disabled={roomno ? true : false}
                  >
                    {roomno ? "disabled for room key" : "Pay at Hotel"}
                  </Button>
                </div>

                <div
                  className={`${
                    payoption ? "pay_now_options" : "display_none"
                  }`}
                >
                  <Button
                    variant="outlined"
                    onClick={() => post(s + room[0].price)}
                  >
                    <div style={{ display: "grid" }}>
                      <img
                        src="https://laz-img-cdn.alicdn.com/tfs/TB1EdzsDuT2gK0jSZFvXXXnFXXa-160-160.png"
                        alt="a"
                        style={{ width: "160px", height: "auto" }}
                      />
                      Esewa
                    </div>
                  </Button>
                  <Button variant="outlined" onClick={pay}>
                    <div style={{ display: "grid" }}>
                      <img
                        src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/icons/khalti.png"
                        alt="a"
                        style={{ width: "160px", height: "auto" }}
                      />
                      Khalti
                    </div>
                  </Button>
                  <Button variant="outlined">
                    <div style={{ display: "grid" }}>
                      <CreditCardIcon
                        style={{ width: "160px", height: "auto" }}
                      />
                      Card Payment
                    </div>
                  </Button>
                </div>
                <hr />
              </div>

              <div className="property_cancellation_policy">
                <h3>Cancellation Pollicy</h3>
                <p>
                  Free cancellation until 3:00 PM on Jul 10. After that, cancel
                  before 3:00 PM on Jul 15 and get a 50% refund, minus the first
                  night and service fee. Learn more Make sure this host’s
                  cancellation policy works for you. Our Extenuating
                  Circumstance policy may not cover travel disruptions caused by
                  known events, like COVID-19, or foreseeable events, like
                  common severe weather. Learn more
                </p>
                <hr />
              </div>
            </div>
          );
        })}
        <div id="id" ref={bookformref}>
          <BookingForm />
        </div>
      </div>
    </>
  );
}

export default CompleteBooking;
