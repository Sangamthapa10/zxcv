import React from "react";
//icons
import MoodIcon from "@material-ui/icons/Mood"; //if no icon
///Facility icon
import WifiIcon from "@material-ui/icons/Wifi"; //wifi;
import KingBedIcon from "@material-ui/icons/KingBed"; //king bed;
import SingleBedIcon from "@material-ui/icons/SingleBed"; //single bed;
import HotTubIcon from "@material-ui/icons/HotTub"; //hot water or geyser
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects"; //backup electricity
import FastfoodIcon from "@material-ui/icons/Fastfood"; //inhouse restaurant
import VideocamIcon from "@material-ui/icons/Videocam"; //cc tv
import LocalBarIcon from "@material-ui/icons/LocalBar"; //local bar
import HourglassFullIcon from "@material-ui/icons/HourglassFull"; //24hr checkin
import RoomServiceIcon from "@material-ui/icons/RoomService"; //room service icon
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService"; //laundryservice
import WeekendIcon from "@material-ui/icons/Weekend"; //seating area/waiting
//amneties icon
import ToysIcon from "@material-ui/icons/Toys"; //a.c icon
import KitchenIcon from "@material-ui/icons/Kitchen"; //fridge
//end icon

function Ic({ icon }) {
  return (
    <div>
      {icon.toLowerCase() === "WifiIcon".toLowerCase() ? (
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
      ) : icon.toLowerCase() === " LocalBarIcon".toLowerCase() ? (
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

export default Ic;
