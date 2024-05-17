import React, { useState, useEffect } from "react";
import { Authaxios } from "../../Components/Axios";
import { useGlobalContext } from "../../Components/Context";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import { useHistory } from "react-router-dom";
import {
  ListItemIcon,
  MenuItem,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  useMediaQuery,
  TableRow,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./CSS/AdminBooking.css";
import NoBookingsvg from "../../Components/SvgComponents/NoBookingsvg";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import FaceIcon from "@material-ui/icons/Face";

function AdminBooking() {
  const {
    mailmodal,
    setmailmodal,
    setmailtext,
    adminbooking,
    setadminbooking,
    setsnackbar,
    setalert,
    setalerttext,
    setalerttype,
  } = useGlobalContext();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const tok = localStorage.getItem("axynghkwngasd");
    if (adminbooking.length === 0) {
      setmailmodal(true);
      setmailtext("loading");
      if (tok) {
        Authaxios.get(`/api/property_booking/`).then((res) => {
          let a = res.data;
          setmailmodal(false);
          setadminbooking(a);
        });
      }
    }
  }, [setadminbooking, adminbooking.length, setmailmodal, setmailtext]);
  const [changed_booking, setchanged_booking] = useState({
    checkedin: [],
    checkedout: [],
  });
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  const confirmstatus = (id, hotelid, status) => {
    const tok = localStorage.getItem("axynghkwngasd");
    if (tok) {
      Authaxios.post(`api/edit_booking/`, {
        id: id,
        status: status,
        hotel: hotelid,
      })
        .then((res) => {
          let a =
            status === "checkedin"
              ? "checkedout"
              : status === "cancelled"
              ? "cancelled"
              : status === "booked"
              ? "checkedin"
              : "";
          if (res.data.status === "checkedin") {
            // if (changed_booking.checkedin.find((el) => el === id)) {
            let dat = [...changed_booking.checkedin, id];
            setchanged_booking({
              checkedin: dat,
              checkedout: changed_booking.checkedout,
            });
            // }
          } else if (res.data.status === "checkedout") {
            // if (changed_booking.checkedout.find((el) => el === id)) {
            let old_dat = arrayRemove(changed_booking.checkedin, id);
            alert(old_dat);
            let dat = [...changed_booking.checkedout, id];
            setchanged_booking({
              checkedin: old_dat,
              checkedout: dat,
            });
            // }
          }

          setOpen(false);
          setalert(true);
          setalerttype("success");
          setalerttext(`changed to ${a} ! Refresh to see changes`);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [status, setstatus] = useState("");
  const [bookid, setbookid] = useState("");
  const [hotelid, sethotelid] = useState("");
  const changestatus = (id, hotelid, status) => {
    setmenu("");
    setstatus(status);
    setbookid(id);
    sethotelid(hotelid);
    setOpen(true);
  };

  const confirm = () => {
    confirmstatus(bookid, hotelid, status);
  };
  const history = useHistory();
  const sbook = (id) => [history.push(`/admin/bookdetails/${id}`)];
  const [search, setsearch] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  let data = search.length > 0 ? searchdata : adminbooking;
  const searchfunc = (e) => {
    setsearch(e.target.value);
    let a = adminbooking.filter(
      (swine) =>
        (swine.fullname !== null &&
          swine.fullname
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim())) ||
        swine.Contact.includes(e.target.value.toLowerCase().trim())
    );
    setsearchdata(a);
  };
  const isToday = (someDate) => {
    const today = new Date();

    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };
  const [menu, setmenu] = useState(false);
  const smalldevice = useMediaQuery("(max-width:600px)");
  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();

    const four = a.split(" ")[1] + " " + a.split(" ")[2];

    return four;
  }
  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = "";

    difference += days === 0 || days === 1 ? `${days} day ` : `${days} days `;

    difference +=
      hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes`
        : `${minutes} minutes`;

    return difference;
  }
  const copy = (a) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(a);
      setsnackbar(true);
      setalerttext("Copied Contact No. Successfully");
      setalerttype("success");
    } else {
      setsnackbar(true);
      setalerttext("Could not copy. Nevertheless Contact no. is given above");
      setalerttype("error");
    }
  };
  return (
    <div className="admin_dash">
      <AdminSidebar />
      <div className="admin_booking">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure the guest has
              {status === "checkedin"
                ? " checkedout"
                : status === "cancelled"
                ? " cancelled"
                : status === "booked"
                ? " checkedin"
                : ""}{" "}
              {" ?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={confirm} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div className="search_bar_book">
          <TextField
            onClick={() => console.log(changed_booking)}
            fullWidth
            variant="outlined"
            type="text"
            onChange={(e) => searchfunc(e)}
            InputProps={{
              endAdornment: <Button>Search</Button>,
            }}
          />
        </div>
        {mailmodal || data.length > 0 ? (
          smalldevice ? (
            <div className="booking_card_container">
              {data.map((mapped, i) => {
                return (
                  <div key={i + 1} className="booking_left">
                    <div className="booking_card">
                      <div className="booking_cardimg_container">
                        <NoBookingsvg />
                      </div>
                      <div className="booking_card__text">
                        <div className="tour_container_head">
                          <span className="book_time_details">
                            <h5>
                              {mapped.fullname} ({mapped.Contact})
                            </h5>
                            <p>
                              {mapped.property_meal.length} meals/foods ordered
                            </p>
                            <p>
                              {mapped.booking_status === "booked"
                                ? "(" +
                                  timeDiffCalc(
                                    new Date(),
                                    new Date(mapped.check_in_date)
                                  ) +
                                  " left for checkin)"
                                : "Guest has checked in"}
                            </p>
                          </span>
                          {mapped.booking_status === "booked" ||
                            (mapped.booking_status === "checkedin" &&
                              mapped.property_meal.length > 0 && (
                                <div>
                                  <h6>Meals</h6>
                                  You have ordered {
                                    mapped.property_meal.length
                                  }{" "}
                                  meal
                                </div>
                              ))}
                          {mapped.booking_status === "checkedout" && (
                            <span>
                              <span
                                style={{
                                  display: "grid",
                                  gridTemplateColumns:
                                    "max-content max-content",
                                  gridGap: "15px",
                                }}
                              >
                                <p>We hope you enjoyed your stay. </p>
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="smbook_details_desc">
                      <div className="book_details_info  ">
                        <h2>Check In</h2>
                        <p>{convertdatestr(mapped.check_in_date)}</p>
                      </div>
                      <div className="book_details_info  ">
                        <h2>Payment Options</h2>
                        <p>
                          {mapped.payment_options}

                          {mapped.booking_status === "booked" &&
                            mapped.room_key_active === true &&
                            mapped.room_key !== undefined && (
                              <span>(Show Room key)</span>
                            )}
                        </p>
                      </div>
                      <div className="book_details_info  ">
                        <h2>Check Out</h2>
                        <p>{convertdatestr(mapped.check_out_date)}</p>
                      </div>
                    </div>
                    <div className="booking_m_details ">
                      <div className="book_details_info ">
                        <h2>Room/Guest</h2>
                        <p>
                          {mapped.total_room} {mapped.room.name} &{" "}
                          {mapped.guest_count} Guests
                        </p>
                      </div>
                      {mapped.property_meal.length > 0 && (
                        <div
                          // style={{ overflow: "auto" }}
                          className="book_details_info dropdown "
                        >
                          <h2>Meals Ordered</h2>
                          <p>{mapped.property_meal.length} items ordered</p>
                          <div className="dropdown-content">
                            {mapped.property_meal.map((s, i) => {
                              return (
                                <div key={i + 1} className="menu_item">
                                  <span className="dropdown_rname">
                                    {s.name}
                                  </span>
                                  <span>
                                    <p>NPR {s.price}</p>
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="book_details_info ">
                        <h2>Total</h2>
                        <p>NPR {mapped.total_price}</p>
                      </div>
                    </div>

                    <div className="bdetail_btn_grp">
                      <div className="bdetail_down_btn_grp">
                        <Button
                          onClick={() => copy(mapped.Contact)}
                          color="primary"
                          style={{ textTransform: "none" }}
                          variant="outlined"
                        >
                          Call Guest
                        </Button>
                        <Button
                          onClick={() =>
                            mapped.booking_status === "booked"
                              ? changestatus(
                                  mapped.id,
                                  mapped.hotel.id,
                                  mapped.booking_status
                                )
                              : mapped.booking_status === "checkedin"
                              ? changestatus(
                                  mapped.id,
                                  mapped.hotel.id,
                                  mapped.booking_status
                                )
                              : ""
                          }
                          color="primary"
                          style={{ textTransform: "none" }}
                          variant="outlined"
                        >
                          Change status
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ width: "97%", margin: "auto", overflowX: "scroll" }}>
              <Table style={{ tableLayout: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 100 }}>Guest</TableCell>
                    <TableCell style={{ width: 100 }}> Check In</TableCell>
                    <TableCell style={{ width: 100 }}> Check out</TableCell>
                    <TableCell style={{ width: 100 }}> Room Type</TableCell>
                    <TableCell style={{ width: 100 }}>Meal Price </TableCell>
                    <TableCell style={{ width: 100 }}> Total Price</TableCell>
                    <TableCell style={{ width: 100 }}>
                      {" "}
                      Payment Method
                    </TableCell>
                    <TableCell style={{ width: 100 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((mapped, i) => {
                    let bkstatus = changed_booking.checkedout.find(
                      (el) => el === mapped.id
                    )
                      ? "checkedout"
                      : changed_booking.checkedin.find((el) => el === mapped.id)
                      ? "checkedin"
                      : mapped.booking_status;
                    return (
                      <TableRow key={i + 1}>
                        <TableCell
                          onClick={() => sbook(mapped.id)}
                          style={{ width: 100, cursor: "pointer" }}
                        >
                          {`${mapped.fullname} (${mapped.Contact})`}
                        </TableCell>
                        <TableCell style={{ width: 100 }}>
                          {isToday(new Date(mapped.check_in_date))
                            ? "today"
                            : mapped.check_in_date}
                        </TableCell>
                        <TableCell style={{ width: 100 }}>
                          {mapped.check_out_date}
                        </TableCell>
                        <TableCell style={{ width: 100 }}>
                          <p>
                            {mapped.total_room} {mapped.room.name}
                          </p>
                        </TableCell>
                        <TableCell style={{ width: 100 }}>
                          {mapped.property_meal.length === 0 || (
                            <p>Npr{mapped.meal_price}</p>
                          )}
                          <p> {mapped.property_meal.length} items ordered</p>
                        </TableCell>
                        <TableCell style={{ width: 100 }}>
                          NPR {mapped.total_price}
                        </TableCell>
                        <TableCell style={{ width: 100 }}>
                          {mapped.payment_options === "paid" ? (
                            mapped.room_key ? (
                              <span>
                                <p>{mapped.room_key.roomno}</p>
                                <p>{mapped.room_key.roomkey}</p>
                              </span>
                            ) : (
                              <p>Room key needed</p>
                            )
                          ) : (
                            ""
                          )}
                          {mapped.payment_options}
                        </TableCell>
                        <ClickAwayListener
                          onClickAway={() => {
                            setmenu("");
                          }}
                        >
                          <TableCell
                            onClick={(e) => {
                              if (e.stopPropagation) e.stopPropagation();
                              setmenu(mapped.id);
                            }}
                            style={{ width: 100, position: "relative" }}
                          >
                            <Button
                              endIcon={
                                <ArrowDropDownIcon
                                  style={{ fontSize: "20px" }}
                                />
                              }
                              style={{
                                color: "white",
                                textTransform: "none",
                                backgroundColor:
                                  changed_booking.checkedout.find(
                                    (el) => el === mapped.id
                                  )
                                    ? "black"
                                    : changed_booking.checkedin.find(
                                        (el) => el === mapped.id
                                      )
                                    ? "green"
                                    : mapped.booking_status === "booked"
                                    ? "red"
                                    : mapped.booking_status === "checkedin"
                                    ? "green"
                                    : mapped.booking_status === "checkedout"
                                    ? "black"
                                    : "blue",
                              }}
                              variant="contained"
                            >
                              {changed_booking.checkedout.find(
                                (el) => el === mapped.id
                              )
                                ? "Checked Out"
                                : changed_booking.checkedin.find(
                                    (el) => el === mapped.id
                                  )
                                ? "Checked In"
                                : mapped.booking_status}
                            </Button>
                            <div
                              className={`${
                                menu === mapped.id
                                  ? "dropdownboptions bd"
                                  : "dropdownboptions"
                              }`}
                            >
                              <MenuItem
                                onClick={() =>
                                  mapped.booking_status === "booked"
                                    ? changestatus(
                                        mapped.id,
                                        mapped.hotel.id,
                                        bkstatus
                                      )
                                    : mapped.booking_status === "checkedin"
                                    ? changestatus(
                                        mapped.id,
                                        mapped.hotel.id,
                                        bkstatus
                                      )
                                    : ""
                                }
                              >
                                <ListItemIcon>
                                  <WorkOutlineIcon />
                                </ListItemIcon>
                                Change Status
                              </MenuItem>{" "}
                              <MenuItem onClick={() => copy(mapped.Contact)}>
                                <ListItemIcon>
                                  <FaceIcon />
                                </ListItemIcon>
                                Call guest
                              </MenuItem>
                            </div>
                          </TableCell>
                        </ClickAwayListener>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )
        ) : (
          <div style={{ display: "grid", placeContent: "center" }}>
            <h3>This are all the data</h3>
            <h5>Only place to look at is Checked Out</h5>
            <p>
              We respect our guests privacy so we cant share checked out details
              with you
            </p>
            <p>For special cases.You can contact us</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBooking;
