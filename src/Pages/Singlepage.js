import React, { useState, useRef, useEffect } from "react";
import "./CSS/Singlepage.css";
import { Authaxios } from "../Components/Axios";
import Axios from "axios";
import { useGlobalContext } from "../Components/Context";
import Customaxios from "../Components/Axios";
import { useParams, useHistory } from "react-router-dom";
import Icons from "../Components/Icons";
//Material ui
import {
  useMediaQuery,
  Modal,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
//Material ui icons
import ExploreIcon from "@mui/icons-material/Explore";
import PolicyIcon from "@mui/icons-material/Policy";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarIcon from "@mui/icons-material/Star";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RoomServiceIcon from "@mui/icons-material/RoomService";
//singlepage components
import BookingDetails from "../Components/SinglepageComponents/BookingDetails";
import SmroomOption from "../Components/SinglepageComponents/SmroomOption";
import LgroomOption from "../Components/SinglepageComponents/LgroomOption";
import HotelCard from "../Components/HotelCard";
import AmnetyModal from "../Components/SinglepageComponents/AmnetyModal";
import ShareOptions from "../Components/SinglepageComponents/ShareOptions";
import DetailReview from "../Components/SinglepageComponents/DetailReview";
import SinglepageScrollIndicator from "../Components/SinglepageComponents/SinglepageScrollIndicator";
import PropertyMeals from "../Components/SinglepageComponents/PropertyMeals";
import Weather from "../Components/SinglepageComponents/Weather";
import Sliders from "../Components/SinglepageComponents/Slider";
import Map from "../Components/SinglepageComponents/Map";
const Singlepage = () => {
  const bookref = useRef();
  const matches = useMediaQuery("(max-width:800px)");
  const smscreen = useMediaQuery("(max-width:600px)");
  const tabscreen = useMediaQuery("(max-width:900px)");
  const [smmap, setsmmap] = useState(false);
  const { selectedroom } = useParams();
  const history = useHistory();
  const {
    setlogin,
    setimg_gallerydata,
    setamnetymodal,
    setsinglepage,
    singlepage,
    img_gallery,
    sloading,
    mealref,
    roomref,
    desc,
    amneties,
    mapbar,
    weather,
    setsloading,
    map,
    rating,
    setsbookingdetail,
    checkin_date,
    guestcount,
roomcount,
    checkout_date,
  } = useGlobalContext();
  const [facilityquantity, setfacilityquantity] = useState(false);
  const scrolltorating = () => {
    window.scrollTo({
      top: rating.current.offsetTop - mapbar.current.clientHeight,
      behavior: "smooth",
    });
  };

  const { id } = useParams();
  const { name } = useParams();

  const [suggest, setsuggest] = useState([]);
  const [cmnt, setcmnt] = useState([]);
  document.title = name;

  useEffect(() => {
    let source = Axios.CancelToken.source();
    let data = {
      hotel: {
        liked: false,
        booking_details: {
          id: 1,
          max_booking: 4,
          book_confirm: false,
          not_available: [
            {
              id: 2,
              not_available_start_date: "2021-10-02",
              not_available_end_date: "2021-10-03",
            },
            {
              id: 3,
              not_available_start_date: "2021-10-11",
              not_available_end_date: "2021-10-16",
            },
          ],
        },
        menu: [
          {
            id: 2,
            name: "Chicken Tikka",
            short_desc: "Veg/Non-Veg Thali",
            price: 1899,
            category: "Chicken",
          },
          {
            id: 3,
            name: "Chicken Momo",
            short_desc: "good momos",
            price: 120,
            category: "mealcourse",
          },
          {
            id: 5,
            name: "Chicken Sausage",
            short_desc: "df",
            price: 80,
            category: "Sausage",
          },
          {
            id: 7,
            name: "Chicken Pizza",
            short_desc: "Veg/Non-Veg Thali",
            price: 800,
            category: "pizza",
          },
        ],
        property_policy:
          "1. Tariff\r\n\r\nThe tariff is for the room only and is exclusive of any government taxes applicable Meals and other services are available at extra cost. To know your room tariff, please contact the Duty Manager, guest registration forms must be signed on arrivals.\r\n\r\n2. Settlement Of Bills\r\n\r\nBills must be settled on presentation, personal cheques are not accepted.\r\n\r\n3. Company's Lien On Guest's Luggage And Belongings\r\n\r\nIn the case of default in the payment of dues by a guest, the management shall have the linen on their luggage and belongings, and be entitled to detain the same and to sell or auction such property at any time without reference to the guest. The net sale proceeds will be appropriate towards the amount due by the guest without prejudice to the management's rights to adopt such further recovery proceedings as my be required.\r\n\r\n4. Check-in \r\n\r\nPlease present your ID card, Passport or Temporary Residence Card upon Check-in. By Law visitors must present personal documents for hotel records. These documents will be returned upon departure.\r\n\r\n5. Departure\r\n\r\nCheck out time is ( mention your checkout time here ) please inform the reception if you wish to retain your room beyond this time. The extension will be given depending on the availability. If the room is available, the normal tariff will be charged. On failure of the guest to vacate the room on expiry or period the management shall have the right to remove the guest and his/her belongings from the room occupied by the Guest.\r\n\r\n6. Luggage Storage\r\n\r\nSubject to availability of the storage space, the guest can store luggage in the luggage room, at the guest's sole risk as to loss or damage from any cause, Luggage may not be stored for a period of over 30 days.\r\n\r\n7. Guest's Belongings\r\n\r\nGuests are particularly requested to lock the door of their rooms when going out going to bed. For the convenience of the Guest, electronic safety lockers are provided in the room to store any valuables.\r\n\r\nThe Management will not in any way whatsoever be responsible for any loss / or damage to the Guest's belongings or any other property from either the hotel room or the locker or any other part of the hotel for any cause whatsoever including theft of pilferage.\r\n\r\n8. Pets\r\n\r\nMention your policy for Pets ( allowed or not- allowed ) / (Allow us to make separate arrangements. )\r\n\r\n9. Hazardous Goods\r\n\r\nBringing goods and/or storing of raw or exposed cinema films, or any other article of a combustible or hazardous nature and/or prohibited goods and/or goods of objectionable nature is prohibited.\r\n\r\nThe Guest shall be solely liable and responsible to the management, its other guests, invitees visitors, agents and servants for all loss financial or otherwise and damage that may be caused by such articles or as a result of the guests' own negligence and non-observance of any / instructions.\r\n\r\nGambling, contraband, prostitution, weapons, explosives, flammable objects, poisons, drugs, animals and pungent food are strictly prohibited on hotel premises.\r\n\r\n10. Damage to Property\r\n\r\nThe guest will be held responsible for any loss or damage to the hotel property caused by themselves, their guests or any person for whom they are responsible.\r\n\r\n11. Management's Rights\r\n\r\nIt is agreed that the guest will conduct him/ herself in a respectable manner and will not cause any nuisance or annoyance within the hotel premise.\r\n\r\nThe Management has the right to request any guest to vacate his/her room or other areas of the hotel forthwith, Without previous notice and without assigning any reason whatsoever, and the guest shall be bound to vacate when requested to do so. In case of the default, the Management has the right to remove the Guest luggage and belongings from the room occupied by him/her.\r\n\r\n12. Relation between Management and Guest\r\n\r\nNothing hereinabove shall continue or be deemed to constitute, or create any tenancy or sub-tenancy, or any other right to interact in the hotel premises or any part of portion thereof, in favour of any Guest or resident or visitor, and the Management shall always be deemed to be in full and absolute possession of the whole of the hotel premises.\r\n\r\n13. Government rules and regulations and application of laws\r\n\r\nGuest are requested to observe, abide by confirm to and be bound by all applicable acts and laws and Government rules and regulations in force from time to time.\r\n\r\n14. Photographs and Video's\r\n\r\nUsing photographs and video's taken in the hotel for commercial or public purposes is illegal. Those who do so will be subject to prosecution.",
        total_room_booked: {
          r: 1,
        },
        dp_img: [
          {
            name: "Bathroom",
            img: "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "washroom",
            id: 22,
          },
          {
            name: "room",
            img: "https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "room_dp",
            id: 23,
          },
          {
            name: "Facade",
            img: "https://images.pexels.com/photos/4566719/pexels-photo-4566719.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "facade",
            id: 24,
          },
          {
            name: "Room",
            img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "room",
            id: 25,
          },
          {
            name: "Nearby",
            img: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "nearby",
            id: 26,
          },
        ],
        omap: null,
        propertymeals: [
          {
            id: 1,
            name: "Breakfast",
            image: {
              name: "Smriti",
              img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              category: "room_dp",
              id: 2,
            },
            short_desc: "Veg/Non-Veg Thali",
            price: 4000,
            free: false,
          },
          {
            id: 8,
            name: "Buffet",
            image: {
              name: "thakali",
              img: "https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              category: "meal",
              id: 27,
            },
            short_desc: "Veg/Non-Veg Thali",
            price: 1234,
            free: false,
          },
        ],
        latitude: "27.704581143582825",
        longitude: "85.32698875363128",
        id: 987988,
        Name: "Hotel Example",
        Address: "Khatri tol",
        avg_count: 0,
        room_option: [
          {
            roomavailable: 40,
            id: 6,
            room_dp: {
              name: "Room",
              img: "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              category: "room",
              id: 25,
            },
            name: "King Room",
            price: 9800,
            discount: null,
            default_room: "d",
            room_amneties: [
              {
                id: 2,
                name: "Parking",
                icon: "MoodIcon",
                special: false,
              },
              {
                id: 7,
                name: "CC tv camera",
                icon: "videocamIcoN",
                special: false,
              },
            ],
            bed_count: 1,
            booking_details: null,
          },
        ],
        Country: 1,
        key_room: true,
        Region: 1,
        City: 1,
        facility: [
          {
            id: 1,
            name: "Wifi",
            icon: "wifiicon",
            special: false,
          },
          {
            id: 2,
            name: "Parking",
            icon: "MoodIcon",
            special: false,
          },
          {
            id: 5,
            name: "Bar",
            icon: "LocalBarIcon",
            special: false,
          },
          {
            id: 6,
            name: "Laundry Service",
            icon: "LocalLaundryServiceIcon",
            special: false,
          },
          {
            id: 7,
            name: "CC tv camera",
            icon: "videocamIcoN",
            special: false,
          },
        ],
        staffavg: "Non",
        checkin_ease: "Non",
        foodavg: "Non",
        cleanlinessavg: "Non",
        surroundingavg: "Non",
        location_description:
          "near kalanki,surrounded by creeps who wont let you fuck in peace",
        privacyavg: "Non",
        couple_friendly: true,
        family_friendly: false,
        rating: 0,
      },
      review: [],
      suggest: [
        {
          id: 3,
          liked: false,
          Name: "Hotel Sangam",
          Address: "Khatri tol",
          room: 
            {
              id: 4,
              name: "Deluxe Room",
              room_dp: {
                name: "sad",
                img: "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room_dp",
                id: 15,
              },
              price: 8900,
              discounted_price: null,
              bed_count: 1,
              default_room: "d",
            },
          
          hotel_dp: {
            name: "Smriti",
            img: "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "room_dp",
            id: 2,
          },
        },
        {
          id: 2,
          liked: false,
          Name: "Hotel Landscape",
          Address: "Khatri tol",
          room: 
            {
              id: 5,
              name: "Super deluxe room",
              room_dp: {
                name: "Room",
                img: "https://images.pexels.com/photos/5461604/pexels-photo-5461604.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room",
                id: 25,
              },
              price: 20000,
              discounted_price: null,
              bed_count: 1,
              default_room: "d",
            },
          
          hotel_dp: {
            name: "Smriti",
            img: "https://images.pexels.com/photos/6394711/pexels-photo-6394711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "room_dp",
            id: 2,
          },
        },
        {
          id: 5,
          liked: false,
          Name: "Hotel Wonderland",
          Address: "Khatri tol",
          room: 
            {
              id: 1,
              name: "Single room",
              room_dp: {
                name: "room",
                img: "https://images.pexels.com/photos/4566719/pexels-photo-4566719.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room_dp",
                id: 31,
              },
              price: 2000,
              discounted_price: 1850,
              bed_count: 1,
              default_room: "d",
            },
          
          hotel_dp: {
            name: "Smriti",
            img: "http://localhost:8000/Static/images/userphotos/Smriti/Post_from_smriti_katel_fwh632_waqxq2U.jpg",
            category: "room_dp",
            id: 2,
          },
        },
      ],
    };
    const fetchdata = async () => {
      if (singlepage.length === 0 || singlepage[0].id !== parseInt(id)) {
        setsloading(true);
        Customaxios.get(`/api/propertydetail/${parseInt(id)}`)
          .then((res) => {
            console.log(res.data);
            let b = Object.assign([], [res.data.hotel]);
            setsuggest(res.data.suggest);
            setcmnt(res.data.review);
            setsinglepage(b);
            setsloading(false);
            setimg_gallerydata([]);
            setsbookingdetail(res.data.booking_details);
          })
          .catch((error) => {
            let links = `/single/${data.hotel.id}/${data.hotel.Name}/checkin=2021-02-02/checkout=2022-02-02/guests=${guestcount}/room=${roomcount}/selected_room=${1}/meals=/bookingmodal=`;
            history.push(links);

              let b = Object.assign([], [data.hotel]);
              setsuggest(data.suggest);
              setcmnt(data.review);
              setsinglepage(b);
              setsloading(false);
              setimg_gallerydata([]);
            
          });
      }
    };
    fetchdata();
    return () => {
      source.cancel();
    };
  }, [
    id,
    setsinglepage,
    setimg_gallerydata,
    setsloading,
    singlepage,
    setsbookingdetail,
  ]);

  const [showq, setshowq] = useState(false);
  useEffect(() => {
    var height = document.documentElement.scrollTop;
    let handler = (event) => {
      if (tabscreen) {
        if (sloading === false) {
          if (height > document.documentElement.scrollTop) {
            setshowq(false);
          }
          if (height > height + desc.current.getBoundingClientRect().top) {
            setshowq(true);
          }
        }
      }
    };
    document.addEventListener("scroll", handler);
    return () => {
      document.removeEventListener("scroll", handler);
    };
  });

  const ScrollToRoom = () => {
    window.scrollTo({ top: roomref.current.offsetTop, behavior: "smooth" });
  };
  const Addtofav = (e) => {
    let tok = localStorage.getItem("axynghkwngasd");

    if (!tok) {
      e.target.checked = false;
      setlogin(true);
    } else {
      Authaxios.post("/api/fav/", {
        id: id,
      })
        .then((res) => {
          e.target.checked = true;
        })
        .catch((error) => {
          e.target.checked = false;
        });
    }
  };
  const [facdata, setfacdata] = useState([]);
  const showmore = (i) => {
    if (i.toString() === "hotel") {
      setfacdata(singlepage[0].facility);
      setamnetymodal(true);
    }
  };
  let default_room =
    sloading ||
    singlepage[0].room_option.filter((swine) => swine.default_room === "d");
  let validateroom =
    sloading ||
    (selectedroom &&
      singlepage[0].room_option.filter(
        (swine) => swine.id === parseInt(selectedroom)
      ).length !== 0)
      ? true
      : false;
  let roomselect =
    sloading || validateroom ? parseInt(selectedroom) : default_room[0].id;
  const [showdesc, setshowdesc] = useState(false);

  return (
    <>
      {sloading || (
        <div className={` mobile_bar`}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <ArrowBackIosIcon onClick={() => history.goBack()} />
            {showq && (
              <h3
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </h3>
            )}
          </span>
          <div className="share_fav_mob">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={singlepage[0].liked ? true : false}
                  onClick={(e) => Addtofav(e)}
                  icon={<FavoriteBorder style={{ color: "black" }} />}
                  checkedIcon={<Favorite />}
                />
              }
            />
            {sloading || (
              <ShareOptions
                img={
                  singlepage[0].room_option.filter(
                    (swine) => swine.default_room === "d"
                  )[0].room_dp.img
                }
                tops="s"
              />
            )}
          </div>
        </div>
      )}
      <div className={smscreen ? "" : "full_body_top"}>
        {smscreen ||
          singlepage.map((mapped) => {
            const { id, Name, Address, liked, rating, avg_count, room_option } =
              mapped;
            return (
              <div className="single_property_top_detail" key={id}>
                <h1
                  style={{ fontWeight: "bolder" }}
                  className="singlepage_title"
                >
                  {Name}
                </h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: matches ? "15px" : 0,
                  }}
                >
                  <div className="single_page_headers">
                    <span
                      className="single_page_header"
                      onClick={scrolltorating}
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <StarIcon
                          style={{ color: "#f2b01e", fontSize: "20px" }}
                        />

                        {rating}
                      </span>
                      <span>({avg_count} Ratings)</span>
                    </span>

                    <div>
                      <span className="single_page_header">
                        <LocationOnIcon style={{ color: "#1ab64f" }} />{" "}
                        {Address}
                      </span>
                    </div>
                    <span onClick={ScrollToRoom} className="single_page_header">
                      <RoomServiceIcon style={{ color: "#ff0000" }} />{" "}
                      <p>{room_option.length} rooms to choose from</p>
                    </span>
                  </div>
                  {tabscreen || (
                    <div className="single_page_header">
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={liked ? true : false}
                            onClick={(e) => Addtofav(e)}
                            icon={
                              <FavoriteBorder
                                style={{
                                  color: tabscreen
                                    ? showq
                                      ? "rgb(255,255,255)"
                                      : "rgb(0.00,0.00,0.00)"
                                    : "rgb(0.00,0.00,0.00)",
                                }}
                              />
                            }
                            checkedIcon={<Favorite />}
                          />
                        }
                      />
                      {sloading || (
                        <ShareOptions
                          img={
                            singlepage[0].room_option.filter(
                              (swine) => swine.default_room === "d"
                            )[0].room_dp.img
                          }
                          tops="s"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        <Sliders />
      </div>
      {sloading || <AmnetyModal data={facdata} />}
      {sloading || <SinglepageScrollIndicator />}
      {img_gallery || sloading || (
        <div className="full_body">
          <div className="singlepage_body">
            <div className="single_page_left">
              {singlepage.map((mapped) => {
                const {
                  id,
                  Name,
                  Address,
                  facility,
                  rating,
                  avg_count,
                  propertymeals,
                  location_description,
                  property_policy,
                  menu,
                } = mapped;
                var one = facilityquantity ? facility : facility.slice(0, 6);

                return (
                  <div className="Single_page" key={id}>
                    {smscreen && (
                      <div className="sm_single_page_header">
                        <span className="_rating_">
                          <span onClick={scrolltorating}>
                            <span>
                              <StarIcon
                                style={{ color: "#f2b01e", fontSize: "14px" }}
                              />
                              {rating}
                            </span>
                            <p>({avg_count} Ratingss)</p>
                          </span>
                          <Button
                            endIcon={
                              <ExploreIcon style={{ color: "#449a8a" }} />
                            }
                            style={{
                              justifyContent: "flex-end",
                              textTransform: "none",
                            }}
                            onClick={() => setsmmap(true)}
                          >
                            Map
                          </Button>
                        </span>

                        <div>
                          <h1 className="singlepage_title">{Name}</h1>
                          <h6 className="singlepage_address">{Address}</h6>
                        </div>
                      </div>
                    )}
                    <div ref={desc} className="detailed_desc">
                      <h1 className="title__">Description</h1>
                      {location_description}
                      {showdesc && (
                        <div className="p_policy_container">
                          <h5>Property Policy</h5>
                          <div className="p_policy_container">
                            {property_policy.split("\n").map((str, i) => (
                              <div className="list_policy" key={i}>
                                <div>
                                  <PolicyIcon style={{ color: "lightcoral" }} />
                                </div>
                                {str}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <h5
                        onClick={() => setshowdesc(!showdesc)}
                        style={{ color: "red", cursor: "pointer" }}
                      >
                        {`${showdesc ? "Show Less" : "Show More"}`}
                      </h5>
                    </div>
                    <div ref={amneties} className="facility">
                      <h1 className="title__">Amneties</h1>
                      <div className="facility__body">
                        {one.map((mapped) => {
                          return (
                            <span className="facility__" key={mapped.id}>
                              {matches && <Icons icon={mapped.icon} />}

                              <p className="mobile_facility">{mapped.name}</p>
                              {matches || <Icons icon={mapped.icon} />}
                              <p className="big_facility">{mapped.name}</p>
                            </span>
                          );
                        })}
                      </div>
                      <div>
                        {facility.length > 6 ? (
                          matches ? (
                            <Button
                              size="large"
                              fullWidth
                              style={{
                                textTransform: "none",
                                marginTop: "24px",
                                fontWeight: "bold",
                                border: "1px solid #222222",
                                padding: "13px 26px",
                                borderRadius: "10px",
                                fontSize: "15px",
                              }}
                              variant="outlined"
                              onClick={() => setamnetymodal(true)}
                            >
                              Show all {facility.length} Amneties
                            </Button>
                          ) : (
                            <h3
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => showmore("hotel")}
                            >
                              Show {`${facilityquantity ? "less" : "more"}`}
                            </h3>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="small_showmore">
                        {facility.length > 6 ? (
                          <Button
                            variant="outlined"
                            fullWidth
                            style={{ color: "black" }}
                            onClick={() =>
                              setfacilityquantity(!facilityquantity)
                            }
                          >
                            Show {`${facilityquantity ? "less" : "more"}`}
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div ref={roomref} className="room_selection">
                      <div>
                        {tabscreen ? (
                          <div className="slide_options">
                            <SmroomOption roomselect={roomselect} />
                          </div>
                        ) : (
                          <div>
                            <div className="headers">
                              <h1>Room Options</h1>
                              <LocationCityIcon
                                style={{ fontSize: "28px", color: "#fff" }}
                              />
                            </div>

                            <div>
                              <LgroomOption roomselect={roomselect} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {propertymeals.length > 0 && (
                      <div ref={mealref} className="meals">
                        <PropertyMeals data={propertymeals} menu={menu} />
                      </div>
                    )}

                    {matches ? (
                      <Modal open={smmap} onClose={() => setsmmap(false)}>
                        <div
                          style={{
                            width: "100vw",
                            height: "100vh",
                            background: "#fff",
                            overflowY: "scroll",
                            overflowX: "hidden",
                          }}
                          ref={map}
                        >
                          <div
                            style={{
                              position: "sticky",
                              top: 0,
                              left: 0,
                              width: "100vw",
                              backgroundColor: "var(--white)",
                              zIndex: 200,
                            }}
                            className="gallery_modal_head"
                          >
                            <div
                              className="close_modal_container"
                              style={{
                                padding: "10px",

                                backgroundColor: "var(--white)",
                              }}
                            >
                              <ArrowBackIosIcon
                                onClick={() => setsmmap(false)}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  color: "rgb(34, 34, 34)",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ padding: "20px" }}>
                            <h3>{Name}</h3>
                            <p>{Address}</p>
                          </div>
                          <Map sm="sm" />
                          <div style={{ padding: "20px" }}>
                            <h6 style={{ fontWeight: "bolder" }}>Location</h6>
                            <p>{location_description}</p>
                          </div>
                        </div>
                      </Modal>
                    ) : (
                      <div className="map_" ref={map}>
                        <Map />
                      </div>
                    )}

                    <div ref={weather} className="weather">
                      <h1 className="title__">Weather Details</h1>
                      <Weather />
                    </div>
                  </div>
                );
              })}
            </div>

            <div ref={bookref} className="booking_details">
              <BookingDetails roomselect={roomselect} />
            </div>
          </div>
          <div className="singlepage_rating" ref={rating}>
            <DetailReview cmnt={cmnt} />
          </div>

          <div className="singlepage_suggestion">
            <h1>Nearby Options...</h1>
            {sloading || <HotelCard propertydata={suggest} />}
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default Singlepage;
