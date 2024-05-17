import React from "react";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import "./CSS/AdminHome.css";
function AdminHome() {
  return (
    <div className="admin_dash">
      <AdminSidebar />
      <div className="home_admin">
        {" "}
        <div className="Categorys__">
          <div className="ad_h_in">
            <h3>Checked In</h3>
            <h1>19/24</h1>
          </div>

          <div className="ad_h_in">
            <h3>In Use</h3>
            <h1>10/24</h1>
          </div>

          <div className="ad_h_in">
            <h3>Occupancy</h3>
            <h2>99%</h2>
            <h1>10/24</h1>
          </div>
        </div>
        <div className="notifications"></div>
      </div>
    </div>
  );
}

export default AdminHome;
