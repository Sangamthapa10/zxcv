import React from "react";
import { useGlobalContext } from "../Context";
// import "../Pages/CSS/Searchpage.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Button } from "@material-ui/core";

const SearchMap = () => {
  const { maplat, maplon, setsearchbymap } = useGlobalContext();

  return (
    <>
      <div className="search__map">
        <div className="search_map_inner">
          <div className="hide_map">
            <Button variant="contained" onClick={() => setsearchbymap(false)}>
              <KeyboardBackspaceIcon />
            </Button>
          </div>

          <iframe
            title="Hotel location in map"
            style={{
              border: "0",
              height: "100vh",
              width: "100%",
            }}
            src={`https://www.google.com/maps/embed/v1/place?q=${maplat},${maplon}&zoom=15&key=AIzaSyAfzROi-MUnYq4YdDoWGAQ7DXzkXTCem3A

    `}
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default SearchMap;
