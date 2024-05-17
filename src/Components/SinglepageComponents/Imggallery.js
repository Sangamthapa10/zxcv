import React, { useRef, useState } from "react";
import "./CSS/Gallery.css";
import { useGlobalContext } from "../Context";
import ImageModal from "./ImageModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//material ui
import { Modal, Tab, AppBar, Tabs } from "@material-ui/core";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const Imggallery = () => {
  const mapbar = useRef();
  const gallery_room_ref = useRef();
  const gallery_washroom_ref = useRef();

  const gallery_lobby_ref = useRef();
  const gallery_reception_ref = useRef();
  const gallery_restaurant_ref = useRef();
  const gallery_facade_ref = useRef();
  const gallery_nearby_ref = useRef();
  const {
    img_gallerydata,
    imgmodal,
    setimgmodal,
    img_gallery,
    setimg_gallery,
    imgid,
  } = useGlobalContext();

  const ongallery_room_ref = () => {
    var elmnt = document.getElementById("roomid");
    elmnt.scrollIntoView();
  };
  const onlobby = () => {
    var elmnt = document.getElementById("lobbyid");
    elmnt.scrollIntoView();
  };
  const onwashroom = () => {
    var elmnt = document.getElementById("washroomid");
    elmnt.scrollIntoView();
  };
  const onrestaurant = () => {
    var elmnt = document.getElementById("restaurantid");
    elmnt.scrollIntoView();
  };
  const onfacade = () => {
    var elmnt = document.getElementById("facadeid");
    elmnt.scrollIntoView();
  };

  const onreception = () => {
    var elmnt = document.getElementById("receptionid");
    elmnt.scrollIntoView();
  };
  const onnearby = () => {
    var elmnt = document.getElementById("nearbyid");
    elmnt.scrollIntoView();
  };
  const [room, setroom] = useState(false);
  const handleClose = () => {
    setimg_gallery(false);
  };

  function scroll() {
    var height = document.documentElement.scrollTop;
    // room
    if (
      height + mapbar.current.clientHeight >
      height + gallery_room_ref.current.getBoundingClientRect().top
    ) {
      setroom("room");
      setvalue(0);
    }

    // washroom
    if (
      height + mapbar.current.clientHeight >
      gallery_washroom_ref.current.getBoundingClientRect().top + height
    ) {
      setvalue(1);
      setroom("washroom");
    }

    // lobby
    if (
      height + mapbar.current.clientHeight >
      gallery_lobby_ref.current.getBoundingClientRect().top + height
    ) {
      setvalue(2);

      setroom("lobby");
    }

    // reception
    if (
      height + mapbar.current.clientHeight >
      gallery_reception_ref.current.getBoundingClientRect().top + height
    ) {
      setvalue(3);
      setroom("reception");
    }

    // restaurant;
    if (
      height + mapbar.current.clientHeight >
      gallery_restaurant_ref.current.getBoundingClientRect().top + height
    ) {
      setvalue(4);

      setroom("restaurant");
    }

    // facade
    if (
      height + mapbar.current.clientHeight >
      gallery_facade_ref.current.getBoundingClientRect().top + height
    ) {
      setvalue(5);
      setroom("facade");
    }

    // nearby
    if (
      height + mapbar.current.clientHeight >
      height + gallery_nearby_ref.current.getBoundingClientRect().top
    ) {
      setvalue(6);

      setroom("nearby");
    }
  }
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }
  const [value, setvalue] = useState(0);
  const [imgdata, setimgdata] = useState({ img: "", img_collection: "" });
  const open_modal = (i, s) => {
    setimgdata({
      img: s,
      img_collection: i,
    });

    setimgmodal(true);
  };

  return (
    <Modal
      open={img_gallery}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <>
        <Modal open={imgmodal} onClose={() => setimgmodal(false)}>
          <div>
            <ImageModal data={imgdata} />
          </div>
        </Modal>
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            width: "100vw",
            backgroundColor: "#fff",
            zIndex: 200,
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
              onClick={() => setimg_gallery(false)}
              style={{
                width: "30px",
                height: "30px",
                color: "rgb(34, 34, 34)",
                cursor: "pointer",
              }}
            />
          </div>

          <AppBar
            style={{
              backgroundColor: "#fff",
              boxShadow: "4px 4px 4px -1px rgb(0 0 0 / 20%)",
            }}
            position="static"
          >
            <div
              className="gallery_bar_scroll"
              style={{ position: "relative !important" }}
            >
              <Tabs
                value={value}
                scrollButtons="on"
                variant="scrollable"
                aria-label="scrollable auto tabs example"
                className=""
                ref={mapbar}
                style={{ color: "black" }}
              >
                <Tab
                  label="Room"
                  onClick={ongallery_room_ref}
                  className={`${room === "room" ? "one" : "a"}`}
                  {...a11yProps(0)}
                />

                <Tab
                  label="washroom"
                  onClick={onwashroom}
                  className={`${room === "washroom" ? "one" : "a"}`}
                  {...a11yProps(1)}
                />

                <Tab
                  label="lobby"
                  onClick={onlobby}
                  className={`${room === "lobby" ? "one" : "a"}`}
                  {...a11yProps(2)}
                />

                <Tab
                  label="Reception"
                  onClick={onreception}
                  className={`${room === "reception" ? "one" : "a"}`}
                  {...a11yProps(3)}
                />

                <Tab
                  label="Restaurant"
                  onClick={onrestaurant}
                  className={`${room === "restaurant" ? "one" : "a"}`}
                  {...a11yProps(4)}
                />

                <Tab
                  label="Facade"
                  onClick={onfacade}
                  className={`${room === "facade" ? "one" : "a"}`}
                  {...a11yProps(5)}
                />

                <Tab
                  label="Nearby"
                  onClick={onnearby}
                  className={`${room === "nearby" ? "one" : "a"}`}
                  {...a11yProps(6)}
                />
              </Tabs>
            </div>
          </AppBar>
        </div>
        <div className="gallery_body" onScroll={scroll}>
          <div className="gallery_img" id="cont">
            {img_gallerydata.length > 0 &&
              img_gallerydata.map((mapped, i) => {
                let selroom =
                  imgid &&
                  mapped.room_option.filter(
                    (swine) => parseInt(swine.id) === parseInt(imgid)
                  );
                let roomimg = imgid ? selroom : mapped.room_option;

                let lobbyimg = mapped.Hotel_images.filter(
                  (swine) => swine.category === "lobby"
                );
                let washroomimg = mapped.Hotel_images.filter(
                  (swine) => swine.category === "washroom"
                );
                let restaurantimg = mapped.Hotel_images.filter(
                  (swine) => swine.category === "restaurant"
                );
                let receptionimg = mapped.Hotel_images.filter(
                  (swine) => swine.category === "reception"
                );
                let facadeimg = mapped.Hotel_images.filter(
                  (swine) => swine.category === "facade"
                );
                let nearbyimg = mapped.Hotel_images.filter(
                  (swine) => swine.category === "nearby"
                );

                return (
                  <div className="img_gallery" key={i + 1}>
                    <div className="img__gallery">
                      <div className="gallery_img_room" ref={gallery_room_ref}>
                        {roomimg.map((mappe, i) => {
                          return (
                            <div
                              id="roomid"
                              className="gallery_img_room__"
                              key={i + 1}
                            >
                              <h4 className="img_title"> {mappe.name}</h4>
                              <hr />
                              <div className="img_room">
                                {mappe.room_img.map((mapped, i) => {
                                  return (
                                    <div
                                      onClick={() =>
                                        open_modal(mappe.room_img, mapped.img)
                                      }
                                      className={`${
                                        (i + 1) % 3 === 0
                                          ? "even avde"
                                          : "odd avde"
                                      }`}
                                      key={i + 1}
                                    >
                                      <LazyLoadImage
                                        delayTime={300}
                                        className="gal_img"
                                        alt={"asd"}
                                        effect="blur"
                                        src={mapped.img}
                                      />

                                      <h1 className="ribbons">{mappe.name}</h1>
                                      <div className="middle">
                                        <div className="text">
                                          Click to see full images
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className="gallery_img_washroom gallery_img_room"
                        ref={gallery_washroom_ref}
                      >
                        <h4 className="img_title">Washroom</h4>
                        <hr />

                        <div id="washroomid" className="img_room">
                          {washroomimg.map((mapped, i) => {
                            return (
                              <div
                                onClick={() =>
                                  open_modal(washroomimg, mapped.img)
                                }
                                className={`${
                                  (i + 1) % 3 === 0 ? "even avde" : "odd avde"
                                }`}
                                key={i + 1}
                              >
                                <LazyLoadImage
                                  className="gal_img"
                                  alt={"asd"}
                                  effect="blur"
                                  src={mapped.img}
                                />
                                <h1 className="ribbons">Washroom</h1>
                                <div className="middle">
                                  <div className="text">
                                    Click to see full images
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="gallery_img_lobby gallery_img_room"
                        ref={gallery_lobby_ref}
                      >
                        <h4 className="img_title">Lobby</h4>
                        <hr />

                        <div id="lobbyid" className="img_room">
                          {lobbyimg.map((mapped, i) => {
                            return (
                              <div
                                className={`${
                                  (i + 1) % 3 === 0 ? "even avde" : "odd avde"
                                }`}
                                onClick={() => open_modal(lobbyimg, mapped.img)}
                                key={i + 1}
                              >
                                <LazyLoadImage
                                  className="gal_img"
                                  alt={"asd"}
                                  effect="blur"
                                  src={mapped.img}
                                />
                                <h1 className="ribbons">Lobby</h1>
                                <div className="middle">
                                  <div className="text">
                                    Click to see full images
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div
                        className="gallery_img_reception  gallery_img_room"
                        ref={gallery_reception_ref}
                      >
                        <h4 className="img_title">Reception</h4>
                        <hr />

                        <div id="receptionid" className="img_room">
                          {receptionimg.map((mapped, i) => {
                            return (
                              <div
                                className={`${
                                  (i + 1) % 3 === 0 ? "even avde" : "odd avde"
                                }`}
                                onClick={() =>
                                  open_modal(receptionimg, mapped.img)
                                }
                                key={i + 1}
                              >
                                <LazyLoadImage
                                  className="gal_img"
                                  alt={"asd"}
                                  effect="blur"
                                  src={mapped.img}
                                />
                                <h1 className="ribbons">Reception</h1>
                                <div className="middle">
                                  <div className="text">
                                    Click to see full images
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="gallery_img_restaurant gallery_img_room "
                        ref={gallery_restaurant_ref}
                      >
                        <h4 className="img_title">Restaurant</h4>
                        <hr />

                        <div id="restaurantid" className="img_room">
                          {restaurantimg.map((mapped, i) => {
                            return (
                              <div
                                className={`${
                                  (i + 1) % 3 === 0 ? "even avde" : "odd avde"
                                }`}
                                onClick={() =>
                                  open_modal(restaurantimg, mapped.img)
                                }
                                key={i + 1}
                              >
                                <LazyLoadImage
                                  className="gal_img"
                                  alt={"asd"}
                                  effect="blur"
                                  src={mapped.img}
                                />
                                <h1 className="ribbons">Restaurant</h1>
                                <div className="middle">
                                  <div className="text">
                                    Click to see full images
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="gallery_img_facade gallery_img_room"
                        ref={gallery_facade_ref}
                      >
                        <h4 className="img_title">Facade</h4>
                        <hr />

                        <div className="img_room" id="facadeid">
                          {facadeimg.map((mapped, i) => {
                            return (
                              <div
                                onClick={() =>
                                  open_modal(facadeimg, mapped.img)
                                }
                                className={`${
                                  (i + 1) % 3 === 0 ? "even avde" : "odd avde"
                                }`}
                                key={i + 1}
                              >
                                <LazyLoadImage
                                  className="gal_img"
                                  alt={"asd"}
                                  effect="blur"
                                  src={mapped.img}
                                />

                                <h1 className="ribbons">Reception</h1>
                                <div className="middle">
                                  <div className="text">
                                    Click to see full images
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div
                        className="gallery_img_nearby gallery_img_room"
                        ref={gallery_nearby_ref}
                      >
                        <h4 className="img_title">Nearby</h4>
                        <hr />

                        <div id="nearbyid" className="img_room">
                          {nearbyimg.map((mapped, i) => {
                            return (
                              <div
                                onClick={() =>
                                  open_modal(nearbyimg, mapped.img)
                                }
                                className={`${
                                  (i + 1) % 3 === 0 ? "even avde" : "odd avde"
                                }`}
                                key={i + 1}
                              >
                                <LazyLoadImage
                                  className="gal_img"
                                  alt={"asd"}
                                  effect="blur"
                                  src={mapped.img}
                                />
                                <h1 className="ribbons">Nearby</h1>
                                <div className="middle">
                                  <div className="text">
                                    Click to see full images
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default Imggallery;
