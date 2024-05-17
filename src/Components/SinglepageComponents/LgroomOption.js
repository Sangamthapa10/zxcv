import React from "react";
import "./CSS/lgroomoptions.css";
import Icons from "../Icons";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Customaxios from "../Axios";
//mui
import { Button } from "@material-ui/core";
//icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ImageIcon from "@material-ui/icons/Image";
const LgroomOption = ({ roomselect }) => {
  const { id } = useParams();
  const { name } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { mealid } = useParams();
  const history = useHistory();
  const {
    img_gallerydata,
    setimg_gallerydata,
    singlepage,
    setamnetymodal,
    setimg_gallery,
    setimgid,
  } = useGlobalContext();
  const roomselectfunc = (did) => {
    let m = mealid ? mealid : "";
    history.push(
      `/single/${id} /${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${roomcount}/selected_room=${did}/meals=${m}/bookingmodal=${false}`
    );
  };
  let room_option = singlepage[0].room_option;
  const openmodal = (ids) => {
    if (parseFloat(img_gallerydata.length) === 0) {
      Customaxios.get(`/api/pimages/${parseInt(id)}`).then((res) => {
        let b = Object.assign([], [res.data]);
        localStorage.setItem("recency", id);

        setimg_gallerydata(b);
        setimgid(ids);
        setimg_gallery(true);
      });
    } else {
      setimgid(ids);
      setimg_gallery(true);
    }
  };
  const showmore = (i) => {
    setamnetymodal(true);
  };

  return (
    <div className="room_option">
      {room_option.map((sel_rooms) => {
        var sel_room_amnety = sel_rooms.room_amneties.slice(0, 4);

        return (
          <div
            className="room_option__card_one"
            style={{ position: "relative" }}
            key={sel_rooms.id}
          >
            {roomselect === sel_rooms.id ? (
              <div className="ribbon ribbon-top-left">
                <span> Selected Room</span>
              </div>
            ) : null}
            <div className="room_option_card" key={sel_rooms.id}>
              <div
                onClick={() => openmodal(sel_rooms.id)}
                className="room_option_card_img"
              >
                <img
                  alt="oasdne"
                  src={sel_rooms.room_dp.img}
                  className="room_dp"
                />

                <ImageIcon
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "20px",
                    color: "white",
                    opacity: "1",
                  }}
                />
                <div className="middle">
                  <div className="text">Click to see images</div>
                </div>
              </div>
              <div className="room_option_card_desc">
                <h3 className="room_name">
                  {sel_rooms.name}
                  {roomselect === sel_rooms.id ? (
                    <CheckCircleIcon color="primary" />
                  ) : null}
                </h3>

                <span className="room_details_short_desc_">
                  <p className="room_card_l_desc">
                    {sel_rooms.bed_count} rooms
                    {sel_rooms.description}
                  </p>
                </span>

                <div className="room_amneties">
                  {sel_room_amnety.map((mapped) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          maxWidth: "100%",
                        }}
                        key={mapped.id}
                      >
                        <Icons icon={mapped.icon} />

                        <p className="amn_name">{mapped.name}</p>
                      </div>
                    );
                  })}
                  {sel_rooms.room_amneties.length > sel_room_amnety.length ? (
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => showmore(sel_rooms.id)}
                    >
                      +{sel_rooms.room_amneties.length - sel_room_amnety.length}
                      more
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <span className="room_option_card_bottom">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {sel_rooms.discount ? (
                      <h5>NPR{sel_rooms.discount}</h5>
                    ) : (
                      <h5>NPR{sel_rooms.price}</h5>
                    )}
                    {sel_rooms.discount && (
                      <p className="booking_detail_org_price">
                        NPR{sel_rooms.price}
                      </p>
                    )}
                  </span>
                  <span className="select_button">
                    <Button
                      endIcon={
                        roomselect === sel_rooms.id ? (
                          <CheckCircleIcon color="primary" />
                        ) : null
                      }
                      size="large"
                      variant="outlined"
                      onClick={() => roomselectfunc(sel_rooms.id)}
                    >
                      {roomselect === sel_rooms.id ? "Selected" : "select"}
                    </Button>
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LgroomOption;
