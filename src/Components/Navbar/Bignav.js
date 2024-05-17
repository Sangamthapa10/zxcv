import React, { useState, useRef } from "react";
import "./CSS/Navbar.css";
import { useHistory } from "react-router-dom";
import DateRange from "../DatePicker/components/DateRange/index.js";
import { useGlobalContext } from "../Context";
import GuestRoomCount from "../Guest_Room_Count";
import Logo from "../Logo";
//material ui
import {
  ListItemIcon,
  MenuItem,
  Button,
  TextField,
  ClickAwayListener,
  withStyles,
  useMediaQuery,
  InputAdornment,
} from "@material-ui/core";
//icons
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import HistoryIcon from "@material-ui/icons/History";
import FaceIcon from "@material-ui/icons/Face";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//svg
import Hotel from "../SvgComponents/Hotel";
const SearchBox = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    overflow: "hidden",
    borderRadius: "31px",
    backgroundColor: "#f2f2f2",
    "&:hover": {
      backgroundColor: "#fff",
    },

    "& fieldset": {
      border: "none",
    },
  },
})(TextField);

function BigNavbar() {
  const matches = useMediaQuery("(max-width:800px)");
  const smallscreen = useMediaQuery("(max-width:900px)");
  const bguestcountref = useRef();
  const [loading, setloading] = useState(false);
  const [showdate, setshowdate] = useState(false);
  const dateref = useRef();
  const history = useHistory();
  const {
    inputvalue,
    setinputvalue,
    userdetail,
    login,
    setlogin,
    checkin_date,
    checkout_date,
    guestcount,
    roomcount,
    setcheckoutdate,
    setcheckin_date,
    setlat,
    setlon,
    bignavref,
    setdatemodal,
    state,
    setState,
    setsmpicker,
  } = useGlobalContext();
  const [dropdowns, setdropdowns] = useState(false);

  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[2];

    return four;
  }
  const checkin_raw_date = state[0].startDate.toDateString();
  const checkout_raw_date = state[0].endDate.toDateString();

  const Parsedate = (first) => {
    let toda = new Date(first);
    let offset = toda.getTimezoneOffset();
    let two = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = two.toISOString().slice(0, 10);

    return formatted_checkin;
  };
  function convertdatestra(a) {
    const four = a.split(" ")[0] + "," + a.split(" ")[1] + a.split(" ")[2];

    return four;
  }
  function showPosition(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    history.push(
      `/search/${"nearby"}/checkin=${checkin_date}/checkout=${checkout_date}
      /guest=${guestcount}/room=${roomcount}/latitude=${
        position.coords.latitude
      }/longitude=${
        position.coords.longitude
      }/filter=/type=/guest_rating=/order=`
    );
    setloading(false);
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
    setloading(false);
  }
  const fastsearch = (typ, check, checko, gue, ro, latq, lonq) => {
    history.push(
      `/search/${typ}/checkin=${check}/checkout=${checko}/guest=${gue}/room=${ro}/latitude=${latq}/longitude=${lonq}/filter=/type=/guest_rating=/order=`
    );
  };
  function showError(error) {
    history.push(
      `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}
      /guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
    );

    setloading(false);
  }
  function getLocation() {
    setloading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showErrorl);
    } else {
      setlat("");
      setlon("");
    }
  }
  const login_handle = () => {
    if (userdetail.id) {
      history.push("/profile");
    } else {
      setlogin(true);
    }
  };

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
  }
  const searchpage = (e) => {
    if (inputvalue.length > 0) {
      e.preventDefault();
      setloading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition_querysearch,
          showError
        );
      } else {
        history.push(
          `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
        );
      }
    }
  };

  const funcsuggestion = async (e) => {
    const search = e.target.value;
    setinputvalue(search);
  };

  const Single = (id, Name) => {
    history.push(
      `/single/ ${id} /${Name}/checkin=${checkin_date}/checkout=${checkout_date}/guests=${guestcount}/room=${roomcount}/selected_room=`
    );
  };
  let user = localStorage.getItem("user");
  const [sugdropdown, setsugdropdown] = useState(false);
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

  const smmodal = (a) => {
    if (matches) {
      setdatemodal(true);
      setsmpicker(a);
    } else if (a === "search" && oldsearch) {
      setsugdropdown(true);
    }
  };
  //WHAT
  let loggedin = localStorage.getItem("axynghkwngasd");
  const [account_dropdown, setaccount_dropdown] = useState(false);
  const handleClick = (event) => {
    setaccount_dropdown(true);
  };
  const logout = () => {
console.log("fasn")
  };
  const changedate = (i) => {
    setState([i.selection]);
    if (i.selection.startDate !== i.selection.endDate) {
      setshowdate(false);
      setcheckin_date(Parsedate(i.selection.startDate));
      setcheckoutdate(Parsedate(i.selection.endDate));
    }
  };
  return (
    <>
      <div className="big_nav" ref={bignavref}>
        <div className="big_nav_top">
          <span style={{ width: "90px", height: "auto", padding: "8px 6px" }}>
            <Logo />
          </span>
          <div
            onMouseOut={() => setaccount_dropdown(false)}
            onMouseOver={handleClick}
            style={{ position: "relative", display: "grid" }}
          >
            <Button
              style={{
                width: "160px",
                textTransform: "none",
                borderLeft: "1px solid lightgray",
              }}
              onClick={login_handle}
            >
              {user ? "Hlw " + user : "Login / Sign Up"}
            </Button>
            {login ||
              (loggedin && (
                <div
                  style={{
                    zIndex: "410000000000000000000",

                    left: "-37px",

                    top: "100%",
                  }}
                  className={`${
                    account_dropdown
                      ? "account_dropdown account_dropdown_show"
                      : "account_dropdown"
                  }`}
                >
                  <MenuItem onClick={() => history.push("profile")}>
                    <ListItemIcon>
                      <FaceIcon />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => history.push("favourite")}>
                    <ListItemIcon>
                      <FavoriteBorderIcon />
                    </ListItemIcon>
                    Favourites
                  </MenuItem>

                  <MenuItem onClick={() => history.push("Booking")}>
                    <ListItemIcon>
                      <WorkOutlineIcon />
                    </ListItemIcon>
                    Booking
                  </MenuItem>
                  <MenuItem onClick={() => logout}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    Logoutnow
                  </MenuItem>
                </div>
              ))}
          </div>
        </div>
        <div className="big_navbar_bg" style={{ position: "relative" }}>
          {smallscreen || (
            <div className="abs logo_abos">{/* something here */}</div>
          )}
          {smallscreen || (
            <div className="big_navbar_header_container">
              <h4 className="big_navbar_header">Find best deals on hotels</h4>
              <div
                style={{
                  width: "100px",
                  // position: "absolute",
                  // top: "10%",
                  // left: "38%",
                }}
              >
                <Hotel />
              </div>
            </div>
          )}
          <div className="big_navbar">
            <form className="search_inputs">
              <span className="searchinput_first">
                <ClickAwayListener
                  onClickAway={() => sugdropdown && setsugdropdown(false)}
                >
                  <div className="mobile__nav">
                    <span className="mobile___nav">
                      {smallscreen === false ? (
                        <input
                          id="ans"
                          required={true}
                          className="search_bar_sm nav_input in"
                          style={{
                            fontSize: "15px",
                            cursor: "text",
                            fontWeight: 610,
                          }}
                          placeholder="search by city,location,hotel"
                          type="text"
                          value={inputvalue}
                          onChange={funcsuggestion}
                          onClick={() => smmodal("search")}
                        />
                      ) : (
                        <SearchBox
                          placeholder="search by city,location,hotel"
                          value={inputvalue}
                          onChange={(e) => setinputvalue(e.target.value)}
                          variant="outlined"
                          required
                          onClick={() => smmodal("search")}
                          fullWidth
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
                                <CloseIcon onClick={() => setinputvalue("")} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      <span
                        className={
                          sugdropdown ? "suggestion_dialog" : "display_none"
                        }
                      >
                        <div className="sug">
                          <h6>History</h6>
                          <hr />
                          {sugdropdown && bva
                            ? bva.map((old, i) => {
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
                                    className="sug_item"
                                  >
                                    <span className="sug_text">
                                      <span>
                                        <h4
                                          onClick={() =>
                                            Single(old.id, old.Name)
                                          }
                                          className="sug_text"
                                        >
                                          {old.location}
                                        </h4>
                                        <p>
                                          {old.guests}{" "}
                                          {old.guests === 1
                                            ? "Guest"
                                            : "Guests"}{" "}
                                          & {old.rooms}{" "}
                                          {old.rooms === 1 ? "Room" : "Rooms"}
                                        </p>
                                        <p>
                                          {convertdatestr(old.checkin)} -{" "}
                                          {convertdatestr(old.checkout).slice(
                                            0,
                                            3
                                          ) ===
                                          convertdatestr(old.checkin).slice(
                                            0,
                                            3
                                          )
                                            ? convertdatestr(
                                                old.checkout
                                              ).slice(3, 10)
                                            : convertdatestr(old.checkout)}
                                        </p>
                                      </span>

                                      <HistoryIcon />
                                    </span>
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
                    endIcon={
                      <LocationSearchingIcon className="location_icon" />
                    }
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
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        fontWeight: 590,
                      }}
                      onClick={() => setshowdate(!showdate)}
                      value={`${
                        convertdatestra(checkin_raw_date) +
                        " - " +
                        convertdatestra(checkout_raw_date)
                      }`}
                      type="text"
                      readOnly
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
                        onClick={() => smmodal("datess")}
                        value={`${convertdatestra(checkin_raw_date)}`}
                        type="text"
                        inputProps={{
                          readOnly: true,
                          disabled: true,
                        }}
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
                        onClick={() => smmodal("datess")}
                        value={`${convertdatestra(checkout_raw_date)}`}
                        type="text"
                        inputProps={{
                          readOnly: true,
                          disabled: true,
                        }}
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
                        onChange={(item) => changedate(item)}
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
                      style={{ fontSize: "14px", fontWeight: "580" }}
                      type="text"
                      readOnly
                      value={`${guestcount} Person , ${roomcount} Room`}
                    />
                    <span className="sm_room_guest_picker">
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Room & Guest"
                        onClick={() => smmodal("widgetss")}
                        style={{ fontSize: "14px" }}
                        type="text"
                        value={`${guestcount} Person , ${roomcount} Room`}
                        inputProps={{
                          readOnly: true,
                          disabled: true,
                        }}
                      />
                    </span>
                    <div
                      ref={bguestcountref}
                      className={`${
                        dropdowns ? "input3_guest_dropdown" : "display_none"
                      }`}
                    >
                      <GuestRoomCount />
                    </div>
                  </span>
                </ClickAwayListener>
                <span className="f_button">
                  <button
                    onClick={searchpage}
                    type="submit"
                    className="Search_button lg"
                  >
                    {loading ? (
                      <div className="loading_btn">
                        <div className="dot1"> </div>
                        <div className="dot2"></div>
                        <div className="dot3"></div>
                      </div>
                    ) : (
                      "Search"
                    )}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BigNavbar;
