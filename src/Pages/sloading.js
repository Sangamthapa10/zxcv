import React from "react";
import "./CSS/Sloading.css";
import Skeleton from "@material-ui/lab/Skeleton";
import "../Pages/CSS/Singlepage.css";
const SinglepageLoading = () => {
  return (
    <div>
      {/* <div className="sloading_slider">
        <h1>sangam thapa</h1>
      </div> */}
      <div className="singlepage_body">
        <div className="single_page_left">
          <div className="Single_page">
            <div className="single_page_header">
              <Skeleton
                className="singlepage_title"
                width="50px"
                animation="wave"
              />
              <div className="desc_right">
                <Skeleton width="60px" animation="wave" />
              </div>
            </div>

            <Skeleton
              width="60px"
              className="singlepage_address"
              animation="wave"
            />
            <div className="detailed_desc">
              <Skeleton
                width="60px"
                className="singlepage_address"
                animation="wave"
              />
            </div>
            <div className="facility">
              <Skeleton
                width="60px"
                className="singlepage_address"
                animation="wave"
              />
            </div>
            <div className="room_selection">
              <div className="room_option">
                <Skeleton width="300px" height="300px" animation="wave" />
              </div>
            </div>
            <div className="meals">
              <Skeleton width="300px" height="300px" animation="wave" />
            </div>
            <div className="map">
              <Skeleton width="300px" height="300px" animation="wave" />
            </div>
            <div className="weather">
              <Skeleton width="300px" height="300px" animation="wave" />
            </div>
            <div className="rating">
              <Skeleton width="300px" height="300px" animation="wave" />
            </div>
          </div>
        </div>
        <div className="single_page_left">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default SinglepageLoading;
