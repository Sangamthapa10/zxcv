import React, { useState, useEffect } from "react";
import "./CSS/SinglepageScrollIndicator.css";
import { useGlobalContext } from "../Context";
import { useParams } from "react-router-dom";
import ShareOptions from "./ShareOptions";
import { Button, useMediaQuery } from "@mui/material";

function SinglepageScrollIndicator() {
  const {
    roomref,
    mealref,
    desc,
    amneties,
    weather,
    map,
    rating,
    sloading,
    mapbar,
    img_gallery,
    singlepage,
    m_detail,
  } = useGlobalContext();
  const [map_bar, setmap_bar] = useState(false);
  const [Desc, setDesc] = useState("");
  const matches = useMediaQuery("(max-width:800px)");
  let supportsPassive = false;

  try {
    const options = {
      get passive() {
        supportsPassive = true;
        return false;
      },
    };

    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch (err) {
    supportsPassive = false;
  }

  useEffect(() => {
    let handler = (event) => {
      var height = document.documentElement.scrollTop;

      if (img_gallery === false) {
        if (m_detail === false) {
          if (sloading === false) {
            if (
              height + desc.current.getBoundingClientRect().top >
              document.documentElement.scrollTop + mapbar.current.clientHeight
            ) {
              setmap_bar(false);
            }

            if (
              height + mapbar.current.clientHeight >
              height + desc.current.getBoundingClientRect().top
            ) {
              setmap_bar(true);
              setDesc("desc");
            }

            // Amneties
            if (
              height + mapbar.current.clientHeight >
              amneties.current.getBoundingClientRect().top + height
            ) {
              setDesc("amne");
            }

            // Room
            if (
              height + mapbar.current.clientHeight >
              roomref.current.getBoundingClientRect().top + height
            ) {
              setDesc("room");
            }

            // Meal
            if (singlepage[0].propertymeals.length > 0) {
              if (
                height + mapbar.current.clientHeight >
                mealref.current.getBoundingClientRect().top + height
              ) {
                setDesc("meal");
              }
            }
            // Map
            if (!matches) {
              if (
                height + mapbar.current.clientHeight >
                map.current.getBoundingClientRect().top + height
              ) {
                setDesc("map");
              }
            }
            // Weather
            if (
              height + mapbar.current.clientHeight >
              weather.current.getBoundingClientRect().top + height
            ) {
              setDesc("weather");
            }

            // Rating
            if (
              height + mapbar.current.clientHeight >
              height + rating.current.getBoundingClientRect().top
            ) {
              setDesc("rating");
            }
          }
        }
      }
    };
    document.addEventListener(
      "scroll",
      handler,
      supportsPassive ? { passive: true } : false
    );
    return () => {
      document.removeEventListener("scroll", handler);
    };
  });
  const ondesc = () => {
    window.scrollTo({
      top: desc.current.offsetTop - mapbar.current.clientHeight + 2,
      behavior: "smooth",
    });
  };
  const onamne = () => {
    window.scrollTo({
      top: amneties.current.offsetTop - mapbar.current.clientHeight + 2,
      behavior: "smooth",
    });
  };
  const onroom = () => {
    window.scrollTo({
      top: roomref.current.offsetTop - mapbar.current.clientHeight + 2,
      behavior: "smooth",
    });
  };
  const onweath = () => {
    window.scrollTo({
      top: weather.current.offsetTop - mapbar.current.clientHeight + 2,
      behavior: "smooth",
    });
  };
  const onmap = () => {
    window.scrollTo({
      top: map.current.offsetTop - mapbar.current.clientHeight + 2,
      behavior: "smooth",
    });
  };
  const onrat = () => {
    window.scrollTo({
      top: rating.current.offsetTop - mapbar.current.clientHeight + 2,
      behavior: "smooth",
    });
  };

  const onmeal = () => {
    window.scrollTo({
      top: mealref.current.offsetTop - mapbar.current.clientHeight + 2,
      behavior: "smooth",
    });
  };

  const { selectedroom } = useParams();

  let img = singlepage[0].room_option.filter(
    (swine) => swine.id === parseFloat(selectedroom)
  );
  return (
    <>
      <div
        ref={mapbar}
        className={`${map_bar ? "scroll_map_bar" : "display_none"}`}
      >
        <div className="map_bar_scroll">
          <div className="map_bar_scroll_left">
            <span
              onClick={ondesc}
              className={`${Desc === "desc" ? "one" : "a"}`}
            >
              Description
            </span>
            <span
              onClick={onamne}
              className={`${Desc === "amne" ? "one" : "a"}`}
            >
              Amneties
            </span>
            <span
              onClick={onroom}
              className={`${Desc === "room" ? "one" : "a"}`}
            >
              Room
            </span>
            {sloading === false && singlepage[0].propertymeals.length > 0 && (
              <span
                onClick={onmeal}
                className={`${Desc === "meal" ? "one" : "a"}`}
              >
                Meal
              </span>
            )}
            <span
              onClick={onweath}
              className={`${Desc === "weather" ? "one" : "a"}`}
            >
              Weather
            </span>
            <span onClick={onmap} className={`${Desc === "map" ? "one" : "a"}`}>
              Map
            </span>
            <span
              onClick={onrat}
              className={`${Desc === "rating" ? "one" : "a"}`}
            >
              Rating
            </span>
          </div>
          <div className="map_bar_scroll_right">
            <span>
              {desc === "rating" ? (
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    backgroundColor: "#1ab64f",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Continue To Book
                </Button>
              ) : (
                <ShareOptions
                  img={img[0] && img[0].room_dp && img[0].room_dp.img}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglepageScrollIndicator;
