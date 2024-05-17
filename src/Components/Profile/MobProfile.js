import React, { useEffect } from "react";
import "./CSS/MobProfile.css";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { Button } from "@material-ui/core";
import { Authaxios } from "../Axios";
import Axios from "axios";
//icons
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ApartmentIcon from "@material-ui/icons/Apartment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
const MobProfile = () => {
  const matches = useMediaQuery("(max-width:100px)");
  const mob = useMediaQuery("(max-width:600px)");

  const { setuserdetail, userdetail } = useGlobalContext();
  const history = useHistory();
  const push = (a) => {
    history.push(`/account/${a}`);
  };
  const pus = () => {
    history.push("/enlistproperty");
  };
  const time = localStorage.getItem("again_time");
  const now = Math.ceil(Date.now() / 1000);
  if (now > time) {
    console.log(now);
  }
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      const tok = localStorage.getItem("axynghkwngasd");
      if (tok && userdetail.length === 0) {
        Authaxios.get("account/userdetail")
          .then((res) => {
            setuserdetail(res.data);
            console.log(res.data);
          })
          .catch((error) => {});
      }
    };

    fetchdata();
    return () => {
      source.cancel();
    };
  });
  return (
    <div className="mob_profile">
      <div className="profile_card">
        {mob || (
          <AccountBalanceIcon
            style={{ width: "50px", height: "auto", color: "blue" }}
          />
        )}
        <h3>Welcome {localStorage.getItem("user")}</h3>
        {mob || (
          <AccountBalanceIcon
            style={{ width: "50px", height: "auto", color: "red" }}
          />
        )}
      </div>
      <div className="mob_profile_cards">
        <Button onClick={() => push("personalinfo")} variant="outlined">
          {matches ? (
            <span className="profile_card_title">Personal Info</span>
          ) : (
            <div className="profile_card_desc">
              <span className="profile_card_title">
                Personal Info <ContactPhoneIcon className="profile_icon" />
              </span>
              <p>Provide eprsonal details and how the fuck we cab reac</p>
            </div>
          )}
        </Button>
        <Button onClick={() => push("security")} variant="outlined">
          {matches ? (
            <span className="profile_card_title">Security</span>
          ) : (
            <div className="profile_card_desc">
              <span className="profile_card_title">
                Security
                <FingerprintIcon className="profile_icon" />
              </span>
              <p>Provide eprsonal details and how the fuck we cab reac</p>
            </div>
          )}
        </Button>
        <Button onClick={() => push("payments")} variant="outlined">
          {matches ? (
            <span className="profile_card_title">Payment</span>
          ) : (
            <div className="profile_card_desc">
              <span className="profile_card_title">
                Payment <CreditCardIcon className="profile_icon" />
              </span>
              <p>Provide eprsonal details and how the fuck we cab reac</p>
            </div>
          )}
        </Button>
        <Button onClick={() => push("privacy")} variant="outlined">
          {matches ? (
            <span className="profile_card_title">Privacy</span>
          ) : (
            <div className="profile_card_desc">
              <span className="profile_card_title">
                Privacy <VisibilityIcon className="profile_icon" />
              </span>
              <p>Provide eprsonal details and how the fuck we cab reac</p>
            </div>
          )}
        </Button>

        <Button onClick={() => pus("enlistproperty")} variant="outlined">
          {matches ? (
            <span className="profile_card_title">Enlist Your Property</span>
          ) : (
            <div className="profile_card_desc">
              <span className="profile_card_title">
                Enlist Your Property <ApartmentIcon className="profile_icon" />
              </span>
              <p>Provide eprsonal details and how the fuck we cab reac</p>
            </div>
          )}
        </Button>

        <Button variant="outlined">
          {matches ? (
            <span className="profile_card_title">Sign Out</span>
          ) : (
            <div className="profile_card_desc">
              <span className="profile_card_title">
                Sign Out <ExitToAppIcon className="profile_icon" />
              </span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobProfile;
