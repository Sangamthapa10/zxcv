import React from "react";
import { useGlobalContext } from "../../Context";
import LinearProgress from "@mui/material/LinearProgress";
import StarIcon from "@mui/icons-material/Star";
function ReviewScore({ a }) {
  const { singlepage } = useGlobalContext();
  return (
    <div
      className={`${
        a ? "modal_full_detail_component" : "full_detail_component"
      }`}
    >
      {singlepage.length > 0 && (
        <span
          className={`${
            a ? "modaldetail_component_header" : "detail_component_header"
          }`}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <StarIcon style={{ color: "#f2b01e", fontSize: "24px" }} />
            <h2>{singlepage[0].rating} </h2>
          </div>

          <h2 style={{ fontWeight: a && "800" }}>
            ({singlepage[0].avg_count} Ratings)
          </h2>
        </span>
      )}

      {singlepage.map((mapped) => {
        const {
          staffavg,
          foodavg,
          cleanlinessavg,
          surroundingavg,
          privacyavg,
          checkin_ease,
        } = mapped;
        return (
          <div
            key={mapped.id}
            className={`${a ? "modal_detail_review " : "detail_review"}`}
          >
            <div className="rating_bar_container">
              <h4>Staff</h4>
              <span className="rating_bar">
                <LinearProgress
                  className="p_bar"
                  variant="determinate"
                  value={(staffavg * 100) / 5}
                  color="secondary"
                />
                {staffavg}{" "}
              </span>
            </div>

            <div className="rating_bar_container">
              <h4>CheckinEase</h4>
              <span className="rating_bar">
                <LinearProgress
                  className="p_bar"
                  variant="determinate"
                  value={(checkin_ease * 100) / 5}
                  color="secondary"
                />
                {checkin_ease}
              </span>
            </div>
            <div className="rating_bar_container">
              <h4>Food</h4>
              <span className="rating_bar">
                <LinearProgress
                  className="p_bar"
                  variant="determinate"
                  value={(foodavg * 100) / 5}
                  color="secondary"
                />
                {foodavg}
              </span>
            </div>
            <div className="rating_bar_container">
              <h4>Cleanliness</h4>
              <span className="rating_bar">
                <LinearProgress
                  className="p_bar"
                  variant="determinate"
                  value={(cleanlinessavg * 100) / 5}
                  color="secondary"
                />
                {cleanlinessavg}
              </span>
            </div>
            <div className="rating_bar_container">
              <h4>Surrounding</h4>
              <span className="rating_bar">
                <LinearProgress
                  className="p_bar"
                  variant="determinate"
                  value={(surroundingavg * 100) / 5}
                  color="secondary"
                />
                {surroundingavg}
              </span>
            </div>
            <div className="rating_bar_container">
              <h4>Privacy</h4>

              <span className="rating_bar">
                <LinearProgress
                  className="p_bar"
                  variant="determinate"
                  value={(privacyavg * 100) / 5}
                  color="secondary"
                />
                {privacyavg}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewScore;
