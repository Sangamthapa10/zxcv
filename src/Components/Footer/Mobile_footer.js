import React, { useState, useEffect } from "react";
import "./CSS/Footer.css";
import { useLocation, Link } from "react-router-dom";
//material ui
import { useMediaQuery, BottomNavigation, BottomNavigationAction } from '@mui/material';
//icons
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from '@mui/styles';
const styles = makeStyles({
  root: {
    color: "green",
    "&$selected": {
      color: "red",
    },
  },
  selected: {
    color: "red",
  },
});

const MobileFooter = () => {
  const classes = styles();
  const location = useLocation();

  const pathname = location.pathname;
  const [value, setValue] = useState(pathname);
  const [show, setshow] = useState(true);
  const matches = useMediaQuery("(max-width:800px)");
  let supportsPassive = false;

  try {
    const options = {
      get passive() {
        supportsPassive = true;
        return false;
      },
    };

    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch (err) {
    supportsPassive = false;
  }
  useEffect(() => {
    let handler = (event) => {
      if (matches) {
        window.onscroll = function () {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight
          ) {
            setshow(false);
          } else {
            setshow(true);
          }
        };
      }
    };
    document.addEventListener(
      "scroll",
      handler,
      supportsPassive ? { passive: true } : false
    );
    return () => {
      document.removeEventListener("scroll", handler);
    };
  });

  return (
    <div className={`${show ? "mobile_footer" : "display_none"}`}>
      {pathname === "/" ||
      pathname === "/idea" ||
      pathname === "/favourite" ||
      pathname === "/booking" ||
      pathname === "/profile" ||
      pathname === "/personalinfo" ? (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className="mobile_footer_container"
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            value={"/"}
            component={Link}
            to={"/"}
            classes={classes}
          />
          <BottomNavigationAction
            icon={<SearchIcon />}
            value={"/idea"}
            label="search"
            component={Link}
            classes={classes}
            to={"/idea"}
          />

          <BottomNavigationAction
            label="Favourites"
            icon={<FavoriteBorderIcon />}
            value={"/favourite"}
            classes={classes}
            component={Link}
            to={"/favourite"}
          />
          <BottomNavigationAction
            label="Booking"
            classes={classes}
            icon={<WorkOutlineIcon />}
            value="/booking"
            component={Link}
            to={"/booking"}
          />
          <BottomNavigationAction
            label="Profile"
            classes={classes}
            icon={<PersonOutlineIcon />}
            value={"/profile"}
            component={Link}
            to={"/profile"}
          />
        </BottomNavigation>
      ) : null}
    </div>
  );
};

export default MobileFooter;
