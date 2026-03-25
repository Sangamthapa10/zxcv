import React, { useEffect } from "react";
import "./CSS/Adminside.css";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { useMediaQuery } from "@mui/material";
// mu icons
import FastfoodIcon from "@mui/icons-material/Fastfood";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ApartmentIcon from "@mui/icons-material/Apartment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//svg
import Hotel from "../SvgComponents/Hotel";
function AdminSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  let notice = localStorage.getItem("notice");
  const { adminsidebar, setadminsidebar } = useGlobalContext();

  const matches = useMediaQuery("(max-width:800px)");
  useEffect(() => {
    if (!matches) {
      setadminsidebar(false);
    }
  }, [matches, setadminsidebar]);
  const a = () => {
    setadminsidebar(false);
  };
  return (
    <>
      <div>
        <aside
          className={`${adminsidebar ? "small_sidebar r" : "admin_aside resp"}`}
        >
          <div
            className={`${
              adminsidebar ? "show-sidebar smsidebar" : "sidebar show-sidebar"
            }`}
          >
            <div className="res_side_bar">
              <div className="sidebar-avartar">
                <div style={{ width: "50px", height: "auto" }}>
                  <Hotel />
                </div>
                <div className="avartar-info">
                  <div className="avartar-text">
                    <h4>{localStorage.getItem("ownern")}</h4>
                    <small>{localStorage.getItem("ownerc")}</small>
                  </div>
                  <span className="las la-angle-double-down"></span>
                </div>
              </div>
              <ul className="links" style={{ marginTop: "2vh" }}>
                <li
                  onClick={a}
                  className={`${pathname === "/adminhome" && "sside"}`}
                >
                  <Link to="/adminhome">
                    <HomeIcon />
                    Home
                  </Link>
                </li>
                <li
                  onClick={a}
                  className={`${pathname === "/adminstats" && "sside"}`}
                >
                  <Link to="/adminstats">
                    <EqualizerIcon />
                    Stats
                  </Link>
                </li>
                <li
                  onClick={a}
                  className={`${pathname === "/adminmeal" && "sside"}`}
                >
                  <Link to="/adminmeal">
                    <FastfoodIcon />
                    Meal
                  </Link>
                </li>
                <li
                  onClick={a}
                  className={`${pathname === "/adminproperty" && "sside"}`}
                >
                  <Link to="/adminproperty">
                    <ApartmentIcon />
                    Manage Property
                  </Link>
                </li>
                <li
                  onClick={a}
                  className={`${pathname === "/adminbookings" && "sside"}`}
                >
                  <Link to="/adminbookings">
                    <ScheduleIcon />
                    Bookings
                  </Link>
                </li>
                <li
                  onClick={a}
                  className={`${
                    pathname === "/adminproperty/inbox" && "sside"
                  }`}
                >
                  <Link to="/adminproperty/inbox">
                    <span>
                      <QuestionAnswerIcon />
                      Inbox {notice && notice + "Notice"}
                    </span>
                  </Link>
                </li>
                <li className={`${pathname === "/adminaccount" && "sside"}`}>
                  <Link to="/adminaccount">
                    <AccountCircleIcon />
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default AdminSidebar;
