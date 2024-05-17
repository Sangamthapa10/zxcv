import React from "react";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import Profile from "../../Account/Profile";
function Adminaccount() {
  return (
    <div className="admin_dash">
      <AdminSidebar />
      <div
        style={{
          backgroundColor: "#fff",
          display: "grid",
          placeContent: "center",
        }}
        className="admin_account"
      >
        <Profile />
      </div>
    </div>
  );
}

export default Adminaccount;
