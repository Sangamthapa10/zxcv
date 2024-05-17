import axios from "axios";
let tok = localStorage.getItem("axynghkwngasd");
const baseURL = "http://127.0.0.1:8000/";

//  const baseURL = "https://localhostq.herokuapp.com/";
const Customaxios = tok
  ? axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("axynghkwngasd"),
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
  : axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

export const Authaxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("axynghkwngasd"),
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/';
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/ ;secure";
}
Customaxios.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 401) {
      return new Promise((resolve, reject) => {
        // localStorage.removeItem("axynghkwngasd");
        // localStorage.removeItem("axolkhgyuthebs");
        // localStorage.removeItem("time");

        const refreshToken = localStorage.getItem("refresh");
        let ax = axios.create({
          baseURL: baseURL,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        // const time = localStorage.getItem("again_time");
        // const now = Math.ceil(Date.now() / 1000);
        // if (now > time) {

        ax.post("account/token/", {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        })
          .then((res) => {
            localStorage.setItem("axynghkwngasd", res.data.access_token);
            localStorage.setItem("refresh", res.data.refresh_token);
            localStorage.setItem("again_time", res.data.expires_in);
            setCookie("acesstoken", res.data.access_token, res.data.expires_in);
            window.location.reload();
            console.log(res.data);
          })
          .catch((error) => {
            localStorage.removeItem("axynghkwngasd");
            localStorage.removeItem("refresh");
            localStorage.removeItem("time");
            localStorage.removeItem("user");
            localStorage.removeItem("ab");
            localStorage.removeItem("a");
            localStorage.removeItem("acdef");     
            deleteCookie("a");
            deleteCookie("ab");
            deleteCookie("ac");
            deleteCookie("ad");
            deleteCookie("da");
            deleteCookie("dea");
            deleteCookie("qa");
            deleteCookie("ga");
            deleteCookie("ja");
            deleteCookie("acesstoken");
            deleteCookie("refresh_token");
          });
        // }
        reject(error);
      });
    }
  }
);

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("axynghkwngasd");
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     alert(error);
//     Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === "http://localhost:8000/account/token/"
//     ) {
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("axolkhgyuthebs");
//       return Customaxios.post("accounts/revoke-token/", {
//         grant_type: "password",
//         client_id: "Fxfn0RsAbt6mW4ztkKIXiuNceP4352SfUJqUWAji",
//         client_secret:
//           "emDBfaVqHWXuc5af8vWlHuT6QbWV9bFnImcpLhOAMSkD0lF39fckTc2OluvNrpdsbguFZKPwdxCrjNanRyRk5PdBVzc7EmSrbxNFn4k1zEiQxiFzJrHTr5bVyalcmJvT",
//         refresh_token: refreshToken,
//       }).then((res) => {
//         if (res.status === 201) {
//           localStorage.setToken(res.data);
//           axios.defaults.headers.common["Authorization"] =
//             "Bearer " + localStorage.getAccessToken();
//           return axios(originalRequest);
//         }
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// Customaxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (typeof error.response === "undefined") {
//       alert(
//         "A server/network error occurred. " +
//           "Looks like CORS might be the problem. " +
//           "Sorry about this - we will get it fixed shortly."
//       );
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === "http://127.0.0.1:8000/accounts/revoke-token/"
//     ) {
//       window.location.href = "/login/";
//       return Promise.reject(error);
//     }

//     if (
//       error.response.data.code === "token_not_valid" &&
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = localStorage.getItem("axolkhgyuthebs");

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

//         // exp date in token is expressed in seconds, while now() returns milliseconds:
//         const now = Math.ceil(Date.now() / 1000);
//         console.log(tokenParts.exp);

//         if (tokenParts.exp > now) {
//           return Customaxios.post(
//             "http://127.0.0.1:8000/accounts/revoke-token/",
//             {
//               grant_type: "refresh_token",
//               client_id: "Fxfn0RsAbt6mW4ztkKIXiuNceP4352SfUJqUWAji",
//               client_secret:
//                 "emDBfaVqHWXuc5af8vWlHuT6QbWV9bFnImcpLhOAMSkD0lF39fckTc2OluvNrpdsbguFZKPwdxCrjNanRyRk5PdBVzc7EmSrbxNFn4k1zEiQxiFzJrHTr5bVyalcmJvT",
//               refresh_token: refreshToken,
//             }
//           )
//             .then((res) => {
//               localStorage.setItem("axynghkwngasd", res.data.access_token);
//               localStorage.setItem("axolkhgyuthebs", res.data.refresh_token);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         } else {
//           window.location.href = "http://127.0.0.1:8000/account/login";
//         }
//       } else {
//         window.location.href = "http://127.0.0.1:8000/account/login/";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default Customaxios;
