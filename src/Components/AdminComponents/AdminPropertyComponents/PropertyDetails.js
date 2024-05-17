import React, { useState, useEffect } from "react";
import "./CSS/PropertyDetails.css";
import { useGlobalContext } from "../../Context";
import { Authaxios } from "../../Axios";
import { useParams, useHistory } from "react-router-dom";
import Icons from "../../Icons";
//propertydetails components
import APropertyImages from "./APropertyImages";
import Propertydetailsmodal from "./Propertydetailsmodal";
import MealModal from "./MealModal";
import FacilityEdit from "./FacilityEdit";
import AdminPropertyRoom from "./AdminPropertyRoom";
//material ui
import {
  Button,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

//icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
function PropertyDetails(dat) {
  const history = useHistory();
  const { amnetymodal } = useParams();

  const {
    admin_priceref,
    setalert,
    setalerttext,
    setalerttype,
    adminimg,
    setadminimg,
    setmailmodal,
    setmailtext,
    mselect,
    setmselect,
  } = useGlobalContext();
  const { data } = dat;
  const handleClose = () => {
    setadminimg(false);
  };
  const [roomedit, setroomedit] = useState(false);
  const [roommodal, setroommodal] = useState(
    amnetymodal === "true" ? true : false
  );

  const closeroommodal = () => {
    history.push("/adminproperty/");

    setroommodal(false);
  };
  const [roomid, setroomid] = useState({
    amne: [],
    obj: [],
  });
  const openroommodal = (id, a, p, dat) => {
    history.push("/adminproperty/true");
    setroommodal(true);
    setroomid({
      amne: dat.map((mapped) => parseFloat(mapped.id)),
      obj: data.room_option.filter((swine) => swine.id === id),
    });
  };

  useEffect(() => {
    if (alert === true) {
      setTimeout(function one() {
        setalert(false);
        setalerttext("");
      }, 10000);
    }
  }, [setalert, setalerttext]);

  //remove meal
  const [mealedit, setmealedit] = useState(false);
  const [removemeal, setremovemeal] = useState({
    mealid: "",
    mealname: "",
    mealprice: "",
  });
  const [removedialog, setremovedialog] = useState(false);
  const opendialog = (id, name) => {
    setremovemeal({
      mealid: id,
      mealname: name,
    });
    setremovedialog(true);
  };
  const removemealconfirm = (e) => {
    Authaxios.post("/api/mealadd/1/", {
      mealid: removemeal.mealid,
      remove: true,
    }).then((res) => {
      setremovedialog(false);
      setalert(true);
      setalerttype("success");
    });
  };
  //change meal
  const changemealmodal = (id, name) => {
    console.log(name);
    console.log(id);
    setchangemeal(true);
    setremovemeal({
      mealid: id,
      mealname: name,
    });
  };

  const [changemeal, setchangemeal] = useState(false);
  const [free, setfree] = useState("");

  const changemealsubmit = (e) => {
    e.preventDefault();
    let free_boolean = free === "yes" ? true : false;
    Authaxios.post("/api/mealadd/1/", {
      mealid: removemeal.mealid,
      changed_price: removemeal.mealprice,
      free: free_boolean,
    }).then((res) => {
      setchangemeal(false);
      setalert(true);
      setalerttype("success");
    });
  };
  const openmodal = (a) => {
    setadminimg(true);
    setmselect(a);
  };
  const openmailmodal = () => {
    setmailmodal(true);
    setmailtext("changelocation");
  };
  return (
    <div className="admin_property_details">
      <div className="admin_property_details">
        <span className="admin_property__card">
          <h6>Photos</h6>
          <Button
            onClick={() => openmodal("img")}
            style={{ color: "green" }}
            variant="outlined"
          >
            Edit
          </Button>
        </span>
        <div
          style={{ backgroundImage: `url(${data.hotel_dp.img})` }}
          className="image_all"
        ></div>

        <Modal
          style={{
            display: "grid",
            placeContent: "center",
            placeItems: "center",
          }}
          open={adminimg}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div>
            {mselect === "img" ? (
              <APropertyImages />
            ) : mselect === "addroom" ? (
              <AdminPropertyRoom />
            ) : mselect === "addmeal" ||
              mselect === "addmealss" ||
              mselect === "addmenu" ? (
              <MealModal />
            ) : (
              <FacilityEdit data={data.facility} />
            )}
          </div>
        </Modal>
      </div>
      <div className="admin_property_details ">
        <span className="admin_property__card">
          <h6>Facility</h6>
          <Button
            onClick={() => openmodal("facility")}
            style={{ color: "green" }}
            variant="outlined"
          >
            Edit
          </Button>
        </span>
        <div className="facility_admin">
          {data.facility.map((facility, i) => {
            return (
              <div key={i + 1} className="facility_container">
                <Icons icon={facility.icon} />
                <span style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                  {facility.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="admin_property_roomdetails" ref={admin_priceref}>
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
          <h6>Room Options</h6>
          <Button
            onClick={() => setroomedit(!roomedit)}
            style={{ color: "green" }}
            variant="outlined"
          >
            Edit
          </Button>
        </span>

        <div className="room_admin">
          <Modal
            style={{
              display: "grid",
              placeContent: "center",
              placeItems: "center",
            }}
            open={roommodal}
            onClose={closeroommodal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div>
              <Propertydetailsmodal data={roomid} />
            </div>
          </Modal>
          <table className="pdetail_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Discounted price</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {data.room_option.map((room, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{room.name}</td>
                    <td>{room.price}</td>
                    <td>{room.discounted_price}</td>
                    <td>
                      {room.room_available ? (
                        <CheckCircleIcon style={{ color: "blue" }} />
                      ) : (
                        <CancelIcon style={{ color: "red" }} />
                      )}
                      {roomedit && (
                        <Button
                          onClick={() =>
                            openroommodal(
                              room.id,
                              room.room_available,
                              room.discounted_price,
                              room.room_amneties
                            )
                          }
                          style={{ color: "green" }}
                          variant="outlined"
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {roomedit && (
            <Button onClick={() => openmodal("addroom")} variant="outlined">
              ADD Room
            </Button>
          )}
        </div>
      </div>
      <div className="admin_property_details">
        <span className="admin_property__card">
          <h6>Location</h6>
          <Button
            onClick={openmailmodal}
            style={{ color: "green" }}
            variant="outlined"
          >
            Edit
          </Button>
        </span>
        <div className="admin_property_map">
          <iframe
            className="map_singlepage"
            title="Hotel location in map"
            style={{ width: "100%", height: "453px", border: "0" }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?q=${data.latitude}
         ${data.longitude}&zoom=15&key=AIzaSyAfzROi-MUnYq4YdDoWGAQ7DXzkXTCem3A`}
          ></iframe>
        </div>
      </div>
      <div className="admin_property_details">
        <span className="admin_property__card">
          <h6>Special Meals</h6>
          <Button
            onClick={() => setmealedit(!mealedit)}
            style={{ color: "green" }}
            variant="outlined"
          >
            Edit
          </Button>
        </span>

        <div>
          <Dialog
            open={removedialog}
            onClose={() => setremovedialog(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Are you sure u want to Remove {removemeal.mealname} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => setremovedialog(false)}
                color="primary"
              >
                No
              </Button>
              <Button onClick={removemealconfirm} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          {data.propertymeals ? (
            <div className="admin_property_roomdetails">
              <Modal
                style={{
                  display: "grid",
                  placeContent: "center",
                  placeItems: "center",
                }}
                open={changemeal}
                onClose={() => setchangemeal(false)}
              >
                <div className="change_meal_admin">
                  <form>
                    {data.propertymeals
                      .filter(
                        (swine) => swine.id === parseInt(removemeal.mealid)
                      )
                      .map((mapped, i) => {
                        return (
                          <span
                            key={i + 1}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontWeight: 600,
                              fontSize: "1.5rem",
                            }}
                          >
                            Edit for {mapped.name}
                            <EditIcon style={{ color: "grey" }} />
                          </span>
                        );
                      })}
                    <span>
                      <h6>Enter New Price</h6>

                      <TextField
                        value={removemeal.mealprice}
                        onChange={(e) =>
                          setremovemeal({
                            ...removemeal,
                            mealprice: e.target.value,
                          })
                        }
                        variant="outlined"
                        fullWidth
                      />
                    </span>
                    <span>
                      <h6>Is This Complementry or Free ?</h6>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          size="large"
                          endIcon={
                            free === "yes" && (
                              <CheckCircleIcon style={{ color: "blue" }} />
                            )
                          }
                          onClick={() => setfree("yes")}
                        >
                          Yes
                        </Button>
                        <Button
                          size="large"
                          variant="outlined"
                          color="secondary"
                          endIcon={
                            free === "no" && (
                              <CheckCircleIcon style={{ color: "blue" }} />
                            )
                          }
                          onClick={() => setfree("no")}
                        >
                          No
                        </Button>
                      </span>
                    </span>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={changemealsubmit}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </Modal>
              <table className="pdetail_table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>status</th>
                    <th>Price</th>
                    {mealedit && <th>Edit</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.propertymeals.map((meal, i) => {
                    return (
                      <tr key={i + 1}>
                        <td>{meal.name}</td>
                        <td>{meal.free ? "Free" : "Paid"}</td>
                        <td>{meal.price}</td>
                        {mealedit && (
                          <td>
                            {
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <EditIcon
                                  onClick={() =>
                                    changemealmodal(meal.id, meal.name)
                                  }
                                  style={{ color: "green" }}
                                />
                                <CloseIcon
                                  onClick={() => opendialog(meal.id, meal.name)}
                                  style={{ color: "red" }}
                                />
                              </span>
                            }
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h3>Add Meals</h3>
          )}
          {mealedit && (
            <Button
              fullWidth
              onClick={() => openmodal("addmeal")}
              variant="outlined"
            >
              Add
            </Button>
          )}
        </div>
      </div>

      <span className="admin_property__card">
        <h6>Menu</h6>
        <Button
          onClick={() => setmealedit(!mealedit)}
          style={{ color: "green" }}
          variant="outlined"
        >
          Edit
        </Button>
      </span>
      <div>
        <table className="pdetail_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>status</th>
              <th>Price</th>
              {mealedit && <th>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {data.menu.map((meal, i) => {
              return (
                <tr key={i + 1}>
                  <td>{meal.name}</td>
                  <td>{meal.free ? "Free" : "Paid"}</td>
                  <td>{meal.price}</td>
                  {mealedit && (
                    <td>
                      {
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <EditIcon
                            onClick={() => changemealmodal(meal.id, meal.name)}
                            style={{ color: "green" }}
                          />
                          <CloseIcon
                            onClick={() => opendialog(meal.id, meal.name)}
                            style={{ color: "red" }}
                          />
                        </span>
                      }
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button onClick={() => openmodal("addmenu")}>Add items on menu</Button>
      </div>
    </div>
  );
}

export default PropertyDetails;
