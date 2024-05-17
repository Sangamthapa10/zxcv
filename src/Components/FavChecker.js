import React from "react";
const FavChecker = ({ id }) => {
  let dat = localStorage.getItem("fav");
  let data = dat.split(",");
  console.log(data);
  return (
    <div>{data.find((el) => el === id.toString()) ? "true" : "false"}</div>
  );
};

export default FavChecker;
