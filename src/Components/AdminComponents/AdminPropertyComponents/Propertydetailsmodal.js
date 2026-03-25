import React, { useState } from "react";
import { Authaxios } from "../../Axios";
import Icons from "../../Icons";
import { useGlobalContext } from "../../Context";
import { TextField, Button, Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
function Propertydetailsmodal({ data }) {
  const { setalert, setalerttext, setalerttype } = useGlobalContext();
  const initialFormData = Object.freeze({
    discounted_price: "",
  });
  const [formData, setformData] = useState(initialFormData);
  const formchange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [available, setavailable] = useState(false);

  const handleChange = (e) => {
    if (e.target.checked) {
      setavailable(true);
    } else {
      setavailable(false);
    }
  };

  const change = (e) => {
    e.preventDefault();
    if (formData.discounted_price < data.obj[0].price) {
      Authaxios.post("/api/ChangeRoomDetails/", {
        id: data.obj[0].id,
        d_price: formData.discounted_price,
        available: available,
      }).then((res) => {
        setalert(true);
        setalerttype("success");
        setalerttext(
          `Price changed to ${formData.discounted_price}! Remember to remove the discounted price later`
        );
      });
    } else {
      setalert(true);
      setalerttype("error");
      setalerttext(
        `Discount price should be less than original price! If you wish to change real price contact us`
      );
    }
  };
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  const [oldamneties, setoldamneties] = useState(data.amne);

  const removeamnety = (e, id, name) => {
    if (changesmade !== "4125") {
      let al = oldamneties.find((el) => el === id);
      if (al) {
        setoldamneties(arrayRemove(oldamneties, id));
      } else {
        if (oldamneties) {
          setoldamneties((bmealadd) => [...bmealadd, id]);
        } else {
          setoldamneties(id);
        }
      }
    } else {
      setalert(true);
      setalerttype("error");
      setalerttext(
        `Wait some time before making changes or refresh the page if its urgent`
      );
    }
  };
  const [roomamnety, setroomamnety] = useState({
    data: [],
    active: false,
    loading: false,
  });
  const [changesmade, setchangesmade] = useState("asd");
  const getamnety = () => {
    setroomamnety({
      data: roomamnety.data,
      active: roomamnety.active,
      loading: true,
    });
    Authaxios.get("/api/roomamnety").then((res) => {
      setroomamnety({
        data: res.data,
        active: true,
        loading: false,
      });
      setedittype("");
    });
  };
  const [final, setfinal] = useState({
    added: [],
    removed: [],
  });
  const addconfirm = () => {
    Authaxios.post("/api/ChangeRoomDetails/", {
      id: data.obj[0].id,
      addamnety: oldamneties,
    }).then((res) => {
      setfinal({
        added: oldamneties,
        removed: final.removed,
      });
      setchangesmade("add");
      setalert(true);
      setalerttype("success");
      setalerttext(`Added SuccessFully! Refresh Page to See Changes`);
      setoldamneties([]);
    });
  };
  const [edittype, setedittype] = useState("");

  const confirm = (e) => {
    Authaxios.post("/api/ChangeRoomDetails/", {
      id: parseInt(data.obj[0].id),
      remove_amnety: oldamneties,
    }).then((res) => {
      setfinal({
        added: final.added,
        removed: oldamneties,
      });
      setchangesmade("remove");
      setalert(true);
      setalerttype("success");
      setalerttext(`Removed  SuccessFully! Refresh Page to See Changes`);
      setoldamneties([]);
    });
  };
  return (
    <div className="admin_property_room_body">
      {data.obj.map((rooms, i) => {
        let ok =
          changesmade === "add"
            ? roomamnety.data.filter((swines) =>
                final.added.includes(swines.id)
              )
            : changesmade === "remove"
            ? rooms.room_amneties.filter((swineq) =>
                final.removed.includes(swineq.id)
              )
            : rooms.room_amneties;
        return (
          <form key={i + 1} className="admin_property_room_modal">
            <div className="d_price_add">
              <h3>Add Discount Price To Attract Users</h3>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter Discounted Price"
                value={formData.discounted_price}
                onChange={formchange}
                name="discounted_price"
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" onClick={change}>
                      Submit
                    </Button>
                  ),
                }}
              />
            </div>
            <div className="available_switch">
              Room Not available due to some issues ?
              <Switch
                onChange={handleChange}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
            <div style={{ display: "grid", gridGap: "10px" }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h5 style={{ padding: "6px 0 " }}>
                  Remove Room Amneties if they are not there anymore
                </h5>
                <Button
                  style={{ textTransform: "none" }}
                  color="secondary"
                  onClick={() => {
                    setedittype("remove");
                    setroomamnety({
                      data: roomamnety.data,
                      active: false,
                      loading: roomamnety.loading,
                    });
                  }}
                  variant={edittype === "remove" ? "contained" : "outlined"}
                >
                  {edittype === "remove" ? "Editing" : "Remove"}
                </Button>
              </span>
              <div className="admin_room_amneties_container">
                {ok.map((mapped, i) => {
                  const { id, icon, name } = mapped;
                  return (
                    <div key={i + 1} className={`${"admin_room_amnety"}`}>
                      <Icons icon={icon} />
                      <p>{name}</p>
                      {edittype === "remove" && (
                        <Button onClick={(e) => removeamnety(e, id, name)}>
                          {oldamneties.find((el) => el === id)
                            ? "removed"
                            : "remove"}
                        </Button>
                      )}
                    </div>
                  );
                })}
                {roomamnety.active || (
                  <div
                    onClick={getamnety}
                    className="admin_room_amnety red_shadow"
                  >
                    <AddIcon className="admin_room_amnety_icon" />
                    {roomamnety.loading ? (
                      <div className="loading_btn">
                        <div className="dot1"> </div>
                        <div className="dot2"></div>
                        <div className="dot3"></div>
                      </div>
                    ) : (
                      <p>ADD</p>
                    )}
                  </div>
                )}
              </div>
              <Button onClick={edittype === "remove" ? confirm : addconfirm}>
                {edittype === "remove" ? "Remove all" : ""}
              </Button>
            </div>
          </form>
        );
      })}

      {roomamnety.active && (
        <div>
          <h5 style={{ padding: "6px 0 " }}>Add Room amnety</h5>
          <div className="admin_room_amneties_container">
            {roomamnety.data
              .filter((swine) => !data.amne.includes(swine.id))
              .map((mapped, i) => {
                const { id } = mapped;

                return (
                  <div key={i + 1} className={`${"admin_room_amnety"}`}>
                    <Icons icon={mapped.icon} />

                    <p>{mapped.name}</p>
                    <Button onClick={(e) => removeamnety(e, id, mapped.name)}>
                      {oldamneties.find((el) => el === id)
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </div>
                );
              })}
          </div>
          <Button variant="outlined" fullWidth onClick={addconfirm}>
            Add to your {data.obj[0].name}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Propertydetailsmodal;
