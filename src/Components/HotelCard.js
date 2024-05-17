import React from "react";
import "./CSS/Hotelcard.css";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import { Authaxios } from "./Axios";
import { useGlobalContext } from "./Context";
import Rating from "@material-ui/lab/Rating";
import {
  Fab,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@material-ui/core";
//icons
import ApartmentIcon from "@material-ui/icons/Apartment";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import StarIcon from "@material-ui/icons/Star";

const HotelCard = ({ propertydata }) => {
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
          <Fab aria-label="Center Align" size="small" style={{ color: "red" }}>
            <ArrowForwardIosIcon style={{ fontSize: "20px", color: "red" }} />
          </Fab>
        </div>
        {currentSlide > propertydata.length - 3 ? (
          ""
        ) : (
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
            <Fab
              aria-label="Center Align"
              size="small"
              style={{ color: "red" }}
            >
              <ArrowBackIosIcon
                style={{ fontSize: "20px", marginLeft: "9px", color: "red" }}
              />
            </Fab>
          </div>
        ) : (
          ""
        )}
        {currentSlide > propertydata.length - 3 ? (
          <div className="mob_arrow">
            <ArrowBackIosIcon />
          </div>
        ) : (
          ""
        )}
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
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
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
    <Slider {...settings}>
      {propertydata.map((mapped) => {
        const { room, id, Name, Address, liked, rating, avg_count } = mapped;
        let default_room = room;

        return (
          <div className="hotel_card" key={id}>
            <div
              className="card_img_container"
              style={{ position: "relative" }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <div className="loadingcard  sloading_slider card_img">
                  <ApartmentIcon className="lcard_img" />{" "}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 10,
                }}
              >
                <img
                  loading="lazy"
                  onClick={() =>
                    Single(id, Name, default_room.id, default_room.room_dp.img)
                  }
                  className="card_img"
                  src={default_room.room_dp.img}
                  alt={Name}
                  style={{ width: "640", height: "360" }}
                />
              </div>
              <FormControlLabel
                style={{ zIndex: 10 }}
                className="fav_icon"
                control={
                  <Checkbox
                    defaultChecked={liked ? true : false}
                    onClick={(e) => clickcheck(e, id)}
                    icon={<FavoriteBorder style={{ color: "white" }} />}
                    checkedIcon={
                      <Favorite style={{ color: "rgb(237, 73, 86)" }} />
                    }
                  />
                }
              />
            </div>

            <div className="card_desc_container">
              <h1 className="hotel_name dot_text">{Name}</h1>
              <h4 className="hotel_address">{Address}</h4>

              {rating > 0 && (
                <div className="rating">
                  <span className="star_rating">
                    <Rating
                      name="hover-feedback"
                      value={rating}
                      precision={0.5}
                      readOnly
                    />
                    ({avg_count} reviews)
                  </span>
                  <span className="small_rating">
                    <StarIcon style={{ color: "rgb(255,69,69)" }} />
                    {rating}({avg_count})
                  </span>
                </div>
              )}
              <span className="small_price_layout">
                <p className="price_head">NPR {default_room.price}</p>
                <p className="price_bottom"> per room per night</p>
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
