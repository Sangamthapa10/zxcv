import React, { useState, useEffect } from "react";
import "./CSS/Slider.css";
import Axios from "axios";
import Slider from "react-slick";
import { useGlobalContext } from "../Context";
import { useParams } from "react-router-dom";
//icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const Weather = () => {
  const { singlepage } = useGlobalContext();
  const [data, setdata] = useState([]);
  const { check_in } = useParams();
  const { check_out } = useParams();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${singlepage[0].latitude}&lon=${singlepage[0].longitude}&exclude=35&units=metric&appid=26d924dc06c5a1aad7c7ea8c0c7a65fc`
      )
        .then((res) => {
          const a = res.data;
          const b = a.daily;

          setdata(b);
          setloading(true);
        })
        .catch((error) => {
          if (Axios.isCancel(error)) {
            console.log("AxiosCancel: caught cancel");
          } else {
            throw error;
          }
        });
    };
    fetchdata();
    return () => {
      source.cancel();
    };
  }, [singlepage]);
  function SampleNextArrow(props) {
    const { onClick, currentSlide } = props;
    return (
      <div className="arrownext" onClick={onClick}>
        {currentSlide > 2 ? (
          ""
        ) : (
          <div className="fab_arrow">
            <ArrowForwardIosIcon
              style={{
                fontSize: "14px",
                color: "black",
                marginRight: "1vw",
                zIndex: 10,
              }}
            />
          </div>
        )}
        {currentSlide < 2 && (
          <div className="mob_arrow">
            <ArrowForwardIosIcon />
          </div>
        )}
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props;
    return (
      <div className="arrowprev" onClick={onClick}>
        {currentSlide > 1 ? (
          <div className="fab_arrow">
            <ArrowBackIosIcon
              style={{
                fontSize: "14px",
                color: "black",
                marginLeft: "10px",
                zIndex: 10,
              }}
            />
          </div>
        ) : (
          ""
        )}
        {currentSlide > 1 && (
          <div className="mob_arrow">
            <ArrowBackIosIcon />
          </div>
        )}
      </div>
    );
  }

  const settings = {
    dots: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 5,
        },
      },
      {
        breakpoint: 250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 5,
        },
      },
    ],
  };
  return (
    <>
      {loading ? (
        <div className="weather_container">
          <Slider {...settings}>
            {data.map((mappe) => {
              const milliseconds = mappe.dt * 1000;
              const data = new Date(milliseconds).toUTCString();
              const checkin = new Date(check_in).toUTCString();
              const checkout = new Date(check_out).toUTCString();
              const codate = checkout.slice(0, 11);
              const chdate = checkin.slice(0, 11);
              const vdate = data.slice(0, 11);
              return (
                <div className="weather__" key={mappe.dt}>
                  <p
                    style={{
                      fontWeight: "bolder",
                      visibility:
                        vdate !== chdate && codate !== vdate ? "hidden" : "",
                    }}
                  >
                    {vdate === chdate
                      ? "Checkin"
                      : codate === vdate
                      ? "Checkout"
                      : "asd"}
                  </p>

                  <div className="weather__detail">
                    <p className="vdate">{vdate}</p>
                    <h4 className="weather_main">{mappe.weather[0].main}</h4>
                    <img
                      src={`http://openweathermap.org/img/w/${mappe.weather[0].icon}.png`}
                      alt="one"
                    />

                    <p className="temp">{mappe.temp.day}&deg;C</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default Weather;
