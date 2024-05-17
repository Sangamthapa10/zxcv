import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";
//icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const SWidget = ({ data }) => {
  const history = useHistory();
  const { setguestcount, setroomcount } = useGlobalContext();
  const { id } = useParams();
  const { name } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { selectedroom } = useParams();
  const { mealid } = useParams();
  const { bookmodal } = useParams();
  /*  guest_room_count*/
  let mealids = mealid ? mealid : "";

  const decrease = () => {
    if (guestcount > 1) {
      setguestcount(guestcount - 1);
      history.push(
        `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${
          guestcount - 1
        }/room=${roomcount}/selected_room=${selectedroom}/meals=${mealids}/bookingmodal=${bookmodal}`
      );
    }
  };
  const increase = () => {
    if (guestcount < 4) {
      setguestcount(guestcount + 1);
      history.push(
        `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${
          parseInt(guestcount) + 1
        }/room=${roomcount}/selected_room=${selectedroom}/meals=${mealids}/bookingmodal=${bookmodal}`
      );
    }
  };
  const roomincrease = () => {
    if (roomcount < 4) {
      setroomcount(roomcount + 1);

      history.push(
        `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${
          parseInt(roomcount) + 1
        }/selected_room=${selectedroom}/meals=${mealids}/bookingmodal=${bookmodal}`
      );
    }
  };
  const roomdecrease = () => {
    if (roomcount > 1) {
      setroomcount(roomcount - 1);
      history.push(
        `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${
          roomcount - 1
        }/selected_room=${selectedroom}/meals=${mealids}/bookingmodal=${bookmodal}`
      );
    }
  };
  return (
    <div className={data ? "animeslidedown" : ""}>
      <div className={data ? "modal_guest_room_widget" : "guest_room_widget"}>
        {data && <h6>Guests & Rooms</h6>}
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
          {data && <p>Maximum 4 guests and 4 rooms</p>}
        </div>
      </div>
    </div>
  );
};

export default SWidget;
