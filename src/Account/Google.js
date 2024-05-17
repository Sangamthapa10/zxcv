import axios from "axios";
import { useGlobalContext } from "../Components/Context";

const Googlelogin = (accesstoken) => {
  console.log(accesstoken);
  const { login, setlogin } = useGlobalContext();

  axios
    .post("http://127.0.0.1:8000/accounts/convert-token", {
      token: accesstoken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: "g7jIvZXgvRtHg8d8g5gPK1p4nIXoArpnbz0xo3Rx",
      client_secret:
        "BB4Jn2EnYRVHOrgG5VpD9xyYCHlIVS9rrp5sVoIkyptZQTpXftgc95IFBBqWVZmBOJ2wuaGKVzlBOJ4AmBT3VX2uE56czCwbWSfKWU4SkE0CKUWRa03BTaJuWYLFsjY0",
    })
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      setlogin(false);
    });
};

export default Googlelogin;
