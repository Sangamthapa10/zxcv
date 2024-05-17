import React, { useState, useEffect } from "react";
import "./CSS/Booking.css";
import { useGlobalContext } from "../Components/Context";
import { useHistory } from "react-router-dom";
//axios
import Axios from "axios";
import Customaxios, { Authaxios } from "../Components/Axios";
//material ui
import {
  TextField,
  Tab,
  Tabs,
  Button,
  Modal,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
//svg
import Unathorizedsvg from "../Components/SvgComponents/Unathorizedsvg";
import NoBookingsvg from "../Components/SvgComponents/NoBookingsvg";
//bookingcomponents
import PropertyMeals from "../Components/SinglepageComponents/PropertyMeals";
import Loading from "./Loading";
import DateRange from "../Components/DatePicker/components/DateRange/index.js";
//icons
import FileCopyIcon from "@material-ui/icons/FileCopy";
import StarsIcon from "@material-ui/icons/Stars";
import SaveIcon from "@material-ui/icons/Save";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
//lazy load
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Booking = () => {
  const {
    setlogin,
    bmealadd,
    setbmealadd,
    setaddreview,
    setsnackbar,
    setalerttype,
    setalerttext,
  } = useGlobalContext();
  const [value, setvalue] = useState(0);

  const addreview = (e, id) => {
    if (e.stopPropagation) e.stopPropagation();
    setaddreview({
      modal: true,
      id: id,
    });
  };
  const matches = useMediaQuery("(max-width:760px)");
  const mob = useMediaQuery("(max-width:600px)");

  const [open, setopen] = useState(false);
  const history = useHistory();
  let authorized = localStorage.getItem("axynghkwngasd");
  const [userbooking, setuserbooking] = useState([]);

  const [data, setdata] = useState({ k: "", r: "" });
  const openmodal = (key, roomno) => {
    setdata({ k: key, r: roomno });
    setopen(true);
  };
  const [bloading, setbloading] = useState(true);
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      if (authorized) {
        Authaxios.get("/api/userbookinglist/")
          .then((res) => {
            setbloading(false);
            console.log(res.data);
            setuserbooking(res.data);
            if (
              res.data.filter(
                (swine) => swine.booking_status.toString() === "checkedin"
              ).length > 0
            ) {
              setvalue(2);
            } else if (
              res.data.filter((swine) => swine.booking_status === "booked")
                .length > 0
            ) {
              setvalue(0);
            } else if (
              res.data.filter((swine) => swine.booking_status === "checkedout")
                .length > 0
            ) {
              setvalue(1);
            } else {
              setvalue(0);
            }
            setbloading(false);
          })
          .catch((error) => {
            setbloading(false);

            if (Axios.isCancel(error)) {
              console.log("AxiosCancel: caught cancel");
            } else {
              throw error;
            }
          });
      } else {
        setbloading(false);
      }
    };
    fetchdata();
    return () => {
      source.cancel();
    };
  }, [authorized]);
  const detail = (i, a) => {
    history.push(`/booking/confirmed/id=${i}/contact=${a}`);
  };

  function differences(date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }
  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = "";

    difference +=
      days === 0 ? "" : days === 1 ? `${days} day ` : `${days} days `;

    difference +=
      hours === 0 ? "" : hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference +=
      minutes === 0
        ? ""
        : hours === 1
        ? `${minutes} minutes`
        : `${minutes} minutes`;
    if (hours > 0) {
      return difference;
    } else {
      return false;
    }
  }

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  };
  let dat =
    value === 0
      ? userbooking.filter((swine) => swine.booking_status === "booked")
      : value === 2
      ? userbooking.filter((swine) => swine.booking_status === "checkedin")
      : userbooking.filter((swine) => swine.booking_status === "checkedout");

  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[2];

    return four;
  }
  //eswa
  function post(e, t, bid) {
    if (e.stopPropagation) e.stopPropagation();
    var url = window.location.href;
    var arr = url.split("/");
    var domain = arr[0] + "//" + arr[2];
    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
      amt: t,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: t,
      pid: bid,
      scd: "epay_payment",
      su: domain + "/paymentVerification/",
      fu: window.location.href,
    };
    alert(params);
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
  const [modaltype, setmodaltype] = useState("");
  const [mealdata, setmealdata] = useState({
    menu: [],
    main: [],
    bid: "",
    booking_details: [],
    datafetched: false,
  });
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [state, setState] = useState([
    {
      startDate: "",
      endDate: "",
      key: "selection",
    },
  ]);
  const [ctype, setctype] = useState("");
  const opens = (e, a, id, mid, ch, chout) => {
    if (e.stopPropagation) e.stopPropagation();
    let obj = userbooking.filter((swine) => swine.id === id);
    setctype(obj.booking_status);
    setmodaltype(a);
    setopen(true);
    setState([
      {
        startDate: new Date(ch),
        endDate: new Date(chout),
        key: "selection",
      },
    ]);
    if (mealdata.datafetched === false) {
      Customaxios.get(`api/changeuserbooking/${id}`).then((res) => {
        setbmealadd(mid.map((mapped) => parseFloat(mapped.id)));
        setmealdata({
          menu: res.data.menu,
          main: res.data.propertymeals,
          bid: id,
          booking_details: res.data.booking_details,
          datafetched: true,
        });
      });
    }
  };
  const Parsedate = (first) => {
    let toda = new Date(first);
    let offset = toda.getTimezoneOffset();
    let two = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = two.toISOString().slice(0, 10);

    return formatted_checkin;
  };
  const [dopen, setdOpen] = useState(false);
  const changebooking = (aq) => {
    if (aq === "meal") {
      Customaxios.post(`api/changeuserbooking/${mealdata.bid}/`, {
        mealid: bmealadd,
      }).then((res) => {
        setopen(false);
      });
    } else if (aq === "cdate") {
      Customaxios.post(`api/changeuserbooking/${mealdata.bid}/`, {
        check_in_date: Parsedate(state[0].startDate),
        check_out_date: Parsedate(state[0].endDate),
      }).then((res) => {
        setopen(false);
      });
    } else if (aq === "delete") {
      Customaxios.post(`api/changeuserbooking/${mealdata.bid}/`, {
        delete: true,
      }).then((res) => {
        setopen(false);
        setdOpen(false);
      });
    }
  };
  const push = (a) => {
    setmodaltype(a);
  };

  let getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  let fux = mealdata.booking_details
    ? mealdata.booking_details.not_available &&
      mealdata.booking_details.not_available.map((s) => {
        return getDaysArray(
          new Date(s.not_available_start_date),
          new Date(s.not_available_end_date)
        );
      })
    : "";

  var fucks = mealdata.booking_details
    ? mealdata.booking_details.not_available
      ? [].concat.apply([], fux)
      : null
    : null;

  let getDaysArr = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      let y = new Date(dt);
      const timeoffset = y.getTimezoneOffset();
      let xyz = new Date(y.getTime() - timeoffset * 60 * 1000);

      let z = xyz.toISOString().slice(0, 10);
      arr.push(z);
    }
    return arr;
  };
  let intdates = mealdata.booking_details
    ? mealdata.booking_details.not_available &&
      mealdata.booking_details.not_available.map((s) => {
        return getDaysArr(
          new Date(s.not_available_start_date),
          new Date(s.not_available_end_date)
        );
      })
    : "";
  var nt = mealdata.booking_details
    ? mealdata.booking_details.not_available
      ? [].concat.apply([], intdates)
      : null
    : null;
  const [alertopen, setalertopen] = useState(false);

  const changedate = (i) => {
    if (ctype === "checkedin") {
      if (i.selection.startDate === state[0].startDate) {
        setalertopen(false);
        setState([i.selection]);
      } else {
        setalertopen(true);
      }
    } else {
      setState([i.selection]);
    }
  };
  const mobs = useMediaQuery("(max-width:900px)");
  function covertdateiso(date) {
    let toda = new Date(date);
    const offset = toda.getTimezoneOffset();
    let one = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = one.toISOString().slice(0, 10);
    return formatted_checkin;
  }
  const Single = (e, id, Name, did, guestcount, roomcount) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let links = `/single/${id}/${Name}/checkin=${covertdateiso(
      today
    )}/checkout=${covertdateiso(
      tomorrow
    )}/guests=${guestcount}/room=${roomcount}/selected_room=${did}/meals=/bookingmodal=`;
    if (!mobs) {
      window.open(links, "_blank");
    } else {
      history.push(links);
    }
  };
  const [hotelnumber, sethotelnumber] = useState("");
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setsnackbar(true);
      setalerttext("Copied Successfully");
      setalerttype("success");
    } else {
      setsnackbar(true);
      setalerttext("Could not copy");
      setalerttype("error");
    }
  };

  return (
    <div>
      <Dialog
        open={dopen}
        onClose={() => setdOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Are you sure u want to delete this booking ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setdOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => changebooking("delete")}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {authorized && userbooking.length > 0 && (
        <div style={{ position: "relative !important" }}>
          <Tabs
            onChange={handleChange}
            value={value}
            variant="scrollable"
            aria-label="scrollable auto tabs example"
            className=""
            style={{ color: "black" }}
          >
            <Tab
              label="Upcoming"
              // className={`${value === 0 ? "one" : "a"}`}
              {...a11yProps(0)}
            />

            <Tab
              label="Completed"
              // className={`${value === 1 ? "one" : "a"}`}
              {...a11yProps(1)}
            />
            {userbooking.filter(
              (swine) => swine.booking_status === "checkedin"
            ) && (
              <Tab
                label="Active"
                // className={`${value === 2 ? "one" : "a"}`}
                {...a11yProps(2)}
              />
            )}
          </Tabs>
        </div>
      )}
      <Modal
        style={{ display: "grid", placeContent: "center", placeItem: "center" }}
        open={open}
        onClose={() => setopen(false)}
      >
        <div
          className={
            modaltype === "callhotel"
              ? "callhotelmodal"
              : modaltype === "changedate"
              ? "changedatemodal"
              : "booking_edit_body"
          }
        >
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
                justifyContent:
                  modaltype !== "callhotel"
                    ? modaltype !== "change"
                      ? "space-between"
                      : "flex-end"
                    : "flex-end",
                backgroundColor: "#fff",
              }}
            >
              {modaltype !== "change" ||
                (modaltype !== "changenumber" && (
                  <ArrowBackIosIcon
                    onClick={() => setmodaltype("change")}
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "rgb(34, 34, 34)",
                      cursor: "pointer",
                    }}
                  />
                ))}

              <HighlightOffIcon
                onClick={() => setopen(false)}
                style={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(34, 34, 34)",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          {modaltype === "change" ? (
            <div className="edit_booking_card_container">
              <h1>Edit Your Booking</h1>
              <div className="edit_booking_cards">
                <Button onClick={() => push("addmeal")} variant="outlined">
                  <div className="profile_card_desc">
                    <span className="profile_card_title">
                      Add or Remove meals{" "}
                      <FastfoodIcon className="profile_icon" />
                    </span>
                  </div>
                </Button>

                <Button onClick={() => push("changedate")} variant="outlined">
                  <div className="profile_card_desc">
                    <span className="profile_card_title">
                      Change Dates{" "}
                      <CalendarTodayIcon className="profile_icon" />
                    </span>
                  </div>
                </Button>
                <Button onClick={() => setdOpen(true)} variant="outlined">
                  <div className="profile_card_desc">
                    <span className="profile_card_title">
                      Delete booking{" "}
                      <DeleteForeverIcon className="profile_icon" />
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          ) : modaltype === "changedate" ? (
            <div>
              {state[0].startDate !== undefined && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px",
                  }}
                >
                  <h3>
                    {" "}
                    {Math.ceil(
                      (state[0].endDate.getTime() -
                        state[0].startDate.getTime()) /
                        (1000 * 3600 * 24)
                    ) +
                      " " +
                      "Nights"}
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <h4 style={{ fontSize: matches && "16px" }}>Check In</h4>
                      <h6>{convertdatestr(state[0].startDate)}</h6>
                    </span>
                    <span>
                      <h4 style={{ fontSize: matches && "16px" }}>Check Out</h4>
                      <h6>{convertdatestr(state[0].endDate)}</h6>
                    </span>
                  </div>
                </div>
              )}
              <div className="big_datepicker">
                {alertopen && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    You cannot change check in date{" "}
                    <strong>Select from the same checkin date!</strong>
                  </Alert>
                )}
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => changedate(item)}
                  showSelectionPreview={false}
                  showMonthAndYearPickers={false}
                  moveRangeOnFirstSelection={false}
                  months={mob ? 4 : 2}
                  preventUnnecessaryRefocus={true}
                  showDateDisplay={false}
                  showMonthArrow={mob ? false : true}
                  disabledDates={fucks ? fucks : []}
                  rangeColors={["#ff726f"]}
                  timeFormat
                  minDate={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                  ranges={state}
                  direction={mob ? "vertical" : "horizontal"}
                  dateDisplayFormat={"yyyy/MM/dd"}
                />
              </div>
              <div className="changedatemodal_footer">
                {(nt && nt.includes(Parsedate(state[0].startDate))) ||
                differences(
                  Parsedate(state[0].endDate),
                  Parsedate(state[0].startDate)
                ) >
                  parseInt(
                    mealdata.booking_details !== null
                      ? mealdata.booking_details.max_booking
                      : 60
                  ) ? (
                  <Button variant="contained" disabled={true}>
                    {differences(
                      Parsedate(state[0].endDate),
                      Parsedate(state[0].startDate)
                    ) >
                    parseInt(
                      mealdata.booking_details !== null
                        ? mealdata.booking_details.max_booking
                        : 60
                    )
                      ? "Maximum booking days is" +
                        " " +
                        `${mealdata.booking_details.max_booking}` +
                        " " +
                        "days"
                      : "Not Available Dates"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => changebooking("cdate")}
                    endIcon={<SaveIcon />}
                    color="primary"
                    variant="contained"
                  >
                    Save{" "}
                  </Button>
                )}
              </div>
            </div>
          ) : modaltype === "addmeal" ? (
            <div className="booking_meal_body">
              <PropertyMeals
                data={mealdata.main}
                menu={mealdata.menu}
                booking={mealdata.bid}
              />
              <Button
                variant="outlined"
                style={{ textTransform: "none" }}
                fullWidth
                onClick={() => changebooking("meal")}
              >
                Add to booking
              </Button>
            </div>
          ) : modaltype === "callhotel" ? (
            <div>
              <TextField
                variant="outlined"
                fullWidth
                value={hotelnumber}
                InputProps={{
                  endAdornment: (
                    <Button
                      startIcon={<FileCopyIcon />}
                      variant="outlined"
                      onClick={copy}
                    >
                      Copy
                    </Button>
                  ),
                }}
              />{" "}
            </div>
          ) : (
            <div className="booking_rkey">
              <table>
                <thead>
                  <th>Room Key</th>notep
                  <th>Room No</th>
                </thead>
                <tbody>
                  <td>{data.k}</td>
                  <td>{data.r}</td>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>
      <div>
        {!authorized ? (
          <span className="unathorized_art">
            <Unathorizedsvg />
            <h5 style={{ textAlign: "center" }}>
              Log in to view your Bookings
            </h5>
            <Button
              onClick={() => setlogin(true)}
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Login
            </Button>
          </span>
        ) : bloading ? (
          <div style={{ width: "75%", margin: "auto" }}>
            <Loading type={"bloading"} />
          </div>
        ) : bloading === false && userbooking.length === 0 ? (
          <span className="nobooking_art">
            <NoBookingsvg />
            <h3 style={{ textAlign: "center" }}>
              Book your first booking today
            </h3>
            <Button
              size="large"
              onClick={() => history.push("/")}
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Explore
            </Button>
          </span>
        ) : (
          <>
            <div className="active_booking">
              <div className="booking_card_container">
                {dat.map((mapped, i) => {
                  const {
                    total_price,
                    room_key_active,
                    room_key,
                    payment_options,
                    check_in_date,
                    check_out_date,
                    guest_count,
                    total_room,
                    room,
                    rated,
                    id,
                    bookid,
                    Contact,
                    hotel,
                    booking_status,
                    meals,
                  } = mapped;
                  let property_meal = meals;
                  return (
                    <div
                      key={i + 1}
                      onClick={() => detail(bookid, Contact)}
                      className="booking_left"
                    >
                      <div className="booking_card">
                        <div className="booking_cardimg_container">
                          <LazyLoadImage
                            alt={"asd"}
                            effect="blur"
                            src={mapped.room.room_dp.img}
                          />
                        </div>
                        <div className="booking_card__text">
                          <div className="book_container_head">
                            <div
                              style={{
                                display: matches ? "block" : "flex",
                                alignItems: "flex-end",
                              }}
                            >
                              <span className="book_time_details">
                                <h3>{hotel.Name}</h3>
                                {timeDiffCalc(
                                  new Date(mapped.check_in_date),
                                  new Date()
                                ) && (
                                  <p>
                                    {booking_status === "booked"
                                      ? "(" +
                                        timeDiffCalc(
                                          new Date(mapped.check_in_date),
                                          new Date()
                                        ) +
                                        " left for checkin)"
                                      : ""}
                                  </p>
                                )}
                              </span>
                              {booking_status === "booked" ||
                                (booking_status === "checkedin" &&
                                  property_meal.length > 0 && (
                                    <div style={{ display: "flex" }}>
                                      <p>We Hope you are enjoying your stay</p>
                                    </div>
                                  ))}
                            </div>
                            {booking_status === "checkedout" && (
                              <span>
                                <span
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                      "max-content max-content",
                                    gridGap: "15px",
                                  }}
                                >
                                  <p>We hope you enjoyed your stay. </p>
                                  {rated ? (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p>You rated {rated} stars </p>
                                      <StarsIcon
                                        style={{
                                          paddingLeft: "4px",
                                          fontSize: "19px",
                                          color: "var(--red)",
                                        }}
                                      />
                                    </span>
                                  ) : (
                                    <p
                                      onClick={(e) => addreview(e, id)}
                                      style={{
                                        cursor: "pointer",
                                        paddingLeft: "10px",
                                        fontWeight: "bold",
                                        fontSize: "1.2em",
                                      }}
                                    >
                                      Rate Us
                                    </p>
                                  )}
                                </span>

                                <Button
                                  onClick={(e) =>
                                    Single(
                                      e,
                                      hotel.id,
                                      hotel.Name,
                                      room.id,
                                      guest_count,
                                      total_room
                                    )
                                  }
                                  size="medium"
                                  variant="outlined"
                                  style={{ textTransform: "none" }}
                                >
                                  Book Again
                                </Button>
                              </span>
                            )}
                            {mapped.booking_status !== "checkedout" && (
                              <div className="booked_options">
                                <Button
                                  onClick={(e) =>
                                    opens(
                                      e,
                                      "change",
                                      id,
                                      property_meal,
                                      check_in_date,
                                      check_out_date
                                    )
                                  }
                                  style={{ textTransform: "none" }}
                                  size="small"
                                  variant="outlined"
                                >
                                  {mapped.booking_status === "booked"
                                    ? "Modify Booking"
                                    : "Order Meals / Add days"}
                                </Button>
                                {mob || (
                                  <div className="booked_options">
                                    <Button
                                      onClick={(e) => {
                                        if (e.stopPropagation)
                                          e.stopPropagation();
                                        window.open(
                                          "http://maps.google.com/maps?daddr=" +
                                            hotel.latitude +
                                            "," +
                                            hotel.longitude +
                                            "&ll="
                                        );
                                      }}
                                      color="primary"
                                      style={{ textTransform: "none" }}
                                      variant="outlined"
                                    >
                                      Directions
                                    </Button>
                                    <Button
                                      onClick={(e) => {
                                        if (e.stopPropagation)
                                          e.stopPropagation();
                                        setopen(true);
                                        setmodaltype("callhotel");
                                        sethotelnumber(hotel.Contact);
                                      }}
                                      color="primary"
                                      style={{ textTransform: "none" }}
                                      variant="outlined"
                                    >
                                      Call Hotel
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          {matches || (
                            <div className="book_details_desc">
                              <div className="book_details_info  ">
                                <h2>Check In</h2>
                                <p>{convertdatestr(check_in_date)}</p>
                              </div>
                              <div className="book_details_info  ">
                                <h2>Payment Options</h2>

                                <p>
                                  {payment_options}
                                  {booking_status === "booked" ||
                                    (booking_status === "checkedin" &&
                                      room_key_active === true &&
                                      room_key !== undefined && (
                                        <span
                                          onClick={() =>
                                            openmodal(
                                              room_key.roomno,
                                              room_key.roomkey
                                            )
                                          }
                                        >
                                          (Show Room key)
                                        </span>
                                      ))}
                                  {payment_options !== "paid" &&
                                    booking_status !== "checkedout" && (
                                      <Button
                                        onClick={(e) =>
                                          post(e, total_price, bookid)
                                        }
                                        size="small"
                                        variant="contained"
                                        style={{
                                          marginLeft: "16px",
                                          background: "green",
                                          textTransform: "none",
                                          color: "#fff",
                                        }}
                                      >
                                        {booking_status === "checkedin"
                                          ? "Pay Online"
                                          : "Pay now"}
                                      </Button>
                                    )}
                                </p>
                              </div>
                              <div className="book_details_info  ">
                                <h2>Check Out</h2>
                                <p>{convertdatestr(check_out_date)}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {matches && (
                        <div className="smbook_details_desc">
                          <div className="book_details_info  ">
                            <h2>Check In</h2>
                            <p>{convertdatestr(check_in_date)}</p>
                          </div>
                          <div className="book_details_info  ">
                            <h2>Payment Options</h2>
                            <p>
                              {payment_options}

                              {booking_status === "booked" &&
                                room_key_active === true &&
                                room_key !== undefined && (
                                  <span
                                    onClick={() =>
                                      openmodal(
                                        room_key.roomno,
                                        room_key.roomkey
                                      )
                                    }
                                  >
                                    (Show Room key)
                                  </span>
                                )}
                            </p>
                          </div>
                          <div className="book_details_info  ">
                            <h2>Check Out</h2>
                            <p>{convertdatestr(check_out_date)}</p>
                          </div>
                        </div>
                      )}
                      <div className="booking_m_details ">
                        <div className="book_details_info ">
                          <h2>Room/Guest</h2>
                          {matches === false ? (
                            <p>
                              {total_room} {room.name} & {guest_count} Guests
                            </p>
                          ) : (
                            <div>
                              <p>
                                {total_room} {room.name}
                              </p>
                              <p>{guest_count} Guests</p>
                            </div>
                          )}
                        </div>
                        {property_meal.length > 0 && (
                          <div
                            // style={{ overflow: "auto" }}
                            className="book_details_info dropdown "
                          >
                            <h2>Meals Ordered</h2>
                            <p>{property_meal.length} items ordered</p>
                            <div className="dropdown-content">
                              {property_meal.map((s, i) => {
                                return (
                                  <div key={i + 1} className="menu_item">
                                    <span className="dropdown_rname">
                                      {s.name}
                                    </span>
                                    <span>
                                      <p>NPR {s.price}</p>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <div className="book_details_info ">
                          <h2>Total</h2>
                          <p>NPR {total_price}</p>
                        </div>
                        {matches || (
                          <Button
                            onClick={() => detail(bookid, Contact)}
                            variant="outlined"
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                      {mob && (
                        <div className="bdetail_btn_grp">
                          {payment_options !== "paid" && (
                            <Button
                              onClick={(e) => post(e, total_price, bookid)}
                              fullWidth
                              variant="contained"
                              style={{
                                background: "green",
                                textTransform: "none",
                                color: "#fff",
                              }}
                            >
                              Pay now
                            </Button>
                          )}
                          <div className="bdetail_down_btn_grp">
                            <Button
                              onClick={(e) => {
                                if (e.stopPropagation) e.stopPropagation();
                                window.open(
                                  "http://maps.google.com/maps?daddr=" +
                                    hotel.latitude +
                                    "," +
                                    hotel.longitude +
                                    "&ll="
                                );
                              }}
                              color="primary"
                              style={{ textTransform: "none" }}
                              variant="outlined"
                            >
                              Directions
                            </Button>
                            <Button
                              onClick={(e) => {
                                if (e.stopPropagation) e.stopPropagation();
                                setopen(true);
                                setmodaltype("callhotel");
                                sethotelnumber(hotel.Contact);
                              }}
                              color="primary"
                              style={{ textTransform: "none" }}
                              variant="outlined"
                            >
                              Call Hotel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="aside_poster">
                <div className="main_poster">
                  <img
                    src="https://th.bing.com/th/id/OIP.0V3RcUTHJC_4083oK5nrNQHaNK?w=187&h=333&c=7&o=5&pid=1.7"
                    alt="a"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;
