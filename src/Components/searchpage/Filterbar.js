import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Customaxios from "../Axios";
import "./CSS/Filterbar.css";
import Axios from "axios";
import {
  withStyles,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  Divider,
  Slider,
  Button,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
//icons
import CloseIcon from "@material-ui/icons/Close";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PeopleIcon from "@material-ui/icons/People";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Filterbar = ({ d }) => {
  const theme = createTheme({
    zIndex: {
      tooltip: d ? 300 : 198,
    },
  });

  function valueLabelFormat(value) {
    return `NPRS${value}`;
  }
  const FakeTransitionComponent = ({ children }) => children;

  function valueLabelComponent(props) {
    const { children, value } = props;
    return (
      <ThemeProvider theme={theme}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
          style={theme.zIndex}
          open={true}
          TransitionComponent={FakeTransitionComponent}
          placement="bottom"
          title={value}
        >
          {children}
        </Tooltip>
      </ThemeProvider>
    );
  }
  const PriceSlider = withStyles({
    root: {
      color: "red",
      height: 8,
    },
    thumb: {
      height: 21,
      width: 21,
      backgroundColor: "#fff",
      border: "1px solid rgb(0,0,0,0.3)",
      marginTop: -8,

      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-60% + 4px)",
    },
    track: {
      height: 4,
      borderRadius: 4,
    },
    rail: {
      height: 4,
      borderRadius: 4,
    },
  })(Slider);
  const { query } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { type } = useParams();
  const { ordering } = useParams();
  const { lat } = useParams();
  const { lon } = useParams();
  const { g_rating } = useParams();
  const { filter_id } = useParams();
  const history = useHistory();

  const {
    value,
    setValue,
    setalert,
    setalerttext,
    setalerttype,
    search_loading,
    max,
    min,
    searchdata,
    filter_data,
    setfilterdata,
    setmin,
    setmax,
  } = useGlobalContext();

  const removefilter = (d) => {
    let ft = filter_id ? filter_id : "";
    let cp = type ? type : "";
    let ord = ordering ? ordering : "";
    let g = g_rating ? g_rating : "";
    let urlq = `${url}/filter=${d === "facility" ? "" : ft}/type=${
      d === "couple" ? "" : cp
    }/guest_rating=${d === "rating" ? "" : g}/order=${
      d === "order" ? "" : ord
    }`;
    history.push(urlq.trim());
    let filterarray =
      filter_id && filter_id.split(",").map((maps) => parseFloat(maps));
    let cp_data =
      d !== "couple"
        ? type
          ? searchdata.filter((swine) => swine.couple_friendly === true)
          : searchdata
        : searchdata;
    let gabc =
      d !== "rating"
        ? g_rating
          ? cp_data.filter(
              (swine) => parseInt(swine.rating) > parseInt(g_rating)
            )
          : cp_data
        : cp_data;
    let amneties_data =
      d !== "facility"
        ? filter_id
          ? gabc.filter((swine) =>
              filterarray.every((ev) => swine.allamne.includes(ev))
            )
          : gabc
        : gabc;
    let price_filter =
      d !== "facility"
        ? amneties_data.filter(
            (swine) =>
              parseInt(swine.room_option[0].price) >= parseInt(value[0]) &&
              parseInt(swine.room_option[0].price) <= parseInt(value[1])
          )
        : amneties_data;
    setfilterdata(price_filter);
  };
  const [hotelamnety, sethotelamnety] = useState([]);

  const clearfilter = () => {
    history.push(`${url}/filter=/type=/guest_rating=/order=`);
    setfilterdata([]);
    setValue([min, max]);
  };
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      Customaxios.get("/api/facility/")
        .then((res) => {
          sethotelamnety(res.data.facility);
          setmin(parseInt(res.data.price.min.s));
          setmax(parseInt(res.data.price.max.s));
          setValue([
            parseInt(res.data.price.min.s),
            parseInt(res.data.price.max.s),
          ]);
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
  }, [setValue, setmax, setmin]);
  const [facility_filter, setfacility_filter] = useState(false);
  let lessfaci = hotelamnety.slice(0, 8);

  let url = `/search/${query}/checkin=${check_in}/checkout=${check_out}/guest=${guestcount}/room=${roomcount}/latitude=${lat}/longitude=${lon}`;

  function distances(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }

      return dist;
    }
  }
  useEffect(() => {
    let filteron =
      value[0] !== min ||
      value[1] !== max ||
      filter_id ||
      g_rating ||
      type ||
      ordering
        ? true
        : false;
    if (search_loading === false && filteron) {
      let filterarray =
        filter_id && filter_id.split(",").map((maps) => parseFloat(maps));

      let qabc = type
        ? searchdata.filter((swine) => swine.couple_friendly === true)
        : searchdata;
      let gabc = g_rating
        ? qabc.filter((swine) => parseInt(swine.rating) > parseInt(g_rating))
        : qabc;
      let amneties_data = filter_id
        ? gabc.filter((swine) =>
            filterarray.every((ev) => swine.allamne.includes(ev))
          )
        : gabc;
      let lastdata =
        value[0] !== min || value[1] !== max
          ? amneties_data.filter(
              (swine) =>
                parseInt(swine.min_price) >= parseInt(value[0]) &&
                parseInt(swine.max_price) <= parseInt(value[1])
            )
          : amneties_data;
      if (ordering === "show_nearby") {
        let abc = [...lastdata].sort(function (a, b) {
          if (
            distances(
              parseFloat(lat),
              parseFloat(lon),
              parseFloat(a.lats),
              parseFloat(a.lons),
              "K"
            ) <
            distances(
              parseFloat(lat),
              parseFloat(lon),
              parseFloat(b.lats),
              parseFloat(b.lons),
              "K"
            )
          ) {
            return -1;
          }
        });
        setfilterdata(abc);
      } else if (ordering === "price_high_to_low") {
        let abc = [...lastdata].sort(
          (a, b) =>
            parseFloat(b.room_option[0].price) -
            parseFloat(a.room_option[0].price)
        );
        setfilterdata(abc);
      } else if (ordering === "price_low_to_high") {
        let abc = [...lastdata].sort(
          (a, b) =>
            parseFloat(a.room_option[0].price) -
            parseFloat(b.room_option[0].price)
        );
        setfilterdata(abc);
      } else if (ordering === "rating_high_to_low") {
        let abc = [...lastdata].sort(
          (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
        );

        setfilterdata(abc);
      } else {
        setfilterdata(lastdata);
      }
    }
  }, [
    lat,
    lon,
    filter_data.length,
    filter_id,
    g_rating,
    search_loading,
    setfilterdata,
    searchdata,
    ordering,
    type,
    max,
    min,
    value,
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (!sessionStorage.getItem("price_filter")) {
      setalert(true);
      setalerttext(
        "Price filter filters result on all the room available so kindly see the room options as well"
      );
      setalerttype("info");
      sessionStorage.setItem("price_filter", true);
    }
  };

  const tab_screen = useMediaQuery("(max-width:1200px)");
  let fac = tab_screen ? hotelamnety : facility_filter ? hotelamnety : lessfaci;
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  const Ticker = (e, name) => {
    let cp = type ? type : "";
    let ord = ordering ? ordering : "";
    let g = g_rating ? g_rating : "";
    let filterarray =
      filter_id && filter_id.split(",").map((maps) => parseFloat(maps));

    if (e.target.checked === false) {
      let filteredid = arrayRemove(filterarray, name);
      let stringfilter = filteredid.toString();

      history.push(
        `${url}/filter=${stringfilter}/type=${cp}/guest_rating=${g}/order=${ord}`
      );
    } else {
      if (filter_id) {
        filterarray.push(name);

        let stringfilter = filterarray.toString();
        history.push(
          `${url}/filter=${stringfilter}/type=${cp}/guest_rating=${g}/order=${ord}`
        );
      } else {
        history.push(
          `${url}/filter=${name}/type=${cp}/guest_rating=${g}/order=${ord}`
        );
      }
    }
  };

  const setrating = (z) => {
    let ft = filter_id ? filter_id : "";
    let cp = type ? type : "";
    let ord = ordering ? ordering : "";

    history.push(
      `${url}/filter=${ft}/type=${cp}/guest_rating=${parseInt(z)}/order=${ord}`
    );
  };

  const changetype = (t) => {
    let ft = filter_id ? filter_id : "";
    let cp = type ? type : "";
    let ord = ordering ? ordering : "";
    let g = g_rating ? g_rating : "";

    if (t === "couple_friendly") {
      if (cp === "couple_friendly") {
        removefilter("couple");
      } else {
        history.push(
          `${url}/filter=${ft}/type=couple_friendly/guest_rating=${g}/order=${ord}`
        );
      }
    } else if (t === "family_friendly") {
      history.push(
        `${url}/filter=${ft}/type=family_friendly/guest_rating=${g}/order=${ord}`
      );
    }
  };
  return (
    <div className="aside">
      <aside className="filter">
        <div className="filter_header_container">
          <span>
            <h1>Filters</h1>

            <h4 style={{ fontWeight: "800" }}>Prices</h4>
          </span>
          <Button
            onClick={clearfilter}
            style={{
              color: "red",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
            }}
            size="small"
            endIcon={<CloseIcon />}
          >
            Clear Filters
          </Button>
        </div>

        <div className="price_slider">
          <PriceSlider
            size="large"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="false"
            ValueLabelComponent={valueLabelComponent}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
          />
        </div>

        <div className="type_filter_container">
          <Divider style={{ marginLeft: "-2vw" }} />

          <div className="type_filter">
            <h3 className="filter_header">Hotel Types</h3>
            <FormControlLabel
              style={{
                marginTop: "1vh",
                paddingTop: "0px",
              }}
              control={
                <Checkbox
                  checked={type === "couple_friendly" ? true : false}
                  color="secondary"
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  onClick={() => changetype("couple_friendly")}
                />
              }
              label={<p>Couples Friendly</p>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={type === "family_friendly" ? true : false}
                  color="primary"
                  icon={<PeopleOutlineIcon />}
                  checkedIcon={<PeopleIcon />}
                  onClick={() => changetype("family_friendly")}
                />
              }
              label={<p>Family Friendly</p>}
            />
          </div>
        </div>
        <div className="star_filter">
          <Divider style={{ marginLeft: "-2vw" }} />
          <h3 className="filter_header">Guest Rating</h3>
          {g_rating ? (
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<CloseIcon />}
              onClick={() => removefilter("rating")}
            >
              Clear
            </Button>
          ) : (
            ""
          )}
          <div className="rat_btn_grp">
            <Button
              endIcon={
                tab_screen && (
                  <TrendingUpIcon
                    style={{ color: "green", fontSize: " 1.875rem" }}
                  />
                )
              }
              style={{
                textTransform: "none",
              }}
              onClick={() => setrating(4)}
            >
              <Rating
                className="ratingqw"
                size={tab_screen ? "large" : "medium"}
                name="hover-feedback"
                value={5}
                readOnly
              />
              {tab_screen && <span>Higher than 4 </span>}
            </Button>
            <Button
              endIcon={
                tab_screen && (
                  <TrendingUpIcon
                    style={{ color: "green", fontSize: " 1.875rem" }}
                  />
                )
              }
              style={{
                textTransform: "none",
              }}
              onClick={() => setrating(3)}
            >
              <Rating
                size={tab_screen ? "large" : "medium"}
                name="hover-feedback"
                value={4}
                readOnly
              />
              {tab_screen && <span>Higher than 3</span>}
            </Button>

            <Button
              endIcon={
                tab_screen && (
                  <TrendingUpIcon
                    style={{ color: "green", fontSize: " 1.875rem" }}
                  />
                )
              }
              style={{
                textTransform: "none",
              }}
              onClick={() => setrating(2)}
            >
              <Rating
                size={tab_screen ? "large" : "medium"}
                name="hover-feedback"
                value={3}
                readOnly
              />
              {tab_screen && <span>Higher than 2</span>}
            </Button>
            <Button
              endIcon={
                tab_screen && (
                  <TrendingUpIcon
                    style={{ color: "green", fontSize: " 1.875rem" }}
                  />
                )
              }
              style={{
                textTransform: "none",
              }}
              onClick={() => setrating(1)}
            >
              <Rating
                size={tab_screen ? "large" : "medium"}
                name="hover-feedback"
                value={2}
                readOnly
              />
              {tab_screen && <span>Higher than 1</span>}
            </Button>
          </div>
        </div>
        <div>
          <Divider style={{ marginLeft: "-2vw" }} />

          <h3 className="filter_header">Hotel Facility</h3>
          <div className="facility_filter">
            {fac.map((mapped) => {
              let a = filter_id && filter_id.split(",");

              return (
                <div key={mapped.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        id={mapped.name}
                        checked={
                          filter_id &&
                          a.find((el) => el === mapped.id.toString())
                            ? true
                            : false
                        }
                        // checkedIcon={<CropSquareIcon />}
                        onClick={(e) => Ticker(e, mapped.id)}
                      />
                    }
                    label={<p>{mapped.name}</p>}
                  />
                </div>
              );
            })}
          </div>
          {tab_screen ||
            (hotelamnety.length > 8 && (
              <h3
                onClick={() => setfacility_filter(!facility_filter)}
                style={{ color: "red", cursor: "pointer" }}
              >
                Show {facility_filter ? "Less" : "More"}
              </h3>
            ))}
        </div>
      </aside>
    </div>
  );
};

export default Filterbar;
