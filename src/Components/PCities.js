import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "./Context";
import Slider from "react-slick";
import { useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

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
      `/search/${"nearby"}/checkin=${checkin_date}/checkout=${checkout_date}/guest=${guestcount}/room=${roomcount}/latitude=${position.coords.latitude}/longitude=${position.coords.longitude}/filter=/type=/guest_rating=/order=`
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
        {currentSlide > cities.length - 3 ? "" : (
          <div style={{ top: "-47%" }} className="mob_arrow">
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
            <ArrowBackIosIcon style={{ fontSize: "20px", marginLeft: "9px", color: "red" }} />
          </div>
        ) : ""}
        {currentSlide > cities.length - 3 ? (
          <div style={{ top: "-47%" }} className="mob_arrow">
            <ArrowBackIosIcon />
          </div>
        ) : ""}
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
      <div className="pcities_header">
        <h3 className="pcities_title">Popular Cities</h3>
        <p className="pcities_subtitle">Handpicked destinations for you</p>
      </div>

      {/* Desktop grid */}
      {matches || (
        <div className="popular_city_body">
          {cities.slice(0, 5).map((mapped, i) => (
            <div
              key={mapped.id}
              onClick={() => getLocations(mapped.city)}
              style={{ backgroundImage: `url(${mapped.img.img})` }}
              className="pop_btns"
            >
              <div className="pop_btns_overlay" />
              <div className="pop_btns_content">
                <h4 className="pop_btns_city">{mapped.city}</h4>
                <p className="pop_btns_detail">{mapped.details}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile slider */}
      {matches && (
        <Slider {...settings}>
          <div className="story_place">
            <div className="near_circle" onClick={getLocation}>
              <LocationSearchingIcon style={{ fontSize: "22px", color: "#ee2e24" }} />
            </div>
            <h4 className="story_label">Nearby</h4>
          </div>
          {cities.map((mapped) => (
            <div
              key={mapped.id}
              onClick={() => getLocation(mapped.city)}
              className="story_place"
            >
              <img src={mapped.img.img} alt="destination_image" />
              <h4 className="story_label">{mapped.city}</h4>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PCities;