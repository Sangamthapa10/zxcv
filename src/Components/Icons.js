import React from "react";
//icons
import MoodIcon from "@mui/icons-material/Mood"; //if no icon
///Facility icon
import WifiIcon from "@mui/icons-material/Wifi"; //wifi;
import KingBedIcon from "@mui/icons-material/KingBed"; //king bed;
import SingleBedIcon from "@mui/icons-material/SingleBed"; //single bed;
import TvIcon from "@mui/icons-material/Tv"; //tv;
import HotTubIcon from "@mui/icons-material/HotTub"; //hot water or geyser
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"; //backup electricity
import FastfoodIcon from "@mui/icons-material/Fastfood"; //inhouse restaurant
import VideocamIcon from "@mui/icons-material/Videocam"; //cc tv
import LocalBarIcon from "@mui/icons-material/LocalBar"; //local bar
import HourglassFullIcon from "@mui/icons-material/HourglassFull"; //24hr checkin
import RoomServiceIcon from "@mui/icons-material/RoomService"; //room service icon
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService"; //laundryservice
import WeekendIcon from "@mui/icons-material/Weekend"; //seating area/waiting
//amneties icon
import ToysIcon from "@mui/icons-material/Toys"; //a.c icon
import KitchenIcon from "@mui/icons-material/Kitchen"; //fridge
//end icon
function Icons({ icon }) {
  return (
    <div>
      {icon.toLowerCase() === "tvIcon".toLowerCase() ? (
        <TvIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "WifiIcon".toLowerCase() ? (
        <WifiIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "KingBedIcon".toLowerCase() ? (
        <KingBedIcon className="amnety_icon" />
      ) : icon.toLowerCase() === " SingleBedIcon".toLowerCase() ? (
        <SingleBedIcon className="amnety_icon" />
      ) : icon.toLowerCase() === " HotTubIcon".toLowerCase() ? (
        <HotTubIcon className="amnety_icon" />
      ) : icon.toLowerCase() === " EmojiObjectsIcon".toLowerCase() ? (
        <EmojiObjectsIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "FastfoodIcon".toLowerCase() ? (
        <FastfoodIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "VideocamIcon".toLowerCase() ? (
        <VideocamIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "LocalBarIcon".toLowerCase() ? (
        <LocalBarIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "HourglassFullIcon".toLowerCase() ? (
        <HourglassFullIcon className="amnety_icon" />
      ) : icon.toLowerCase() === " RoomServiceIcon".toLowerCase() ? (
        <RoomServiceIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "LocalLaundryServiceIcon".toLowerCase() ? (
        <LocalLaundryServiceIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "WeekendIcon".toLowerCase() ? (
        <WeekendIcon className="amnety_icon" />
      ) : icon.toLowerCase() === " ToysIcon".toLowerCase() ? (
        <ToysIcon className="amnety_icon" />
      ) : icon.toLowerCase() === "  KitchenIcon".toLowerCase() ? (
        <KitchenIcon className="amnety_icon" />
      ) : (
        <MoodIcon className="amnety_icon" />
      )}
    </div>
  );
}

export default Icons;
