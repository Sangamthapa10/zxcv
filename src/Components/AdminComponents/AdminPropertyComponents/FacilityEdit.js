import React, { useState, useEffect } from "react";
import "./CSS/Facilityedit.css";
import Icons from "../../Icons";
import { Authaxios } from "../../Axios";
import Customaxios from "../../Axios";
import { useGlobalContext } from "../../Context";
import Axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
function FacilityEdit({ data }) {
  const {
    setadminimg,
    setalerttype,
    setalert,
    setalerttext,
    setkeymodal,
    setreqadmin,
    setadminreqdata,
  } = useGlobalContext();

  const [open, setOpen] = useState(false);
  const [aname, setaname] = useState("");
  const [addopen, setaddOpen] = useState(false);
  const addconfirm = () => {
    let a = facadd.length > 0 && facadd.split(",");
    const c = a.filter((el) => {
      return el != null && el !== "";
    });
    let b = c.map((mapped) => parseInt(mapped));
    Authaxios.post("/api/modify_request/asd/", {
      facility_id: b,
    }).then((res) => {
      setadminimg(false);
      setalert(true);
      setalerttype("success");
      setalerttext("Posted we will contact u soon");
    });
  };
  const removeamnety = (e, id, name) => {
    setOpen(true);
    setaname(name);
  };

  const confirm = () => {
    let a = facadd.length > 0 && facadd.split(",");
    const c = a.filter((el) => {
      return el != null && el !== "";
    });
    let b = c.map((mapped) => parseInt(mapped));
    Authaxios.post("/api/facility/", {
      facility_id: b,
    }).then((res) => {
      setadminimg(false);
      setalert(true);
      setalerttype("success");
      setalerttext("Posted we will contact u soon");
    });
  };

  const [facadd, setfacadd] = useState([]);

  const add = (e, b, id, name) => {
    let a = facadd.length > 0 && facadd.split(",");

    if (b.toString() === "false") {
      if (facadd) {
        setfacadd((facadd) => facadd + "," + id);
      } else {
        setfacadd(id);
      }
    } else {
      if (a.length === 1) {
        setfacadd([]);
      } else {
        let lengthid = id.toString().length;
        let firstword = a.slice(0, lengthid);
        console.log(firstword);
        if (parseInt(firstword) === parseInt(id)) {
          let a = facadd.replace(`${id},`, "");
          setfacadd(a);
        } else {
          let ac = facadd.replace(`,${id}`, "");
          setfacadd(ac);
        }
      }
    }
  };

  const [hotelamnety, sethotelamnety] = useState([]);
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      Customaxios.get("/api/modify_request/a")
        .then((res) => {
          if (res.data.requested) {
            sethotelamnety(res.data.facility);

            setkeymodal(true);
            setreqadmin(true);
            setadminreqdata(res.data.requested);
          } else {
            sethotelamnety(res.data);
          }
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
  }, [setkeymodal, setadminreqdata, setreqadmin]);
  let removed = data.map((mapped) => parseInt(mapped.id));

  return (
    <div className="admin_property_room_body">
      <div className="facility_edit_container">
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure u want to Remove {aname} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpen(false)} color="primary">
              No
            </Button>
            <Button onClick={confirm} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={addopen}
          onClose={() => setaddOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure u want to Add {aname} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setaddOpen(false)} color="primary">
              No
            </Button>
            <Button onClick={addconfirm} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div className="admin_amnety_body">
          <h1>Remove</h1>
          <div className="admin_room_amneties_container">
            {data.map((mapped, i) => {
              const { id, icon, name } = mapped;
              return (
                <div key={i + 1} className={`${"admin_room_amnety"}`}>
                  <Icons icon={icon} />
                  <p>{name}</p>
                  <Button onClick={(e) => removeamnety(e, id, name)}>
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin_amnety_body">
          <h1>Add</h1>
          <div className="admin_room_amneties_container">
            {hotelamnety
              .filter((swine) => !removed.includes(swine.id))
              .map((mapped, i) => {
                const { id, name } = mapped;
                let a = facadd.length > 0 && facadd.split(",");
                let b =
                  a && a.find((el) => el === id.toString()) ? "true" : "false";
                return (
                  <div key={i + 1} className={`${"admin_room_amnety"}`}>
                    <Icons icon={mapped.icon} />
                    <p>{mapped.name}</p>.{" "}
                    <Button onClick={(e) => add(e, b, id, name)}>
                      {facadd.length > 0
                        ? a.find((el) => el === id.toString())
                          ? "Added"
                          : "Add"
                        : "Add"}
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>
        <Button onClick={addconfirm}>Confirm</Button>
      </div>
    </div>
  );
}

export default FacilityEdit;
