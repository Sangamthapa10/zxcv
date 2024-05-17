import React from "react";
import "./CSS/Hoteldpslider.css";
import Slider from "react-slick";
import { Fab } from "@material-ui/core";
//icons
import ApartmentIcon from "@material-ui/icons/Apartment";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
function HotelDpSlider(img) {
  let slide_img = img.img;

  function SampleNextArrow(props) {
    const { onClick } = props;
    const prev = (e) => {
      if (e.stopPropagation) e.stopPropagation();
      if (typeof onClick === "function") {
        onClick();
      }
    };
    return (
      <div className="arrownext_dpslider" onClick={(e) => prev(e)}>
        <div className="fab">
          <Fab style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
            <ArrowForwardIosIcon style={{ fontSize: "30px", color: "white" }} />
          </Fab>
        </div>
        <div className="small_arrow" onClick={(e) => prev(e)}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    const prev = (e) => {
      if (e.stopPropagation) e.stopPropagation();
      if (typeof onClick === "function") {
        onClick();
      }
    };
    return (
      <div className="arrowprev_dpslider" onClick={(e) => prev(e)}>
        <div className="fab">
          <Fab style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
            <ArrowBackIosIcon
              style={{ fontSize: "30px", color: "white", marginLeft: "10px" }}
            />
          </Fab>
        </div>
        <div className="small_arrow" onClick={(e) => prev(e)}>
          <ArrowBackIosIcon />
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div style={{}}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "auto",
          height: "10px",
          borderRadius: "20px",
          background: "rgba(255,255,255,.5)",
          cursor: "pointer",
        }}
      ></div>
    ),
  };
  return (
    <Slider {...settings}>
      {slide_img.map((mapped) => {
        return (
          <div key={mapped.id} className="hotel_dp_container">
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
                className="hotel_dp"
                src={mapped.img}
                alt="one"
              />
            </div>
          </div>
        );
      })}
    </Slider>
  );
}

export default HotelDpSlider;
