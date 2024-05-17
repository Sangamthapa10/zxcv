import React, { useState, useEffect } from "react";
import "./CSS/AdminPropertyimage.css";
import { Authaxios } from "../../Axios";
import { Button } from "@material-ui/core";
import { useGlobalContext } from "../../Context";
import Axios from "axios";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function APropertyImages() {
  const { setmailtext, setadminimg, setmailmodal } = useGlobalContext();
  const [room, setroom] = useState("");
  const [loading, setloading] = useState(false);
  const [img, setimg] = useState([]);
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      Authaxios.get("api/property_images/")
        .then((res) => {
          setimg(res.data);
          setloading(true);
          console.log(res.data);
        })
        .catch((error) => {
          if (Axios.isCancel(error)) {
            console.log("AxiosCancel: caught cancel");
          } else {
            throw error;
          }
        });
    };

    fetchdata();
    return () => {
      source.cancel();
    };
  }, []);
  const [show, setshow] = useState(false);
  const roomclick = (id) => {
    setshow("room");
    setroom(id);
  };
  const openmailmodal = () => {
    setmailmodal(true);
    setmailtext("changepicture");
  };
  return (
    <div className="admin_property_img_body">
      {loading && (
        <>
          {show === "property" ? (
            <>
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                  backgroundColor: "#fff",
                }}
                className="gallery_modal_head"
              >
                <div
                  className="close_modal_container"
                  style={{
                    padding: "10px",

                    backgroundColor: "#fff",
                  }}
                >
                  <ArrowBackIosIcon
                    onClick={() => setshow(false)}
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "rgb(34, 34, 34)",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "15px",
                  }}
                >
                  <h6>Hotel Images</h6>
                  <Button
                    onClick={openmailmodal}
                    style={{ color: "green" }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </span>
              </div>

              <div className="img_collect">
                {img.Hotel_images.map((mapped, i) => {
                  return (
                    <div key={i + 1}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={mapped.img}
                        alt="a"
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : show === "room" ? (
            <div>
              {img.room_option
                .filter((swine) => swine.id === room)
                .map((mapped, i) => {
                  console.log(mapped);
                  return (
                    <div key={i + 1}>
                      <div
                        style={{
                          position: "sticky",
                          top: 0,
                          left: 0,
                          width: "100%",
                          backgroundColor: "#fff",
                        }}
                        className="gallery_modal_head"
                      >
                        <div
                          className="close_modal_container"
                          style={{
                            padding: "10px",

                            backgroundColor: "#fff",
                          }}
                        >
                          <ArrowBackIosIcon
                            onClick={() => setshow(false)}
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "rgb(34, 34, 34)",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            borderBottom: "1px solid lightgray",
                            paddingBottom: "15px",
                          }}
                        >
                          <h6>{mapped.name} Images</h6>
                          <Button
                            onClick={openmailmodal}
                            style={{ color: "green" }}
                            variant="outlined"
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          width: "100%",
                          borderBottom: "1px solid lightgray",
                          paddingBottom: "24px",
                        }}
                      >
                        <h6>Dp Image</h6>
                        <img
                          style={{
                            height: "20vh",
                            width: "24%",
                            marginTop: "2vh",
                            marginBottom: "2vh",
                          }}
                          src={mapped.room_dp.img}
                          alt="one"
                        />
                      </div>
                      <div>
                        <h6>Img Collections</h6>
                        <div className="img_collect">
                          {mapped.room_img.map((im, i) => {
                            return (
                              <div
                                key={i + 1}
                                className="admin_prop_thumb_container"
                              >
                                <img
                                  style={{ width: "100%", height: "100%" }}
                                  src={im.img}
                                  alt="a"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                  backgroundColor: "#fff",
                  zIndex: 1000,
                }}
                className="gallery_modal_head"
              >
                <div
                  className="close_modal_container"
                  style={{
                    padding: "10px",

                    backgroundColor: "#fff",
                  }}
                >
                  <ArrowBackIosIcon
                    onClick={() => setadminimg(false)}
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "rgb(34, 34, 34)",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "15px",
                  }}
                >
                  <h6>Hotel Images and </h6>
                  <Button
                    onClick={openmailmodal}
                    style={{ color: "green" }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </span>
              </div>
              <div className="admin_prope">
                <div
                  onClick={() => setshow("property")}
                  className="admin_property_thumbnail"
                >
                  {img.Hotel_images.slice(0, 4).map((mapped, i) => {
                    return (
                      <div key={i + 1} className="admin_prop_thumb_container">
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={mapped.img}
                          alt="a"
                        />
                      </div>
                    );
                  })}
                  <h3 className="admin_thumb_title">Property Images</h3>
                </div>
                {img.room_option.map((mapped, i) => {
                  return (
                    <div
                      onClick={() => roomclick(mapped.id)}
                      key={i + 1}
                      className="admin_property_thumbnail"
                    >
                      {mapped.room_img.slice(0, 4).map((room, i) => {
                        return (
                          <div
                            key={i + 1}
                            className="admin_prop_thumb_container"
                          >
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={room.img}
                              alt="a"
                            />
                          </div>
                        );
                      })}
                      <h3 className="admin_thumb_title">{mapped.name}</h3>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default APropertyImages;
