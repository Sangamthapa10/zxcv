import React from "react";
import "./CSS/Menu.css";
import Slider from "react-slick";
import { useGlobalContext } from "./Context";
//icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const Menu = () => {
  const { singlepage, menumodal, setmenumodal } = useGlobalContext();
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrownexts" onClick={onClick}>
        <ArrowForwardIosIcon style={{ fontSize: "120px" }} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrowprevs" onClick={onClick}>
        <ArrowBackIosIcon style={{ fontSize: "120px" }} />
      </div>
    );
  }
  const settings = {
    speed: 700,

    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "60px",
    autoplay: false,
    infinite: false,
    dots: true,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <form
        action="https://uat.esewa.com.np/epay/main"
        method="POST"
        id="myform"
      >
        <input value="300" name="tAmt" type="text" />

        <input value="300" name="amt" type="text" />
        <input value="0" name="txAmt" type="text" />
        <input value="0" name="psc" type="text" />
        <input value="0" name="pdc" type="text" />
        <input value="epay_payment" name="scd" type="text" />
        <input value="2" name="pid" type="text" />
        <input
          value="http://127.0.0.1:8000/esewa-verify/"
          type="text"
          name="su"
        />
        <input value={window.location.href} type="text" name="fu" />
        <input value="Submit" type="submit" />
      </form>
      {singlepage.map((mapped) => {
        const { Hotel_menu, id } = mapped;
        return (
          <div key={id}>
            <div
              className={`${
                menumodal ? "room_img_modal_slider" : "display_none"
              }`}
            >
              <div className="three">
                <HighlightOffIcon
                  style={{
                    color: "white",
                    display: "block",
                    marginLeft: "90vw",
                    fontSize: "60px",
                    cursor: "pointer",
                  }}
                  onClick={() => setmenumodal(false)}
                />
                <Slider {...settings}>
                  {Hotel_menu.map((mapped) => {
                    return (
                      <div className="slides" key={mapped.id}>
                        <img
                          className="slide_img"
                          style={{ width: "90vw", height: "80vh" }}
                          src={mapped.img}
                          alt="a"
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
