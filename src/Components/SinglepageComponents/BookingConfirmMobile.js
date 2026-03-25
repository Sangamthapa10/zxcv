import React from "react";
import "./CSS/BookingConfirm.css";
import { useGlobalContext } from "../Context";
import { useParams, useHistory } from "react-router-dom";
import CompleteBooking from "./Booking/CompleteBooking";
import { useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function BookingConfirmMobile() {
  const matches = useMediaQuery("(max-width:600px)");

  const { singlepage, setm_detail, selectedmeal } = useGlobalContext();
  const history = useHistory();

  const { id } = useParams();
  const { name } = useParams();
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { guestcount } = useParams();
  const { roomcount } = useParams();
  const { selectedroom } = useParams();
  const { mealid } = useParams();
  const checkin_str = new Date(check_in);
  const check_out_str = new Date(check_out);

  const closebookmodal = () => {
    setm_detail(false);
    let m = mealid ? mealid : "";
    history.push(
      `/single/${id}/${name}/checkin=${check_in}/checkout=${check_out}/guests=${guestcount}/room=${roomcount}/selected_room=${selectedroom}/meals=${m}/bookingmodal=${false}`
    );
  };
  return (
    <div className="modal_book_confirm">
      <span className="back_header">
        <ArrowBackIosIcon
          onClick={closebookmodal}
          className="back_header_icon"
          style={{
            width: "30px",
            height: "30px",
            color: "rgb(34, 34, 34)",
            cursor: "pointer",
          }}
        />
        <div className="back_header_text">
          <h3 className="back_header_text">Book Your Room Right Away</h3>
        </div>
      </span>
      {matches || <hr />}
      {singlepage.map((mappe) => {
        const { room_option, propertymeals, menu } = mappe;
        let default_room = mappe.room_option.filter(
          (swine) => swine.default_room === "d"
        );

        let roomselect = selectedroom
          ? parseInt(selectedroom)
          : default_room[0].id;
        let room = room_option.filter((swine) => swine.id === roomselect);
        let d = mealid && mealid.split(",");

        // let mealnumberArray = d && d.map((el) => parseFloat(el));
        // let meals =
        //   mealid &&
        //   propertymeals.filter((swine) => mealnumberArray.includes(swine.id));
        // let othermeals =
        //   mealid && menu.filter((swine) => mealnumberArray.includes(swine.id));
        // let othermeals_price =
        //   othermeals && othermeals.reduce((s, { price }) => s + price, 0);
        // let meals_total_price =
        //   mealid && meals.reduce((s, { price }) => s + price, 0);
        return (
          <div key={mappe.id} className="booking_confirm_body">
            {matches || (
              <div className="user_booking_detail">
                <CompleteBooking />
              </div>
            )}
            <div>
              <div className="book_stick">
                <div className="booking_info">
                  <div className="booking_">
                    {room.map((mapped) => {
                      let price = mapped.discount
                        ? mapped.discount
                        : mapped.price;
                      return (
                        <div key={mapped.id} className="booking_confirm_detail">
                          <>
                            <div className="booking_detail_t">
                              <div className="booking_Detail_p">
                                <img
                                  className="dp"
                                  src={room[0].room_dp.img}
                                  alt="a"
                                />
                              </div>
                              <div className="booking_top_rdetail">
                                <p className="dot_text">{mappe.Address}</p>
                                <h4 className="dot_text">{mappe.Name}</h4>
                                <span className="dot_text">
                                  {mappe.avg}({mappe.avg_count} Ratings)
                                </span>

                                {Math.ceil(
                                  (check_out_str.getTime() -
                                    checkin_str.getTime()) /
                                    (1000 * 3600 * 24)
                                ) +
                                  " " +
                                  "Nights"}
                              </div>
                            </div>

                            <span className="booking_book_price">
                              <h4
                                style={{
                                  fontWeight: "750",
                                  fontSize: "1.2rem",
                                }}
                              >
                                Price Details
                              </h4>
                              <div className="meal_price">
                                {selectedmeal &&
                                parseInt(selectedmeal.length) > 5 ? (
                                  <div className="details__">
                                    <div>
                                      <h6
                                        style={{ color: "rgb(113, 113, 113)" }}
                                      >
                                        Total Meal Price
                                      </h6>
                                    </div>
                                    <h6 style={{ color: "rgb(113, 113, 113)" }}>
                                      {selectedmeal.reduce(
                                        (s, { price, quantity }) =>
                                          s + price * quantity,
                                        0
                                      )}
                                    </h6>
                                  </div>
                                ) : (
                                  <div>
                                    {mealid && (
                                      <div
                                        style={{
                                          display: "grid",
                                          gridGap: "15px",
                                        }}
                                      >
                                        {selectedmeal &&
                                          selectedmeal.map((meal_sel) => {
                                            return (
                                              <div
                                                key={meal_sel.id}
                                                className="details__"
                                              >
                                                <div>
                                                  <span
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <h6
                                                      style={{
                                                        color:
                                                          "rgb(113, 113, 113)",
                                                      }}
                                                    >
                                                      Meal Price
                                                    </h6>
                                                    {/* {meal_sel.name} */}
                                                  </span>
                                                  <h6
                                                    style={{
                                                      color:
                                                        "rgb(113, 113, 113)",
                                                    }}
                                                  >
                                                    ({meal_sel.name})
                                                  </h6>
                                                </div>
                                                <h6
                                                  style={{
                                                    color: "rgb(113, 113, 113)",
                                                  }}
                                                >
                                                  {meal_sel.price}
                                                </h6>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="details__">
                                <div>
                                  <h6 style={{ color: "rgb(113, 113, 113)" }}>
                                    {price} x {roomcount}{" "}
                                    {parseInt(roomcount) === 1
                                      ? "Room"
                                      : "Rooms"}{" "}
                                    *{" "}
                                    {Math.ceil(
                                      (check_out_str.getTime() -
                                        checkin_str.getTime()) /
                                        (1000 * 3600 * 24)
                                    ) +
                                      " " +
                                      "Nights"}
                                  </h6>
                                </div>

                                <h6 style={{ color: "rgb(113, 113, 113)" }}>
                                  {" "}
                                  NPR{" "}
                                  {` ${
                                    price *
                                    roomcount *
                                    Math.ceil(
                                      (check_out_str.getTime() -
                                        checkin_str.getTime()) /
                                        (1000 * 3600 * 24)
                                    )
                                  }`}
                                </h6>
                              </div>
                              <hr />

                              <div className="details__">
                                <div>
                                  <h6 style={{ color: "rgb(113, 113, 113)" }}>
                                    Total Price
                                  </h6>
                                </div>
                                {mealid ? (
                                  <div>
                                    <h6 style={{ color: "rgb(113, 113, 113)" }}>
                                      NPR
                                      {`${
                                        price *
                                          roomcount *
                                          Math.ceil(
                                            (check_out_str.getTime() -
                                              checkin_str.getTime()) /
                                              (1000 * 3600 * 24)
                                          ) +
                                        selectedmeal
                                          ? selectedmeal.reduce(
                                              (s, { price, quantity }) =>
                                                s + price * quantity,
                                              0
                                            )
                                          : 0
                                      }`}
                                    </h6>
                                  </div>
                                ) : (
                                  <h6 style={{ color: "rgb(113, 113, 113)" }}>
                                    NPR
                                    {price *
                                      roomcount *
                                      Math.ceil(
                                        (check_out_str.getTime() -
                                          checkin_str.getTime()) /
                                          (1000 * 3600 * 24)
                                      )}
                                  </h6>
                                )}
                              </div>
                            </span>
                          </>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {matches && (
              <div className="user_booking_detail">
                <CompleteBooking />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookingConfirmMobile;
