import React, { useState } from "react";
import "./CSS/Roomimg_modal.css";
import Slider from "react-slick";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "./Context";
import { AppBar, Tabs, Tab, Typography, Box, Button } from "@material-ui/core";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      style={{ zIndex: "100000" }}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const AllRoomSlider = (search) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setallroom_modal } = useGlobalContext();

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrownext" onClick={onClick}>
        <ArrowForwardIosIcon style={{ fontSize: "100px" }} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrowprev" onClick={onClick}>
        <ArrowBackIosIcon style={{ fontSize: "120px" }} />
      </div>
    );
  }
  const settings = {
    dots: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    infinite: true,
    fade: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const history = useHistory();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const Single = (id, Name, default_room) => {
    history.push(
      `/single/ ${id} /${Name}/${default_room}/${check_in}/${check_out}/${guestcount}/${roomcount}/ `
    );
  };
  return (
    <div>
      {search.search
        .filter((swine) => swine.id === search.id)
        .map((mapped) => {
          const {
            id,
            Name,

            default_room,
          } = mapped;
          return (
            <div style={{ zIndex: "10000" }}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "rgb(0,0,0,0.1)",
                  zIndex: "1000000000",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {mapped.room_option.map((rooms, index) => {
                    return <Tab label={rooms.name} {...a11yProps(index)} />;
                  })}
                </Tabs>
                <HighlightOffIcon
                  style={{
                    fontSize: "60px",
                    position: "absolute",
                    right: 20,
                    top: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => setallroom_modal(false)}
                />
              </AppBar>
              {mapped.room_option.map((room_optio, index) => {
                return (
                  <div key={room_optio.id} style={{ color: "white" }}>
                    <TabPanel className="slide" value={value} index={index}>
                      <Slider {...settings}>
                        {room_optio.room_img
                          .filter((swine) => swine.category === "room")
                          .map((mapp) => {
                            return (
                              <div key={mapp.id}>
                                <div className="img">
                                  <img
                                    className="im"
                                    src={mapp.img}
                                    alt="one"
                                  />
                                  <h3
                                    style={{
                                      color: "white",
                                      marginLeft: "35vw",
                                    }}
                                  >
                                    {room_optio.name}
                                  </h3>
                                </div>
                              </div>
                            );
                          })}
                      </Slider>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <h1>NPRS{room_optio.price}</h1>
                          <p>Per Night</p>
                          <Button
                            onClick={() => Single(id, Name, default_room.id)}
                            variant="contained"
                            className="Search_button"
                            style={{
                              textTransform: "none",
                              backgroundColor: "green",
                              color: "white",
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default AllRoomSlider;
