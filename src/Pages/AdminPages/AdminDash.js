import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Components/Context";
import { Authaxios } from "../../Components/Axios";
import AdminChart from "../../Components/AdminComponents/AdminChart";
import StayBar from "../../Components/AdminComponents/StayBar";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import "./CSS/AdminDash.css";
import "./CSS/AdminHome.css";
//icons
import RoomServiceIcon from "@material-ui/icons/RoomService";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
const AdminDash = () => {
  const { setchartdata, chartdata, setmailmodal, setmailtext } =
    useGlobalContext();

  const [loading, setloading] = useState(false);

  useEffect(() => {
    let tok = localStorage.getItem("axynghkwngasd");
    if (chartdata.length === 0) {
      if (tok) {
        setmailmodal(true);
        setmailtext("loading");

        Authaxios.get("/account/ov").then((res) => {
          setchartdata(res.data);

          setmailmodal(false);
          setloading(true);
        });
      }
    } else {
      setloading(true);
    }
  }, [setchartdata, setmailmodal, setmailtext, chartdata.length]);

  return (
    <div className="admin_dash">
      <AdminSidebar />
      <div>
        {loading && (
          <div className="home_admin_dash">
            <div className="Categorys__">
              <div className="ad_h_in_ md">
                <h3 style={{ paddingTop: "18px" }}>
                  Todays Status <ImportContactsIcon style={{ color: "red" }} />
                </h3>
                <span className="category__detail">
                  <h6>Checkins left</h6>
                  <h6>{chartdata.today.ch_in.total}</h6>
                </span>

                <span className="category__detail">
                  <h6>Checkouts left</h6>
                  <h6>{chartdata.today.ch_out.total}</h6>
                </span>
                <span className="category__detail">
                  <h6>Rooms in Use</h6>
                  <h6>{chartdata.room_occupied.s}</h6>
                </span>
              </div>

              <div className="notification ad_h_in_">
                <h3
                  style={{
                    position: "sticky",
                    inset: 0,
                    background: "#fff",
                    paddingTop: "18px",
                    zIndex: 1,
                  }}
                >
                  Room Stats <RoomServiceIcon style={{ color: "red" }} />
                </h3>
                {chartdata.room.room_option.map((maps, i) => {
                  let price = maps.discounted_price
                    ? maps.discounted_price
                    : maps.price;
                  return (
                    <div className="category__rdetail" key={i + 1}>
                      <h5
                        className="dot_text"
                        style={{
                          fontWeight: "bolder",
                          placeSelf: "start",
                          fontSize: "1rem",
                          width: "100%",
                        }}
                      >
                        {maps.name}
                      </h5>
                      <h6>{maps.room_occupied} room occupied</h6>
                      <h6>{maps.roombooked} upcoming booking</h6>
                      {price === maps.discounted_price ? (
                        <h6>NPR{price} per night</h6>
                      ) : (
                        <h6>NPR{maps.price} per night</h6>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="admin_chart">
              <AdminChart />
            </div>
            <div className="admin_chart">
              <StayBar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDash;
