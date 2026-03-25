import React, { useState, useEffect } from "react";
import "./CSS/Slider.css";
import Axios from "axios";
import Slider from "react-slick";
import { useGlobalContext } from "../Context";
import { useParams } from "react-router-dom";

//icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Weather = () => {
  const { singlepage } = useGlobalContext();
  const { check_in, check_out } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // weather icon mapping
  const getWeatherIcon = (code) => {
    if (code === 0) return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // clear
    if ([1,2].includes(code)) return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // partly cloudy
    if (code === 3) return "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // cloudy
    if ([45,48].includes(code)) return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // fog
    if ([51,53,55,61,63,65].includes(code)) return "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"; // rain
    if ([71,73,75].includes(code)) return "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // snow
    if ([95,96,99].includes(code)) return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"; // thunder
    return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
  };

  useEffect(() => {
    if (!singlepage || !singlepage[0]) return;

    const fetchWeather = async () => {
      try {
        const res = await Axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${singlepage[0].latitude}&longitude=${singlepage[0].longitude}&daily=weathercode,temperature_2m_max&timezone=auto`
        );

        const daily = res.data.daily;

        const formatted = daily.time.map((date, i) => ({
          date,
          temp: daily.temperature_2m_max[i],
          weathercode: daily.weathercode[i]
        }));

        setData(formatted);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();
  }, [singlepage]);

  function SampleNextArrow({ onClick }) {
    return (
      <div className="arrownext" onClick={onClick}>
        <ArrowForwardIosIcon />
      </div>
    );
  }

  function SamplePrevArrow({ onClick }) {
    return (
      <div className="arrowprev" onClick={onClick}>
        <ArrowBackIosIcon />
      </div>
    );
  }

  const settings = {
    dots: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 2,
    infinite: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (!loading) return <h1>Loading...</h1>;

  return (
    <div className="weather_container">
      <Slider {...settings}>
        {data.map((item, i) => {
          const date = new Date(item.date).toUTCString().slice(0, 11);
          const checkin = new Date(check_in).toUTCString().slice(0, 11);
          const checkout = new Date(check_out).toUTCString().slice(0, 11);

          return (
            <div className="weather__" key={i}>
              <p
                style={{
                  fontWeight: "bold",
                  visibility:
                    date !== checkin && date !== checkout ? "hidden" : "visible"
                }}
              >
                {date === checkin
                  ? "Checkin"
                  : date === checkout
                  ? "Checkout"
                  : ""}
              </p>

              <div className="weather__detail">
                <p className="vdate">{date}</p>

                <img
                  src={getWeatherIcon(item.weathercode)}
                  alt="weather"
                  style={{ width: "40px" }}
                />

                <p className="temp">{item.temp}°C</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Weather;