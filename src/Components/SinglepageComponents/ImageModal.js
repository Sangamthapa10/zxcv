import React, { useState } from "react";
import Slider from "react-slick";
import { useGlobalContext } from "../Context";
//icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const ImageModal = ({ data }) => {
  const { setimgmodal } = useGlobalContext();
  const [active, setactive] = useState(1);

  function afterChangeEvent(currentSlide) {
    setactive(currentSlide + 1);
  }

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrownextas" onClick={onClick}>
        {active === data.img_collection.length || (
          <ArrowForwardIosIcon style={{ fontSize: "6vw" }} />
        )}
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrowprevas" onClick={onClick}>
        {active === 1 || <ArrowBackIosIcon style={{ fontSize: "6vw" }} />}
      </div>
    );
  }
  const settings = {
    dots: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    fade: true,
  };

  return (
    <div style={{ position: "relative" }}>
      <h3 className="slider_indicator">
        {active}/{data.img_collection.length}{" "}
      </h3>
      <HighlightOffIcon
        onClick={() => setimgmodal(false)}
        className="close_micon"
      />
      <div className="slides_im">
        <Slider {...settings} afterChange={afterChangeEvent}>
          {data.img_collection
            .filter((swine) => swine.img.toString() === data.img.toString())
            .map((mapped, i) => {
              return (
                <div key={mapped.id} className="slider_container__">
                  <img className="slider_img__" src={mapped.img} alt="one" />
                  <h3 style={{ color: "#fff", textAlign: "center" }}>
                    {mapped.name}
                  </h3>
                </div>
              );
            })}
          {data.img_collection
            .filter((swine) => swine.img.toString() !== data.img.toString())
            .map((mapped, i) => {
              return (
                <div key={mapped.id} className="slider_container__">
                  <img className="slider_img__" src={mapped.img} alt="one" />
                  <h3 style={{ color: "#fff", textAlign: "center" }}>
                    {mapped.name}
                  </h3>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default ImageModal;
