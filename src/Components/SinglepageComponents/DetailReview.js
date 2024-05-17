import React, { useState } from "react";
import "./CSS/DetailReview.css";
import { Modal, styled, TextField, InputAdornment } from "@material-ui/core";
//icons
import ReviewScore from "./review/ReviewScore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import StarIcon from "@material-ui/icons/Star";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
const WhSearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "25px",
  },
}));

const DetailReview = ({ cmnt }) => {
  const [cmntmodal, setcmntmodal] = useState(false);
  const handleClose = () => {
    setcmntmodal(false);
  };

  const open = (i) => {
    setcmntmodal(true);
  };
  //search
  const [search, setsearch] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  let data = search.length > 1 ? searchdata : cmnt;

  const searchfunc = (e) => {
    setsearch(e.target.value);
    console.log(cmnt);
    let a = cmnt.filter((swine) =>
      swine.comment
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim())
    );
    setsearchdata(a);
  };
  return (
    <div className="full_detail_component">
      <ReviewScore />
      <div className="comments">
        {cmnt.map((mapped, i) => {
          const checkin = new Date(mapped.created).toUTCString();
          const chdate = checkin.slice(8, 16);
          return (
            <div key={i + 1} className="cmnt">
              <span className="cmnt_upper">
                <AccountCircleIcon className="account_icon" />
                <span className="cmnt_right">
                  <span className="username">{mapped.booking.fullname}</span>
                  <span className="date">{chdate}</span>
                </span>
              </span>
              <span>
                <span className="comment_body">{mapped.comment}</span>
                {mapped.comment.length > 200 && (
                  <span
                    onClick={() => open(mapped.fullrating)}
                    className="show_more_container"
                  >
                    <span className="show_more">Show More</span>
                    <span>
                      <ArrowForwardIosIcon className="show_more_icon" />
                    </span>
                  </span>
                )}
              </span>
            </div>
          );
        })}
        <Modal
          className="modal_cmnt_bod"
          open={cmntmodal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal_cmnt_container">
            <span className="back_header_modal">
              <ArrowBackIosIcon
                onClick={handleClose}
                className="back_header_icon"
                style={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(34, 34, 34)",
                  cursor: "pointer",
                }}
              />
              <div className="search_cmnt">
                <WhSearchBox
                  placeholder="Search Comments"
                  fullWidth
                  variant="outlined"
                  type="text"
                  onChange={(e) => searchfunc(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: search.length !== 0 && (
                      <InputAdornment position="end">
                        <CloseIcon onClick={() => setsearch("")} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </span>

            <div className="modal_cmnt__">
              <div className="modal_cmntaside">
                <div className="modal_cmnt__left">
                  <ReviewScore a={"a"} />
                </div>
              </div>

              <div className="modal_cmnt__right">
                <div className="mod_cmnts">
                  {data.map((mapped, i) => {
                    const checkin = new Date(mapped.created).toUTCString();
                    const chdate = checkin.slice(8, 16);
                    return (
                      <div
                        key={i + 1}
                        className={`${
                          i + 1 === 1 ? "modal_cmnt_f" : "modal_cmnt"
                        }`}
                        id={mapped.fullrating}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="cmnt_upper">
                            <AccountCircleIcon className="account_icon" />
                            <span className="modal_cmnt_right">
                              <span className="username">
                                {mapped.booking.fullname}
                              </span>
                              <span className="date">{chdate}</span>
                            </span>
                          </span>
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            Rated {mapped.fullrating}{" "}
                            <StarIcon
                              style={{ color: "#f2b01e", fontSize: "24px" }}
                            />
                          </span>
                        </span>
                        <span>
                          <span className="modal_comment_body">
                            {mapped.comment}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DetailReview;
