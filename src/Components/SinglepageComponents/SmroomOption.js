import React, { useState, useRef } from "react";
import "./CSS/smroom.css";
import Slider from "react-slick";
import Icons from "../Icons";
import { useGlobalContext } from "../Context";
import { useParams } from "react-router-dom";
//mui
import { Button } from "@mui/material";
//icons
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function SmroomOption() {
  const one = useRef();

  const smroomselectfunc = (did) => {
    setselectroom(did);
  };

  const { singlepage, smselectroom, setselectroom, setmodal, setamnetymodal } =
    useGlobalContext();
  const roommodalimg = (id) => {
    // setsel_modal_img(id);
    setmodal(true);
  };
  function SampleNextArrows(props) {
    return false;
  }

  function SamplePrevArrows(props) {
    return false;
  }

  const settings = {
    dots: false,
    speed: 1200,
    slidesToShow: singlepage[0].room_option.length > 2 ? 3 : 2,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    centermode: false,
    nextArrow: <SampleNextArrows />,
    prevArrow: <SamplePrevArrows />,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: false,
          centerPadding: 0,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          afterChange: (currentSlide) => {
            setcenter(currentSlide);
          },
          centerPadding:
            one.current !== undefined && one.current.clientWidth / 8,
        },
      },
    ],
  };
  const { selectedroom } = useParams();
  let selected_room = smselectroom ? smselectroom : selectedroom;
  let room_option = singlepage[0].room_option;
  let default_room = room_option.filter((swine) => swine.default_room === "d");
  let smroomselect = selected_room
    ? parseInt(selected_room)
    : default_room[0].id;
  const showmore = (i) => {
    setamnetymodal(true);
  };
  const [center, setcenter] = useState();
  return (
    <div className={`${center > 0 ? "cm_e" : ""} slide_options`}>
      <h3 className="title__">Room Options</h3>
      {room_option.length > 1 ? (
        <Slider {...settings}>
          {room_option.map((sel_rooms) => {
            var sel_room_amnety = sel_rooms.room_amneties.slice(0, 4);

            return (
              <div ref={one} className="slide_card" key={sel_rooms.id}>
                <div className="room_option_card">
                  <div className="room_option_card_img">
                    <span className="img__">
                      <img
                        alt="oasdne"
                        src={sel_rooms.room_dp.img}
                        onClick={() => roommodalimg(sel_rooms.id)}
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
                      {smroomselect === sel_rooms.id && (
                        <div className="ribbon ribbon-top-left">
                          <span> Selected</span>
                        </div>
                      )}
                    </span>
                  </div>

                  <div className="room_option_card_desc">
                    <h6>{sel_rooms.name}</h6>
                    <span className="smroom_option_card_bio">
                      <p className="smroom_option_bio_">
                        {sel_rooms.description}
                      </p>
                      <p>{sel_rooms.bed_count} beds</p>
                    </span>
                    <div className="room_amn_container">
                      <div className="sm_room_amneties">
                        {sel_room_amnety.map((mapped) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                overflow: "hidden",
                              }}
                              key={mapped.id}
                            >
                              <Icons icon={mapped.icon} />
                            </div>
                          );
                        })}

                        {sel_rooms.room_amneties.length >
                        sel_room_amnety.length ? (
                          <span
                            onClick={() => showmore(sel_rooms.id)}
                            className="more_"
                          >
                            +
                            {sel_rooms.room_amneties.length -
                              sel_room_amnety.length}
                            more
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <span className="room_option_card_bottom">
                      <p
                        className={`${
                          sel_rooms.discount
                            ? "booking_detail_org_price"
                            : "take_space"
                        }`}
                      >
                        {sel_rooms.discount ? "NPR " + sel_rooms.price : "Null"}
                      </p>
                      {sel_rooms.discount ? (
                        <h5>NPR{sel_rooms.discount}</h5>
                      ) : (
                        <h5>NPR{sel_rooms.price}</h5>
                      )}

                      <span className="select_button">
                        <Button
                          endIcon={
                            smroomselect === sel_rooms.id ? (
                              <CheckCircleIcon color="primary" />
                            ) : null
                          }
                          size="small"
                          fullWidth
                          variant={
                            smroomselect === sel_rooms.id
                              ? "outlined"
                              : "contained"
                          }
                          style={{
                            backgroundColor:
                              smroomselect === sel_rooms.id ? null : "green",
                            color:
                              smroomselect === sel_rooms.id ? null : "white",
                          }}
                          onClick={() => smroomselectfunc(sel_rooms.id)}
                        >
                          {smroomselect === sel_rooms.id
                            ? "Selected"
                            : "select"}
                        </Button>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div>
          {room_option.map((sel_rooms) => {
            var sel_room_amnety = sel_rooms.room_amneties.slice(0, 3);
            return (
              <div className="one_room_mcard" key={sel_rooms.id}>
                <div style={{ position: "relative" }}>
                  <img
                    alt="oasdne"
                    src={sel_rooms.room_dp.img}
                    onClick={() => roommodalimg(sel_rooms.id)}
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
                  {smroomselect === sel_rooms.id && (
                    <div className="ribbon ribbon-top-left">
                      <span> Selected</span>
                    </div>
                  )}
                </div>
                <div className="one_room_mcard_right">
                  <span>
                    <span style={{ fontSize: "30px" }}> {sel_rooms.name}</span>

                    <p className="dot_text">{sel_rooms.description}</p>
                    <p>{sel_rooms.bed_count} beds</p>
                  </span>
                  <div className="room_amn_container">
                    <div className="room_amneties">
                      {sel_room_amnety.map((mapped) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              overflow: "hidden",
                            }}
                            key={mapped.id}
                          >
                            <Icons icon={mapped.icon} />
                            <p className="dot_text">{mapped.name}</p>
                          </div>
                        );
                      })}

                      {sel_rooms.room_amneties.length >
                      sel_room_amnety.length ? (
                        <Button
                          size="small"
                          variant="outlined"
                          style={{ placeSelf: "start", textTransform: "none" }}
                          onClick={() => showmore(sel_rooms.id)}
                        >
                          +
                          {sel_rooms.room_amneties.length -
                            sel_room_amnety.length}
                          more
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <span className="room_option_card_bottom">
                    <h5>NPR {sel_rooms.price}</h5>

                    <span className="select_button">
                      <Button
                        endIcon={
                          smroomselect === sel_rooms.id ? (
                            <CheckCircleIcon color="primary" />
                          ) : null
                        }
                        size="small"
                        fullWidth
                        variant={
                          smroomselect === sel_rooms.id
                            ? "outlined"
                            : "contained"
                        }
                        style={{
                          backgroundColor:
                            smroomselect === sel_rooms.id ? null : "green",
                          color: smroomselect === sel_rooms.id ? null : "white",
                        }}
                        onClick={() => smroomselectfunc(sel_rooms.id)}
                      >
                        {smroomselect === sel_rooms.id ? "Selected" : "select"}
                      </Button>
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SmroomOption;
