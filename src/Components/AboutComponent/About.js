import React, { useEffect, useState, useRef } from "react";
import "./CSS/About.css";
const About = () => {
  const { one } = useRef();
  const { two } = useRef();
  const { three } = useRef();
  const [anime, setanime] = useState(false);
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
  function isElementInViewport(el) {
    var els = document.getElementById(el);

    var rect = els.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth) /* or $(window).width() */
    );
  }
  useEffect(() => {
    let handler = (event) => {
      if (isElementInViewport("one")) {
        setanime("1");
      } else if (isElementInViewport("two")) {
        setanime("2");
      } else if (isElementInViewport("three")) {
        setanime("3");
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

  useEffect(() => {
    if (anime === true) {
      setTimeout(function one() {
        setanime(false);
      }, 2000);
    }
  }, [setanime, anime]);
  return (
    <div className="asd">
      <div
        id="one"
        ref={one}
        className={`aboutus_details_container `}
        style={{
          backgroundImage: `url(${"https://wallpapershome.com/images/pages/pic_h/655.jpg"})`,
        }}
      >
        <div className={`about_us_details ${anime === "1" && "anime1"}`}>
          <h1>We Are the best</h1>
          <p>
            More detils here and mnore and mre ore detils here and mnore and
            mreore detils here and mnore and mre
          </p>
        </div>
      </div>
      <div
        id="two"
        ref={two}
        className={`aboutus_details_container`}
        style={{
          backgroundImage: `url(${"https://wallpapershome.com/images/pages/pic_h/655.jpg"})`,
        }}
      >
        <div className={`about_us_details2 ${anime === "2" && "anime2"}`}>
          <h1>We Are the best</h1>
          <p>
            More detils here and mnore and mre ore detils here and mnore and
            mreore detils here and mnore and mre
          </p>
        </div>
      </div>
      <div
        id="three"
        ref={three}
        className={`aboutus_details_container`}
        style={{
          backgroundImage: `url(${"https://wallpapershome.com/images/pages/pic_h/655.jpg"})`,
        }}
      >
        <div className={`about_us_details3 ${anime === "3" && "anime3"}`}>
          <h1>We Are the best</h1>
          <p>
            More detils here and mnore and mre ore detils here and mnore and
            mreore detils here and mnore and mre
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
