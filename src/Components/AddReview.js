import React, { useState } from "react";
import "./CSS/review.css";
import { useGlobalContext } from "./Context";
import PropTypes from "prop-types";
import { Authaxios } from "./Axios";
//mui
import { Modal, withStyles, Button, TextField, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
//icons
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import StarBorderIcon from "@material-ui/icons/StarBorder";
function AddReview() {
  const { addreview, setaddreview } = useGlobalContext();

  const StyledRating = withStyles({
    root: {
      fontSize: "40px",
    },
    iconFilled: {
      color: "#ff6d75",
      fontSize: "40px",
    },
    iconHover: {
      color: "#ff3d47",
      fontSize: "40px",
    },
    iconEmpty: {
      fontSize: "40px",
    },
  })(Rating);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const [rating, setrating] = useState({
    full: 0,
    clean: 0,
    food: 0,
    privacy: 0,
    surrounding: 0,
    checkinease: 0,
    staff: 0,
    comment: "",
  });
  const [hover, setHover] = React.useState(-1);

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: "40px" }} />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon style={{ fontSize: "40px" }} />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon style={{ fontSize: "40px" }} />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon style={{ fontSize: "40px" }} />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon style={{ fontSize: "40px" }} />,
      label: "Very Satisfied",
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const [ratingtype, setratingtype] = useState(1);
  const change = () => {
    if (ratingtype < 4) {
      setratingtype(ratingtype + 1);
    } else {
      Authaxios.post(`api/addreview/${addreview.id}/`, {
        fullrating: rating.full,
        staffrating: rating.staff,
        foodrating: rating.food,
        cleanlinessrating: rating.clean,
        checkinease: rating.checkinease,
        comment: rating.comment,
        privacy: rating.privacy,
        surrounding: rating.surrounding,
      })
        .then((res) => {
          setratingtype(1);
          setaddreview({
            modal: false,
            id: "",
          });
        })
        .catch((error) => {});
    }
  };
  const [hovered, sethovered] = useState("");
  return (
    <Modal
      style={{
        display: "grid",
        placeContent: "center",
      }}
      open={addreview.modal}
      onClose={() => {
        setaddreview({
          modal: false,
          id: "",
        });
        setratingtype(1);
      }}
    >
      <div className="review_container">
        <div className="review_overlay">
          <h1>Thank you for visiting us</h1>
          <p>We hope you had a great experice with us.</p>
          <p>
            If you you checkin was easy,food was great.... or you werent
            satisfied .. would you take a moment to let us know ?
          </p>
        </div>
        <div className="rating_form">
          {ratingtype === 1 ? (
            <div>
              <div>
                <h3 className="rating_title">Your Overall stay experience</h3>
                <div className="addrating_container">
                  <StyledRating
                    name="simple-controlled"
                    value={rating.full}
                    size="large"
                    onChange={(event, newValue) => {
                      setrating({
                        full: newValue,
                        clean: rating.clean,
                        surrounding: rating.surrounding,
                        food: rating.food,
                        privacy: rating.privacy,
                        staff: rating.staff,
                        comment: rating.comment,
                        checkinease: rating.checkinease,
                      });
                    }}
                    defaultValue={0}
                    precision={1}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                      sethovered("full");
                    }}
                    emptyIcon={<StarBorderIcon style={{ fontSize: "40px" }} />}
                  />
                  {hovered === "full"
                    ? rating.full !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rating.full]}
                        </Box>
                      )
                    : rating.full !== null && (
                        <Box ml={2}>{labels[rating.full]}</Box>
                      )}
                </div>
              </div>
              <div>
                <h3 className="rating_title">Rate cleanliness of your stay</h3>
                <div className="addrating_container">
                  <StyledRating
                    name="simple-controlledq"
                    value={rating.clean}
                    size="large"
                    onChange={(event, newValue) => {
                      setrating({
                        full: rating.full,
                        clean: newValue,
                        surrounding: rating.surrounding,
                        food: rating.food,
                        privacy: rating.privacy,
                        staff: rating.staff,
                        comment: rating.comment,
                        checkinease: rating.checkinease,
                      });
                    }}
                    defaultValue={0}
                    precision={1}
                    IconContainerComponent={IconContainer}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                      sethovered("clean");
                    }}
                  />

                  {hovered === "clean"
                    ? rating.clean !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rating.clean]}
                        </Box>
                      )
                    : rating.clean !== null && (
                        <Box ml={2}>{labels[rating.clean]}</Box>
                      )}
                </div>
              </div>
              <div>
                <h3 className="rating_title">Rate our foods</h3>
                <div className="addrating_container">
                  <StyledRating
                    name="simple-coqwentrolled"
                    value={rating.food}
                    size="large"
                    onChange={(event, newValue) => {
                      setrating({
                        full: rating.full,
                        clean: rating.clean,
                        surrounding: rating.surrounding,
                        food: newValue,
                        privacy: rating.privacy,
                        staff: rating.staff,
                        comment: rating.comment,
                        checkinease: rating.checkinease,
                      });
                    }}
                    defaultValue={0}
                    precision={1}
                    IconContainerComponent={IconContainer}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                      sethovered("food");
                    }}
                  />
                  {hovered === "food"
                    ? rating.food !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rating.food]}
                        </Box>
                      )
                    : rating.food !== null && (
                        <Box ml={2}>{labels[rating.food]}</Box>
                      )}
                </div>
              </div>
            </div>
          ) : ratingtype === 2 ? (
            <div>
              <div>
                <h3 className="rating_title">Rate checkin ease of your stay</h3>
                <div className="addrating_container">
                  <StyledRating
                    name="simple-casdasdontrolled"
                    value={rating.checkinease}
                    size="large"
                    onChange={(event, newValue) => {
                      setrating({
                        full: rating.full,
                        clean: rating.clean,
                        surrounding: rating.surrounding,
                        food: rating.food,
                        privacy: rating.privacy,
                        staff: rating.staff,
                        comment: rating.comment,
                        checkinease: newValue,
                      });
                    }}
                    defaultValue={0}
                    precision={1}
                    IconContainerComponent={IconContainer}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                      sethovered("cease");
                    }}
                  />
                  {hovered === "cease"
                    ? rating.checkinease !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rating.checkinease]}
                        </Box>
                      )
                    : rating.checkinease !== null && (
                        <Box ml={2}>{labels[rating.checkinease]}</Box>
                      )}
                </div>
              </div>
              <div>
                <h3 className="rating_title">Rate staff behaviour</h3>
                <div className="addrating_container">
                  <StyledRating
                    name="sqimple-controlled"
                    value={rating.staff}
                    size="large"
                    onChange={(event, newValue) => {
                      setrating({
                        full: rating.full,
                        clean: rating.clean,
                        surrounding: rating.surrounding,
                        food: rating.food,
                        privacy: rating.privacy,
                        staff: newValue,
                        comment: rating.comment,
                        checkinease: rating.checkinease,
                      });
                    }}
                    defaultValue={0}
                    precision={1}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                      sethovered("staff");
                    }}
                    IconContainerComponent={IconContainer}
                  />
                  {hovered === "staff"
                    ? rating.full !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rating.staff]}
                        </Box>
                      )
                    : rating.staff !== null && (
                        <Box ml={2}>{labels[rating.staff]}</Box>
                      )}
                </div>
              </div>
              <div>
                <h3 className="rating_title">
                  Rate the environment around property
                </h3>
                <div className="addrating_container">
                  <StyledRating
                    name="simple-cosntrolled"
                    value={rating.surrounding}
                    size="large"
                    onChange={(event, newValue) => {
                      setrating({
                        full: rating.full,
                        clean: rating.clean,
                        surrounding: newValue,
                        food: rating.food,
                        privacy: rating.privacy,
                        staff: rating.staff,
                        comment: rating.comment,
                        checkinease: rating.checkinease,
                      });
                    }}
                    defaultValue={0}
                    precision={1}
                    IconContainerComponent={IconContainer}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                      sethovered("surrounding");
                    }}
                  />
                  {hovered === "surrounding"
                    ? rating.surrounding !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rating.surrounding]}
                        </Box>
                      )
                    : rating.surrounding !== null && (
                        <Box ml={2}>{labels[rating.surrounding]}</Box>
                      )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <TextField
                multiline
                fullWidth
                minRows={10}
                maxRows={14}
                label="Share your experience with other guests"
                variant="outlined"
                value={rating.comment}
                onChange={(e) =>
                  setrating({
                    full: rating.full,
                    clean: rating.clean,
                    surrounding: rating.surrounding,
                    food: rating.food,
                    privacy: rating.privacy,
                    staff: rating.staff,
                    comment: e.target.value,
                    checkinease: rating.checkinease,
                  })
                }
              />
            </div>
          )}
          <Button onClick={change} variant="outlined">
            {ratingtype > 2 ? "Post" : "Next"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddReview;
