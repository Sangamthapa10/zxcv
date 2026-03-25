import React, { useEffect, useState } from "react";
import "./CSS/Mealmodal.css";
import { Authaxios } from "../../Axios";
import { useGlobalContext } from "../../Context";
import { Button, TextField } from "@mui/material";
import Axios from "axios";
//icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const MealModal = () => {
  const [img, setimg] = useState([]);
  const {
    setadminimg,
    setmselect,

    mselect,
    setalert,
    setalerttext,
    setalerttype,
  } = useGlobalContext();
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      if (mselect !== "addmenu") {
        Authaxios.get("/api/mealpic/")
          .then((res) => {
            setimg(res.data);
          })
          .catch((error) => {
            if (Axios.isCancel(error)) {
              console.log("AxiosCancel: caught cancel");
            }
          });
      }
    };
    fetchdata();
    return () => {
      source.cancel();
    };
  }, [mselect]);
  const [id, setid] = useState("");
  const select = (id, name) => {
    setid(id);
    setmselect("addmealss");
  };

  const submit = (e) => {
    e.preventDefault();
    let free_boolean = free === "yes" ? true : false;
    Authaxios.post("/api/mealadd/2/", {
      name: formData.name,
      img: mselect === "addmenu" ? null : id,
      desc: formData.short_desc,
      price: formData.price,
      free: free_boolean,
    }).then((res) => {
      setadminimg(false);
      setalert(true);
      setalerttype("success");
      setalerttext(
        mselect === "addmenu" ? "Menu updated" : "Added special item"
      );
    });
  };
  const initialFormData = Object.freeze({
    name: "",
    short_desc: "",
    price: "",
    free: "",
  });

  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [free, setfree] = useState("");

  return (
    <div className="admin_property_img_body">
      {mselect === "addmeal" && (
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
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
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
            <h4>Add Meals to your Property</h4>
          </div>
        </div>
      )}
      <div className="meal_admin_body">
        {mselect === "addmenu" || mselect === "addmealss" ? (
          <div>
            <span className="meal_modal_header">
              <Button onClick={() => setadminimg(false)} variant="outlined">
                <ArrowBackIosIcon />
              </Button>
              <h6>Add Meals to Your Property.</h6>
              <h6>Contact Us for more customization</h6>
            </span>
            <form className="modal_add_mealadmin">
              <span>
                <h6>Meal Name</h6>
                <TextField
                  fullWidth
                  name="name"
                  onChange={handleChange}
                  variant="outlined"
                />
              </span>
              <span>
                <h6>Write A short Desc</h6>
                <TextField
                  fullWidth
                  name="short_desc"
                  onChange={handleChange}
                  variant="outlined"
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
              <span>
                <h6>Enter Price</h6>
                <TextField
                  fullWidth
                  name="price"
                  onChange={handleChange}
                  variant="outlined"
                />
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {mselect === "addmenu" ||
                  img
                    .filter((swine) => swine.id === parseInt(id))
                    .map((mapped, i) => {
                      return (
                        <img
                          key={i + 1}
                          style={{ width: "300px", objectFit: "cover" }}
                          src={mapped.img}
                          alt="a"
                        />
                      );
                    })}
              </span>
              <Button
                variant="outlined"
                color="primary"
                onClick={submit}
                type="submit"
              >
                Add
              </Button>
            </form>
          </div>
        ) : (
          <div style={{ display: "grid", gridGap: "19px" }}>
            <h4>Choose Image that describes your meal the best</h4>
            <p>For customized picture ..please contact us</p>
            <div className="meal_container_admin">
              {img.map((mapped, i) => {
                console.log(mapped);
                return (
                  <div key={i + 1} className="meal_admin_add">
                    <img src={mapped.img} alt="a" />
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => select(mapped.id, mapped.name)}
                    >
                      Select
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealModal;
