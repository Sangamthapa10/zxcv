import React, { useState, useRef, useEffect } from "react";
import "./CSS/Navbarmain.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useGlobalContext } from "../Context";
import DateRange from "../DatePicker/components/DateRange/index.js";
import GuestRoomWidget from "../Guest_Room_Count";
import Logo from "../Logo";
//material ui
import {
  useMediaQuery,
  MenuItem,
  ListItemIcon,
  TextField,
  InputAdornment,
  styled,
  ClickAwayListener,
} from "@mui/material";
//icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const SearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "25px",
  },
}));

function SmallNav() {
  let loggedin = localStorage.getItem("axynghkwngasd");
  const [showdate, setshowdate] = useState(false);
  const [loading, setloading] = useState(false);
  const [account_dropdown, setaccount_dropdown] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const smallscreen = useMediaQuery("(max-width:900px)");

  const handleClick = (event) => {
    setaccount_dropdown(true);
  };
  const Profile = () => {
    setaccount_dropdown(false);
    history.push("/profile");
  };
  const favou = () => {
    setaccount_dropdown(false);
    history.push("/favourite");
  };

  const Booking = () => {
    setaccount_dropdown(false);
    history.push("/Booking/");
  };

  const {
    inputvalue,
    setinputvalue,
    setlogin,
    state,
    setState,
    dropdown,
    setdropdown,
    guestcount,
    roomcount,
    setcheckoutdate,
    setcheckin_date,
    checkin_date,
    checkout_date,
    setlat,
    setlon,
    bignavref,
    setsmpicker,
    setdatemodal,
  } = useGlobalContext();
  const dateref = useRef();
  const guestcountref = useRef();
  const smmodal = (a) => {
    setdatemodal(true);
    setsmpicker(a);
  };
  const logout = () => {
    localStorage.removeItem("axynghkwngasd");
    window.location.reload();
  };
  let checkin_raw_date = state[0].startDate.toDateString();
  let checkout_raw_date = state[0].endDate.toDateString();
  useEffect(() => {
    if (checkin_date.length === 0) {
      setcheckin_date(Parsedate(state[0].startDate));
      setcheckoutdate(Parsedate(state[0].endDate));
    }
  });
  const Parsedate = (first) => {
    let toda = new Date(first);
    let offset = toda.getTimezoneOffset();
    let two = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = two.toISOString().slice(0, 10);

    return formatted_checkin;
  };
  function convertdatestr(a) {
    let four = a.split(" ")[0] + "," + a.split(" ")[1] + a.split(" ")[2];
    return four;
  }

  const changedate = (i) => {
    setState([i.selection]);
    if (i.selection.startDate !== i.selection.endDate) {
      setshowdate(false);
      setcheckin_date(Parsedate(i.selection.startDate));
      setcheckoutdate(Parsedate(i.selection.endDate));
    }
  };
  useEffect(() => {
    let handler = (event) => {
      if (showdate) {
        if (!dateref.current.contains(event.target)) {
          setshowdate(false);
        }
      }
    };
    let handle = (event) => {
      if (dropdown) {
        if (!guestcountref.current.contains(event.target)) {
          setdropdown(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("mousedown", handle);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("mousedown", handle);
    };
  });

  function showPositionnearby(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    let urls = `/search/${"nearby"}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${
      position.coords.latitude
    }/longitude=${
      position.coords.longitude
    }/filter=/type=/guest_rating=/order=`;
    history.push(urls.trim());
    setloading(false);
  }
  function showErrornearby(error) {
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

  function getLocationnearby() {
    setloading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPositionnearby,
        showErrornearby
      );
    } else {
      alert("location not available");
      setlat("");
      setlon("");
    }
  }

  function showPosition_querysearch(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    history.push(
      `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${position.coords.latitude}/longitude=${position.coords.longitude}/filter=/type=/guest_rating=/order=`
    );
    setloading(false);
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
    setloading(false);
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
  let index = pathname.indexOf("/");
  let inde = pathname.indexOf("/", index + 1);
  let abc = pathname.slice(0, inde);
  const [navbarstyle, setnavbarstyle] = useState(abc === "" ? false : true);
  useEffect(() => {
    if (abc === "") {
      setnavbarstyle(false);
    } else {
      setnavbarstyle(true);
    }
  }, [abc]);

  useEffect(() => {
    if (bignavref.current) {
      let handler = (event) => {
        var height = document.documentElement.scrollTop;
        if (bignavref.current !== null) {
          if (height > bignavref.current.clientHeight) {
            setnavbarstyle(true);
          } else {
            setnavbarstyle(false);
          }
        }
      };
      document.addEventListener("scroll", handler);
      return () => {
        document.removeEventListener("scroll", handler);
      };
    }
  }, [bignavref, abc]);
  const funcsuggestion = (e) => {
    const search = e.target.value;
    setinputvalue(search);
  };
  const [navbartype, setnavbartype] = useState(true);
  useEffect(() => {
    if (abc.toString() === "" || abc.toString() === "/search") {
      setnavbartype(false);
    } else {
      setnavbartype(true);
    }
  }, [abc]);
  return (
    <div
      className={`${navbarstyle ? "small_sticky" : "display_none"} ${
        pathname === "/" && "animeslidedown"
      }`}
    >
      <div className="small_full_navbar">
        <Link to="/">
          <div className="small_header_logo">
            <Logo />
          </div>
        </Link>
        {navbartype ? (
          <div style={{ width: "26vw", cursor: "pointer" }}>
            <SearchBox
              fullWidth
              onClick={() => setnavbartype(false)}
              variant="outlined"
              value="Start Your Search"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: { fontWeight: 600 },
              }}
            />
          </div>
        ) : (
          <form className="small_search_inputs_sm">
            <span className="small_small_nav_input_search">
              <input
                required
                style={{ cursor: "text", fontWeight: 610 }}
                className="in"
                placeholder="Search by city or hotel"
                type="text"
                value={inputvalue}
                id="ans"
                onChange={funcsuggestion}
              />
              <LocationSearchingIcon
                style={{ cursor: "pointer" }}
                onClick={getLocationnearby}
                className="small_location_icon"
              />
            </span>
            <span className="small_nav_date">
              <span className="small_small_nav_input_search">
                <input
                  className="in"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 590,
                  }}
                  onClick={() => setshowdate(!showdate)}
                  value={`${
                    convertdatestr(checkin_raw_date) +
                    " - " +
                    convertdatestr(checkout_raw_date)
                  }`}
                  onChange={() => console.log("")}
                  type="text"
                />
              </span>
              <div
                ref={dateref}
                className={`${
                  showdate ? "small_nav_date_picker" : "display_none"
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

            <span style={{ position: "relative" }}>
              <span className="small_small_nav_input_search">
                <input
                  style={{ fontWeight: "580" }}
                  className="in"
                  onClick={() => setdropdown(!dropdown)}
                  type="text"
                  value={`${guestcount} Person , ${roomcount} Room`}
                  onChange={() => console.log("")}
                />
              </span>
              <div
                ref={guestcountref}
                className={`${
                  dropdown ? "nav_input3_guest_dropdown" : "display_none"
                }`}
              >
                <GuestRoomWidget />
              </div>
            </span>
            <span className="small_f_button">
              <button
                onClick={searchpage}
                type="submit"
                className="small_Search_button sm"
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
          </form>
        )}{" "}
        {loggedin ? (
          <ClickAwayListener onClickAway={() => setaccount_dropdown(false)}>
            <div
              className={`${"small_navbar_account"}`}
              // onMouseOver={handleClick}
            >
              <span onClick={handleClick}>
                <AccountCircleIcon
                  style={{ fontSize: "40px", color: "green" }}
                />
                <ArrowDropDownIcon style={{ fontSize: "40px" }} />
              </span>
              <div
                className={`${
                  account_dropdown
                    ? "account_dropdown account_dropdown_show"
                    : "account_dropdown"
                }`}
              >
                <MenuItem onClick={Profile}>
                  <ListItemIcon>
                    <FaceIcon />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={favou}>
                  <ListItemIcon>
                    <FavoriteBorderIcon />
                  </ListItemIcon>
                  Favourites
                </MenuItem>

                <MenuItem onClick={Booking}>
                  <ListItemIcon>
                    <WorkOutlineIcon />
                  </ListItemIcon>
                  Booking
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  Logouts
                </MenuItem>
              </div>
            </div>
          </ClickAwayListener>
        ) : (
          <div onClick={() => setlogin(true)} className="qcircle">
            <div className="qborder"></div>
            <span>
              Login <br></br>
              Signup
            </span>
          </div>
        )}
      </div>

      {abc !== "/single" && smallscreen && (
        <div className="small_mobile_nav">
          <div className="small_mobile__nav">
            <form onSubmit={searchpage} className="small_mobile___nav">
              <SearchBox
                placeholder="search by city,location,hotel"
                value={inputvalue}
                onChange={(e) => setinputvalue(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="username"
                name="phone"
                className="input"
                onClick={() => smmodal("search")}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmallNav;
