import React from "react";
import "./CSS/Footer.css";
import { useHistory } from "react-router-dom";
import MobileFooter from "./Mobile_footer";
import { useGlobalContext } from "../Context";
import { Button, useMediaQuery } from "@material-ui/core";
//icons
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import CakeIcon from "@material-ui/icons/Cake";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import Logo from "../Logo";
function BigFooter() {
  const matches = useMediaQuery("(max-width:800px)");

  const history = useHistory();
  const push = (a) => {
    history.push(`/webdetail/${a}`);
  };
  const { setsuggestmodal } = useGlobalContext();
  return (
    <>
      <footer className="footer">
        <div className="footer_main">
          <div className="footer__addr">
            {/* <h1 className="footer__logo"> */}
            <div style={{ width: "120px" }}>
              <Logo />
            </div>
            {/* </h1> */}

            <h2>Contact</h2>

            <address>
              Kalanki,Kathmandu
              <br />
            </address>
            <Button onClick={() => setsuggestmodal(true)}>Add Hotel</Button>
          </div>

          <div className="footer_top">
            <div className="footer_top_column">
              <h4>About Us</h4>
              <p onClick={() => push("about")} className="footer_tag">
                About
              </p>
              <p className="footer_tag">Team/Careers</p>
              <p
                onClick={() => history.push("/enlistproperty")}
                className="footer_tag"
              >
                Partner With us
              </p>{" "}
            </div>
            <div className="footer_top_column">
              <h4>Policy</h4>
              <p className="footer_tag">Privacy Policy</p>
              <p className="footer_tag">Terms and Conditions</p>
              <p onClick={() => push("guest_policy")} className="footer_tag">
                Guest Policy
              </p>
            </div>
            <div className="com">
              <h4>Sangam Company</h4>
              <span className="other_com">
                <p className="footer_tag">Zouvile </p>
                <FlightTakeoffIcon />
              </span>
              <span className="other_com">
                <p className="footer_tag">S Tours</p>
                <CakeIcon />
              </span>
            </div>
          </div>
        </div>

        <div className="legal">
          <p>&copy; 2020 Inc. All rights reserved.</p>

          <div className="legal__links">
            <div className="social_accounts">
              <FacebookIcon style={{ color: "blue" }} />
              <InstagramIcon />
              <TwitterIcon style={{ color: "blue" }} />
            </div>
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
