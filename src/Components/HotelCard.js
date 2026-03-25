import React from "react";
import "./CSS/Hotelcard.css";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import { Authaxios } from "./Axios";
import { useGlobalContext } from "./Context";
import Rating from "@mui/material/Rating";
import {
  Fab,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
// icons
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const HotelCard = ({ propertydata = [] }) => {
  const mob = useMediaQuery("(max-width:900px)");
  const {
    setlogin,
    setlimg,
    guestcount,
    checkin_date,
    checkout_date,
    roomcount,
  } = useGlobalContext();

  const history = useHistory();

  function SampleNextArrows(props) {
    const { onClick, currentSlide } = props;
    return (
      <div className="arrownext" onClick={onClick}>
        <div className="fab_arrow">
          <Fab aria-label="next" size="small" style={{ background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
            <ArrowForwardIosIcon style={{ fontSize: "16px", color: "#1a1714" }} />
          </Fab>
        </div>
        {currentSlide > (propertydata?.length || 0) - 3 ? "" : (
          <div className="mob_arrow">
            <ArrowForwardIosIcon />
          </div>
        )}
      </div>
    );
  }

  function SamplePrevArrows(props) {
    const { onClick, currentSlide } = props;
    return (
      <div className="arrowprev" onClick={onClick}>
        {currentSlide > 0 ? (
          <div className="fab_arrow">
            <Fab aria-label="prev" size="small" style={{ background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
              <ArrowBackIosIcon style={{ fontSize: "16px", marginLeft: "5px", color: "#1a1714" }} />
            </Fab>
          </div>
        ) : ""}
        {currentSlide > (propertydata?.length || 0) - 3 ? (
          <div className="mob_arrow">
            <ArrowBackIosIcon />
          </div>
        ) : ""}
      </div>
    );
  }

  const settings = {
    dots: false,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrows />,
    prevArrow: <SamplePrevArrows />,
    responsive: [
      { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 2, initialSlide: 1 } },
      { breakpoint: 500, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 1 } },
      { breakpoint: 300, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 } },
    ],
  };

  const Single = (id, Name, did, img) => {
    let links = `/single/${id}/${Name}/checkin=${checkin_date}/checkout=${checkout_date}/guests=${guestcount}/room=${roomcount}/selected_room=${did}/meals=/bookingmodal=`;
    if (!mob) {
      window.open(links, "_blank");
    } else {
      history.push(links);
    }
    let b = Object.assign([], [img]);
    setlimg(b);
  };

  const clickcheck = (e, id) => {
    let tok = localStorage.getItem("axynghkwngasd");
    if (!tok) {
      e.target.checked = false;
      setlogin(true);
    } else {
      Authaxios.post("/api/fav/", { id })
        .then(() => { e.target.checked = true; })
        .catch(() => {});
    }
  };

  return (
    <Slider {...settings}>
      {propertydata?.map((mapped) => {
        // Supports both API shape (room_option array) and dummy data (room object)
        const { id, Name, Address, liked, rating, avg_count } = mapped;
        const default_room = mapped.room_option
          ? mapped.room_option[0]
          : mapped.room;

        if (!default_room) return null;

        const roomImg = default_room?.room_dp?.img;
        const price = default_room?.price;
        const discounted = default_room?.discounted_price;

        return (
          <div className="hotel_card" key={id}>
            {/* Image container */}
            <div className="card_img_container">
              {/* Skeleton */}
              <div style={{ position: "absolute", inset: 0 }}>
                <div className="loadingcard sloading_slider card_img">
                  <ApartmentIcon className="lcard_img" />
                </div>
              </div>

              {/* Photo */}
              <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
                <img
                  loading="lazy"
                  onClick={() => Single(id, Name, default_room.id, roomImg)}
                  className="card_img"
                  src={roomImg}
                  alt={Name}
                />
              </div>

              {/* Favourite */}
              <FormControlLabel
                className="fav_icon"
                style={{ zIndex: 12, margin: 0 }}
                control={
                  <Checkbox
                    defaultChecked={liked ? true : false}
                    onClick={(e) => clickcheck(e, id)}
                    icon={<FavoriteBorder style={{ color: "white", fontSize: "20px" }} />}
                    checkedIcon={<Favorite style={{ color: "#ff4d6d", fontSize: "20px" }} />}
                  />
                }
              />

              {/* Price pill on image */}
              <div
                className="card_price_overlay"
                onClick={() => Single(id, Name, default_room.id, roomImg)}
              >
                {discounted ? (
                  <>
                    <span className="price_head" style={{ textDecoration: "line-through", opacity: 0.7, fontSize: "12px" }}>
                      NPR {price?.toLocaleString()}
                    </span>
                    <span className="price_head">
                      NPR {discounted?.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="price_head">NPR {price?.toLocaleString()}</span>
                )}
                <span className="price_bottom">/night</span>
              </div>
            </div>

            {/* Description */}
            <div
              className="card_desc_container"
              onClick={() => Single(id, Name, default_room.id, roomImg)}
            >
              <h1 className="hotel_name">{Name}</h1>

              <h4 className="hotel_address">
                <LocationOnIcon style={{ fontSize: "11px", marginRight: "2px", verticalAlign: "middle" }} />
                {Address}
              </h4>

              {rating > 0 && (
                <div className="rating">
                  <span className="star_rating">
                    <Rating value={rating} precision={0.5} readOnly size="small" />
                    <span style={{ color: "#8a8078", fontSize: "11px" }}>({avg_count})</span>
                  </span>
                  <span className="small_rating">
                    <StarIcon style={{ color: "#ff4d6d", fontSize: "14px" }} />
                    {rating}
                    <span style={{ color: "#8a8078", fontWeight: 400 }}>({avg_count})</span>
                  </span>
                </div>
              )}

              <span className="small_price_layout">
                <p className="price_head">NPR {price?.toLocaleString()}</p>
                <p className="price_bottom">per room per night</p>
                <p className="price_bottom_small">/night</p>
              </span>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default HotelCard;