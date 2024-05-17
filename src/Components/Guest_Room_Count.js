import React from "react";
import "./CSS/Guestwidget.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { useGlobalContext } from "./Context";
function GuestRoomCount({ type }) {
  const {
    guestcount,
    setguestcount,

    roomcount,
    setroomcount,
  } = useGlobalContext();

  const decrease = () => {
    if (guestcount > 1) {
      setguestcount(guestcount - 1);
    }
  };
  const increase = () => {
    if (type === "tour") {
      setguestcount(guestcount + 1);
    } else {
      if (guestcount < 4) {
        setguestcount(guestcount + 1);
      }
    }
  };
  const roomincrease = () => {
    if (type === "tour") {
      setroomcount(roomcount + 1);
    } else {
      if (roomcount < 4) {
        setroomcount(roomcount + 1);
      }
    }
  };
  const roomdecrease = () => {
    if (roomcount > 1) {
      setroomcount(roomcount - 1);
    }
  };
  return (
    <div>
      <div
        style={{ boxShadow: type === "tour" && "0px 0px red" }}
        className="guest_room_widget"
      >
        <div className="wg_body">
          <span className="guest_count">
            <h3 className="wg_header">Guests</h3>
            <span className="widget_r">
              <RemoveCircleOutlineIcon className="wg_icon" onClick={decrease} />
              <p className="wg_value">{guestcount}</p>
              <AddCircleOutlineIcon className="wg_icon" onClick={increase} />
            </span>
          </span>

          <span className="room_count">
            <h3 className="wg_header">Room</h3>
            <span className="widget_r">
              <RemoveCircleOutlineIcon
                className="wg_icon"
                onClick={roomdecrease}
              />
              <p className="wg_value">{roomcount}</p>
              <AddCircleOutlineIcon
                className="wg_icon"
                onClick={roomincrease}
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default GuestRoomCount;
