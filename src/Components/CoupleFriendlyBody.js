import React, { useEffect, useState } from "react";
import Customaxios from "./Axios";

function CoupleFriendlyBody() {
  const [cpdata, setcpdata] = useState([]);
  useEffect(() => {
    async function fetchCoupledata() {
      const request = await Customaxios.get(
        "http://127.0.0.1:8000/api/property/?couple_friendly=true&no=4"
      );
      const datas = request.data;
      setcpdata(datas);
      const one = datas[0].room_option[0].room_img;
      setcpdata(one);
    }
    fetchCoupledata();
  }, []);
  return <div>
     /* {/* <div ref={bar} className={`${bars ? "scroll_map_bar" : "display_none"}`}>
        <div className="map_bar_scroll">
          <div className="map_bar_scroll_left">
            <h3 onClick={onshort} className={`${shorts ? "one" : "a"}`}>
              Short Tour
            </h3>
            <h3 onClick={onlong} className={`${longs ? "one" : "a"}`}>
              Long Tour{" "}
            </h3>
          </div>
        </div>
      </div> */}

      {/* <div className="wrapper">
        <div className="idea_container">
          <div ref={shorttrip} className="idea_container__card_deck">
            {smalltour.map((mapped, i) => {
              return (
                <div
                  className={`small_tour abc`}
                  style={{
                    backgroundImage: `url(${mapped.img_dp.img})`,
                  }}
                >
                  <h3>Pokhara</h3>
                  <p>Small Tour</p>
                </div>
              );
            })}
          </div>
          <div ref={longtour} className="idea_container__card_deck">
            {tour.map((mapped, i) => {
              return (
                <div
                  onClick={() => single(mapped.id, mapped.name)}
                  className={`tour abc`}
                  style={{
                    backgroundImage: `url(${mapped.image[0].img})`,
                  }}
                >
                  <h3>{mapped.name}</h3>

                  <p>{mapped.short_Desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="idea_container__card_dec abcd">
          {placetrip.map((mapped, i) => {
            return (
              <div
                className={`place_trip abc`}
                style={{
                  backgroundImage: `url(${mapped.img_dp.img})`,
                }}
              >
                <h3>Pokhara</h3>
                <p>Place</p>
              </div>
            );
          })}
        </div>
      </div> */}





        // window.onscroll = function () {
  //   var height = document.documentElement.scrollTop;
  //   if (pathname === "/idea") {
  //     if (idealoading === false) {
  //       if (
  //         height + shorttrip.current.getBoundingClientRect().top >
  //         document.documentElement.scrollTop + bar.current.clientHeight
  //       ) {
  //         setbars(false);
  //       }
  //       //shorttour
  //       if (
  //         height + bar.current.clientHeight >
  //         height + shorttrip.current.getBoundingClientRect().top
  //       ) {
  //         setbars(true);
  //         setshorts(true);
  //       }
  //       if (
  //         height + bar.current.clientHeight >
  //         height + shorttrip.current.getBoundingClientRect().bottom
  //       ) {
  //         setshorts(false);
  //       }
  //       if (
  //         shorttrip.current.getBoundingClientRect().top >
  //         document.documentElement.scrollTop + bar.current.clientHeight
  //       ) {
  //         setshorts(false);
  //       }
  //       // longtour
  //       if (
  //         height + bar.current.clientHeight >
  //         height + longtour.current.getBoundingClientRect().top
  //       ) {
  //         setlongs(true);
  //       }
  //       if (
  //         height + bar.current.clientHeight >
  //         height + longtour.current.getBoundingClientRect().bottom
  //       ) {
  //         setlongs(false);
  //       }
  //       if (
  //         longtour.current.getBoundingClientRect().top >
  //         document.documentElement.scrollTop + longtour.current.clientHeight
  //       ) {
  //         setlongs(false);
  //       }
  //     }
  //   }
  // };
  </div>;
}

export default CoupleFriendlyBody;
