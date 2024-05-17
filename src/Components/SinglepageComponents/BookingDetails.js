import React, { useState, useRef, useEffect } from "react";
import "./CSS/BookingDetail.css";
import SWidget from "./Widget";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";
import DateRange from "../DatePicker/components/DateRange/index.js";
import BookingConfirmMobile from "./BookingConfirmMobile";
//Material ui
import {
  Button,
  Modal,
  ClickAwayListener,
  useMediaQuery,
} from "@material-ui/core";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import ApartmentIcon from "@material-ui/icons/Apartment";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

function BookingDetails({ roomselect }) {
  let matches = useMediaQuery("(max-width:900px)");
  let matche = useMediaQuery("(max-width:600px)");
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
  const {
    setselectedmeal,
    selectedmeal,
    roomref,
    singlepage,
    m_detail,
    setm_detail,
    setlogin,
    state,
    setState,
    checkin_date,
    setcheckin_date,
    checkout_date,
    setcheckoutdate,
    smmeal,
    setbookwdac,
    smselectroom,
    sbookingdetail,
  } = useGlobalContext();
  const ScrollToRoom = () => {
    window.scrollTo({ top: roomref.current.offsetTop, behavior: "smooth" });
  };
  const datepicker = useRef();
  const { id } = useParams();
  const { name } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { selectedroom } = useParams();
  const { mealid } = useParams();
  const { bookmodal } = useParams();
  const history = useHistory();
  useEffect(() => {
    setState([
      {
        startDate: new Date(check_in),
        endDate: new Date(check_out),
        key: "selection",
      },
    ]);
    if (bookmodal === "true") {
      setm_detail(true);
    }
  }, [bookmodal, setm_detail, setState, check_out, check_in]);
  let tok = localStorage.getItem("axynghkwngasd");

  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[2];
    return four;
  }
  let mealids = mealid ? mealid : "";
  const [smdatechanged, setsmdatechanged] = useState(false);
  const [datepick, setdatepick] = useState(false);
  const Parsedate = (first) => {
    let toda = new Date(first);
    let offset = toda.getTimezoneOffset();
    let two = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = two.toISOString().slice(0, 10);

    return formatted_checkin;
  };
  const changedate = (i) => {
    setState([i.selection]);
    if (
      Parsedate(i.selection.endDate) !== check_out &&
      Parsedate(i.selection.startDate) !== Parsedate(i.selection.endDate)
    ) {
      if (!matches) {
        history.push(
          `/single/${id}/${name}/checkin=${Parsedate(
            i.selection.startDate
          )}/checkout=${Parsedate(
            i.selection.endDate
          )}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${mealids}/bookingmodal=false`
        );
        setdatepick(false);
      } else {
        setcheckin_date(Parsedate(i.selection.startDate));
        setcheckoutdate(Parsedate(i.selection.endDate));
        setsmdatechanged(true);
      }
    }
  };

  const [widget, setwidget] = useState(false);
  const [show, setshow] = useState(true);
  let supportsPassive = false;

  try {
    const options = {
      get passive() {
        supportsPassive = true;
        return false;
      },
    };

    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch (err) {
    supportsPassive = false;
  }
  useEffect(() => {
    let handler = (event) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setshow(false);
      } else {
        setshow(true);
      }
    };
    document.addEventListener(
      "scroll",
      handler,
      supportsPassive ? { passive: true } : false
    );
    return () => {
      document.removeEventListener("scroll", handler);
    };
  });
  const continuetobook = () => {
    if (!matches) {
      if (tok) {
        setm_detail(true);
        let m = mealid ? mealid : "";
        history.push(
          `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${m}/bookingmodal=${true}`
        );
      } else {
        setlogin(true);
        setbookwdac(true);
      }
    } else {
      if (tok) {
        let m = smmeal ? smmeal : "";
        setm_detail(true);
        let url = `/single/${id}/${name}/checkin=${
          smdatechanged ? checkin_date : check_in
        }/checkout=${
          smdatechanged ? checkout_date : check_out
        }/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${m}/bookingmodal=${true}`;
        history.push(url.trim());
      } else {
        setlogin(true);
      }
    }
  };

  /*difference in dates */
  function difference(date1, date2) {
    var dt1 = new Date(date2);
    var dt2 = new Date(date1);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }
  const dateInPast = function (firstDate, s) {
    const today = new Date();
    let secondDate = new Date();
    secondDate.setDate(today.getDate() - 1);
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  };
  const meal = (id, inc) => {
    selectedmeal.forEach((v) => {
      if (v.id.toString() === id.toString())
        v.quantity = inc === "increase" ? v.quantity + 1 : v.quantity - 1;
    });
    setselectedmeal([...selectedmeal]);
  };
  return (
    <>
      <div className="booking">
        {singlepage.map((mappe) => {
          const { room_option, propertymeals, menu, booking_details } = mappe;
          let booking_detailsq =
            sbookingdetail &&
            sbookingdetail.filter((s) => s.id === mappe.id)[0]?.dates;
          console.log(booking_detailsq);
          let fux = booking_details
            ? booking_details.not_available &&
              booking_details.not_available.map((s) => {
                return getDaysArray(
                  new Date(s.not_available_start_date),
                  new Date(s.not_available_end_date)
                );
              })
            : "";
          var fucks = booking_details
            ? booking_details.not_available
              ? [].concat.apply([], fux)
              : []
            : [];
          let intdates = booking_details
            ? booking_details.not_available &&
              booking_details.not_available.map((s) => {
                return getDaysArr(
                  new Date(s.not_available_start_date),
                  new Date(s.not_available_end_date)
                );
              })
            : "";
          let nt = booking_details
            ? booking_details.not_available
              ? [].concat.apply([], intdates)
              : null
            : null;
          // let d = mealid && mealid.split(",");
          // let mealnumberArray = d && d.map((el) => parseFloat(el));
          // let meals =
          //   mealid &&
          //   propertymeals.filter((swine) => mealnumberArray.includes(swine.id));
          // let othermeals =
          //   mealid &&
          //   menu.filter((swine) => mealnumberArray.includes(swine.id));
          // let othermeals_price =
          //   othermeals && othermeals.reduce((s, { price }) => s + price, 0);
          let meals_total_price =
            selectedmeal &&
            selectedmeal.reduce(
              (s, { price, quantity }) => s + price * quantity,
              0
            );
          let default_room = room_option.filter(
            (swine) => swine.default_room === "d"
          );

          let selected_room = smselectroom ? smselectroom : selectedroom;
          let roomq = selected_room
            ? parseInt(selected_room)
            : default_room[0].id;

          return (
            <div key={mappe.id}>
              <div key={mappe.id} className="booking_detail__">
                {room_option
                  .filter((swine) => swine.id === roomselect)
                  .map((mapped) => {
                    let price = mapped.discount
                      ? mapped.discount
                      : mapped.price;
                    let BookingDetail = sbookingdetail.filter(
                      (s) => s.id === mapped.id
                    )[0]?.dates;
                    let roomavailable = sbookingdetail.filter(
                      (s) => s.id === mapped.id
                    )[0]?.room_available;
                    console.log(BookingDetail);
                    let roomfux = BookingDetail
                      ? BookingDetail.not_available &&
                        BookingDetail.not_available.map((s) => {
                          return getDaysArray(
                            new Date(s.not_available_start_date),
                            new Date(s.not_available_end_date)
                          );
                        })
                      : "";
                    let roomfucks = BookingDetail
                      ? BookingDetail.not_available
                        ? [].concat.apply([], roomfux)
                        : []
                      : [];
                    let roomintdates = BookingDetail
                      ? BookingDetail.not_available &&
                        BookingDetail.not_available.map((s) => {
                          return getDaysArr(
                            new Date(s.not_available_start_date),
                            new Date(s.not_available_end_date)
                          );
                        })
                      : "";
                    let roomnt = BookingDetail
                      ? BookingDetail.not_available
                        ? [].concat.apply([], roomintdates)
                        : null
                      : null;
                    let disabledDates = [...fucks, ...roomfucks];

                    return (
                      <div className="booking_detail" key={mapped.id}>
                        <div className="booking_detail_top">
                          <div className="booking_Detail_price">
                            {mapped.discount ? (
                              <h2>NPR {mapped.discount}</h2>
                            ) : (
                              <h2>NPR {mapped.price}</h2>
                            )}
                            {mapped.discount && (
                              <p className="booking_detail_org_price">
                                NPR{mapped.price}
                              </p>
                            )}
                          </div>
                          <p className="booking_detail_price_sub">
                            inclusive of all taxes
                          </p>
                        </div>
                        <div className="details">
                          <ClickAwayListener
                            onClickAway={() => setdatepick(false)}
                          >
                            <div>
                              <div className="details__date">
                                <div
                                  className="date_s_booking_detail"
                                  onClick={() => setdatepick(true)}
                                >
                                  <span className="check_in_booking_details">
                                    {convertdatestr(check_in)}
                                  </span>
                                  -
                                  <span className="check_out_booking_details">
                                    {convertdatestr(check_out)}
                                  </span>
                                </div>
                                <h3 className="sm_choose_date">
                                  Select Check-In Dates
                                </h3>
                                <div
                                  ref={datepicker}
                                  className={`${
                                    datepick ? "datechanger" : "sm_date_picker"
                                  }`}
                                >
                                  <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => changedate(item)}
                                    showSelectionPreview={false}
                                    showMonthAndYearPickers={false}
                                    moveRangeOnFirstSelection={false}
                                    months={matche ? 1 : 2}
                                    preventUnnecessaryRefocus={true}
                                    showDateDisplay={false}
                                    showMonthArrow={true}
                                    rangeColors={["#ff726f"]}
                                    fixedHeight={false}
                                    disabledDates={disabledDates}
                                    minDate={
                                      new Date(
                                        new Date().getFullYear(),
                                        new Date().getMonth(),
                                        new Date().getDate()
                                      )
                                    }
                                    ranges={state}
                                    direction={"horizontal"}
                                    dateDisplayFormat={"yyyy/MM/dd"}
                                  />
                                </div>
                              </div>
                            </div>
                          </ClickAwayListener>

                          <div className="details__">
                            <ClickAwayListener
                              onClickAway={() => setwidget(false)}
                            >
                              <div>
                                <div
                                  className="date_s_booking_detail"
                                  onClick={() => setwidget(!widget)}
                                >
                                  {guestcount} Guest,{roomcount} Room
                                </div>
                                <div
                                  className={`${
                                    widget ? "widget" : "display_none"
                                  }`}
                                >
                                  <div>
                                    <SWidget />
                                  </div>
                                </div>
                              </div>
                            </ClickAwayListener>
                          </div>
                        </div>
                        <div className="selected_room">
                          <Button
                            onClick={ScrollToRoom}
                            variant="outlined"
                            size="large"
                            fullWidth
                            startIcon={<ApartmentIcon />}
                            endIcon={<EditIcon />}
                            style={{
                              textTransform: "none",
                            }}
                          >
                            <div className="room_s_booking_detail">
                              <div>{mapped.name}</div>
                            </div>
                          </Button>
                        </div>

                        <div className="booking_below">
                          {mealid && parseInt(selectedmeal.length) > 5 ? (
                            <div className="details__">
                              <div>
                                <h4>Total Meal Price</h4>
                                <p>(Incl. of all taxes)</p>
                              </div>
                              <h4>{meals_total_price}</h4>
                            </div>
                          ) : (
                            <div>
                              {mealid && (
                                <div
                                  style={{ display: "grid", gridGap: "15px" }}
                                >
                                  {selectedmeal.map((meal_sel) => {
                                    return (
                                      <div
                                        key={meal_sel.id}
                                        className="details__"
                                      >
                                        <div>
                                          <span
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <h6>Meal Price</h6>
                                            {/* {meal_sel.name} */}
                                          </span>
                                          <p>({meal_sel.name})</p>
                                        </div>
                                        <div>
                                          <h6
                                            style={{
                                              paddingBottom: "2px",
                                              borderBottom:
                                                "1px solid var(--gray)",
                                            }}
                                          >
                                            {meal_sel.price} *{" "}
                                            {meal_sel.quantity}
                                          </h6>
                                          {/* <span>
                                            <span className="meal_quan_wg">
                                              <RemoveCircleOutlineIcon
                                                className="wg_icon"
                                                onClick={() =>
                                                  meal(meal_sel.id, "decrease")
                                                }
                                              />
                                              <p className="wg_value">
                                                {quantity.length > 0 &&
                                                  quantity[0].quantity}
                                              </p>
                                              <AddCircleOutlineIcon
                                                className="wg_icon"
                                                onClick={() =>
                                                  meal(meal_sel.id, "increase")
                                                }
                                              />
                                            </span>
                                          </span> */}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                          <div className="details__">
                            <div>
                              <h4>Total Price</h4>
                              <p>(Incl. of all taxes)</p>
                              <p style={{ paddingTop: "10px" }}>
                                {roomavailable < 10 && roomavailable > 0 && (
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <WhatshotIcon style={{ color: "red" }} />{" "}
                                    Only {roomavailable}{" "}
                                    {roomavailable > 1 ? "rooms" : "room"} left
                                  </span>
                                )}
                              </p>
                            </div>

                            {mealid ? (
                              <h3>
                                NPR{" "}
                                {price *
                                  parseInt(
                                    parseInt(
                                      parseInt(roomcount) === 1 ? 0 : roomcount
                                    ) +
                                      parseInt(difference(check_out, check_in))
                                  ) +
                                  parseInt(meals_total_price)}
                              </h3>
                            ) : (
                              <h3>
                                NPR
                                {price *
                                  parseInt(
                                    parseInt(
                                      parseInt(roomcount) === 1 ? 0 : roomcount
                                    ) +
                                      parseInt(difference(check_out, check_in))
                                  )}
                              </h3>
                            )}
                          </div>
                          {dateInPast(new Date(check_in), new Date()) ||
                          (roomnt &&
                            roomnt.some((ai) =>
                              getDaysArr(
                                new Date(check_in),
                                new Date(check_out)
                              ).includes(ai)
                            )) ||
                          (nt &&
                            nt.some((ai) =>
                              getDaysArr(
                                new Date(check_in),
                                new Date(check_out)
                              ).includes(ai)
                            )) ||
                          parseInt(roomcount) > 4 ||
                          parseInt(roomcount) > parseInt(roomavailable) ||
                          parseInt(guestcount) > 4 ||
                          difference(check_out, check_in) >
                            parseInt(
                              booking_details !== null
                                ? booking_details.max_booking
                                : 60
                            ) ? (
                            <Button
                              style={{ textTransform: "none" }}
                              variant="outlined"
                              color="secondary"
                            >
                              {parseInt(roomcount) > parseInt(roomavailable)
                                ? parseInt(roomavailable) === 0
                                  ? `All Rooms booked`
                                  : `Only ${roomavailable}                              
   ${roomavailable > 1 ? "rooms" : "room"} available`
                                : difference(check_out, check_in) >
                                  parseInt(
                                    booking_details !== null
                                      ? booking_details.max_booking
                                      : 60
                                  )
                                ? "Maximum booking days is" +
                                  " " +
                                  `${booking_details.max_booking}` +
                                  " " +
                                  "days"
                                : parseInt(roomcount) > 4
                                ? "Room Limit Exceeded"
                                : parseInt(guestcount) > 4
                                ? "Guest Limit Exceeded"
                                : (roomnt &&
                                    roomnt.some((ai) =>
                                      getDaysArr(
                                        new Date(check_in),
                                        new Date(check_out)
                                      ).includes(ai)
                                    )) ||
                                  (nt && nt.includes(check_in))
                                ? "Not Available Dates"
                                : dateInPast(new Date(check_in), new Date())
                                ? "Invalid Date"
                                : "Try again later"}
                            </Button>
                          ) : (
                            <Button
                              className="singlepage_finalbtn"
                              variant="contained"
                              fullWidth
                              onClick={() => continuetobook()}
                              style={{
                                backgroundColor: "#1ab64f",
                                color: "white",
                                textTransform: "none",
                              }}
                            >
                              Continue To Book
                              {nt &&
                                nt.some((ai) =>
                                  getDaysArr(
                                    new Date(check_in),
                                    new Date(check_out)
                                  ).includes(ai)
                                )}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              {show &&
                (m_detail || (
                  <div className="booking_mobile_bottom">
                    <div className="booking_detail">
                      <div>
                        {mappe.room_option
                          .filter((swine) => swine.id === roomq)
                          .map((mapped) => {
                            const { roomavailable } = mapped;
                            let price = mapped.discount
                              ? mapped.discount
                              : mapped.price;

                            return (
                              <div key={mapped.id}>
                                <div className="booking_mobile">
                                  <ExpandLessIcon className="swipe_arrow" />
                                  {(nt &&
                                    nt.some((ai) =>
                                      getDaysArr(
                                        new Date(
                                          smdatechanged
                                            ? checkin_date
                                            : check_in
                                        ),
                                        new Date(
                                          smdatechanged
                                            ? checkout_date
                                            : check_out
                                        )
                                      ).includes(ai)
                                    )) ||
                                    parseInt(roomcount) > 4 ||
                                    parseInt(roomcount) >
                                      parseInt(roomavailable) ||
                                    parseInt(guestcount) > 4 ||
                                    (smdatechanged &&
                                      checkout_date === checkin_date) ||
                                    difference(
                                      smdatechanged ? checkout_date : check_out,
                                      smdatechanged ? checkin_date : check_in
                                    ) >
                                      parseInt(
                                        booking_details !== null
                                          ? booking_details.max_booking
                                          : 60
                                      ) || (
                                      <div>
                                        <span
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <p>Room Price : NPR {price}</p>
                                          {mapped.discount && (
                                            <span
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <p className="booking_detail_org_price">
                                                ({mapped.discount})
                                              </p>
                                            </span>
                                          )}
                                        </span>

                                        {selectedmeal ? (
                                          <div>
                                            <h6>
                                              Total Meal Price :{" "}
                                              {meals_total_price}
                                            </h6>
                                            <h3 style={{ paddingTop: "5px" }}>
                                              Total : NPR
                                              {` ${
                                                price *
                                                  roomcount *
                                                  difference(
                                                    smdatechanged
                                                      ? checkout_date
                                                      : check_in,
                                                    smdatechanged
                                                      ? checkin_date
                                                      : check_in
                                                  ) +
                                                meals_total_price
                                              }`}
                                            </h3>
                                          </div>
                                        ) : (
                                          <h3>
                                            Total : NPR{" "}
                                            {price *
                                              roomcount *
                                              difference(
                                                smdatechanged
                                                  ? checkout_date
                                                  : check_out,
                                                smdatechanged
                                                  ? checkin_date
                                                  : check_in
                                              )}
                                          </h3>
                                        )}
                                      </div>
                                    )}
                                  {dateInPast(new Date(check_in), new Date()) ||
                                  state[0].startDate !== state[0].endDate ? (
                                    (nt &&
                                      nt.some((ai) =>
                                        getDaysArr(
                                          new Date(
                                            smdatechanged
                                              ? checkin_date
                                              : check_in
                                          ),
                                          new Date(
                                            smdatechanged
                                              ? checkout_date
                                              : check_out
                                          )
                                        ).includes(ai)
                                      )) ||
                                    parseInt(roomcount) > 4 ||
                                    parseInt(roomcount) >
                                      parseInt(roomavailable) ||
                                    parseInt(guestcount) > 4 ||
                                    (smdatechanged &&
                                      checkout_date === checkin_date) ||
                                    difference(
                                      smdatechanged ? checkout_date : check_out,
                                      smdatechanged ? checkin_date : check_in
                                    ) >
                                      parseInt(
                                        booking_details !== null
                                          ? booking_details.max_booking
                                          : 60
                                      ) ? (
                                      <div className="booking_mobile">
                                        <Button
                                          fullWidth
                                          variant="outlined"
                                          color="secondary"
                                          style={{ textTransform: "none" }}
                                        >
                                          {difference(
                                            smdatechanged
                                              ? checkout_date
                                              : check_in,
                                            smdatechanged
                                              ? checkin_date
                                              : check_in
                                          ) >
                                          parseInt(
                                            booking_details !== null
                                              ? booking_details.max_booking
                                              : 60
                                          )
                                            ? "Maximum booking days is" +
                                              " " +
                                              `${booking_details.max_booking}` +
                                              " " +
                                              "days"
                                            : parseInt(roomcount) > 4
                                            ? "Room Limit Exceeded"
                                            : parseInt(guestcount) > 4
                                            ? "Guest Limit Exceeded"
                                            : parseInt(roomcount) >
                                              parseInt(roomavailable)
                                            ? parseInt(roomavailable) === 0
                                              ? `All Rooms booked`
                                              : `Only ${roomavailable}                              
   ${roomavailable > 1 ? "rooms" : "room"} available`
                                            : dateInPast(
                                                new Date(check_in),
                                                new Date()
                                              )
                                            ? "Invalid Date"
                                            : (nt &&
                                                nt.some((ai) =>
                                                  getDaysArr(
                                                    new Date(check_in),
                                                    new Date(check_out)
                                                  ).includes(ai)
                                                )) ||
                                              (nt && nt.includes(check_in))
                                            ? "Not Available Dates"
                                            : "Try again later"}
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        onClick={() => continuetobook()}
                                        style={{
                                          backgroundColor: "#1ab64f",
                                          color: "white",
                                          textTransform: "none",
                                        }}
                                      >
                                        Book
                                      </Button>
                                    )
                                  ) : (
                                    <div
                                      style={{ width: "100%" }}
                                      className="loading_btn"
                                    >
                                      <div
                                        style={{ background: "#9ed5e7" }}
                                        className="dot1"
                                      >
                                        {" "}
                                      </div>
                                      <div
                                        style={{ background: "#9ed5e7" }}
                                        className="dot2"
                                      ></div>
                                      <div
                                        style={{ background: "#9ed5e7" }}
                                        className="dot3"
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      <Modal
        open={m_detail}
        onClose={() => setm_detail(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <BookingConfirmMobile />
        </div>
      </Modal>
    </>
  );
}

export default BookingDetails;
