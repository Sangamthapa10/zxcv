import React, { useState } from "react";
import DateRange from "../DatePicker/components/DateRange/index.js";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useGlobalContext } from "../Context";
import { useParams, useHistory } from "react-router-dom";
import { Button, Modal, useMediaQuery } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const ModalDatePicker = ({ start, end, booking_details }) => {
  const matches = useMediaQuery("(max-width:600px)");

  const { bigdate, setbigdate } = useGlobalContext();
  const [state, setState] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ]);
  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[2];

    return four;
  }
  const history = useHistory();

  const { id } = useParams();
  const { name } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { selectedroom } = useParams();
  const { mealid } = useParams();
  const checkin_raw_dates = state[0].startDate;
  const checkout_raw_dates = state[0].endDate;
  let toda = new Date(checkin_raw_dates);
  let todays = new Date(checkout_raw_dates);
  const offset = toda.getTimezoneOffset();
  let one = new Date(toda.getTime() - offset * 60 * 1000);
  let two = new Date(todays.getTime() - offset * 60 * 1000);
  let formatted_checkin = one.toISOString().slice(0, 10);
  let formatted_checkout = two.toISOString().slice(0, 10);
  const continuetobook = () => {
    let mealids = mealid ? mealid : "";
    let url = `/single/${id}/${name}/checkin=${formatted_checkin}/checkout=${formatted_checkout}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${mealids}/bookingmodal=true`;
    history.push(url);
    setbigdate(false);
  };

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
      : null
    : null;
  let intdates = booking_details
    ? booking_details.not_available &&
      booking_details.not_available.map((s) => {
        return getDaysArr(
          new Date(s.not_available_start_date),
          new Date(s.not_available_end_date)
        );
      })
    : "";
  var nt = booking_details
    ? booking_details.not_available
      ? [].concat.apply([], intdates)
      : null
    : null;
  const Parsedate = (first) => {
    let toda = new Date(first);
    let offset = toda.getTimezoneOffset();
    let two = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = two.toISOString().slice(0, 10);

    return formatted_checkin;
  };
  function difference(date1, date2) {
    var dt1 = new Date(date2);
    var dt2 = new Date(date1);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }
  return (
    <Modal
      style={{ display: "grid", placeContent: "center" }}
      open={bigdate}
      onClose={() => setbigdate(false)}
    >
      <div className="changedatemodal animeslidedown ">
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
              zIndex: 1400,
            }}
          >
            <HighlightOffIcon
              onClick={() => setbigdate(false)}
              style={{
                width: "30px",
                height: "30px",
                color: "rgb(34, 34, 34)",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="edit_booking_card_container">
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
                  (state[0].endDate.getTime() - state[0].startDate.getTime()) /
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
                <span className="datepicker_info">
                  <h4>Check In</h4>
                  <h6>{convertdatestr(state[0].startDate)}</h6>
                </span>
                <span className="datepicker_info">
                  <h4>Check Out</h4>
                  <h6>{convertdatestr(state[0].endDate)}</h6>
                </span>
              </div>
            </div>
          )}
          <div className="big_datepicker">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              showSelectionPreview={false}
              showMonthAndYearPickers={false}
              moveRangeOnFirstSelection={false}
              months={2}
              preventUnnecessaryRefocus={true}
              showDateDisplay={false}
              showMonthArrow={matches ? false : true}
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
              direction={matches ? "vertical" : "horizontal"}
              disabledDates={fucks ? fucks : []}
              dateDisplayFormat={"yyyy/MM/dd"}
            />
          </div>
          <div
            className="sm_date_modal_btm"
            style={{
              display: "flex",
              padding: "16px",
              justifyContent: "flex-end",
            }}
          >
            {(nt && nt.includes(Parsedate(state[0].startDate))) ||
            difference(
              Parsedate(state[0].endDate),
              Parsedate(state[0].startDate)
            ) >
              parseInt(
                booking_details !== null ? booking_details.max_booking : 60
              ) ? (
              <Button variant="contained" disabled={true}>
                {difference(
                  Parsedate(state[0].endDate),
                  Parsedate(state[0].startDate)
                ) >
                parseInt(
                  booking_details !== null ? booking_details.max_booking : 60
                )
                  ? "Maximum booking days is" +
                    " " +
                    `${booking_details.max_booking}` +
                    " " +
                    "days"
                  : "Not Available Dates"}
              </Button>
            ) : (
              <Button
                onClick={continuetobook}
                endIcon={<SaveIcon />}
                color="primary"
                variant="contained"
              >
                Save{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDatePicker;
