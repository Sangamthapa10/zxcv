import React, { useState } from "react";
import "./CSS/AdminNav.css";
import { useGlobalContext } from "../Context";
import {
  TextField,
  Menu,
  MenuItem,
  InputAdornment,
  Button,
  styled,
  useMediaQuery,
} from "@mui/material";
//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
//svg
import Logo from "../Logo";
const SearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "25px",
  },
}));
const AdminNav = () => {
  const [inputvalue, setinputvalue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const matches = useMediaQuery("(max-width:800px)");
  const { adminsidebar, setadminsidebar } = useGlobalContext();
  return (
    <div className="admin_nav sticky">
      <div className="admin_nav_right">
        <div className="sidebar-header">
          {matches && (
            <Button
              className="show_sidebar_header"
              onClick={() => setadminsidebar(!adminsidebar)}
            >
              <MenuIcon style={{ fontSize: "35px" }} />
            </Button>
          )}
          <div className="adminnavlogo">
            <Logo />
          </div>
          {/* <span className="contact">
            <h6>Help:9849450931</h6>
          </span> */}
        </div>
        <span style={{ placeSelf: "center" }}>
          <SearchBox
            placeholder="Search how to"
            value={inputvalue}
            onChange={(e) => setinputvalue(e.target.value)}
            variant="outlined"
            required
            fullWidth
            id="username"
            name="phone"
            className="input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: inputvalue.length !== 0 && (
                <InputAdornment position="end">
                  <CloseIcon onClick={() => setinputvalue("")} />
                </InputAdornment>
              ),
            }}
          />
        </span>
        <span className="account_info" style={{ placeSelf: "center" }}>
          <AccountCircleIcon style={{ fontSize: "40px", color: "green" }} />
          <ArrowDropDownIcon
            onClick={handleClick}
            style={{ fontSize: "40px" }}
          />

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ zIndex: 10000000 }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Booking</MenuItem>
            <MenuItem>Logouts</MenuItem>
          </Menu>
        </span>
      </div>
    </div>
  );
};

export default AdminNav;
