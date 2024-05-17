import React from "react";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import AdminRoomKey from "../../Components/AdminComponents/AdminRoomKey";
function AdminInbox() {
  return (
    <div className="admin_dash">
      <AdminSidebar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "90%",
          placeContent: "center",
        }}
      >
        <AdminRoomKey />
      </div>
    </div>
  );
}

export default AdminInbox;
