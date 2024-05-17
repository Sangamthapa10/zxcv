import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import Icons from "../Icons";
import { Tabs, Tab } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Modal } from "@material-ui/core";
const AmnetyModal = ({ data }) => {
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }

  const [value, setvalue] = useState(0);
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  };
  const { amnetymodal, setamnetymodal, singlepage } = useGlobalContext();
  return (
    <div>
      <Modal
        style={{
          display: "grid",
          placeItems: "center",
          placeContent: "center",
        }}
        open={amnetymodal}
        onClose={() => setamnetymodal(false)}
      >
        <div className="amnety_modal_container">
          <div
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              width: "100%",
              borderBottom: "1px solid lightgray",
              backgroundColor: "#fff",
              zIndex: 1400,
            }}
            className="gallery_modal_head"
          >
            <div
              className="close_modal_container"
              style={{
                padding: "19px 14px 0 14px",
                display: "flex",
                justifyContent: "flex-start",
                backgroundColor: "#fff",
              }}
            >
              <ArrowBackIosIcon
                onClick={() => setamnetymodal(false)}
                style={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(34, 34, 34)",
                  cursor: "pointer",
                }}
              />
            </div>
            <Tabs
              onChange={handleChange}
              value={value}
              style={{ color: "black" }}
            >
              <Tab
                label="Hotel"
                className={`${value === 0 ? "one" : "a"}`}
                {...a11yProps(0)}
              />
              <Tab
                label="Room"
                className={`${value === 1 ? "one" : "a"}`}
                {...a11yProps(1)}
              />
            </Tabs>
          </div>
          {value === 0
            ? singlepage[0].facility.map((mapped) => {
                return (
                  <span
                    style={{
                      padding: "20px 20px 0px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: "10px",
                    }}
                    key={mapped.id}
                  >
                    <p>{mapped.name}</p>
                    <Icons icon={mapped.icon} />
                  </span>
                );
              })
            : singlepage[0].room_option.map((mapped) => {
                return (
                  <div
                    style={{ padding: "20px 20px 0px 20px" }}
                    key={mapped.id}
                  >
                    <h3
                      style={{
                        fontSize: "23px",
                        fontWeight: 700,
                        paddingBottom: "17px",
                      }}
                    >
                      {mapped.name}
                    </h3>
                    {mapped.room_amneties.map((mapped) => {
                      return (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingBottom: "10px",
                          }}
                          key={mapped.id}
                        >
                          <p>{mapped.name}</p>
                          <Icons icon={mapped.icon} />
                        </span>
                      );
                    })}
                  </div>
                );
              })}
        </div>
      </Modal>
    </div>
  );
};

export default AmnetyModal;
