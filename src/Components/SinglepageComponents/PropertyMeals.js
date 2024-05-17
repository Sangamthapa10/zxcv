import React, { useState, useEffect } from "react";
import "./CSS/Propertymeals.css";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { Button, useMediaQuery, Modal } from "@material-ui/core";
//icons
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Hotel from "../SvgComponents/Mealsvg";

function PropertyMeals({ data, menu, booking }) {
  const matches = useMediaQuery("(max-width:425px)");
  const mob = useMediaQuery("(max-width:900px)");
  const {
    setbmealadd,
    selectedmeal,
    bmealadd,
    smmeal,
    setsmmeal,
    setselectedmeal,
  } = useGlobalContext();
  const [all, setall] = useState(false);
  var sliced = all ? data : data.slice(0, matches ? 4 : 3);
  const [btntext, setbtntext] = useState(false);
  const { id } = useParams();
  const { name } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { selectedroom } = useParams();
  const { mealid } = useParams();
  const history = useHistory();
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  useEffect(() => {
    if (mealid) {
      if (selectedmeal.length !== mealid.length) {
        let arr = mealid.split(",").map((mapped) => parseInt(mapped));
        let ar = [];
        let all = [...data, ...menu];
        for (let i = 0; i < arr.length; i++) {
          let item = all.filter((s) => s.id === arr[i]);
          ar.push({
            id: arr[i],
            quantity: item[0].image ? guestcount : 1,
            name: item[0].name,
            price: item[0].price,
            type: item[0].image ? "meal" : "menu",
          });
        }
        console.log(ar);
        setselectedmeal(ar);
      }
    }
  }, [mealid, selectedmeal.length, guestcount, setselectedmeal, data, menu]);

  const seta = (bc, i) => {
    let url = `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}`;
    setbtntext(!btntext);
    let meala = mealid && mealid.length > 0 && mealid.split(",");
    if (!booking) {
      if (!mob) {
        if (bc.toString() === "false") {
          if (mealid) {
            let a = mealid + "," + i;
            history.push(`${url}/meals=${a}/bookingmodal=false`);
          } else {
            history.push(`${url}/meals=${i}/bookingmodal=false`);
          }
        } else {
          if (meala.length === 1) {
            let a = mealid.replace(`${i}`, "");
            history.push(`${url}/meals=${a}/bookingmodal=false`);
          } else {
            let lengthid = i.toString().length;
            let firstword = mealid.slice(0, lengthid);
            if (parseInt(firstword) === parseInt(i)) {
              let a = mealid.replace(`${i},`, "");
              history.push(`${url}/meals=${a}/bookingmodal=false`);
            } else {
              let a = mealid.replace(`,${i}`, "");
              history.push(`${url}/meals=${a}/bookingmodal=false`);
            }
          }
        }
      } else {
        if (bc.toString() === "false") {
          if (smmeal) {
            setsmmeal((smmeal) => [...smmeal, i]);
          } else {
            setsmmeal(i);
          }
        } else {
          setsmmeal(arrayRemove(smmeal, i));
        }
      }
    } else {
      let al = bmealadd.find((el) => el === i);
      if (al) {
        setbmealadd(arrayRemove(bmealadd, i));
      } else {
        if (bmealadd) {
          setbmealadd((bmealadd) => [...bmealadd, i]);
        } else {
          setbmealadd(i);
        }
      }
    }
  };
  const [foodmodal, setfoodmodal] = useState({
    status: false,
    type: "",
  });
  const [fooddata, setfooddata] = useState([]);
  const openmodal = () => {
    const groupBy = (key) => (array) =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key].toLowerCase();
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});
    const groupByBrand = groupBy("category");

    const carsByBrand = groupByBrand(menu);
    const carBrands = Object.entries(carsByBrand).map(([title, data]) => ({
      title,
      data,
    }));
    setfooddata(carBrands);
    setfoodmodal({
      ...foodmodal,
      status: true,
    });
  };
  return (
    <div style={{ minWidth: "100%", display: "grid", gridGap: "10px" }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="title__"> Special Meals</h1>
        <Button
          style={{ textTransform: "none" }}
          variant="outlined"
          onClick={openmodal}
        >
          Show Menu
        </Button>
      </span>

      <Modal
        style={{
          display: "grid",
          placeItems: "center",
          placeContent: "center",
        }}
        open={foodmodal.status}
        onClose={() => setfoodmodal({ ...foodmodal, status: false })}
      >
        <div style={{ position: "relative" }} className="menu_modal_body">
          <div className="close_icon_menu">
            <HighlightOffIcon
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={() => setfoodmodal({ ...foodmodal, status: false })}
            />
          </div>
          <div className="menu_body">
            {fooddata.map((mapped, i) => {
              return (
                <div className="menu_item_container" key={i + 1}>
                  <h2>{mapped.title}</h2>
                  {mapped.data.map((mapped) => {
                    let a = booking
                      ? bmealadd
                      : mob
                      ? smmeal
                      : mealid && mealid.split(",");
                    let bc =
                      mealid && a.find((el) => el === mapped.id.toString())
                        ? "true"
                        : "false";
                    const { id, name, price } = mapped;
                    return (
                      <div className="menu_item" key={id}>
                        <h5>{name}</h5>
                        <div className="menu_item_pb">
                          <h5>Npr {price}</h5>
                          <Button
                            onClick={() => seta(bc, id)}
                            variant="outlined"
                            endIcon={
                              a &&
                              a.find(
                                (el) => el.toString() === mapped.id.toString()
                              ) && <FastfoodIcon />
                            }
                            style={{
                              textTransform: "none",
                              // color: "#fff",
                              // border: "1px solid #fff",
                            }}
                          >
                            {a
                              ? a.find(
                                  (el) => el.toString() === mapped.id.toString()
                                )
                                ? "Added"
                                : "Add"
                              : "Add"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {/* <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgb(0,0,0,0.9)",
              zIndex: -1,
              display: "grid",
              placeContent: "center",
            }}
          >
            <Hotel />
          </div> */}
        </div>
      </Modal>
      <div className="property_meal">
        {sliced.map((mapped, i) => {
          let a = booking
            ? bmealadd
            : mob
            ? smmeal
            : mealid && mealid.split(",");
          let bc =
            a && a.find((el) => el.toString() === mapped.id.toString())
              ? "true"
              : "false";
          return (
            <div key={i + 1} className="property__meal">
              <div className="meal_top">
                {mapped.image && (
                  <img src={mapped.image.img} alt="one" className="meal_dp" />
                )}
              </div>
              <h4 className="meal_name">{mapped.name} </h4>
              <p className="dot_text">{mapped.short_desc}</p>
              <h6 style={{ color: "red" }}>NPR {mapped.price}</h6>
              {mapped.free === true ? (
                <Button disabled variant="contained" color="primary">
                  Complimentary
                </Button>
              ) : (
                <Button
                  onClick={() => seta(bc, mapped.id)}
                  variant="outlined"
                  size="small"
                  endIcon={
                    a &&
                    a.find((el) => el.toString() === mapped.id.toString()) && (
                      <FastfoodIcon />
                    )
                  }
                  style={{
                    textTransform: "none",
                  }}
                >
                  {a
                    ? a.find((el) => el.toString() === mapped.id.toString())
                      ? "Added"
                      : "Add"
                    : "Add"}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {data.length > 3 ? (
        <Button style={{ textTransform: "none" }} onClick={() => setall(!all)}>
          <h5 style={{ color: "red", cursor: "pointer" }}>
            {`${all ? "Show Less" : "Show More"}`}
          </h5>
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default PropertyMeals;
