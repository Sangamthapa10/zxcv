import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./CSS/Loading.css";
import ApartmentIcon from "@mui/icons-material/Apartment";

const SearchLoading = () => {
  const a = [1, 2, 3, 4];
  const b = [1, 2, 3, 4];
  return (
    <div className="search_body_loading">
      <div className="aside loaside">
        <aside className="filter">
          <div className="filters_loading">
            {b.map((mapped, i) => {
              return (
                <Skeleton
                  key={i + 1}
                  variant="rect"
                  style={{ height: "30vh" }}
                />
              );
            })}
          </div>
        </aside>
      </div>
      <div className="search_result_loading">
        <div className="search_result_btn_loading">
          <Skeleton variant="rect" style={{ borderRadius: "50px" }} />
          <Skeleton variant="rect" style={{ borderRadius: "50px" }} />
          <Skeleton variant="rect" style={{ borderRadius: "50px" }} />
          <Skeleton variant="rect" style={{ borderRadius: "50px" }} />
        </div>

        <div className="search_result_card_group">
          {a.map((mapped, i) => {
            return (
              <div key={i + 1} className="card_loading_search">
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
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchLoading;
