import React, { useState } from "react";
import "./CSS/Login.css";
import SignUpForm from "../Components/Auth/SignUpForm";
import LoginForm from "../Components/Auth/LoginForm";
import { useGlobalContext } from "../Components/Context";
import PwResetForm from "../Components/Auth/PwResetForm";
import { useLocation } from "react-router-dom";
import {
  Button,
  DialogTitle,
  DialogContent,
  Modal,
  useMediaQuery,
  Dialog,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
function Login() {
  const {
    login,
    setlogin,
    setresetpw,
    signin,
    setsignin,
    setm_detail,
    resetpw,
    bookwdac,
    setbookwdac,
  } = useGlobalContext();
  const matches = useMediaQuery("(max-width:600px)");

  const handleClose = () => {
    setlogin(false);
    setresetpw(false);
    setbookwdac(false);
  };

  const signinbtn = (e) => {
    e.preventDefault();
    setresetpw(false);
    setsignin(false);
  };
  const signupbtn = (e) => {
    e.preventDefault();
    setresetpw(false);

    setsignin(true);
  };
  const [smtype, setsmtype] = useState("login");
  const location = useLocation();
  const pathname = location.pathname;
  let index = pathname.indexOf("/");
  let inde = pathname.indexOf("/", index + 1);
  let abc = pathname.slice(0, inde);
  const openbook = () => {
    setOpen(false);
    setm_detail(true);
    setlogin(false);
  };
  const [open, setOpen] = React.useState(false);

  const signups = () => {
    setOpen(false);
    setlogin(true);
    setsignin(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Book Property without creating account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are free to book property without account but you will need to
            enter bookid and Phone Number every time to see your booking
            <p style={{ paddingTop: "15px" }}>
              For Hasslefree experience ..we Recommend Creating account !
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ textTransform: "none" }}
            onClick={signups}
            color="primary"
          >
            Create Account
          </Button>
          <Button
            style={{ textTransform: "none" }}
            onClick={openbook}
            color="primary"
            autoFocus
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>

      {matches ? (
        <Modal
          className={`${login ? "login-container" : "display_none"}`}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={login}
          onClose={handleClose}
        >
          <div className="login_form_mob">
            <HighlightOffIcon
              className="close_icon"
              onClick={() => setlogin(false)}
            />
            <div className="sm_sign_form">
              {smtype === "login" ? (
                <LoginForm />
              ) : smtype === "signup" ? (
                <SignUpForm />
              ) : (
                <PwResetForm />
              )}
              <div style={{ paddingBottom: "20px", display: "grid" }}>
                <Button
                  style={{ margin: "0 10px", textTransform: "none" }}
                  variant="outlined"
                  type="submit"
                  size="small"
                  onClick={() =>
                    setsmtype(smtype === "signup" ? "login" : "signup")
                  }
                >
                  {smtype === "signup" ? "Login" : "Create Account"}
                </Button>
                {abc === "/single" && (
                  <Button onClick={() => setOpen(true)}>
                    Book without A.c
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          className={`${login ? "login-container" : "display_none"}`}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={login}
          onClose={handleClose}
        >
          <div
            className={`${
              resetpw ? "resetpw_panel" : signin ? "right-panel-active" : ""
            } log_modal_container`}
          >
            {resetpw ? (
              <div className="form-container pw-change">
                <PwResetForm />
              </div>
            ) : signin ? (
              <div className="form-container sign-up-container">
                <SignUpForm />
              </div>
            ) : signin === false ? (
              <div className="form-container sign-in-container">
                <LoginForm />
              </div>
            ) : (
              ""
            )}
            <div className="overlay-container">
              <div className="overlay">
                {signin && (
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <span className="login-p">
                      To keep connected with us please login with your personal info
                    </span>
                    <div className="login_overlay_login_bottom">
                      <span>
                        Don't have an account? Register with us and book your hotel right away
                      </span>
                      <button
                        className="ghost-button"
                        onClick={(e) => signinbtn(e)}
                        id="signIn"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                )}
                {signin || (
                  <div className="overlay-panel overlay-right">
                    <h1>Hello Friend!</h1>
                    <span className="login_details_sub_header">
                      Hotel Booking and travelling made easy
                    </span>
                    <div className="login_overlay_login_bottom">
                      <span>
                        Don't have an account? Register with us and book your hotel right away
                      </span>
                      <button
                        className="ghost-button"
                        onClick={(e) => signupbtn(e)}
                        id="signUp"
                      >
                        Sign Up
                      </button>
                      {bookwdac && (
                        <Button
                          variant="contained"
                          className="footer_add_btn"
                          style={{
                            textTransform: "none",
                            borderRadius: "12px",
                          }}
                          onClick={() => {
                            setOpen(true);
                            setbookwdac(false);
                          }}
                        >
                          Book without Account
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                {resetpw && (
                  <div className="overlay-panel reset-overlay">
                    <h1 style={{ fontWeight: "bold", margin: 0 }}>
                      Hello Friend!
                    </h1>
                    <span className="login_details_sub_header">
                      Forgot Password No Problem
                    </span>
                    <div className="login_overlay_login_bottom">
                      <span>
                        Dont Have An account ? Register with us and book your
                        hotel right away
                      </span>

                      <Button
                        style={{
                          border: "1px solid #fff",
                          color: "#fff",
                          borderRadius: "11px",
                        }}
                        onClick={(e) => signupbtn(e)}
                        variant="outlined"
                        id="signUp"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Login;
