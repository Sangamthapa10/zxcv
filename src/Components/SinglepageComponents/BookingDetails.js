import React, { useState, useRef, useEffect } from "react";
import "./CSS/BookingDetail.css";
import SWidget from "./Widget";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";
import DateRange from "../DatePicker/components/DateRange/index.js";
import BookingConfirmMobile from "./BookingConfirmMobile";
// Material UI
import { Button, Modal, ClickAwayListener, useMediaQuery } from "@mui/material";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import ApartmentIcon from "@mui/icons-material/Apartment";

function BookingDetails({ roomselect }) {
  const matches = useMediaQuery("(max-width:900px)");
  const matche = useMediaQuery("(max-width:600px)");
  const datepicker = useRef();
  const history = useHistory();

  // Params with safe defaults
  const {
    id = "",
    name = "",
    check_in = new Date().toISOString().slice(0, 10),
    check_out = new Date().toISOString().slice(0, 10),
    guestcount = "1",
    roomcount = "1",
    selectedroom = null,
    mealid = "",
    bookmodal = "false",
  } = useParams();

  const {
    setselectedmeal,
    selectedmeal = [],
    roomref,
    singlepage = [],
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
    sbookingdetail = [],
  } = useGlobalContext();

  const [smdatechanged, setsmdatechanged] = useState(false);
  const [datepick, setdatepick] = useState(false);
  const [widget, setwidget] = useState(false);
  const [show, setshow] = useState(true);

  // --- Helper Functions ---
  const convertdatestr = (date) => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "Invalid Date";
      const parts = d.toDateString().split(" ");
      return `${parts[1]} ${parts[2]}`;
    } catch {
      return "Invalid Date";
    }
  };

  const Parsedate = (date) => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return null;
      const offset = d.getTimezoneOffset();
      const corrected = new Date(d.getTime() - offset * 60 * 1000);
      return corrected.toISOString().slice(0, 10);
    } catch {
      return null;
    }
  };

  const getDaysArray = (start, end) => {
    const arr = [];
    try {
      const s = new Date(start);
      const e = new Date(end);
      for (let dt = new Date(s); dt <= e; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
      }
    } catch {
      return [];
    }
    return arr;
  };

  const getDaysArrStr = (start, end) => {
    const arr = [];
    try {
      const s = new Date(start);
      const e = new Date(end);
      for (let dt = new Date(s); dt <= e; dt.setDate(dt.getDate() + 1)) {
        const y = new Date(dt);
        const offset = y.getTimezoneOffset();
        const corrected = new Date(y.getTime() - offset * 60 * 1000);
        arr.push(corrected.toISOString().slice(0, 10));
      }
    } catch {
      return [];
    }
    return arr;
  };

  const difference = (date1, date2) => {
    try {
      const dt1 = new Date(date2);
      const dt2 = new Date(date1);
      return Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
    } catch {
      return 0;
    }
  };

  const dateInPast = (date) => {
    try {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      return d <= yesterday;
    } catch {
      return false;
    }
  };

  const meal = (id, action) => {
    try {
      const updatedMeals = selectedmeal.map((v) =>
        v.id.toString() === id.toString()
          ? { ...v, quantity: action === "increase" ? v.quantity + 1 : v.quantity - 1 }
          : v
      );
      setselectedmeal(updatedMeals);
    } catch {
      return;
    }
  };

  const ScrollToRoom = () => {
    if (roomref?.current) {
      window.scrollTo({ top: roomref.current.offsetTop, behavior: "smooth" });
    }
  };

  const continuetobook = () => {
    const token = localStorage.getItem("axynghkwngasd");
    try {
      if (!matches) {
        if (token) {
          setm_detail(true);
          history.push(
            `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${mealid}/bookingmodal=true`
          );
        } else {
          setlogin(true);
          setbookwdac(true);
        }
      } else {
        if (token) {
          setm_detail(true);
          const m = smmeal || "";
          history.push(
            `/single/${id}/${name}/checkin=${smdatechanged ? checkin_date : check_in}/checkout=${
              smdatechanged ? checkout_date : check_out
            }/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${m}/bookingmodal=true`
          );
        } else setlogin(true);
      }
    } catch {}
  };

  // Initialize date range state
  useEffect(() => {
    try {
      setState([
        {
          startDate: new Date(check_in),
          endDate: new Date(check_out),
          key: "selection",
        },
      ]);
      if (bookmodal === "true") setm_detail(true);
    } catch {}
  }, [bookmodal, check_in, check_out, setm_detail, setState]);

  // Scroll show/hide
  useEffect(() => {
    const handler = () => {
      setshow(window.innerHeight + window.scrollY < document.body.offsetHeight);
    };
    document.addEventListener("scroll", handler, { passive: true });
    return () => document.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div className="booking">
        {Array.isArray(singlepage) && singlepage.length > 0 ? (
          singlepage.map((mappe) => {
            const roomOption = Array.isArray(mappe.room_option) ? mappe.room_option : [];
            const menu = Array.isArray(mappe.menu) ? mappe.menu : [];
            const propertymeals = Array.isArray(mappe.propertymeals) ? mappe.propertymeals : [];
            return (
              <div key={mappe.id}>
                <div className="booking_detail__">
                  {roomOption
                    .filter((r) => r.id === roomselect)
                    .map((mapped) => {
                      const price = mapped.discount || mapped.price || 0;
                      const roomavailable = mapped.roomavailable || 0;
                      const meals_total_price =
                        selectedmeal.reduce((acc, m) => acc + m.price * m.quantity, 0) || 0;

                      const BookingDetail = sbookingdetail.find((s) => s.id === mapped.id);
                      const roomnt = BookingDetail?.dates?.not_available
                        ? BookingDetail.dates.not_available.flatMap((d) =>
                            getDaysArrStr(d.not_available_start_date, d.not_available_end_date)
                          )
                        : [];

                      // Disabled dates combining global and room
                      const disabledDates =
                        roomnt.length > 0 ? roomnt : [];

                      return (
                        <div className="booking_detail" key={mapped.id}>
                          <div className="booking_detail_top">
                            <div className="booking_Detail_price">
                              <h2>NPR {price}</h2>
                              {mapped.discount && (
                                <p className="booking_detail_org_price">NPR {mapped.price}</p>
                              )}
                            </div>
                            <p className="booking_detail_price_sub">inclusive of all taxes</p>
                          </div>

                          {/* --- Date Picker --- */}
                          <ClickAwayListener onClickAway={() => setdatepick(false)}>
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
                              <div
                                ref={datepicker}
                                className={datepick ? "datechanger" : "sm_date_picker"}
                              >
                                <DateRange
                                  editableDateInputs={true}
                                  onChange={(item) => {
                                    if (item.selection) {
                                      setState([item.selection]);
                                      const newCheckIn = Parsedate(item.selection.startDate);
                                      const newCheckOut = Parsedate(item.selection.endDate);
                                      if (!matches) {
                                        history.push(
                                          `/single/${id}/${name}/checkin=${newCheckIn}/checkout=${newCheckOut}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${mealid}/bookingmodal=false`
                                        );
                                        setdatepick(false);
                                      } else {
                                        setcheckin_date(newCheckIn);
                                        setcheckoutdate(newCheckOut);
                                        setsmdatechanged(true);
                                      }
                                    }
                                  }}
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
                                  minDate={new Date()}
                                  ranges={state}
                                  direction="horizontal"
                                  dateDisplayFormat="yyyy/MM/dd"
                                />
                              </div>
                            </div>
                          </ClickAwayListener>

                          {/* --- Guests & Rooms --- */}
                          <ClickAwayListener onClickAway={() => setwidget(false)}>
                            <div className="details__">
                              <div
                                className="date_s_booking_detail"
                                onClick={() => setwidget(!widget)}
                              >
                                {guestcount} Guest, {roomcount} Room
                              </div>
                              <div className={widget ? "widget" : "display_none"}>
                                <SWidget />
                              </div>
                            </div>
                          </ClickAwayListener>

                          {/* --- Selected Room Button --- */}
                          <div className="selected_room">
                            <Button
                              onClick={ScrollToRoom}
                              variant="outlined"
                              size="large"
                              fullWidth
                              startIcon={<ApartmentIcon />}
                              endIcon={<EditIcon />}
                              style={{ textTransform: "none" }}
                            >
                              {mapped.name}
                            </Button>
                          </div>

                          {/* --- Total Price & Meal --- */}
                          <div className="booking_below">
                            {mealid && selectedmeal.length > 0 && (
                              <div style={{ display: "grid", gridGap: "15px" }}>
                                {selectedmeal.map((meal_sel) => (
                                  <div className="details__" key={meal_sel.id}>
                                    <div>
                                      <h6>Meal Price</h6>
                                      <p>({meal_sel.name})</p>
                                    </div>
                                    <div>
                                      <h6>
                                        {meal_sel.price} * {meal_sel.quantity}
                                      </h6>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="details__">
                              <div>
                                <h4>Total Price</h4>
                                <p>(Incl. of all taxes)</p>
                              </div>
                              <h3>
                                NPR{" "}
                                {price *
                                  (parseInt(roomcount) +
                                    difference(check_out, check_in)) +
                                  (mealid ? meals_total_price : 0)}
                              </h3>
                            </div>

                            {/* --- Booking Button --- */}
                            <Button
                              className="singlepage_finalbtn"
                              variant="contained"
                              fullWidth
                              onClick={() => continuetobook()}
                              style={{
                                background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
                                color: "white",
                                textTransform: "none",
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 700,
                                fontSize: "16px",
                                borderRadius: "12px",
                                padding: "12px 0",
                                boxShadow: "0 8px 24px rgba(255, 75, 43, 0.3)",
                              }}
                            >
                              Continue To Book
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          <p>No rooms available</p>
        )}
      </div>

      {/* --- Mobile Booking Modal --- */}
      <Modal open={m_detail} onClose={() => setm_detail(false)}>
        <BookingConfirmMobile />
      </Modal>
    </>
  );
}

export default BookingDetails;