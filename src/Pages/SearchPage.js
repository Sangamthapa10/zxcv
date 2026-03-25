import React, { useEffect } from "react";
import "./CSS/Searchpage.css";
import { useParams, useHistory } from "react-router-dom";
import Customaxios from "../Components/Axios";
import SearchMap from "../Components/searchpage/SearchMap";
import { useGlobalContext } from "../Components/Context";
import SearchLoading from "./SearchLoading";
import Filterbar from "../Components/searchpage/Filterbar";
import SearchHotelCard from "../Components/searchpage/SearchHotelCard";
import Error from "../Components/searchpage/Error";
//material ui
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  Modal,
  Button,
} from "@mui/material";
//icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import GradeIcon from "@mui/icons-material/Grade";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const theme = createTheme({
  zIndex: {
    modal: 201,
  },
});
const SearchPage = () => {
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
  const matches = useMediaQuery("(max-width:800px)");
  document.title = `Hotels ${query}`;
  const {
    allroom_modal,
    min,
    max,
    value,
    search_loading,
    setsearch_loading,
    searchbymap,
    searchdata,
    setsearchdata,
    filter_data,
    modalfilter,
    setmodalfilter,
  } = useGlobalContext();

  let filteron =
    value[0] !== min ||
    value[1] !== max ||
    filter_id ||
    g_rating ||
    type ||
    ordering
      ? true
      : false;

  let realdata = filteron ? filter_data : searchdata;
  useEffect(() => {
    let data = [
      
        {
          "amneties": {
            "data": [
              {
                "id": 2,
                "name": "Parking",
                "icon": "MoodIcon",
                "special": false
              }
            ],
            "total": 1
          },
          "liked": false,
          "allamne": [4, 5, 6, 7, 2],
          "dp_img": [
            {
              "name": "Bathroom",
              "img": "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "washroom",
              "id": 22
            },
            {
              "name": "room",
              "img": "https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room_dp",
              "id": 23
            },
            {
              "name": "Facade",
              "img": "https://images.pexels.com/photos/4566719/pexels-photo-4566719.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "facade",
              "id": 24
            },
            {
              "name": "Room",
              "img": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room",
              "id": 25
            },
            {
              "name": "Nearby",
              "img": "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "nearby",
              "id": 26
            }
          ],
          "latitude": "27.7045811435828",
          "longitude": "85.3269887536312",
          "id": 4,
          "Name": "Hotel Perfecto",
          "Address": "Khatri tol",
          "avg_count": 0,
          "room_option": [
            {
              "roomavailable": 40,
              "id": 3,
              "room_dp": {
                "name": "Room",
                "img": "http://localhost:8000/Static/images/userphotos/Room/steven-ungermann-aRT5UCf2MYY-unsplash.jpg",
                "category": "room",
                "id": 25
              },
              "name": "Double room",
              "price": 4999,
              "discount": null,
              "default_room": "d",
              "room_amneties": [
                {
                  "id": 4,
                  "name": "In House Restaurant",
                  "icon": "FastfoodIcon",
                  "special": false
                },
                {
                  "id": 5,
                  "name": "Bar",
                  "icon": "LocalBarIcon",
                  "special": false
                },
                {
                  "id": 6,
                  "name": "Laundry Service",
                  "icon": "LocalLaundryServiceIcon",
                  "special": false
                },
                {
                  "id": 7,
                  "name": "CC tv camera",
                  "icon": "videocamIcoN",
                  "special": false
                }
              ],
              "bed_count": 2,
              "booking_details": null
            }
          ],
          "couple_friendly": true,
          "family_friendly": false,
          "rating": 0
        },
        {
          "amneties": {
            "data": [
              {
                "id": 2,
                "name": "Parking",
                "icon": "MoodIcon",
                "special": false
              }
            ],
            "total": 1
          },
          "liked": false,
          "allamne": [5, 6, 7, 2],
          "dp_img": [
            {
              "name": "room",
              "img": "https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room_dp",
              "id": 23
            },
            {
              "name": "Bathroom",
              "img": "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "washroom",
              "id": 22
            },
            {
              "name": "Facade",
              "img": "https://images.pexels.com/photos/4566719/pexels-photo-4566719.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "facade",
              "id": 24
            },
            {
              "name": "Room",
              "img": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room",
              "id": 25
            },
            {
              "name": "Nearby",
              "img": "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "nearby",
              "id": 26
            }
          ],
          "latitude": "27.7045811435828",
          "longitude": "85.3269887536312",
          "id": 3,
          "Name": "Hotel Sangam",
          "Address": "Khatri tol",
          "avg_count": 0,
          "room_option": [
            {
              "roomavailable": 7,
              "id": 4,
              "room_dp": {
                "name": "sad",
                "img": "http://localhost:8000/Static/images/userphotos/sad/TD90pdvct2lOmCee.jpg",
                "category": "room_dp",
                "id": 15
              },
              "name": "Deluxe Room",
              "price": 8900,
              "discount": null,
              "default_room": "d",
              "room_amneties": [
                {
                  "id": 5,
                  "name": "Bar",
                  "icon": "LocalBarIcon",
                  "special": false
                },
                {
                  "id": 6,
                  "name": "Laundry Service",
                  "icon": "LocalLaundryServiceIcon",
                  "special": false
                },
                {
                  "id": 7,
                  "name": "CC tv camera",
                  "icon": "videocamIcoN",
                  "special": false
                }
              ],
              "bed_count": 1,
              "booking_details": null
            }
          ],
          "couple_friendly": true,
          "family_friendly": false,
          "rating": 0
        },
        {
          "amneties": {
            "data": [
              {
                "id": 2,
                "name": "Parking",
                "icon": "MoodIcon",
                "special": false
              }
            ],
            "total": 1
          },
          "liked": false,
          "allamne": [1, 2, 2],
          "dp_img": [
            {
              "name": "Facade",
              "img": "https://images.pexels.com/photos/4566719/pexels-photo-4566719.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "facade",
              "id": 24
            },
            {
              "name": "Bathroom",
              "img": "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "washroom",
              "id": 22
            },
            {
              "name": "room",
              "img": "https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room_dp",
              "id": 23
            },
            {
              "name": "Room",
              "img": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room",
              "id": 25
            },
            {
              "name": "Nearby",
              "img": "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "nearby",
              "id": 26
            }
          ],
          "latitude": "27.7045811435828",
          "longitude": "85.3269887536312",
          "id": 2,
          "Name": "Hotel Peace",
          "Address": "Khatri tol",
          "avg_count": 0,
          "room_option": [
            {
              "roomavailable": 2,
              "id": 5,
              "room_dp": {
                "name": "Room",
                "img": "http://localhost:8000/Static/images/userphotos/Room/steven-ungermann-aRT5UCf2MYY-unsplash.jpg",
                "category": "room",
                "id": 25
              },
              "name": "Deluxe Room",
              "price": 5600,
              "discount": null,
              "default_room": "d",
              "room_amneties": [
                {
                  "id": 1,
                  "name": "Air Conditioning",
                  "icon": "ac_unit",
                  "special": false
                },
                {
                  "id": 2,
                  "name": "Parking",
                  "icon": "MoodIcon",
                  "special": false
                }
              ],
              "bed_count": 2,
              "booking_details": null
            }
          ],
          "couple_friendly": true,
          "family_friendly": false,
          "rating": 0
        },
        {
          "amneties": {
            "data": [
              {
                "id": 2,
                "name": "Parking",
                "icon": "MoodIcon",
                "special": false
              }
            ],
            "total": 1
          },
          "liked": false,
          "allamne": [1, 2],
          "dp_img": [
            {
              "name": "Facade",
              "img": "https://images.pexels.com/photos/4566719/pexels-photo-4566719.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "facade",
              "id": 24
            },
            {
              "name": "room",
              "img": "https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room_dp",
              "id": 23
            },
            {
              "name": "Bathroom",
              "img": "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "washroom",
              "id": 22
            },
            {
              "name": "Room",
              "img": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "room",
              "id": 25
            },
            {
              "name": "Nearby",
              "img": "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              "category": "nearby",
              "id": 26
            }
          ],
          "latitude": "27.7045811435828",
          "longitude": "85.3269887536312",
          "id": 1,
          "Name": "Hotel Peace",
          "Address": "Khatri tol",
          "avg_count": 0,
          "room_option": [
            {
              "roomavailable": 4,
              "id": 6,
              "room_dp": {
                "name": "Room",
                "img": "http://localhost:8000/Static/images/userphotos/Room/steven-ungermann-aRT5UCf2MYY-unsplash.jpg",
                "category": "room",
                "id": 25
              },
              "name": "Deluxe Room",
              "price": 6000,
              "discount": null,
              "default_room": "d",
              "room_amneties": [
                {
                  "id": 1,
                  "name": "Air Conditioning",
                  "icon": "ac_unit",
                  "special": false
                },
                {
                  "id": 2,
                  "name": "Parking",
                  "icon": "MoodIcon",
                  "special": false
                }
              ],
              "bed_count": 2,
              "booking_details": null
            }
          ],
          "couple_friendly": true,
          "family_friendly": false,
          "rating": 0
        }
      
      
    ];
    const l = Math.floor(lat);
    const lo = Math.floor(lon);
    setsearch_loading(true);
    let urls = `api/property/?${
      query === "nearby" ? `lat=${l}/lon=${lo}` : `&search=${`${query}`}`
    }`;
    Customaxios.get(urls.replace(/\s+/g, " ").trim())

      .then((res) => {
        setsearch_loading(false);
        const one = res.data;
        const two = one;
        if (one.count === 0) {
          setsearchdata([]);
        } else {
          setsearchdata(two);
        }
      })
      .catch((error) => {
        console.error('Network error:', error);

        // setsearchdata([]);
        setsearch_loading(false);
        // const one = data;
        // const two = one;
        // if (one.count === 0) {
        //   setsearchdata([]);
        // } else {
          setsearchdata(data);
        // }
      });
  }, [query, setsearch_loading, setsearchdata, lat, lon]);

  let url = `/search/${query}/checkin=${check_in}/checkout=${check_out}/guest=${guestcount}/room=${roomcount}/latitude=${lat}/longitude=${lon}`;

  //ordering filter

  const shownearby = () => {
    let ft = filter_id ? filter_id : "";
    let cp = type ? type : "";
    let g = g_rating ? g_rating : "";

    history.push(
      `${url}/filter=${ft}/type=${cp}/guest_rating=${g}/order=show_nearby`
    );
  };

  const hightolow = () => {
    let ft = filter_id ? filter_id : "";
    let cp = type ? type : "";
    let g = g_rating ? g_rating : "";

    history.push(
      `${url}/filter=${ft}/type=${cp}/guest_rating=${g}/order=price_high_to_low`
    );
  };
  const lowtohigh = () => {
    let ft = filter_id ? filter_id : "";
    let cp = type ? type : "";
    let g = g_rating ? g_rating : "";

    history.push(
      `${url}/filter=${ft}/type=${cp}/guest_rating=${g}/order=price_low_to_high`
    );
  };
  const setrating_order = () => {
    let ft = filter_id ? filter_id : "";
    let cp = type ? type : "";
    let g = g_rating ? g_rating : "";

    history.push(
      `${url}/filter=${ft}/type=${cp}/guest_rating=${g}/order=rating_high_to_low`
    );
  };

  return (
    <div>
      {search_loading ? (
        <SearchLoading />
      ) : searchdata.length === 0 ? (
        <div>
          <Error />
        </div>
      ) : (
        search_loading || (
          <div className={searchbymap ? "search_body_map" : "search_body"}>
            {matches && (
              <Button onClick={() => setmodalfilter(true)} varaint="outlined">
                Show Filters
              </Button>
            )}
            {searchbymap || matches ? (
              <ThemeProvider theme={theme}>
                <Modal
                  style={theme.zIndex}
                  open={modalfilter}
                  onClose={() => setmodalfilter(false)}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      height: "100vh",
                      width: "100vw",
                      overflow: "auto",
                    }}
                  >
                    <div
                      className="close_modal_container"
                      style={{
                        padding: "10px",

                        backgroundColor: "#fff",
                      }}
                    >
                      <ArrowBackIosIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "rgb(34, 34, 34)",
                          cursor: "pointer",
                        }}
                        onClick={() => setmodalfilter(false)}
                      />
                    </div>

                    <Filterbar d={"s"} />
                  </div>
                </Modal>
              </ThemeProvider>
            ) : (
              <Filterbar />
            )}
            {realdata.length === 0 ? (
              <Error />
            ) : (
              <div className="searchresult">
                <div className="ordering_filter">
                  <Button
                    onClick={lowtohigh}
                    endIcon={<TrendingUpIcon style={{ color: "green" }} />}
                    variant="outlined"
                  >
                    Price Low To High
                  </Button>
                  <Button
                    onClick={hightolow}
                    variant="outlined"
                    endIcon={<TrendingDownIcon style={{ color: "red" }} />}
                  >
                    Price High to Low
                  </Button>
                  <Button
                    onClick={setrating_order}
                    endIcon={<GradeIcon style={{ color: "gold" }} />}
                    variant="outlined"
                  >
                    Rating High to Low
                  </Button>
                  {lat && lon && (
                    <Button
                      endIcon={<LocationOnIcon style={{ color: "green" }} />}
                      onClick={shownearby}
                      variant="outlined"
                    >
                      Show Nearest
                    </Button>
                  )}
                </div>

                <h1 className="total_hotel" style={{ marginLeft: "2vw" }}>
                  {`${realdata.length}`} Property Found
                </h1>

                <div>
                  <SearchHotelCard realdata={realdata} />
                </div>
              </div>
            )}
            {searchbymap && (
              <div className="search_map">
                <SearchMap />
              </div>
            )}
          </div>
        )
      )}
      <div
        className={`${
          allroom_modal ? "room_img_modal_slider" : "display_none"
        }`}
      ></div>
    </div>
  );
};

export default SearchPage;
