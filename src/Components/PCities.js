import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "./Context";
import Slider from "react-slick";
//mui
import { useMediaQuery } from "@material-ui/core";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";

const PCities = ({ cities }) => {
  const { checkin_date, setlat, setlon, checkout_date, roomcount, guestcount } =
    useGlobalContext();
  const history = useHistory();

  function getLocations(a) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          history.push(
            `/search/${a}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${latitude}/longitude=${longitude}/filter=/type=/guest_rating=/order=`
          );
        }
      );
    }
  }

  function showPosition(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    history.push(
      `/search/${"nearby"}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${
        position.coords.latitude
      }/longitude=${
        position.coords.longitude
      }/filter=/type=/guest_rating=/order=`
    );
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        console.log("");
    }
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setlat("");
      setlon("");
    }
  }
  function SampleNextArrows(props) {
    const { onClick, currentSlide } = props;
    return (
      <div className="arrownext" onClick={onClick}>
        <div className="fab_arrow">
          <ArrowForwardIosIcon style={{ fontSize: "20px", color: "red" }} />
        </div>
        {currentSlide > cities.length - 3 ? (
          ""
        ) : (
          <div style={{ top: " -47%" }} className="mob_arrow">
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
            <ArrowBackIosIcon
              style={{ fontSize: "20px", marginLeft: "9px", color: "red" }}
            />
          </div>
        ) : (
          ""
        )}
        {currentSlide > cities.length - 3 ? (
          <div style={{ top: "-47%" }} className="mob_arrow">
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
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrows />,
    prevArrow: <SamplePrevArrows />,
  };
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <div className="popular_city_container">
      <div>
        <h3 className="p">Popular Cities</h3>
        <p style={{ paddingTop: "9px" }}>We found this places for you</p>
      </div>
      {matches || (
        <div className="popular_city_body">
          {cities.slice(0, 5).map((mapped, i) => {
            return (
              <div
                onClick={() => getLocations(mapped.city)}
                style={{ background: `url(${mapped.img.img})` }}
                className={`pop_btns`}
                key={mapped.id}
              >
                <div
                  style={{ position: "absolute", bottom: "20px", left: "20px" }}
                >
                  <h4>{mapped.city}</h4>
                  <p>{mapped.details}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {matches && (
        <Slider {...settings}>
          <div className="story_place ">
            <div className="near_circle">
              <LocationSearchingIcon onClick={getLocation} />
            </div>
            <h4>Nearby</h4>
          </div>
          {cities.map((mapped, i) => {
            return (
              <div
                onClick={() => getLocation(mapped.city)}
                className="story_place"
                key={mapped.id}
              >
                <img src={mapped.img.img} alt="destination_image" />
                <h4>{mapped.city}</h4>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default PCities;
