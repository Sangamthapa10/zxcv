import React, { useState } from "react";
import "./CSS/Bookingsettings.css";
import DateRange from "../../DatePicker/components/DateRange/index.js";
import { useGlobalContext } from "../../Context";
import { Authaxios } from "../../Axios";
import {
  Dialog,
  Modal,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Switch,
} from "@mui/material";
//icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";
function BookingSettings(dat) {
  const { data } = dat;
  const { setalerttype, setalert, setalerttext } = useGlobalContext();
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
  const send = () => {
    Authaxios.post("/api/createbookdetails/", {
      start_date: formatted_checkin,
      end_date: formatted_checkout,
    }).then((res) => {
      setalert(true);
      setadd(false);
      setalerttext("Added SuccessFully");
      setalerttype("success");
      alert(res.data);
      let a = {
        id: res.data,
        not_available_end_date: formatted_checkout,
        not_available_start_date: formatted_checkin,
      };
      let c = Object.assign([], [...changesmade.adddate, a]);
      setchangesmade({
        adddate: c,
        removedate: changesmade.removedate,
        cp: changesmade.cp,
      });
    });
  };

  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[2];

    return four;
  }
  const [edit, setedit] = useState(false);
  const [add, setadd] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateid, setdateid] = useState("");
  const [dialogtype, setdialogtype] = useState("");
  const opendialog = (id) => {
    if (id === "cp") {
      setOpen(true);
      setdialogtype("cp");
    } else {
      setOpen(true);
      setdateid(id);
      setdialogtype("date");
    }
  };
  const changecp = () => {
    if (dialogtype === "cp") {
      Authaxios.post("/api/modify_request/asd/", {
        change_now: true,
        cp: data.couple_friendly ? false : true,
      }).then((res) => {
        setOpen(false);
        setalert(true);

        setalerttext(
          data.couple_friendly
            ? "Removed from couple friendly"
            : "Property changed to couple friendly"
        );
        setalerttype("success");
        setchangesmade({
          adddate: changesmade.adddate,
          removedate: changesmade.removedate,
          cp: data.couple_friendly ? "ncp" : "cp",
        });
      });
    } else {
      Authaxios.post("/api/deletebookdetails/", {
        id: parseInt(dateid),
      }).then((res) => {
        setOpen(false);
        setalerttype("success");
        setalert(true);
        setalerttext("removed SuccessFully");

        setchangesmade({
          adddate: changesmade.adddate,
          removedate: [...changesmade.removedate, dateid],
          cp: changesmade.cp,
        });
      });
    }
  };
  const [changesmade, setchangesmade] = useState({
    adddate: [],
    removedate: [],
    cp: "",
  });
  return (
    <div>
      <div className="admin_property_details">
        <span className="admin_property__card">
          <h6>Couple</h6>
          <Button
            onClick={() => setedit(edit === "cp" ? false : "cp")}
            style={{ color: "green" }}
            variant="outlined"
          >
            Edit
          </Button>
        </span>
        <div>
          <div className="admin_property__card">
            Couple Friendly
            {edit === "cp" ? (
              <Switch
                checked={
                  changesmade.cp === "cp"
                    ? true
                    : changesmade.cp === "ncp"
                    ? "false"
                    : data.couple_friendly
                    ? true
                    : false
                }
                onClick={() => opendialog("cp")}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            ) : data.couple_friendly ? (
              <CheckCircleIcon style={{ color: "blue" }} />
            ) : (
              <CancelIcon style={{ color: "red" }} />
            )}
          </div>
        </div>
      </div>
      <div className="admin_property_details">
        <span style={{ marginTop: "10px" }} className="admin_property__card">
          <h6>Not Available Dates</h6>
          <Button
            onClick={() => setedit(edit === "date" ? false : "date")}
            style={{ color: "green" }}
            variant="outlined"
          >
            Edit
          </Button>
        </span>
        {/* {edit === "date" && ( */}
        <div className="not_available_dates">
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                {dialogtype === "cp"
                  ? `Are you sure you want to ${
                      changesmade.cp === "cp"
                        ? "remove property from couple friendly ?"
                        : changesmade.cp === "ncp"
                        ? "change your Property to couple friendly"
                        : data.couple_friendly
                        ? "remove Property from couple friendly?"
                        : "change your property to couple friendly"
                    } ?`
                  : "Are you sure u want to remove this date range from unavailable list ?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => setOpen(false)} color="primary">
                No
              </Button>
              <Button onClick={changecp} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          {changesmade.adddate &&
            changesmade.adddate
              .filter((swine) => !changesmade.removedate.includes(swine.id))
              .map((date) => {
                return (
                  <div className="nt_available" key={date.id}>
                    <h5>{`From ${date.not_available_start_date} to ${date.not_available_end_date}`}</h5>
                    {edit === "date" && (
                      <span>
                        <CloseIcon
                          onClick={() => opendialog(date.id)}
                          style={{ color: "red" }}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
          {data.booking_details &&
            data.booking_details.not_available &&
            data.booking_details.not_available
              .filter((swine) => !changesmade.removedate.includes(swine.id))
              .map((date) => {
                return (
                  <div className="nt_available" key={date.id}>
                    <h5>{`From ${date.not_available_start_date} to ${date.not_available_end_date}`}</h5>
                    {edit === "date" && (
                      <span>
                        <CloseIcon
                          onClick={() => opendialog(date.id)}
                          style={{ color: "red" }}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
          {}
          {edit === "date" && (
            <div className="btn_admin_add">
              <Button onClick={() => setadd(true)} variant="outlined">
                <div className="btn_admin_add_container">
                  Add Date
                  <AddIcon style={{ fontSize: "60px" }} />
                </div>
              </Button>
              <Modal
                style={{
                  display: "grid",
                  placeContent: "center",
                  placeItem: "center",
                }}
                open={add}
                onClose={() => setadd(false)}
              >
                <div className="changedatemodal">
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
                      }}
                    >
                      <HighlightOffIcon
                        onClick={() => setadd(false)}
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "rgb(34, 34, 34)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
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
                          gridGap: "10px",
                        }}
                      >
                        <span>
                          <h4>Start Date</h4>
                          <h6>{convertdatestr(state[0].startDate)}</h6>
                        </span>
                        <span>
                          <h4>End Date</h4>
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
                  <div
                    style={{
                      display: "flex",
                      padding: "16px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={send}
                      endIcon={<SaveIcon />}
                      color="primary"
                      variant="contained"
                    >
                      Disable booking
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default BookingSettings;
