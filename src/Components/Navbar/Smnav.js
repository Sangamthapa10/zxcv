import React, { useState, useRef, useEffect } from "react";
import "./CSS/Navbar.css";
import { useHistory } from "react-router-dom";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import DateRange from "../DatePicker/components/DateRange/index.js";
import Customaxios from "../Axios";
import { Button, TextField, ClickAwayListener, Modal } from "@mui/material";
import { useGlobalContext } from "../Context";
import axios from "axios";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Guest_Room_Count from "../Guest_Room_Count";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Smnav = () => {
  const bguestcountref = useRef();

  const [showdate, setshowdate] = useState(false);

  const dateref = useRef();
  const history = useHistory();
  const {
    checkin_date,
    checkout_date,
    guestcount,
    roomcount,
    setcheckoutdate,
    setcheckin_date,

    setlat,
    setlon,
    setdatemodal,
    datemodal,
  } = useGlobalContext();
  const today = new Date();
  const [dropdowns, setdropdowns] = useState(false);
  let tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  const checkin_raw_date = state[0].startDate.toDateString();
  const checkout_raw_date = state[0].endDate.toDateString();

  let toda = new Date(checkin_raw_date);
  let todays = new Date(checkout_raw_date);
  const offset = toda.getTimezoneOffset();
  let one = new Date(toda.getTime() - offset * 60 * 1000);
  let two = new Date(todays.getTime() - offset * 60 * 1000);
  let formatted_checkin = one.toISOString().slice(0, 10);
  let formatted_checkout = two.toISOString().slice(0, 10);

  const four =
    checkout_raw_date.split(" ")[0] +
    "," +
    checkout_raw_date.split(" ")[1] +
    checkout_raw_date.split(" ")[2];
  const three =
    checkin_raw_date.split(" ")[0] +
    "," +
    checkin_raw_date.split(" ")[1] +
    checkin_raw_date.split(" ")[2];
  useEffect(() => {
    setcheckin_date(formatted_checkin);
    setcheckoutdate(formatted_checkout);
  }, [formatted_checkout, formatted_checkin, setcheckin_date, setcheckoutdate]);
  const l = `${three + " - " + four}`;
  const [smpicker, setsmpicker] = useState("date");
  useEffect(() => {
    if (formatted_checkout !== checkout_date) {
      if (formatted_checkin !== formatted_checkout) {
        setshowdate(false);
      }
    }
  }, [
    formatted_checkin,
    datemodal,
    setdatemodal,
    checkout_date,
    formatted_checkout,
  ]);

  // useEffect(() => {
  //   let handler = (event) => {
  //     if (!dateref.current.contains(event.target)) {
  //       setshowdate(false);
  //     }
  //   };
  //   let bhandle = (event) => {
  //     if (!bguestcountref.current.contains(event.target)) {
  //       setdropdowns(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   document.addEventListener("mousedown", bhandle);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //     document.removeEventListener("mousedown", bhandle);
  //   };
  // });

  function showPosition(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    history.push(
      `/search/${"nearby"}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${position.coords.latitude}/longitude=${position.coords.longitude}/filter=/type=/guest_rating=/order=`
    );
  }
  function showErrorl(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        console.log("");
    }
  }
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        history.push(
          `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
        );
        break;
      default:
        history.push(
          `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
        );
    }
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showErrorl);
    } else {
      setlat("");
      setlon("");
    }
  }

  const [inputvalue, setinputvalue] = useState("");
  function showPosition_querysearch(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    history.push(
      `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${position.coords.latitude}/longitude=${position.coords.longitude}/filter=/type=/guest_rating=/order=`
    );
  }
  const searchpage = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition_querysearch,
        showError
      );
    } else {
      setlat("");
      setlon("");
    }
  };
  const searchpage_sugges = (n) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setlat("");
      setlon("");
    }
    history.push(
      `/search/${n}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/type=/guest_rating=/order=`
    );
  };

  const [suggestion, setsuggestion] = useState([]);

  const funcsuggestion = async (e) => {
    let cancelToken;
    const search = e.target.value;
    setinputvalue(search);
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("cancelling the prev req");
    }
    cancelToken = axios.CancelToken.source();
    setinputvalue(search);
    if (inputvalue.length > 3) {
      const result = await Customaxios.get(
        `/api/psuggestion/${inputvalue}/`,
        { cancelToken: cancelToken.token }
      );
      setsuggestion(result.data);
    } else if (inputvalue.length < 1) {
      setsuggestion("");
    }
  };
  const Single = (id, Name) => {
    history.push(
      `/single/ ${id} /${Name}/checkin=${checkin_date}/checkout=${checkout_date}/guests=${guestcount}/room=${roomcount}/selected_room=`
    );
  };
  return (
    <>
      <Modal
        className="modal_date_picker"
        open={datemodal}
        onClose={() => setdatemodal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>
          <div className="modal_date_picker_top">
            <ArrowBackIosIcon
              onClick={() =>
                smpicker === "date" ? setdatemodal(false) : setsmpicker("date")
              }
              style={{ marginLeft: "3vw" }}
            />

            <h5>{smpicker === "date" ? "Pick Dates" : "Pick Guest & Room"}</h5>
          </div>
          {smpicker === "date" ? (
            <>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={false}
                showMonthAndYearPickers={false}
                moveRangeOnFirstSelection={false}
                months={4}
                preventUnnecessaryRefocus={true}
                showDateDisplay={false}
                showMonthArrow={false}
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
                direction="vertical"
                dateDisplayFormat={"yyyy/MM/dd"}
              />
            </>
          ) : (
            <div className="sm_modal_widget">
              <Guest_Room_Count />
            </div>
          )}
          <div className="sm_picker_modal_btn">
            <Button
              onClick={() =>
                smpicker === "date"
                  ? setsmpicker("widget")
                  : setdatemodal(false)
              }
              variant="contained"
              color="primary"
            >
              {smpicker === "date" ? "Next" : "Search"}
            </Button>
          </div>
        </>
      </Modal>
      <form className="search_inputs">
        <span className="searchinput_first">
          <ClickAwayListener onClickAway={() => setsuggestion("")}>
            <div className="mobile__nav">
              <span className="mobile___nav">
                <input
                  className="search_bar_sm nav_input in"
                  style={{ fontSize: "15px" }}
                  placeholder="search by city,location,hotel"
                  type="text"
                  value={inputvalue}
                  onChange={funcsuggestion}
                />
                <span
                  className={
                    suggestion.length > 0 ? "suggestion_dialog" : "display_none"
                  }
                >
                  <div className="sug">
                    {suggestion
                      ? suggestion.map((mapped) => {
                          return (
                            <div className="sug_item">
                              <h4
                                onClick={() => Single(mapped.id, mapped.Name)}
                                className="sug_text"
                              >
                                <ApartmentIcon />

                                {mapped.Name}
                              </h4>
                              <h4
                                onClick={() =>
                                  searchpage_sugges(mapped.City.city)
                                }
                                className="sug_text"
                              >
                                <LocationSearchingIcon />
                                {mapped.City.city}
                              </h4>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </span>
              </span>
            </div>
          </ClickAwayListener>

          <span className="location_Search">
            <Button
              style={{
                borderRadius: "100px",
                textTransform: "none",
                backgroundColor: "rgb(242,242,242)",
              }}
              varaint="contained"
              onClick={getLocation}
              endIcon={<LocationSearchingIcon className="location_icon" />}
            >
              Nearby
            </Button>
          </span>
        </span>
        <div className="m_search_detail">
          <ClickAwayListener onClickAway={() => setshowdate(false)}>
            <span className="date_picker">
              <input
                className="big_date_picker in"
                style={{
                  fontSize: "15px",
                  fontStyle: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setshowdate(!showdate)}
                value={`${l}`}
                type="text"
                onChange={() => console.log("")}
              />
              <span className="small_date_picker_container">
                <TextField
                  variant="outlined"
                  label="check in"
                  className="small_date_picker"
                  style={{
                    fontSize: "15px",
                    fontStyle: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => setdatemodal(!datemodal)}
                  value={`${three}`}
                  type="text"
                />
                <TextField
                  variant="outlined"
                  label="check out"
                  className="small_date_picker"
                  style={{
                    fontSize: "15px",
                    fontStyle: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => setshowdate(!showdate)}
                  value={`${four}`}
                  type="text"
                />
              </span>
              <div
                ref={dateref}
                className={`${
                  showdate ? "big_nav_date_picker" : "display_none"
                }`}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  showSelectionPreview={false}
                  showMonthAndYearPickers={false}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  preventUnnecessaryRefocus={true}
                  showDateDisplay={false}
                  showMonthArrow={true}
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
                  direction="horizontal"
                  dateDisplayFormat={"yyyy/MM/dd"}
                />
              </div>
            </span>
          </ClickAwayListener>
          <ClickAwayListener onClickAway={() => setdropdowns(false)}>
            <span className="room_guest_picker">
              <input
                className="nav_input big_date_picker in"
                onClick={() => setdropdowns(!dropdowns)}
                style={{ fontSize: "14px" }}
                type="text"
                value={`${guestcount} Person , ${roomcount} Room`}
                onChange={() => console.log("")}
              />
              <span className="sm_room_guest_picker">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Room & Guest"
                  onClick={() => setdropdowns(!dropdowns)}
                  style={{ fontSize: "14px" }}
                  type="text"
                  value={`${guestcount} Person , ${roomcount} Room`}
                  onChange={() => console.log("")}
                />
              </span>
              <div
                ref={bguestcountref}
                className={`${
                  dropdowns ? "input3_guest_dropdown" : "display_none"
                }`}
              >
                <Guest_Room_Count />
              </div>
            </span>
          </ClickAwayListener>
          <span className="f_button">
            <button
              onClick={searchpage}
              type="submit"
              className="Search_button lg"
            >
              Search
            </button>
          </span>
        </div>
      </form>
    </>
  );
};

export default Smnav;
