import React, { useState } from "react";
import "./CSS/Slider.css";
import { useGlobalContext } from "../Context";
import Customaxios from "../Axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Imggallery from "./Imggallery";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//mui
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, Fab, useMediaQuery } from "@material-ui/core";
//icons
import CollectionsIcon from "@material-ui/icons/Collections";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ApartmentIcon from "@material-ui/icons/Apartment";
const Sliders = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const tab_screen = useMediaQuery("(max-width:900px)");

  const { id } = useParams();

  const {
    img_gallerydata,
    setimg_gallerydata,
    singlepage,
    img_gallery,
    setimg_gallery,
    setimgid,
    sloading,
  } = useGlobalContext();

  function SampleNextArrow(props) {
    const { onClick, currentSlide } = props;
    // let default_room = singlepage[0].room_option.filter(
    //   (swine) => swine.default_room === "d"
    // );
    // let roomselect = selectedroom ? parseInt(selectedroom) : default_room[0].id;
    // let o = singlepage[0].room_option.filter(
    //   (swine) => swine.id === parseInt(roomselect)
    // );
    // let on = o[0].room_img;
    // let first = on.filter((swine) => swine.category === "room");
    // let second = on.filter((Swine) => Swine.category !== "room");
    let max_slide = 3;

    return (
      <div className="arrownexts" onClick={onClick}>
        {currentSlide > max_slide ? (
          ""
        ) : (
          <Fab style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
            <ArrowForwardIosIcon style={{ fontSize: "30px", color: "white" }} />
          </Fab>
        )}
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props;

    return (
      <div className="arrowprevs" onClick={onClick}>
        {currentSlide > 0 ? (
          <Fab style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
            <ArrowBackIosIcon
              style={{ fontSize: "30px", color: "white", marginLeft: "10px" }}
            />
          </Fab>
        ) : (
          ""
        )}
      </div>
    );
  }

  const settings = {
    dots: false,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerPadding: "200px",
    autoplay: false,
    infinite: false,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    nextArrow: matches ? false : <SampleNextArrow />,
    swipeToSlide: true,
    prevArrow: matches ? false : <SamplePrevArrow />,
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
  };
  const [bloading, setbloading] = useState(false);
  const openmodal = () => {
    if (!sloading) {
      let data = {
        Hotel_images: [
          {
            name: "lobby",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "lobby",
            id: 30,
          },
          {
            name: "Bathroom",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "washroom",
            id: 22,
          },
          {
            name: "Facade",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "facade",
            id: 24,
          },
          {
            name: "Nearby",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "nearby",
            id: 26,
          },
          {
            name: "Facade View",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "facade",
            id: 28,
          },
          {
            name: "Reception",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "reception",
            id: 29,
          },
          {
            name: "Reception",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "restaurant",
            id: 29,
          },
          {
            name: "Reception",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "restaurant",
            id: 29,
          },
        ],
        room_option: [
          {
            id: 6,
            name: "King Room",
            room_dp: {
              name: "Room",
              img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              category: "room",
              id: 25,
            },
            room_img: [
              {
                name: "room",
                img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room_dp",
                id: 9,
              },
              {
                name: "room",
                img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room_dp",
                id: 23,
              },
              {
                name: "Room",
                img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room",
                id: 25,
              },
            ],
          },
        ],
      };
      setbloading(true);
      if (
        img_gallerydata.length === 0 ||
        img_gallerydata.length === null ||
        img_gallerydata.length === undefined
      ) {
        Customaxios.get(`/api/pimages/${parseInt(id)}`)
          .then((res) => {
            let b = Object.assign([], [res.data]);
            localStorage.setItem("recency", id);
            setimg_gallerydata(b);
            setimgid("");
            setbloading(false);
            setimg_gallery(true);
          })
          .catch((error) => {
            let b = Object.assign([], [data]);
            localStorage.setItem("recency", id);
            setimg_gallerydata(b);
            setimgid("");
            setbloading(false);
            setimg_gallery(true);
          });
      } else {
        setimgid("");
        setbloading(false);
        setimg_gallery(true);
      }
    }
  };
  let dat = tab_screen ? [1, 2, 3] : [1, 2, 3, 4, 5];

  /*Slide*/
  const [active, setactive] = useState(1);

  function afterChangeEvent(currentSlide) {
    setactive(currentSlide + 1);
  }
  return (
    <>
      {img_gallery && <Imggallery />}
      {matches ||
        (sloading && (
          <div style={{ paddingTop: "40px", paddingBottom: "20px" }}>
            <Skeleton width="45vw" animation="wave" height="29px" />
            <span
              style={{
                paddingTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="single_page_headers">
                <Skeleton width="10vw" animation="wave" />
                <Skeleton width="10vw" animation="wave" />
                <Skeleton width="10vw" animation="wave" />
              </div>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Skeleton width="3vw" animation="wave" />
                <Skeleton
                  width="3vw"
                  animation="wave"
                  style={{ marginLeft: "9px" }}
                />
              </span>
            </span>
          </div>
        ))}
      <div className="singlepage_image_sgroup">
        {matches || sloading || (
          <Button
            size="small"
            onClick={openmodal}
            endIcon={<CollectionsIcon />}
            variant="contained"
            style={{
              borderRadius: "6px",
              position: "absolute",
              bottom: "2%",
              right: "1%",
              zIndex: 12,
              borderColor: "rgb(34, 34, 34) !important",
              background: "rgb(255, 255, 255) !important",
              color: "rgb(34, 34, 34) !important",
              textTransform: "none",
            }}
          >
            {bloading ? (
              <div className="loading_btn">
                <div className="dot1"> </div>
                <div className="dot2"></div>
                <div className="dot3"></div>
              </div>
            ) : (
              "Show All Photos"
            )}
          </Button>
        )}
        {matches ? (
          <div className="sloading_slider singlepage_slider_img__">
            <ApartmentIcon
              style={{ height: "50%", width: "50%", color: "gray" }}
            />
          </div>
        ) : (
          <div className="image_group_property">
            {dat.map((mapped, i) => {
              return (
                <div
                  key={i + 1}
                  className={`${
                    i + 1 === 1
                      ? "lt1"
                      : i + 1 === 3
                      ? "lt3"
                      : i + 1 === 5
                      ? "lt5"
                      : ""
                  } image_gri sloading_slider`}
                >
                  <ApartmentIcon
                    style={{ height: "50%", width: "50%", color: "gray" }}
                  />
                </div>
              );
            })}
          </div>
        )}
        {singlepage.map((mapped, i) => {
          let a = mapped.dp_img;
          let b = tab_screen ? a.slice(0, 3) : a.slice(0, 5);
          return (
            <div key={i + 1}>
              {matches && (
                <h3 className="slide_count_indicator">
                  {active}/{a.length}
                </h3>
              )}
              {matches ? (
                <div style={{ position: "absolute", inset: 0 }}>
                  <Slider {...settings} afterChange={afterChangeEvent}>
                    {a.map((mapped, i) => {
                      return (
                        <img
                          key={i + 1}
                          className="singlepage_slider_img__"
                          src={mapped.img}
                          alt="a"
                        />
                      );
                    })}
                  </Slider>
                </div>
              ) : (
                <div style={{ zIndex: 10 }} className="image_group_property">
                  {b.map((mapped, i) => {
                    return (
                      <div
                        onClick={openmodal}
                        key={i + 1}
                        className={`${
                          i + 1 === 3 ? "t3" : i + 1 === 5 ? "t5" : ""
                        } image_gri avde`}
                      >
                        <LazyLoadImage
                          height={"100%"}
                          width={"100%"}
                          delayTime={300}
                          alt={"asd"}
                          effect="blur"
                          src={mapped.img}
                        />
                        <div className="middle"></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {sloading && (
        <div style={{ paddingTop: "15px" }} className="loading_btn">
          <div style={{ backgroundColor: "lightgray" }} className="dot1">
            {" "}
          </div>
          <div style={{ backgroundColor: "lightgray" }} className="dot2"></div>
          <div style={{ backgroundColor: "lightgray" }} className="dot3"></div>
        </div>
      )}
    </>
  );
};

export default Sliders;
