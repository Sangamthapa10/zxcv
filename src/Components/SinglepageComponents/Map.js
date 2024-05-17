import React, { useState } from "react";
import "./CSS/Propertymeals.css";
import { useGlobalContext } from "../Context";
import { Button, TextField, InputAdornment } from "@material-ui/core";
function Map() {
  const { singlepage, setlat, setlon, lat, lon } = useGlobalContext();
  const [a, b] = React.useState("");
  const [dmap, setdmap] = useState(false);
  function showPosition(position) {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
    setdmap(!dmap);
  }
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        console.log("");
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setlat("");
      setlon("");
    }
  }
  let sm = true;
  const [aq, setaq] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        display: "grid",
        gridGap: "15px",
      }}
    >
      {sm && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="title__">Location of Hotel</h1>
            <Button
              style={{ textTransform: "none", placeSelf: "start" }}
              variant="outlined"
              onClick={() => setaq(!aq)}
            >
              Check Distance
            </Button>
          </div>
          {aq && (
            <div style={{ width: "100%" }} className="input_map_dmap">
              <TextField
                variant="outlined"
                require
                label="Enter Your location"
                fullWidth
                value={a}
                onChange={(e) => b(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        style={{ textTransform: "none" }}
                        variant="outlined"
                        onClick={getLocation}
                      >
                        from Current Location
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}
        </>
      )}
      {singlepage.map((mapped) => {
        return (
          <div className="spage_map_container" key={mapped.id}>
            {dmap ? (
              a.length > 0 ? (
                <iframe
                  className="map_singlepage"
                  title="Hotel location in map"
                  style={{ width: "100%", height: "100%", border: "0" }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/directions?&origin=${a}
&destination=${mapped.latitude},${mapped.longitude}
&avoid=tolls|highways&key=${process.env.REACT_APP_GOOGLE_KEY}
  `}
                ></iframe>
              ) : (
                <iframe
                  className="map_singlepage"
                  title="Hotel location in map"
                  style={{ width: "100%", height: "100%", border: "0" }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/directions?&origin=${lat},${lon}
  &destination=${mapped.latitude},${mapped.longitude}
  &avoid=tolls|highways&key=${process.env.REACT_APP_GOOGLE_KEY}
    `}
                ></iframe>
              )
            ) : mapped.omap ? (
              <iframe
                className="map_singlepage"
                title="Hotel location in map"
                style={{ width: "100%", height: "100%", frameBorder: "0" }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?q=${mapped.omap}&zoom=15&key=${process.env.REACT_APP_GOOGLE_KEY}

    `}
              ></iframe>
            ) : (
              <iframe
                className="map_singlepage"
                title="Hotel location in map"
                style={{ width: "100%", height: "100%", frameBorder: "0" }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?q=${mapped.latitude},${mapped.longitude}&zoom=15&key=${process.env.REACT_APP_GOOGLE_KEY}

    `}
              ></iframe>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Map;
