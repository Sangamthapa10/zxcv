import React, { useState, useRef } from "react";
import "./CSS/SearchHotelCard.css";
import { useParams, useHistory } from "react-router-dom";
import HotelDpSlider from "./HotelDpSlider";
import Icons from "../Icons";
import { Authaxios } from "../Axios";
import { useGlobalContext } from "../Context";
//material ui
import {
  useMediaQuery,
  Button,
  Checkbox,
  FormControlLabel,
  ClickAwayListener,
} from "@material-ui/core";
//icons
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ExploreIcon from "@material-ui/icons/Explore";
function SearchHotelCard({ realdata }) {
  const { setselectroom, setlogin } = useGlobalContext();
  const mob = useMediaQuery("(max-width:900px)");
  const smmob = useMediaQuery("(max-width:600px)");

  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { lat } = useParams();
  const { lon } = useParams();
  const [showroomsm, setshowroomsm] = useState(false);
  const [showroomoption, setshowroomoption] = useState(false);
  const history = useHistory();
  const searchmapfunc = (e, lat, lon) => {
    if (e.stopPropagation) e.stopPropagation();
    setmaplat(lat);
    setmaplon(lon);
    setsearchbymap(true);
  };

  const hideoption = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    setshowroomoption("");
  };
  const {
    searchbymap,
    setsearchbymap,
    setmaplon,
    setmaplat,
    search_loading,
    desc,
    setlimg,
  } = useGlobalContext();
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  function distances(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }

      var a = roundToTwo(dist);
      return a + "km";
    }
  }

  const clickcheck = (e, id) => {
    let tok = localStorage.getItem("axynghkwngasd");

    if (!tok) {
      e.target.checked = false;
      setlogin(true);
    } else {
      Authaxios.post("/api/fav/", {
        id: id,
      })
        .then((res) => {
          e.target.checked = true;
        })
        .catch((error) => {
          console.log("s");
        });
    }
  };
  const Single = (e, id, Name, default_room, img) => {
    let abc = default_room ? default_room : "";
    let links = `/single/${id}/${Name}/checkin=${check_in
      .replace(/\s+/g, " ")
      .trim()}/checkout=${check_out
      .replace(/\s+/g, " ")
      .trim()}/guests=${guestcount}/room=${roomcount}/selected_room=${abc}/meals=/bookingmodal=`
      .replace(/\s+/g, " ")
      .trim();
    if (!mob) {
      window.open(links, "_blank");
    } else {
      history.push(
        `/single/${id}/${Name}/checkin=${check_in
          .replace(/\s+/g, " ")
          .trim()}/checkout=${check_out
          .replace(/\s+/g, " ")
          .trim()}/guests=${guestcount}/room=${roomcount}/selected_room=${abc}/meals=/bookingmodal=`
          .replace(/\s+/g, " ")
          .trim()
      );
      setlimg(img);
      setselectroom("");
    }
  };
  const Singleopt = (e, id, Name, default_room, img) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    let links = `/single/ ${id} /${Name}/checkin=${check_in
      .replace(/\s+/g, " ")
      .trim()}/checkout=${check_out
      .replace(/\s+/g, " ")
      .trim()}/guests=${guestcount}/room=${roomcount}/selected_room=${default_room}/meals=/bookingmodal=`
      .replace(/\s+/g, " ")
      .trim();
    if (!mob) {
      window.open(links, "_blank");
    } else {
      history.push(links);
      setlimg(img);
    }
  };
  const booknow = (e, id, Name, default_room, img) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    let abc = default_room ? default_room : "";
    let links =
      `/single/ ${id} /${Name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${roomcount}/selected_room=${abc}/meals=/bookingmodal=${true}`
        .replace(/\s+/g, " ")
        .trim();
    if (!mob) {
      window.open(links, "_blank");
    } else {
      history.push(links);
      setlimg(img);
    }
  };

  const showreroom = (e, id) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    setshowroomoption(id);
  };

  const abcd = useRef();

  const smoptions = (e, id) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    setshowroomsm(id);
  };
  return (
    <div>
      <div
        ref={abcd}
        id="theElementId"
        style={{ height: search_loading && "50px" }}
      >
        {realdata.map((mapped) => {
          const {
            id,
            Name,
            Address,
            rating,
            avg_count,
            room_option,
            liked,
            longitude,
            latitude,
            dp_img,
            amneties,
          } = mapped;
          var one = amneties.data;
          let default_room = room_option.filter(
            (swine) => swine.default_room === "d"
          );
          return (
            <div key={id} ref={desc}>
              <div
                className={`${"search_hotel_card"}`}
                onClick={(e) =>
                  smmob && Single(e, id, Name, default_room[0].id, dp_img)
                }
              >
                <HotelDpSlider img={dp_img} />
                <div className="search_card_detail">
                  <div className="search_card_body">
                    <div className="search_card_header">
                      <span
                        style={{
                          gridGap: "7px",
                          display: "grid",
                          gridAutoColumns: "95%",
                          width: "100%",
                        }}
                      >
                        <h1 className="search_card_title">{Name}</h1>
                        <span className="address_info_search">
                          <p>{Address}</p>
                        </span>
                        <span>
                          {avg_count === 0 ? (
                            <Button
                              size="small"
                              variant="contained"
                              style={{
                                textTransform: "none",
                                background: "var(--btn)",
                                color: "var(--white)",
                                borderRadius: "5px",
                                minWidth: "50px",
                                padding: "0",
                              }}
                            >
                              New
                            </Button>
                          ) : (
                            <span className="search_page_rating">
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <StarIcon
                                  style={{
                                    color: "#f2b01e",
                                    fontSize: "20px",
                                  }}
                                />

                                {Math.ceil(rating)}
                              </span>
                              <span>({avg_count} Ratings)</span>
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="search_page_address_container">
                        {lat && lon && (
                          <span className="search_page_address">
                            {distances(
                              parseFloat(lat),
                              parseFloat(lon),
                              parseFloat(latitude),
                              parseFloat(longitude),
                              "K"
                            )}
                            <ExploreIcon
                              onClick={(e) =>
                                searchmapfunc(e, latitude, longitude)
                              }
                              style={{
                                color: "#1ab64f",
                                marginLeft: "10px",
                              }}
                            />
                          </span>
                        )}
                        <FormControlLabel
                          className="fav_label"
                          control={
                            <Checkbox
                              className="fav_label"
                              defaultChecked={liked ? true : false}
                              onClick={(e) => clickcheck(e, id)}
                              icon={<FavoriteBorder />}
                              checkedIcon={
                                <Favorite
                                  style={{ color: "rgb(237, 73, 86)" }}
                                />
                              }
                            />
                          }
                        />
                      </span>
                    </div>
                    <div className="search_card_center">
                      <div className="hotel_amneties">
                        {one.map((amnes, i) => {
                          return (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                overflow: "hidden",
                              }}
                              key={i + 1}
                            >
                              <Icons icon={amnes.icon} />
                              <p>{amnes.name}</p>
                            </span>
                          );
                        })}
                        {amneties.total > 3 ? (
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            + {amneties.total - 3} more{" "}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="room_option_big_screen">
                    <span className="room_option__dropdown">
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p>Price for {default_room[0].name} </p>
                        {default_room[0].roomavailable < 10 &&
                          default_room[0].roomavailable > 0 && (
                            <span
                              style={{
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <WhatshotIcon style={{ color: "red" }} />
                              Only {default_room[0].roomavailable}{" "}
                              {default_room[0].roomavailable > 1
                                ? "rooms"
                                : "room"}{" "}
                              left{" "}
                            </span>
                          )}
                      </span>
                      <div>
                        {room_option.length > 1 && (
                          <ClickAwayListener onClickAway={hideoption}>
                            <div className="dropdown">
                              <p
                                onClick={(e) => showreroom(e, id)}
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                  marginLeft: "10px",
                                }}
                              >
                                {room_option.length - 1} more Room Options
                              </p>

                              <div
                                className={`${
                                  showroomoption === id
                                    ? "dropdown-content d"
                                    : "dropdown-content"
                                }`}
                              >
                                {room_option.map((maps, i) => {
                                  return (
                                    <span
                                      onClick={(e) =>
                                        Single(e, id, Name, maps.id, dp_img)
                                      }
                                      key={i + 1}
                                      className="menu_item"
                                    >
                                      <span className="dropdown_rname">
                                        <img src={maps.room_dp.img} alt="a" />
                                        <p> {maps.name}</p>
                                      </span>
                                      <p>NPR {maps.price}</p>
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </ClickAwayListener>
                        )}
                      </div>
                    </span>
                    <div className="search_card_footer">
                      <div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            placeItems: "start",
                            placeContent: "start",
                          }}
                        >
                          <h1 className="search_card_price">
                            NPR{room_option[0].price}
                          </h1>
                          <p
                            style={{
                              fontWeight: 400,
                              fontSize: "12px",
                              color: "rgb(169,169,169)",
                              marginTop: "-2px",
                            }}
                          >
                            Per room per night
                          </p>
                        </div>
                      </div>
                      <div
                        className={`${
                          searchbymap
                            ? "map_search_card_buttons"
                            : "search_card_buttons"
                        }`}
                      >
                        <Button
                          onClick={(e) =>
                            Single(e, id, Name, default_room[0].id, dp_img)
                          }
                          variant="outlined"
                          style={{
                            textTransform: "none",
                            color: "black",
                            overflowWrap: "normal",
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          onClick={(e) =>
                            booknow(e, id, Name, default_room[0].id, dp_img)
                          }
                          variant="contained"
                          className="final_btn"
                          style={{
                            textTransform: "none",
                            backgroundColor: "#1ab64f",
                            color: "white",
                            borderRadius: "2px",
                            overflowWrap: "normal",
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="small_card_footer">
                    <div className="small_card_room_name">
                      <p
                        style={{
                          fontWeight: 400,
                        }}
                      >
                        Price for {default_room[0].name}
                      </p>
                      {showroomsm ||
                        (room_option.length > 1 && (
                          <div className="dropdown">
                            <p
                              onClick={(e) => smoptions(e, id)}
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "10px",
                              }}
                            >
                              {room_option.length - 1} more Room Options
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className="sm_price">
                      <h1>NPR{default_room[0].price}</h1>
                      <p
                        style={{
                          fontWeight: 400,
                          fontSize: "12px",
                          color: "rgb(169,169,169)",
                          marginTop: "-2px",
                        }}
                      >
                        Per room per night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {showroomsm === id && (
                <div className="sm_room_dropdown_container">
                  <h6 style={{ fontWeight: "bold" }}>
                    {room_option.length} Room options to choose from
                  </h6>
                  {room_option.map((maps, i) => {
                    return (
                      <span
                        key={i + 1}
                        onClick={(e) => Singleopt(e, id, Name, maps.id, dp_img)}
                        className="room_o_item"
                      >
                        <span className="dropdown_rname">
                          <img
                            className="dp_img_roption"
                            src={maps.room_dp.img}
                            alt="a"
                          />
                          <p> {maps.name}</p>
                        </span>
                        <span>
                          <p>NPR {maps.price}</p>
                          <p
                            style={{
                              fontWeight: 400,
                              fontSize: "12px",
                              color: "rgb(169,169,169)",
                              marginTop: "-2px",
                            }}
                          >
                            Per room per night
                          </p>
                        </span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchHotelCard;
