import React from "react";
import "./CSS/error.css";
import Searchnotfoundsvg from "../SvgComponents/Searchnotfound";
import { useGlobalContext } from "../Context";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
//icons
import TuneIcon from "@mui/icons-material/Tune";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
function Error({ type }) {
  const { setfilterdata, searchdata, setsuggestmodal, setValue, min, max } =
    useGlobalContext();
  const { query } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { lat } = useParams();
  const { lon } = useParams();
  const history = useHistory();
  let url = `/search/${query}/checkin=${check_in}/checkout=${check_out}/guest=${guestcount}/room=${roomcount}/latitude=${lat}/longitude=${lon}`;
  const remove = () => {
    setfilterdata([]);
    setValue([min, max]);
    history.push(`${url}/filter=/type=/guest_rating=/order=`);
  };
  return (
    <div
      className={`${searchdata === "empty" ? "full_body_error" : "error_body"}`}
    >
      <div className="error_page_content">
        <Searchnotfoundsvg />
        {type === "bconfirm" ? (
          <div className="suggest_section_error">
            <h4>Booking not found</h4>
          </div>
        ) : searchdata.length === 0 ? (
          <div className="suggest_section_error">
            <Button
              endIcon={<HomeIcon />}
              style={{ textTransform: "none" }}
              onClick={() => history.push("/")}
              variant="outlined"
            >
              Return Home
            </Button>
            <h3>Didnt Find Your Favourite Property ?</h3>
            <span>
              <h3>May be we can get them onboard for you..</h3>
              <Button
                endIcon={<ApartmentIcon />}
                onClick={() => setsuggestmodal(true)}
                variant="outlined"
              >
                Suggest
              </Button>
            </span>
          </div>
        ) : (
          <p>Try Removing filters</p>
        )}
        <div className="error_options">
          {searchdata.length !== 0 && (
            <Button
              endIcon={<TuneIcon />}
              style={{ textTransform: "none" }}
              onClick={remove}
              variant="outlined"
            >
              Remove all Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Error;
