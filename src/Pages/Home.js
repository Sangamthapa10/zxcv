import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Components/Context";
import Customaxios from "../Components/Axios";
import Loading from "./Loading";
import "./CSS/Body.css";
import Axios from "axios";
import PCities from "../Components/PCities";
import Category from "../Components/ComingSoon/Category";
import HotelCard from "../Components/HotelCard";
function Home() {
  document.title = "Hotels In Nepal";
  const [propertydata, setpropertydata] = useState([]);
  const [loading, setloading] = useState(true);
  const [cpdata, setcpdata] = useState([]);
  const { sethomedata, homedata } = useGlobalContext();
  const [cities, setcities] = useState([]);

  useEffect(() => {
    let dataq = {
      a: [
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
        {
          id: 4,
          liked: false,
          Name: "Hotel Perfecto",
          Address: "Khatri tol",
          room: 
            {
              id: 3,
              name: "Double room",
              room_dp: {
                name: "Room",
                img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room",
                id: 25,
              },
              price: 4999,
              discounted_price: null,
              bed_count: 2,
              default_room: "d",
            },
          
          hotel_dp: {
            name: "Smriti",
            img: "http://localhost:8000/Static/images/userphotos/Smriti/Post_from_smriti_katel_fwh632_waqxq2U.jpg",
            category: "room_dp",
            id: 2,
          },
        },
        {
          id: 987988,
          liked: false,
          Name: "Hotel Example",
          Address: "Khatri tol",
          room: 
            {
              id: 6,
              name: "King Room",
              room_dp: {
                name: "Room",
                img: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room",
                id: 25,
              },
              price: 9800,
              discounted_price: null,
              bed_count: 1,
              default_room: "d",
            },
          
          hotel_dp: {
            name: "Room",
            img: "http://localhost:8000/Static/images/userphotos/Room/steven-ungermann-aRT5UCf2MYY-unsplash.jpg",
            category: "room",
            id: 25,
          },
        },
      ],
      b: [
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
                img: "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
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
            img: "http://localhost:8000/Static/images/userphotos/Smriti/Post_from_smriti_katel_fwh632_waqxq2U.jpg",
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
                img: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
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
            img: "http://localhost:8000/Static/images/userphotos/Smriti/Post_from_smriti_katel_fwh632_waqxq2U.jpg",
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
                img: "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
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
        {
          id: 4,
          liked: false,
          Name: "Hotel Perfecto",
          Address: "Khatri tol",
          room: 
            {
              id: 3,
              name: "Double room",
              room_dp: {
                name: "Room",
                img: "https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room",
                id: 25,
              },
              price: 4999,
              discounted_price: null,
              bed_count: 2,
              default_room: "d",
            },
          
          hotel_dp: {
            name: "Smriti",
            img: "http://localhost:8000/Static/images/userphotos/Smriti/Post_from_smriti_katel_fwh632_waqxq2U.jpg",
            category: "room_dp",
            id: 2,
          },
        },
        {
          id: 987988,
          liked: false,
          Name: "Hotel Example",
          Address: "Khatri tol",
          room: 
            {
              id: 6,
              name: "King Room",
              room_dp: {
                name: "Room",
                img: "https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                category: "room",
                id: 25,
              },
              price: 9800,
              discounted_price: null,
              bed_count: 1,
              default_room: "d",
            },
          
          hotel_dp: {
            name: "Room",
            img: "http://localhost:8000/Static/images/userphotos/Room/steven-ungermann-aRT5UCf2MYY-unsplash.jpg",
            category: "room",
            id: 25,
          },
        },
      ],
      c: [
        {
          id: 4,
          img: {
            name: "Gorkha Trek",
            img: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "room_dp",
            id: 12,
          },
          popular: false,
          city: "Biratnagar",
          details: "Something nice about place for the users ",
        },
        {
          id: 5,
          img: {
            name: "sad",
            img: "https://images.pexels.com/photos/2902939/pexels-photo-2902939.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "room",
            id: 14,
          },
          popular: false,
          city: "Mustang",
          details: "Something nice about place for the users ",
        },
        {
          id: 2,
          img: {
            name: "pkh",
            img: "http://www.horizontravelindia.com/wp-content/uploads/2017/10/Pokhara.jpg",
            category: "place",
            id: 21,
          },
          popular: false,
          city: "Pokhara",
          details: "Something nice about place for the users",
        },
        {
          id: 1,
          img: {
            name: "Bhaktapur",
            img: "https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            category: "place",
            id: 32,
          },
          popular: false,
          city: "Bhaktapur",
          details: "Something nice about place for the users",
        },
        {
          id: 6,
          img: {
            name: "sad",
            img: "https://images.pexels.com/photos/3097592/pexels-photo-3097592.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            category: "lobby",
            id: 10,
          },
          popular: false,
          city: "Swayambhu",
          details: "Something nice about place for the users",
        },
      ],
    };
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      if (homedata.length < 1) {
        setloading(true);
        Customaxios.get("/api/home", { cancelToken: source.token })
          .then((res) => {
            // setloading(false);
            setpropertydata(res.data.a);
            setcpdata(res.data.b);
            setcities(res.data.c);
            sethomedata(res.data);
          })
          .catch((error) => {
            if (Axios.isCancel(error)) {
              console.log("AxiosCancel: caught cancel");
            } else {
              console.log("server");

              setpropertydata(dataq.a);
              setcpdata(dataq.b);
              setcities(dataq.c);
              sethomedata(dataq);
            }
          });
      } else {
        setloading(false);
        setpropertydata(homedata.a);
        setcpdata(homedata.b);
        setcities(homedata.c);
      }
    };
    fetchdata();
    return () => {
      source.cancel();
    };
  }, [setcpdata, homedata, sethomedata]);

  return (
    <div className="home_page_body">
      {loading && <Loading type="home" />}
      {loading || (
        <div>
          <div className="city_suggest">
            {/* <PCities cities={cities} /> */}
          </div>
          <div style={{ paddingTop: "30px" }} className="card_group">
            <h4 className="recommend_text_home">Highest Rated Hotels</h4>
            <HotelCard propertydata={propertydata} />
          </div>

          <div className="card_group">
            <h4>Couple Friendly S.Rooms</h4>

            <HotelCard propertydata={cpdata} />
          </div>
        </div>
      )}
      <Category />
    </div>
  );
}

export default Home;
