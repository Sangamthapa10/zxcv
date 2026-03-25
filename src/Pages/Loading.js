import React from "react";
import "./CSS/Loading.css";
import Skeleton from "@mui/material/Skeleton";
import { useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import ApartmentIcon from "@mui/icons-material/Apartment";

function Loading({ type, loadingoff }) {
  const matches = useMediaQuery("(max-width:600px)");

  function SampleNextArrows(props) {
    return false;
  }
  function SamplePrevArrows(props) {
    return false;
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
  let a = [1, 2, 3, 4];
  let search = [1, 2];
  let pcity = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {type === "home" ? (
        <>
          {matches ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {pcity.map((mapped, i) => {
                return (
                  <Skeleton
                    key={i + 1}
                    variant="circle"
                    width={40}
                    height={40}
                  />
                );
              })}
            </div>
          ) : (
            <div className="popular_city_body">
              {pcity.slice(0, 5).map((mapped, i) => {
                return (
                  <Skeleton
                    className={`pop_btns`}
                    key={i + 1}
                    animation="wave"
                  />
                );
              })}
            </div>
          )}
          <Slider {...settings}>
            {a.map((mapped, i) => {
              return (
                <div className="hotel_card l_card" key={i + 1}>
                  <div className="loadingcard  sloading_slider">
                    <ApartmentIcon className="lcard_img" />{" "}
                  </div>
                  {loadingoff === "true" || (
                    <div style={{ paddingLeft: "5px" }}>
                      <Skeleton width="60%" animation="wave" />
                      <Skeleton width="20%" animation="wave" />
                      <Skeleton width="21%" animation="wave" />
                      <Skeleton width="40%" animation="wave" />
                      <Skeleton width="65%" animation="wave" />
                    </div>
                  )}
                </div>
              );
            })}
          </Slider>
          <Slider {...settings}>
            {a.map((mapped, i) => {
              return (
                <div className="hotel_card l_card" key={i + 1}>
                  <div className="loadingcard  sloading_slider">
                    <ApartmentIcon className="lcard_img" />{" "}
                  </div>
                  {loadingoff === "true" || (
                    <div style={{ paddingLeft: "5px" }}>
                      <Skeleton width="60%" animation="wave" />
                      <Skeleton width="20%" animation="wave" />
                      <Skeleton width="21%" animation="wave" />
                      <Skeleton width="40%" animation="wave" />
                      <Skeleton width="65%" animation="wave" />
                    </div>
                  )}
                </div>
              );
            })}
          </Slider>
        </>
      ) : (
        search.map((mapped, i) => {
          return (
            <div
              key={i + 1}
              style={{ paddingTop: "15px" }}
              className="card_loading_search"
            >
              <div className="card_search sloading_slider">
                <ApartmentIcon
                  style={{ height: "100px", width: "100px", color: "gray" }}
                />
              </div>
              <div className="card_right_search">
                <div className="sloading_title">
                  <Skeleton variant="rect" style={{ width: "50%" }} />
                  <Skeleton variant="rect" />
                  <div className="card_right_search_facility">
                    <Skeleton variant="rect" />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Skeleton
                    variant="rect"
                    style={{ width: "14vw", padding: "6px 4px" }}
                  />
                  <Skeleton
                    variant="rect"
                    style={{ width: "14vw", padding: "6px 4px" }}
                  />
                  <Skeleton
                    variant="rect"
                    style={{ width: "14vw", padding: "6px 4px" }}
                  />
                </div>
                <div className="card_right_down">
                  <span>
                    <Skeleton
                      variant="rect"
                      style={{ width: "14vw", padding: "14px 12px" }}
                    />
                  </span>
                  <span className="card_right_down">
                    <Skeleton
                      variant="rect"
                      style={{ width: "10vw", padding: "14px 12px" }}
                    />
                    <Skeleton
                      variant="rect"
                      style={{
                        width: "10vw",
                        marginLeft: "1vw",
                        padding: "14px 12px",
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default Loading;
