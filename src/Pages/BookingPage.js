import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomAxios from "../Components/Axios";
import {
  Step,
  Stepper,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";

// import BookingForm from "../Components/SinglepageComponents/BookingForm";
import ApartmentIcon from "@material-ui/icons/Apartment";
import CompleteBooking from "../Components/CompleteBooking";
import "./CSS/BookingPage.css";
import EditIcon from "@material-ui/icons/Edit";

function getSteps() {
  return ["Enter Your Detailss", "Complete Your Booking"];
}

const BookingPage = () => {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CompleteBooking />;

      default:
        return "Unknown step";
    }
  }
  const { hotelid } = useParams();
  const { selected_room } = useParams();
  let sel_id = parseInt(selected_room);
  const { check_in } = useParams();
  const { check_out } = useParams();
  const { roomcount } = useParams();
  const { guestcount } = useParams();
  const [data, setdata] = useState([]);
  const checkin_str = new Date(check_in);
  const check_out_str = new Date(check_out);

  const checkin_raw_date = checkin_str.toDateString();
  const checkout_raw_date = check_out_str.toDateString();
  const three =
    checkin_raw_date.split(" ")[0] +
    checkin_raw_date.split(" ")[1] +
    checkin_raw_date.split(" ")[2];
  const four =
    checkout_raw_date.split(" ")[0] +
    checkout_raw_date.split(" ")[1] +
    checkout_raw_date.split(" ")[2];
  useEffect(() => {
    CustomAxios.get(`/api/property/?id=${hotelid}`)
      .then((res) => {
        const one = res.data;
        setdata(one.results);
      })
      .catch((error) => {
        setdata([]);
      });
  }, [hotelid]);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="booking_page">
      <div className="booking_user_info">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
            </div>
          ) : (
            <div>
              <Typography>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="booking_info">
        {data.map((mappe) => {
          let id = sel_id ? sel_id : mappe.default_room.id;
          let room = mappe.room_option.filter((swine) => swine.id === id);

          return (
            <div className="booking_">
              <div className="booking_detail_header"></div>
              {room.map((mapped) => {
                return (
                  <div className="booking_detail">
                    <>
                      <div className="booking_detail_t">
                        <div className="booking_Detail_p">
                          <img
                            className="dp"
                            src={room[0].room_dp.img}
                            alt="oane"
                          />
                        </div>
                        <div className="booking_topq">
                          <p>{mappe.Address}</p>
                          <h4>{mappe.Name}</h4>
                          <span>
                            {mappe.avg}({mappe.avg_count} Ratings)
                          </span>

                          {four.slice(6, 8) - three.slice(6, 8) + "Nights"}
                        </div>
                      </div>
                      <div className="details">
                        <span className="details__">
                          <h5>{three}</h5>-<h5>{four}</h5>
                        </span>
                        <span className="details__">
                          <h5>
                            {guestcount} Guest,{roomcount} Room
                          </h5>
                        </span>
                      </div>

                      {room.map((rooms) => {
                        return (
                          <div key={rooms.id}>
                            <Button
                              variant="outlined"
                              size="large"
                              fullWidth
                              startIcon={<ApartmentIcon />}
                              endIcon={<EditIcon />}
                              style={{
                                textTransform: "none",
                                textAlign: "left",
                              }}
                            >
                              <div className="btn">
                                <span>
                                  <h5>{rooms.name}</h5>
                                </span>
                              </div>
                            </Button>
                            <span className="price">
                              <h3>Total Price:</h3>
                              <h3 style={{ color: "red", fontSize: "30px" }}>
                                NPR{rooms.price}
                              </h3>
                            </span>
                          </div>
                        );
                      })}
                    </>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingPage;
