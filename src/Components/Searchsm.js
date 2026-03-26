import React, { useState } from "react";
import "./Navbar/CSS/modaldetepicker.css";
import { useGlobalContext } from "./Context";
import GuestRoomCount from "./Guest_Room_Count";
import { useHistory } from "react-router-dom";
import DateRange from "./DatePicker/components/DateRange/index.js";
import Customaxios from "./Axios";
import axios from "axios";
//material ui
import {
  Button,
  TextField,
  Modal,
  InputAdornment,
  styled,
} from "@mui/material";
//icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
const WhSearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "25px",
  },
}));

const Searchsm = () => {
  const {
    setmailmodal,
    setmailtext,
    setcheckoutdate,
    setcheckin_date,
    homedata,
    checkin_date,
    checkout_date,
    guestcount,
    roomcount,
    setlat,
    setlon,
    setdatemodal,
    datemodal,
    state,
    setState,
    smpicker,
    setsmpicker,
  } = useGlobalContext();
  const history = useHistory();
  const [addresssuggestion, setaddresssug] = useState([]);
  const [hotelsuggestion, sethotelsuggestion] = useState([]);
  const [suggesfound, setsuggesfound] = useState(false);
  const [inputvalue, setinputvalue] = useState("");

  const funcsuggestion = async (e) => {
    let cancelToken;
    const search = e.target.value;
    setinputvalue(search);
    let hdata =
      homedata !== null &&
      homedata.a.filter((swine) =>
        swine.Name.toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      );
    let cdata =
      homedata !== null &&
      homedata.b.filter((swine) =>
        swine.Name.toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      );
    Array.prototype.push.apply(hdata, cdata);
    let adata =
      homedata !== null &&
      homedata.c.filter((swine) =>
        swine.city
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      );
    console.log(adata);
    if (e.target.length === 0) {
      setsuggesfound(false);
    } else {
      if (hdata) {
        sethotelsuggestion(hdata);
        setsuggesfound(true);
      }
    }
    if (e.target.value.length > 2 && hdata.length === 0) {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("cancelling the prev req");
      }
      cancelToken = axios.CancelToken.source();
      setinputvalue(search);
      const result = await Customaxios.get(
        `/api/psuggestion/${e.target.value}`,
        { cancelToken: cancelToken.token }
      );
      console.log(result.data);
      sethotelsuggestion(result.data.hotel);
      setaddresssug(result.data.address);
      setsuggesfound(true);
    }
  };
  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[2];
    return four;
  }
  function removeSpaces(url) {
    return url.replace(/\s/g, "");
  }
  const fastsearch = (typ, check, checko, gue, ro, latq, lonq) => {
    history.push(
      `/search/${typ}/checkin=${check}/checkout=${checko}/guest=${gue}/room=${ro}/latitude=${latq}/longitude=${lonq}/filter=/type=/guest_rating=/order=`
    );
    setdatemodal(false);
  };
  function showPosition(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    history.push(
      `/search/${"nearby"}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${position.coords.latitude}/longitude=${position.coords.longitude}/filter=/type=/guest_rating=/order=`
    );
    setdatemodal(false);
  }
  function showErrorl(error) {
    setdatemodal(false);
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
        alert("eror");
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
  let bva;
  let oldsearch = localStorage.getItem("recent");
  let asdf =
    oldsearch &&
    oldsearch
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\f/g, "\\f");
  const parsedObj = JSON.parse(asdf);
  bva = oldsearch && parsedObj;

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        setdatemodal(false);
        history.push(
          `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
        );
        break;
      default:
        setdatemodal(false);
        history.push(
          `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
        );
    }
  }
  function showPosition_querysearch(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    let l = position.coords.latitude;
    let lo = position.coords.longitude;
    let obj = {
      location: inputvalue,
      checkin: checkin_date,
      checkout: checkout_date,
      guests: guestcount,
      rooms: roomcount,
      latitude: l,
      longitude: lo,
    };
    let oldalready = localStorage.getItem("recent");
    if (oldalready) {
      let aqwe = JSON.parse(oldalready).map((mapped) => mapped);
      aqwe.push(obj);

      localStorage.setItem("recent", [JSON.stringify(aqwe)]);
    } else {
      let qbva = Object.assign([], [obj]);
      localStorage.setItem("recent", [JSON.stringify(qbva)]);
    }

    history.push(
      `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${position.coords.latitude}/longitude=${position.coords.longitude}/filter=/type=/guest_rating=/order=`
    );
    setdatemodal(false);
  }

  const searchpage = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition_querysearch,
        showError
      );
    } else {
      history.push(
        `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
      );
      setdatemodal(false);
    }
  };
  const clearinputsm = () => {
    setinputvalue("");
    setsuggesfound(false);
  };
  const Parsedate = (first) => {
    let toda = new Date(first);
    let offset = toda.getTimezoneOffset();
    let two = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = two.toISOString().slice(0, 10);

    return formatted_checkin;
  };
  const changedate = (i) => {
    // setmailmodal(true);
    setmailtext("loading");
    setState([i.selection]);
    if (i.selection.startDate !== i.selection.endDate) {
      setcheckin_date(Parsedate(i.selection.startDate));
      setcheckoutdate(Parsedate(i.selection.endDate));
    }
    // setmailmodal(false);
  };
  let checkin_raw_date = state[0].startDate.toDateString();
  let checkout_raw_date = state[0].endDate.toDateString();

  return (
    <div>
      <Modal
        open={datemodal}
        onClose={() => setdatemodal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal_date_picker">
          <div className="sda">
            <div className="modal_date_picker_top">
              <ArrowBackIosIcon
                onClick={() =>
                  smpicker === "date" ||
                  smpicker === "datess" ||
                  smpicker === "search"
                    ? setdatemodal(false)
                    : smpicker === "widgetss"
                    ? setsmpicker("date")
                    : smpicker === "widgetsse" || smpicker === "datese"
                    ? setsmpicker("search")
                    : setsmpicker("date")
                }
                style={{ marginLeft: "3vw" }}
              />
              <h5>
                {smpicker === "search"
                  ? "Search by city,location,hotel"
                  : smpicker === "date" ||
                    smpicker === "datese" ||
                    smpicker === "datess"
                  ? "Pick Dates"
                  : "Pick Guest & Room"}
              </h5>
            </div>
            {smpicker === "search" && (
              <span>
                <WhSearchBox
                  placeholder="search by city,location,hotel"
                  value={inputvalue}
                  onChange={funcsuggestion}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  name="phone"
                  className="input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: inputvalue.length !== 0 && (
                      <InputAdornment position="end">
                        <CloseIcon onClick={clearinputsm} />
                      </InputAdornment>
                    ),
                  }}
                />
              </span>
            )}
          </div>
          {smpicker === "search" ? (
            <div className="sm_modal_search">
              {suggesfound ? (
                <div>
                  {addresssuggestion.length !== 0 && (
                    <div style={{ display: "grid", gridGap: "15px" }}>
                      <p>Address</p>
                      {addresssuggestion.map((mapped, i) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                            key={i + 1}
                          >
                            <LocationOnIcon />
                            <h5>{mapped.city}</h5>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {hotelsuggestion.length !== 0 && (
                    <div style={{ display: "grid", gridGap: "15px" }}>
                      <p>Hotel</p>
                      {hotelsuggestion.map((mapped, i) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                            key={i + 1}
                          >
                            <ApartmentIcon />
                            <h5>{mapped.Name}</h5>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="sm_modal_information sm_modal_widgets">
                    <div
                      className="sm_modal_information_tile"
                      onClick={() => setsmpicker("datese")}
                    >
                      <p>Checkin</p>
                      <p>{convertdatestr(checkin_raw_date)}</p>
                    </div>
                    <div
                      className="sm_modal_information_tile"
                      onClick={() => setsmpicker("datese")}
                    >
                      <p>Checkout</p>
                      <p>{convertdatestr(checkin_raw_date)}</p>
                    </div>
                    <div
                      className="sm_modal_information_tile"
                      onClick={() => setsmpicker("widgetsse")}
                    >
                      <p>Guest & Room</p>
                      <p>
                        {guestcount} {guestcount === 1 ? "Guest" : "Guests"} &{" "}
                        {roomcount}
                        {roomcount === 1 ? "Room" : "Rooms"}
                      </p>
                    </div>
                  </div>
                  <Button
                    style={{
                      borderRadius: "100px",
                      textTransform: "none",
                      backgroundColor: "rgb(242,242,242)",
                    }}
                    varaint="contained"
                    onClick={getLocation}
                    endIcon={
                      <LocationSearchingIcon className="location_icon" />
                    }
                  >
                    Nearby
                  </Button>{" "}
                  <h5>Recent Search</h5>
                  <hr />
                  {oldsearch &&
                    bva.map((old, i) => {
                      return (
                        <div
                          key={i + 1}
                          onClick={() =>
                            fastsearch(
                              old.location,
                              old.checkin,
                              old.checkout,
                              old.guests,
                              old.rooms,
                              old.latitude,
                              old.longitude
                            )
                          }
                          className="sm_modal_widgets"
                        >
                          <div className="history_tile">
                            <p>Location</p>
                            <p>{old.location}</p>
                          </div>
                          <div className="history_tile">
                            <p>Dates</p>
                            <p>
                              {convertdatestr(old.checkin)} -{" "}
                              {convertdatestr(old.checkout).slice(0, 3) ===
                              convertdatestr(old.checkin).slice(0, 3)
                                ? convertdatestr(old.checkout).slice(3, 10)
                                : convertdatestr(old.checkout)}
                            </p>
                          </div>

                          <div className="history_tile">
                            <p>Guest & Room</p>

                            <p>
                              {old.guests}{" "}
                              {old.guests === 1 ? "Guest" : "Guests"} &{" "}
                              {old.rooms} {old.rooms === 1 ? "Room" : "Rooms"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          ) : smpicker === "date" ||
            smpicker === "datess" ||
            smpicker === "datese" ? (
            <>
              <div className="modal_date_picker_info">
                <div>
                  <p className="modal_date_picker_info_head">Checkin</p>
                  <p>{convertdatestr(checkin_raw_date)}</p>
                </div>
                <span>
                  {Math.ceil(
                    (new Date(checkout_raw_date).getTime() -
                      new Date(checkin_raw_date).getTime()) /
                      (1000 * 3600 * 24)
                  ) +
                    " " +
                    "Nights"}
                </span>
                <div className="sm_modal_information_tile">
                  <p className="modal_date_picker_info_head">Checkout</p>
                  <p>{convertdatestr(checkout_raw_date)}</p>
                </div>
              </div>
              <DateRange
                set={setmailmodal}
                editableDateInputs={true}
                onChange={(item) => changedate(item)}
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
          ) : smpicker === "widgetss" || smpicker === "widgetsse" ? (
            <div className="sm_modal_widget">
              <GuestRoomCount />
            </div>
          ) : (
            ""
          )}
          <div className="sm_picker_modal_btn">
            <Button
              fullWidth
              size="large"
              onClick={(e) =>
                smpicker === "date"
                  ? setsmpicker("widget")
                  : smpicker === "search"
                  ? searchpage(e)
                  : smpicker === "datese" || smpicker === "widgetsse"
                  ? setsmpicker("search")
                  : setdatemodal(false)
              }
              variant="contained"
              style={{
                background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
                textTransform: "none",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(255, 75, 43, 0.2)",
                color: "#fff",
              }}
            >
              {smpicker === "search" ? "Search" : "Apply"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Searchsm;
