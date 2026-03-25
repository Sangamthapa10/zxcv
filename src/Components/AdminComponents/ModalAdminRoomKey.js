import React from "react";
import { useGlobalContext } from "../../Components/Context";
import { Modal } from "@mui/material";
import AdminRoomKey from "../../Components/AdminComponents/AdminRoomKey";
import Icons from "../Icons";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function ModalAdminRoomKey() {
  const { keymodal, setkeymodal, adminreqdata, reqadmin } = useGlobalContext();
  return (
    <Modal
      style={{
        display: "grid",
        placeItems: "center",
        placeContent: "center",
      }}
      open={keymodal}
      onClose={() => setkeymodal(false)}
    >
      <div
        style={{
          width: "90vw",
          height: "85vh",
          background: "#fff",
          padding: "24px",
        }}
      >
        {reqadmin ? (
          <div>
            <h3>You already have pending requests</h3>
            {adminreqdata.map((mappe, i) => {
              return (
                <div key={i + 1}>
                  <div
                    style={{
                      position: "sticky",
                      top: 0,
                      left: 0,
                      right: 0,
                      width: "100%",
                      backgroundColor: "#fff",
                    }}
                    className="gallery_modal_head"
                  >
                    <div
                      style={{
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#fff",
                      }}
                    >
                      <ArrowBackIosIcon
                        onClick={() => setkeymodal(false)}
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "rgb(34, 34, 34)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h6>Requested facility</h6>

                    <div
                      style={{ paddingTop: "14px" }}
                      className="admin_room_amneties_container"
                    >
                      {mappe.facility.map((mapped, i) => {
                        return (
                          <div key={i + 1} className={`${"admin_room_amnety"}`}>
                            <Icons icon={mapped.icon} />
                            <p>{mapped.name}</p>.{" "}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {mappe.room_option.length > 0 && (
                    <table className="pdetail_table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Beds in Room</th>
                          <th>Total Room</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mappe.room_option.map((room, i) => {
                          return (
                            <tr key={i + 1}>
                              <td>{room.name}</td>
                              <td>{room.price}</td>
                              <td>{room.bed_count}</td>
                              <td>{room.total_room}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            })}

            <div></div>
          </div>
        ) : (
          <AdminRoomKey />
        )}
      </div>
    </Modal>
  );
}

export default ModalAdminRoomKey;
