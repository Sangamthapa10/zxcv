import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Authaxios } from "../Axios";
import Roomkeyform from "./AdminInboxComponents/Roomkeyform";

function AdminRoomKey() {
  const { keyformmodal, setkeyformmodal, keydata, setkeydata } =
    useGlobalContext();
  const [nonotice, setnonotice] = useState(false);
  let notice = localStorage.getItem("notice");
  useEffect(() => {
    if (nonotice === false) {
      if (keydata.length === 0) {
        Authaxios.get("/api/roomkey")
          .then((res) => {
            setkeydata(res.data);
            localStorage.setItem("notice", res.data.length);
          })
          .catch((error) => {
            localStorage.removeItem("notice");
            setnonotice(true);
            setkeydata([]);
          });
      }
    }
  }, [keydata, setkeydata, nonotice, notice]);
  const [editid, seteditid] = useState(0);
  const openform = (id) => {
    setkeyformmodal(true);
    seteditid(id);
  };

  return (
    <div>
      {nonotice ? (
        <h1>No Data</h1>
      ) : (
        <div>
          <Modal
            style={{
              display: "grid",
              placeItems: "center",
              placeContent: "center",
            }}
            open={keyformmodal}
            onClose={() => setkeyformmodal(false)}
          >
            <div
              style={{
                width: "90vw",
                height: "85vh",
                background: "#fff",
                padding: "24px",
              }}
            >
              <Roomkeyform id={editid} />
            </div>
          </Modal>
          {keydata.map((mapped, i) => {
            return (
              <div key={i + 1} className="admin_property_roomdetails">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "15px",
                  }}
                >
                  <h6>Add Room Key</h6>
                  <Button
                    onClick={() => openform(mapped.id)}
                    style={{ color: "green" }}
                    variant="outlined"
                  >
                    Add
                  </Button>
                </span>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 100 }}> User</TableCell>
                      <TableCell style={{ width: 100 }}> Check In</TableCell>
                      <TableCell style={{ width: 100 }}> Check out</TableCell>
                      <TableCell style={{ width: 100 }}> Room Type</TableCell>
                      <TableCell style={{ width: 100 }}> Total Price</TableCell>
                      <TableCell style={{ width: 100 }}>
                        {" "}
                        Payment Method
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={mapped.id}>
                      <TableCell style={{ width: 100, cursor: "pointer" }}>
                        {`${mapped.user.username} (${mapped.user.Phone})`}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        {mapped.check_in_date}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        {mapped.check_out_date}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>
                        {mapped.room.name}
                      </TableCell>
                      <TableCell>{mapped.total_price}</TableCell>
                      <TableCell style={{ width: 100 }}>
                        {mapped.payment_options}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminRoomKey;
