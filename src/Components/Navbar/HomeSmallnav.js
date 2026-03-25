import React, { useState, useRef, useEffect } from "react";
import "./CSS/Navbarmain.css";
import { useHistory } from "react-router-dom";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useGlobalContext } from "../Context";
import DateRange from "../DatePicker/components/DateRange/index.js";
import Guest_Room_Count from "../Guest_Room_Count";

const Navmain = () => {
  const [showdate, setshowdate] = useState(false);
  const history = useHistory();

  const {
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
  } = useGlobalContext();
  const dateref = useRef();
  const guestcountref = useRef();
  const today = new Date();
  let tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  let checkin_raw_date = state[0].startDate.toDateString();
  let checkout_raw_date = state[0].endDate.toDateString();
  let toda = new Date(checkin_raw_date);
  let todays = new Date(checkout_raw_date);
  let offset = toda.getTimezoneOffset();
  let one = new Date(toda.getTime() - offset * 60 * 1000);
  let two = new Date(todays.getTime() - offset * 60 * 1000);
  let formatted_checkin = one.toISOString().slice(0, 10);
  let formatted_checkout = two.toISOString().slice(0, 10);

  let four =
    checkout_raw_date.split(" ")[0] +
    "," +
    checkout_raw_date.split(" ")[1] +
    checkout_raw_date.split(" ")[2];
  let three =
    checkin_raw_date.split(" ")[0] +
    "," +
    checkin_raw_date.split(" ")[1] +
    checkin_raw_date.split(" ")[2];
  useEffect(() => {
    setcheckin_date(formatted_checkin);
    setcheckoutdate(formatted_checkout);
  }, [formatted_checkout, formatted_checkin, setcheckin_date, setcheckoutdate]);
  let l = `${three + " - " + four}`;
  useEffect(() => {
    if (formatted_checkout !== checkout_date) {
      if (formatted_checkin !== formatted_checkout) {
        setshowdate(false);
      }
    }
  }, [formatted_checkin, checkout_date, formatted_checkout]);
  useEffect(() => {
    let handler = (event) => {
      if (!dateref.current.contains(event.target)) {
        setshowdate(false);
      }
    };
    let handle = (event) => {
      if (!guestcountref.current.contains(event.target)) {
        setdropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("mousedown", handle);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("mousedown", handle);
    };
  });

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
          `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}
      /guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
        );
        break;
      default:
        history.push(
          `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}
      /guest=${guestcount}/room=${roomcount}/latitude=/longitude=/filter=/type=/guest_rating=/order=`
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
      `/search/${inputvalue}/checkin=${checkin_date}/checkout=${checkout_date}
      /guest=${guestcount}/room=${roomcount}/latitude=${position.coords.latitude}/longitude=${position.coords.longitude}/filter=/type=/guest_rating=/order=`
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
  return (
    <form className="small_search_inputs_sm">
      <span className="small_small_nav_input_search">
        <input
          className="in"
          style={{ fontSize: "14px" }}
          placeholder="Search by city or hotel"
          type="text"
        />
        <LocationSearchingIcon
          onClick={getLocation}
          className="small_location_icon"
        />
      </span>
      <span className="small_nav_date">
        <span className="small_small_nav_input_search">
          <input
            className="in"
            style={{
              fontSize: "14px",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setshowdate(!showdate)}
            value={`${l}`}
            onChange={() => console.log("")}
            type="text"
          />
        </span>
        <div
          ref={dateref}
          className={`${showdate ? "small_nav_date_picker" : "display_none"}`}
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
      <span>
        <span className="small_small_nav_input_search">
          <input
            className="in"
            onClick={() => setdropdown(!dropdown)}
            style={{ fontSize: "14px" }}
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
          <Guest_Room_Count />
        </div>
      </span>
      <span className="small_f_button">
        <button
          onClick={searchpage}
          type="submit"
          className="small_Search_button sm"
        >
          Searches
        </button>
      </span>
    </form>
  );
};
export default Navmain;
