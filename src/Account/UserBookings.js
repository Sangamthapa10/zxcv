import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Components/Context";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ApartmentIcon from "@material-ui/icons/Apartment";
import { useHistory } from "react-router-dom";
import { Authaxios } from "../Components/Axios";
import Button from "@material-ui/core/Button";
function UserBookings() {
  const { guestcount, roomcount, checkin_date, checkout_date } =
    useGlobalContext();
  const history = useHistory();
  const hotel = (id, Name, default_room) => {
    history.push(
      `single/ ${id} /${Name}/${default_room}/${checkin_date}/${checkout_date}/${guestcount}/${roomcount}/ `
    );
  };
  const [userbooking, setuserbooking] = useState([]);
  const authorized = localStorage.getItem("axynghkwngasd");

  useEffect(() => {
    if (authorized) {
      Authaxios.get("/api/userbookinglist/").then((res) => {
        console.log(res.data);
        setuserbooking(res.data);
      });
    }
  }, [authorized]);
  const login = () => {
    history.push("/profile");
  };
  return (
    <div>
      {authorized ? (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Hotel</TableCell>
                <TableCell> Check In</TableCell>
                <TableCell> Check out</TableCell>
                <TableCell> Room Type</TableCell>
                <TableCell> Price</TableCell>
                <TableCell> Payment Method</TableCell>
              </TableRow>
            </TableHead>
            {userbooking.map((mapped) => {
              let property = mapped.hotel;
              let roo = property.room_option;
              let room = roo.filter((swine) => swine.id === mapped.room.id);
              console.log(room);
              return (
                <TableBody>
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      hotel(
                        mapped.property.id,
                        mapped.property.Name,
                        mapped.property.default_room.id
                      )
                    }
                  >
                    <img
                      src={room[0].room_img[0].img}
                      alt="one "
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    />
                    {property.Name}
                  </TableCell>
                  <TableCell>{mapped.check_in_date}</TableCell>
                  <TableCell>{mapped.check_out_date}</TableCell>
                  <TableCell>{mapped.room.name}</TableCell>
                  <TableCell>{mapped.price}</TableCell>
                  <TableCell>{mapped.payment_options}</TableCell>
                </TableBody>
              );
            })}
          </Table>
        </div>
      ) : (
        <div className="unathorized_page">
          <ApartmentIcon className="apartment_icon" />

          <h5>
            {authorized
              ? "Log in to view your shortlisted Properties"
              : "hello"}
          </h5>
          <Button
            fullWidth
            onClick={login}
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
          >
            {authorized ? "Login" : "Explore"}
          </Button>
        </div>
      )}
    </div>
  );
}
export default UserBookings;
