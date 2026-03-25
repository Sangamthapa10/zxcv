import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import { Modal, Button, TextField } from "@mui/material";
//icons
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import TextsmsIcon from "@mui/icons-material/Textsms";
import TelegramIcon from "@mui/icons-material/Telegram";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ShareIcon from "@mui/icons-material/Share";

function ShareOptions({ img, tops }) {
  const { setalerttype, singlepage, setalerttext, setsnackbar } =
    useGlobalContext();
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setsnackbar(true);
      setalerttext("Copied Successfully");
      setalerttype("success");
    } else {
      setsnackbar(true);
      setalerttext("Could not copy");
      setalerttype("error");
    }
  };
  const [open, setopen] = useState(false);
  return (
    <>
      {tops ? (
        tops === "s" ? (
          <ShareIcon onClick={() => setopen(!open)} />
        ) : (
          <Button onClick={() => setopen(!open)} endIcon={<ShareIcon />}>
            Share
          </Button>
        )
      ) : (
        <Button
          variant="outlined"
          startIcon={<TelegramIcon />}
          fullWidth
          onClick={() => setopen(!open)}
        >
          Share
        </Button>
      )}
      <Modal
        style={{ display: "grid", placeContent: "center" }}
        open={open}
        onClose={() => setopen(false)}
      >
        <div className="dropdown_share_grp animeslidedown">
          <div
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
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
              }}
            >
              <HighlightOffIcon
                onClick={() => setopen(false)}
                style={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(34, 34, 34)",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          <div className="share_options_container">
            <h6>Share this hotel with your friend and family</h6>
            <span className="share_modaltitle">
              <img
                style={{ height: "60px", width: "60px", objectFit: "cover" }}
                src={img}
                alt="a"
              />
              <div>
                <h3>{singlepage[0].Name}</h3>
                <h6>{singlepage[0].Address}</h6>
              </div>
            </span>

            <div className="share_social">
              <h3 className="share_title">Social Media</h3>
              <div className="share_messaging">
                <Button
                  startIcon={
                    <FacebookIcon
                      style={{
                        color: "rgb(24, 119, 242)",
                        marginRight: "15px",
                        fontSize: "32px",
                      }}
                    />
                  }
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </Button>
              </div>
            </div>
            <div className="share_social">
              <h3 className="share_title">Messaging and Email</h3>
              <div className="share_messaging">
                <Button
                  style={{ textTransform: "none" }}
                  startIcon={
                    <svg
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "15px",
                      }}
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <defs>
                        <radialGradient
                          cx="19.25%"
                          cy="99.447%"
                          fx="19.25%"
                          fy="99.447%"
                          r="108.96%"
                          gradientTransform="scale(1 .99991)"
                          id="fbmessengera"
                        >
                          <stop stopColor="#09F" offset="0%"></stop>
                          <stop stopColor="#A033FF" offset="60.98%"></stop>
                          <stop stopColor="#FF5280" offset="93.48%"></stop>
                          <stop stopColor="#FF7061" offset="100%"></stop>
                        </radialGradient>
                      </defs>
                      <path fill="#FFF" d="M32 0v32H0V0z"></path>
                      <path
                        d="M16 4C9.241 4 4 8.953 4 15.64c0 3.498 1.434 6.522 3.768 8.61.195.174.315.42.321.684l.066 2.136a.96.96 0 0 0 1.347.849l2.382-1.05a.964.964 0 0 1 .642-.048c1.095.3 2.259.462 3.474.462 6.759 0 12-4.953 12-11.64S22.759 4 16 4z"
                        fill="url(#fbmessengera)"
                      ></path>
                      <path
                        d="M8.794 19.045l3.525-5.592a1.8 1.8 0 0 1 2.604-.48l2.805 2.103a.72.72 0 0 0 .867-.003l3.786-2.874c.504-.384 1.164.222.828.759l-3.528 5.589a1.8 1.8 0 0 1-2.604.48l-2.805-2.103a.72.72 0 0 0-.867.003l-3.786 2.874c-.504.384-1.164-.219-.825-.756z"
                        fill="#FFF"
                      ></path>
                    </svg>
                  }
                >
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`http://www.facebook.com/dialog/send?app_id=369577674021904&amp;
              link=${window.location.href}&amp;redirect_uri=${window.location.href}
`}
                  >
                    Send
                  </a>
                </Button>
                <Button
                  startIcon={
                    <WhatsAppIcon
                      style={{
                        color: "#008000",
                        fontSize: "32px",
                        marginRight: "15px",
                      }}
                    />
                  }
                  style={{ textTransform: "none" }}
                >
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/?text=${window.location.href}`}
                  >
                    Whatsapp
                  </a>
                </Button>

                <Button
                  startIcon={
                    <EmailIcon
                      style={{
                        color: "#808080",
                        fontSize: "32px",
                        marginRight: "15px",
                      }}
                    />
                  }
                  style={{ textTransform: "none" }}
                >
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${document.title}&body=${window.location.href}&ui=2&tf=1&pli=1`}
                  >
                    Email
                  </a>
                </Button>
                <Button
                  style={{ textTransform: "none" }}
                  startIcon={
                    <TextsmsIcon
                      style={{
                        color: "#f08080",
                        fontSize: "32px",
                        marginRight: "15px",
                      }}
                    />
                  }
                  onClick={() =>
                    (window.location.href = `sms:?body=${window.location.href}!`)
                  }
                >
                  Send SMS
                </Button>
              </div>
            </div>
            <div className="share_social">
              <h3 className="share_title">Copy Link</h3>
              <TextField
                variant="outlined"
                fullWidth
                value={window.location.href}
                InputProps={{
                  endAdornment: (
                    <Button
                      startIcon={<FileCopyIcon />}
                      variant="outlined"
                      onClick={copy}
                    >
                      Copy
                    </Button>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareOptions;
