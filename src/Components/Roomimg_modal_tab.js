import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./CSS/Roomimg_modal.css";
import { useGlobalContext } from "./Context";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
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
const RoomImgModal = (data) => {
  const [value, setValue] = useState(0);
  console.log(data);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrownext" onClick={onClick}>
        <ArrowForwardIosIcon style={{ fontSize: "120px" }} />
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

  const setting = {
    dots: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  };
  const { setmodal, singlepage } = useGlobalContext();
  const tabref = useRef();

  const thumb = (name, e) => {
    e.target.style.opacity = 0.2;
    if (name === "lobby") {
      setValue(1);
    } else if (name === "washroom") {
      setValue(2);
    } else if (name === "restaurant") {
      setValue(3);
    } else if (name === "reception") {
      setValue(4);
    } else if (name === "facade") {
      setValue(5);
    } else if (name === "nearby") {
      setValue(6);
    } else if (name === "room") {
      setValue(0);
    } else if (name === "menu") {
      setValue(7);
    }
  };
  let room = data.data.filter((swine) => swine.category === "room");
  let lobby = singlepage[0].Hotel_images.filter(
    (swine) => swine.category === "lobby"
  );
  let washroom = data.data.filter((swine) => swine.category === "washroom");
  let restaurant = singlepage[0].Hotel_images.filter(
    (swine) => swine.category === "restaurant"
  );
  let reception = singlepage[0].Hotel_images.filter(
    (swine) => swine.category === "reception"
  );
  let facade = singlepage[0].Hotel_images.filter(
    (swine) => swine.category === "facade"
  );
  let nearby = singlepage[0].Hotel_images.filter(
    (swine) => swine.category === "nearby"
  );
  let menu = singlepage[0].Hotel_images.filter(
    (swine) => swine.category === "menu"
  );
  const settings = {
    dots: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "rgb(0,0,0,0.1)" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "white" } }}
          style={{ color: "white" }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Room" {...a11yProps(0)} />
          <Tab label="Lobby" {...a11yProps(1)} />
          <Tab label="Washroom" {...a11yProps(2)} />
          <Tab label="Restaurant" {...a11yProps(3)} />
          <Tab label="Reception" {...a11yProps(4)} />
          <Tab label="Facade" {...a11yProps(5)} />
          <Tab label="Nearby" {...a11yProps(6)} />
          <Tab label="Menu" {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <HighlightOffIcon
        style={{
          color: "white",
          fontSize: "45px",
          marginLeft: "95vw",
          cursor: "pointer",
        }}
        onClick={() => setmodal(false)}
      />



      <TabPanel className="slide" value={value} index={0}>
        <Slider {...settings}>
          {room.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white", marginLeft: "35vw" }}>
                  {mapped.name}
                </p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>

      <TabPanel className="slide" value={value} index={1}>
        <Slider {...settings}>
          {lobby.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white", marginLeft: "35vw" }}>
                  {mapped.name}
                </p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>
      <TabPanel className="slide" value={value} index={2}>
        <Slider {...settings}>
          {washroom.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white", marginLeft: "35vw" }}>
                  {mapped.name}
                </p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>
      <TabPanel className="slide" value={value} index={3}>
        <Slider {...settings}>
          {restaurant.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white", marginLeft: "35vw" }}>
                  {mapped.name}
                </p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>
      <TabPanel className="slide" value={value} index={4}>
        <Slider {...settings}>
          {reception.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white", marginLeft: "35vw" }}>
                  {mapped.name}
                </p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>
      <TabPanel className="slide" value={value} index={5}>
        <Slider {...settings}>
          {facade.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white", marginLeft: "35vw" }}>
                  {mapped.name}
                </p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>
      <TabPanel className="slide" value={value} index={6}>
        <Slider {...settings}>
          {nearby.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white", marginLeft: "35vw" }}>
                  {mapped.name}
                </p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>
      <TabPanel className="slide" value={value} index={7}>
        <Slider {...settings}>
          {menu.map((mapped) => {
            return (
              <div key={mapped.id} className="img">
                <img className="im" src={mapped.img} alt="one" />
                <p style={{ color: "white" }}>{mapped.name}</p>
              </div>
            );
          })}
        </Slider>
      </TabPanel>

      <Slider {...setting}>
        {room.length > 0 ? (
          <img
            src={room[0].img}
            ref={tabref}
            className={value === 0 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(room[0].category, e)}
            alt="one"
          />
        ) : (
          ""
        )}
        {lobby.length > 0 ? (
          <img
            src={lobby[0].img}
            ref={tabref}
            className={value === 1 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(lobby[0].category, e)}
            alt="one"
          />
        ) : (
          ""
        )}
        {washroom.length > 0 ? (
          <img
            src={washroom[0].img}
            ref={tabref}
            className={value === 2 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(washroom[0].category, e)}
            alt="one"
          />
        ) : (
          ""
        )}
        {restaurant.length > 0 ? (
          <img
            src={restaurant[0].img}
            ref={tabref}
            className={value === 3 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(restaurant[0].category, e)}
            alt="one"
          />
        ) : (
          ""
        )}
        {reception.length > 0 ? (
          <img
            src={reception[0].img}
            ref={tabref}
            className={value === 4 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(reception[0].category, e)}
            alt="one"
          />
        ) : (
          ""
        )}
        {facade.length > 0 ? (
          <img
            src={facade[0].img}
            ref={tabref}
            className={value === 5 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(facade[0].category, e)}
            alt="onde"
          />
        ) : (
          ""
        )}
        {nearby.length > 0 ? (
          <img
            src={nearby[0].img}
            ref={tabref}
            className={value === 6 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(nearby[0].category, e)}
            alt="one"
          />
        ) : (
          ""
        )}
        {menu.length > 0 ? (
          <img
            src={menu[0].img}
            ref={tabref}
            className={value === 7 ? "thumb opac" : "thumb"}
            onClick={(e) => thumb(menu[0].category, e)}
            alt="one"
          />
        ) : (
          ""
        )}
      </Slider>
    </div>
  );
};

export default RoomImgModal;
