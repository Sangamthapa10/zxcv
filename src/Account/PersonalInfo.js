import React, { useState, useEffect } from "react";
import "./CSS/PersonalInfo.css";
import Axios from "axios";
import { Authaxios } from "../Components/Axios";
import { Modal } from "@mui/material";
import { useGlobalContext } from "../Components/Context";
import ChangeNumber from "../Components/Profile/ChangeNumber";
import ChangeUsername from "../Components/Profile/ChangeUsername";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
const PersonalInfo = () => {
  const {
    userdetail,
    cinfo_open,
    setcinfo_open,
    setuserdetail,
    setmailmodal,
    setmailtext,
  } = useGlobalContext();
  const history = useHistory();
  const [show, setshow] = useState("");
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      const tok = localStorage.getItem("axynghkwngasd");
      if (tok && userdetail.length === 0) {
        setmailmodal(true);
        setmailtext("loading");
        Authaxios.get("account/userdetail")
          .then((res) => {
            setmailmodal(false);
            setuserdetail(res.data);
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
    <>
      <Modal
        style={{ display: "grid", placeContent: "center" }}
        open={cinfo_open}
        onClose={() => setcinfo_open(false)}
      >
        <div style={{ padding: "22px", background: "#fff" }}>
          <h1>
            Change Your {show === "changenumber" ? "Number" : "Username"}{" "}
          </h1>
          {show === "changenumber" ? (
            <ChangeNumber />
          ) : show === "changeusername" ? (
            <ChangeUsername />
          ) : (
            ""
          )}
        </div>
      </Modal>
      <div className="personal_info_body">
        <>
          <div
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              width: "100vw",
              backgroundColor: "#fff",
              zIndex: 10,
            }}
            className="gallery_modal_head"
          >
            <div
              className="close_personal__container"
              style={{
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              <ArrowBackIosIcon
                onClick={() => history.push("/profile")}
                style={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(34, 34, 34)",
                  cursor: "pointer",
                }}
              />
              <h4> Personal Info</h4>
            </div>
          </div>
          <div className="personal_info_btn_tiles">
            <div className="usernam personal_info_component">
              <span className="personal_info_main">
                <span className="personal_info_headtag">Full Name</span>
                <span className="personal_info_detail">
                  {userdetail.username ? userdetail.username : "-------------"}
                </span>
              </span>
              {show === "changeusername" ? (
                <CloseIcon onClick={() => setshow("")} />
              ) : (
                <EditIcon
                  onClick={() => {
                    setcinfo_open(true);
                    setshow("changeusername");
                  }}
                  style={{ color: "lightgray" }}
                />
              )}
            </div>

            <div className="email personal_info_component">
              <span className="personal_info_main">
                <span className="personal_info_headtag">Email</span>

                <span className="personal_info_detail">
                  {userdetail.email ? userdetail.email : "-------------"}
                </span>
              </span>
              <EditIcon style={{ color: "lightgray" }} />
            </div>
            <div className="Phone personal_info_component">
              <span className="personal_info_main">
                <span className="personal_info_headtag">Phone no.</span>
                <span className="personal_info_detail">
                  {userdetail.Phone ? userdetail.Phone : "-------------"}
                </span>
              </span>
              {show === "changenumber" ? (
                <CloseIcon onClick={() => setshow("")} />
              ) : (
                <EditIcon
                  onClick={() => {
                    setcinfo_open(true);
                    setshow("changenumber");
                  }}
                  style={{ color: "lightgray" }}
                />
              )}
            </div>
            <div className="Phone personal_info_component">
              <span className="personal_info_main">
                <span className="personal_info_headtag">Gender</span>
                <span className="personal_info_detail">
                  {userdetail.gender ? userdetail.gender : "Not Specified"}
                </span>{" "}
              </span>
              <EditIcon style={{ color: "lightgray" }} />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default PersonalInfo;
