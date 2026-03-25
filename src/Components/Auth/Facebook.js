// Facebook.js - standalone Facebook login component (unused in main flow,
// kept for backwards compatibility). Uses @greatsumini/react-facebook-login.
import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";

const responseFacebook = (response) => {
  console.log("Facebook response:", response);
};

function Facebook() {
  return (
    <div>
      <FacebookLogin
        appId="445505463664973"
        fields="name,email,picture"
        onSuccess={responseFacebook}
        onFail={(err) => console.error("Facebook login failed", err)}
        render={({ onClick }) => (
          <span onClick={onClick} style={{ cursor: "pointer" }}>
            <FacebookIcon style={{ color: "#1877F2" }} />
          </span>
        )}
      />
    </div>
  );
}

export default Facebook;
