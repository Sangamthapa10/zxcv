import React from "react";
import { useParams } from "react-router-dom";
import About from "../Components/AboutComponent/About";
import GuestPolicy from "../Components/AboutComponent/GuestPolicy";
const Websitedetail = () => {
  const { page } = useParams();
  return (
    <div className="web_details">
      <div className="web_details_container">
        {page.toString() === "about" ? (
          <About />
        ) : page.toString() === "guest_policy" ? (
          <GuestPolicy />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Websitedetail;
