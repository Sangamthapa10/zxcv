import React from "react";
import "./CSS/Footer.css";
import { useHistory } from "react-router-dom";
import MobileFooter from "./Mobile_footer";
import { useGlobalContext } from "../Context";
import { Button, useMediaQuery } from "@mui/material";

// icons
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CakeIcon from "@mui/icons-material/Cake";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Logo from "../Logo";

function BigFooter() {
  const matches = useMediaQuery("(max-width:800px)");
  const history = useHistory();
  const { setsuggestmodal } = useGlobalContext();

  const push = (a) => {
    history.push(`/webdetail/${a}`);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer_main">
          {/* Column 1: Brand */}
          <div className="footer_brand">
            <div style={{ width: "120px" }}>
              <Logo />
            </div>
            <p className="brand_desc">
              Your premier destination for finding the perfect stay in Nepal. 
              We curate the best hotels for your comfort and budget.
            </p>
            <div className="footer_socials">
              <span className="social_icon_link">
                <FacebookIcon />
              </span>
              <span className="social_icon_link">
                <InstagramIcon />
              </span>
              <span className="social_icon_link">
                <TwitterIcon />
              </span>
            </div>
          </div>

          {/* Column 2: Discover */}
          <div className="footer_column">
            <h4>Discover</h4>
            <div className="footer_links">
              <span onClick={() => push("about")} className="footer_link">About Us</span>
              <span className="footer_link">Our Team</span>
              <span className="footer_link">Career Options</span>
              <span onClick={() => history.push("/enlistproperty")} className="footer_link">Partner With Us</span>
            </div>
          </div>

          {/* Column 3: Policy */}
          <div className="footer_column">
            <h4>Support</h4>
            <div className="footer_links">
              <span className="footer_link">Privacy Policy</span>
              <span className="footer_link">Terms & Conditions</span>
              <span onClick={() => push("guest_policy")} className="footer_link">Guest Policy</span>
              <span className="footer_link">Help Center</span>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="footer_column">
            <h4>Connect</h4>
            <div className="footer_contact_info">
              <div className="contact_item">
                <LocationOnIcon />
                <span>Kalanki, Kathmandu, Nepal</span>
              </div>
              <div className="contact_item">
                <PhoneIcon />
                <span>+977 1XXXXXXXXX</span>
              </div>
              <div className="contact_item">
                <EmailIcon />
                <span>contact@roomroz.com</span>
              </div>
            </div>
            


            <Button 
              className="footer_add_btn" 
              onClick={() => setsuggestmodal(true)}
              variant="contained"
            >
              Add Your Hotel
            </Button>
          </div>
        </div>

        <div className="footer_divider"></div>

        <div className="footer_bottom">
          <p>&copy; {new Date().getFullYear()} Room Roz Inc. All rights reserved.</p>
          <div className="legal_links">
            <span className="legal_link">Trust & Safety</span>
            <span className="legal_link">Data Protection</span>
            <span className="legal_link">Accessibility</span>
          </div>
        </div>
      </footer>
      {matches && (
        <div className="mobile__footer">
          <MobileFooter />
        </div>
      )}
    </>
  );
}

export default BigFooter;
