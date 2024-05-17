import React, { useEffect, useState } from "react";
import "./CSS/Favourite.css";
import { Authaxios } from "../Components/Axios";
import { useGlobalContext } from "../Components/Context";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import Icons from "../Components/Icons";
// svg
import LikePropertysvg from "../Components/SvgComponents/Likeproperty";
import Unathorizedsvg from "../Components/SvgComponents/Unathorizedsvg";
// import Favposter from "../Components/SvgComponents/Favposters";
import Favposter from "../Components/SvgComponents/FavPosters";
// material ui
import {
  useMediaQuery,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
// Icons
import StarIcon from "@material-ui/icons/Star";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
const Favourite = () => {
  const { guestcount, roomcount, setlogin } = useGlobalContext();
  const [bloading, setbloading] = useState(true);

  const [favdata, setfavdata] = useState([]);
  const [authorized, setunathorized] = useState(false);
  const tok = localStorage.getItem("axynghkwngasd");

  useEffect(() => {
    if (tok) {
      setbloading(true);
      Authaxios.get("api/fav")
        .then((res) => {
          let a = res.data;
          let b = a.hotel;
          setfavdata(b);
          setbloading(false);
          console.log(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setunathorized(true);
            setbloading(false);
            alert(error.response.status);
          }
        });
    } else {
      setbloading(false);
    }
  }, [tok]);

  const history = useHistory();
  const mobs = useMediaQuery("(max-width:900px)");

  const login = () => {
    if (tok) {
      history.push("/");
    } else {
      setlogin(true);
    }
  };
  const Single = (e, id, Name, did) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let links = `/single/${id}/${Name}/checkin=${covertdateiso(
      today
    )}/checkout=${covertdateiso(
      tomorrow
    )}/guests=${guestcount}/room=${roomcount}/selected_room=${did}/meals=/bookingmodal=`;
    if (!mobs) {
      window.open(links, "_blank");
    } else {
      history.push(links);
    }
  };
  function covertdateiso(date) {
    let toda = new Date(date);
    const offset = toda.getTimezoneOffset();
    let one = new Date(toda.getTime() - offset * 60 * 1000);
    let formatted_checkin = one.toISOString().slice(0, 10);
    return formatted_checkin;
  }
  const addtofav = (e, id) => {
    if (e.stopPropagation) e.stopPropagation();

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
  return (
    <div>
      {bloading || favdata.length > 0 ? (
        <div className="favourite_body">
          <div>
            {bloading ? (
              <div>
                <Loading type={"bloading"} />
              </div>
            ) : (
              favdata.map((mapped) => {
                const {
                  id,
                  Name,
                  Address,
                  facility,
                  room_option,
                  hotel_dp,
                  liked,
                  room,
                  rating,
                  amneties,
                } = mapped;
                let default_room = room.room;
                return (
                  <div
                    onClick={(e) => Single(e, id, Name, default_room.id)}
                    key={id}
                    className="fav_card"
                  >
                    <img src={default_room.room_dp.img} alt="" />
                    <FormControlLabel
                      className="fav_card__heart"
                      control={
                        <Checkbox
                          defaultChecked={liked ? true : false}
                          onClick={(e) => addtofav(e, id)}
                          icon={
                            <FavoriteBorder
                              style={{ fontSize: "30px" }}
                              className="fav_icon"
                            />
                          }
                          checkedIcon={
                            <Favorite style={{ fontSize: "30px" }} />
                          }
                        />
                      }
                    />
                    <div className="fav_card__info">
                      <div className="fav_card__infoTop">
                        <p>{Address}</p>
                        <h3>{Name}</h3>
                        <div
                          style={{
                            width: "100%",
                            gridGap: "14px",
                            paddingTop: "8px",
                          }}
                          className="hotel_amneties"
                        >
                          {amneties.data.map((mapped) => {
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
                                <p>{mapped.name}</p>
                              </div>
                            );
                          })}
                          {amneties.total > 3 && (
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              + {amneties.total - 3} more{" "}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="fav_card__infoBottom">
                        <div className="fav_card__stars">
                          <StarIcon className="fav_card__star" />
                          <p>
                            <strong>{rating}</strong>
                          </p>
                        </div>
                        <div className="fav_cards__price">
                          {room.total > 1 && (
                            <span>
                              <p>
                                {room.total - 1} more room{" "}
                                {room.total > 2 ? "options" : "option"}
                              </p>
                              <p>Showing price for {default_room.name}</p>
                            </span>
                          )}
                          <div className="price_fav">
                            <h2>{default_room.price}</h2>
                            <h2>/</h2>
                            <h2>Night</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="aside_poster">
            <div className="main_poster">
              <div className="favourite_body_rposter">
                <Favposter />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="unathorized_page">
          <span className="unathorized_art">
            {!tok || authorized ? <Unathorizedsvg /> : <LikePropertysvg />}

            <h5 style={{ textAlign: "center" }}>
              {!tok
                ? "Log in to view your shortlisted Properties"
                : "Add Property to your favourite to view here"}
            </h5>
            <Button
              onClick={login}
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
            >
              {!tok ? "Login" : "Explore"}
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};

export default Favourite;
