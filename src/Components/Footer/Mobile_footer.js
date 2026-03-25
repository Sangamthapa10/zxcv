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
    color: "#8a8078 !important",
    transition: "all 0.3s ease !important",
    "& .MuiBottomNavigationAction-label": {
      fontSize: "10px !important",
      marginTop: "2px",
      fontFamily: "'Outfit', sans-serif !important",
    },
    "&.Mui-selected": {
      color: "#ff4d6d !important",
      "& .MuiBottomNavigationAction-label": {
        fontSize: "11px !important",
        fontWeight: "600 !important",
      },
    },
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
          style={{ 
            borderTop: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
            height: '65px'
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon style={{ fontSize: '22px' }} />}
            value={"/"}
            component={Link}
            to={"/"}
            classes={{ root: classes.root }}
          />
          <BottomNavigationAction
            icon={<SearchIcon style={{ fontSize: '22px' }} />}
            value={"/idea"}
            label="Search"
            component={Link}
            to={"/idea"}
            classes={{ root: classes.root }}
          />

          <BottomNavigationAction
            label="Wishlist"
            icon={<FavoriteBorderIcon style={{ fontSize: '22px' }} />}
            value={"/favourite"}
            component={Link}
            to={"/favourite"}
            classes={{ root: classes.root }}
          />
          <BottomNavigationAction
            label="Bookings"
            icon={<WorkOutlineIcon style={{ fontSize: '22px' }} />}
            value="/booking"
            component={Link}
            to={"/booking"}
            classes={{ root: classes.root }}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<PersonOutlineIcon style={{ fontSize: '22px' }} />}
            value={"/profile"}
            component={Link}
            to={"/profile"}
            classes={{ root: classes.root }}
          />
        </BottomNavigation>
      ) : null}
    </div>
  );
};

export default MobileFooter;
