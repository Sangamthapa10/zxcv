import React, { useRef } from "react";
import Slider from "react-slick";
const Category = () => {
  function SampleNextArrows(props) {
    return false;
  }

  function SamplePrevArrows(props) {
    return false;
  }
  const one = useRef();

  const settings = {
    adaptiveHeight: false,
    dots: false,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,

    infinite: true,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrows />,
    prevArrow: <SamplePrevArrows />,
    centerMode: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding:20
        },
      },
      {
        breakpoint: 250,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: false,
          centerPadding: 0,
        },
      },
    ],
  };
  return (
    <div className="cm_soon_body">
      <h1>Coming Soon...</h1>
      <div>
        <Slider {...settings}>
          <div ref={one} className="category_poster">
            <img
              className="cm_soonimg"
              alt={"asd"}
              src="https://i.pinimg.com/originals/81/80/5b/81805ba0f6394d431b0ecfafe23236d0.jpg"
            />
            <div>
              <h2 className="cm_soontitle">Unique Stays</h2>
              <h4 className="cm_soondesc">
                Pack ur bags to stay at the most unique statys{" "}
              </h4>
            </div>
          </div>
          <div className="category_poster">
            <img
              className="cm_soonimg"
              alt={"asd"}
              src="https://wallpapercave.com/wp/wp7247280.jpg"
            />
            <div>
              <h2 className="cm_soontitle">Short Tours</h2>
              <h4 className="cm_soondesc">Take A break !have a kitkat </h4>
            </div>
          </div>
          <div className="category_poster">
            <img
              className="cm_soonimg"
              alt={"asd"}
              src="http://localhost:8000/Static/images/userphotos/Dinner/1134542.jpg"
            />
            <div>
              <h2 className="cm_soontitle">Long Tours</h2>
              <h4 className="cm_soondesc">
                Life Changing tour with experienced guides{" "}
              </h4>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Category;
