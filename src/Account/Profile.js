import React, { useState } from "react";
import "./CSS/Profile.css";
import LoginForm from "../Components/Auth/LoginForm";
import SignUpForm from "../Components/Auth/SignUpForm";
import MobProfile from "../Components/Profile/MobProfile";
import { Button, useMediaQuery } from "@material-ui/core";
function Profile() {
  const matches = useMediaQuery("(max-width:600px)");
  const [logins, setlogins] = useState(true);
  let loggedin = localStorage.getItem("axynghkwngasd");

  return (
    <div className="profile">
      {loggedin ? (
        <>
          <MobProfile />
        </>
      ) : (
        <div className={`${matches ? "login_form_mob" : "login_form_big"}`}>
          <div
            style={{ display: matches && "grid", gridGap: matches && "15px" }}
            className={`${matches || "profile_log_container"}`}
          >
            {logins ? <LoginForm /> : <SignUpForm />}
            <hr />
            <Button
              style={{ margin: "0 10px" }}
              variant="outlined"
              type="submit"
              onClick={() => setlogins(!logins)}
            >
              {logins ? "Create Account" : "Login"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
