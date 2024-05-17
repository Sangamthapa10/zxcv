import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DateRange from "../DatePicker/components/DateRange/index.js";
import { useGlobalContext } from "../Context";
import "./CSS/modaldetepicker.css";
function ModalDatepicker() {
  const {
    checkout_date,

    setcheckoutdate,
    setcheckin_date,

    datemodal,
    setdatemodal,
  } = useGlobalContext();
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

  const checkin_raw_date = state[0].startDate.toDateString();
  const checkout_raw_date = state[0].endDate.toDateString();

  let toda = new Date(checkin_raw_date);
  let todays = new Date(checkout_raw_date);
  const offset = toda.getTimezoneOffset();
  let one = new Date(toda.getTime() - offset * 60 * 1000);
  let two = new Date(todays.getTime() - offset * 60 * 1000);
  let formatted_checkin = one.toISOString().slice(0, 10);
  let formatted_checkout = two.toISOString().slice(0, 10);

  useEffect(() => {
    setcheckin_date(formatted_checkin);
    setcheckoutdate(formatted_checkout);
  }, [formatted_checkout, formatted_checkin, setcheckin_date, setcheckoutdate]);
  useEffect(() => {
    if (formatted_checkout !== checkout_date) {
      if (formatted_checkin !== formatted_checkout) {
        setdatemodal(false);
      }
    }
  }, [formatted_checkin, checkout_date, setdatemodal, formatted_checkout]);
  return 
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
            onClick={() => setdatemodal(false)}
            style={{ marginLeft: "3vw" }}
          />
          <h5>Pick Datesssdsdsd</h5>
        </div>
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
    </Modal>
  );
}

export default ModalDatepicker;