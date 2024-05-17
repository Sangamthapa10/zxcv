// import axios from "axios";
// import { useGlobalContext } from "../Context";

// const FacebookLogin = (accesstoken) => {
//   const { setlogin } = useGlobalContext();
//   axios
//     .post("http://127.0.0.1:8000/accounts/convert-token", {
//       token: accesstoken,
//       backend: "facebook",
//       grant_type: "convert_token",
//       client_id: "g7jIvZXgvRtHg8d8g5gPK1p4nIXoArpnbz0xo3Rx",
//       client_secret:
//         "BB4Jn2EnYRVHOrgG5VpD9xyYCHlIVS9rrp5sVoIkyptZQTpXftgc95IFBBqWVZmBOJ2wuaGKVzlBOJ4AmBT3VX2uE56czCwbWSfKWU4SkE0CKUWRa03BTaJuWYLFsjY0",
//     })
//     .then((res) => {
//       localStorage.setItem("axynghkwngasd", res.data.access_token);
//       localStorage.setItem("axolkhgyuthebs", res.data.refresh_token);
//       setlogin(false);
//     });
// };

// export default FacebookLogin;
import React from "react";
import FacebookLogin from "react-facebook-login";
const responseFacebook = async (response) => {
  alert(response);
};
function Facebook() {
  return (
    <div>
      <FacebookLogin
        appId="445505463664973"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
}

export default Facebook;
