import React, { useState } from "react";
import "./CSS/Mailmodal.css";
import { useGlobalContext } from "./Context";
import { Modal, Button } from "@material-ui/core";
//icons
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
function Mailmodal() {
  const { mailmodal, setmailmodal, mailtext } = useGlobalContext();
  const [chimage, setchimage] = useState(false);
  const [crimage, setcrimage] = useState(false);
  const [old, setold] = useState(false);
  const [better, setbetter] = useState(false);
  const [change, setchange] = useState(false);
  return (
    <div style={{ zIndex: 99999999999999999 }}>
      <Modal
        style={{
          display: "grid",
          placeContent: "center",
          placeItems: "center",
          outline: "none !important",
        }}
        open={mailmodal}
        onClose={() => setmailmodal(mailtext === "loading" ? true : false)}
      >
        <div style={{ outline: "none !important" }}>
          {mailtext === "loading" ? (
            <div className="loading_btn">
              <div className="dot1"> </div>
              <div className="dot2"></div>
              <div className="dot3"></div>
            </div>
          ) : (
            <div className="mail_body">
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                  backgroundColor: "#fff",
                  borderBottom: "1px solid lightgray",
                }}
                className="gallery_modal_head"
              >
                <div
                  className="close_modal_container"
                  style={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "#fff",
                  }}
                >
                  <HighlightOffIcon
                    onClick={() => setmailmodal(false)}
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "rgb(34, 34, 34)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div className="mail_container">
                {mailtext === "changepicture" || "changelocation" ? (
                  <section className="section">
                    <h3>Welcome!</h3>
                    <p>
                      You are about to request to change your{" "}
                      {mailtext === "changepicture"
                        ? "property images"
                        : mailtext === "changelocation"
                        ? "Property Location"
                        : ""}
                    </p>

                    <p>
                      Here at Sroom, we pride our selves on providing you total
                      security and providing our users excellent user experience
                      so for that first u need to request to ammend changes on
                      your property.
                    </p>
                    {mailtext === "changepicture" ? (
                      <div className="radio_container">
                        <p>
                          <b>Request To Change Images for</b>
                        </p>

                        <div className="radio_grp">
                          <label>
                            <input
                              checked={chimage}
                              onChange={() => setchimage(!chimage)}
                              type="radio"
                            />
                            Hotel Image
                          </label>
                          <label>
                            <input
                              checked={crimage}
                              onChange={() => setcrimage(!crimage)}
                              type="radio"
                            />
                            Room Image
                          </label>
                        </div>
                        <div className="radio_grp">
                          <p>
                            <b>Reason</b>{" "}
                          </p>

                          <label>
                            <input
                              checked={old}
                              onChange={() => setold(!old)}
                              type="radio"
                            />
                            Image Old
                          </label>
                          <label>
                            <input
                              checked={better}
                              onChange={() => setbetter(!better)}
                              type="radio"
                            />
                            Better Images
                          </label>
                        </div>
                      </div>
                    ) : mailtext === "changelocation" ? (
                      <>
                        <p>Change Hotel Location</p>
                        <p>
                          <b>Reason</b>
                          <br />
                          <label>
                            <input
                              checked={change === "i" ? true : false}
                              onChange={() => setchange("i")}
                              type="radio"
                            />
                            Location Incorrect
                          </label>
                          <br />
                          <label>
                            <input
                              checked={change === "a" ? true : false}
                              onChange={() => setchange("a")}
                              type="radio"
                            />
                            Not Accurate Location
                          </label>
                          <br />
                          <label>
                            <input
                              checked={change === "h" ? true : false}
                              onChange={() => setchange("h")}
                              type="radio"
                            />
                            Changing Hotel Location
                          </label>
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                    <Button fullWidth variant="contained" color="primary">
                      Send
                    </Button>
                  </section>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Mailmodal;
