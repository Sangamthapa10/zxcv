import React from "react";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import { Authaxios } from "./Axios";
const StarRating = () => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const one = (e, value) => {
    setValue(value);
    Authaxios.post("/api/addreview/", {
      rating: value,
      Staffrating: "",
      Foodrating: "",
      Cleanlinessrating: "",
      Surroundingrating: "",
      privacyrating: "",
      comment: "",
      updated: "",
      property: "1",
    }).then((res) => {
      window.location.reload();
    });
  };
  const labels = {
    0.5: "sUseless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(e, newValue) => {
          one(e, newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
};

export default StarRating;
