import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Components/Context";
import { Authaxios } from "../../Components/Axios";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import "./CSS/adminmeal.css";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AdminMeal = () => {
  const { setmailmodal, setmailtext, adminbooking, setadminbooking } =
    useGlobalContext();
  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[2];

    return four;
  }
  const [search, setsearch] = useState("");

  useEffect(() => {
    const tok = localStorage.getItem("axynghkwngasd");
    if (adminbooking.length === 0) {
      setmailmodal(true);
      setmailtext("loading");
      if (tok) {
        Authaxios.get(`/api/property_booking/`).then((res) => {
          setadminbooking(res.data);
          setmailmodal(false);
        });
      }
    }
  }, [setadminbooking, setmailtext, setmailmodal, adminbooking.length]);
  const [searchdata, setsearchdata] = useState([]);
  let data =
    search.length > 0
      ? searchdata.filter((swine) => swine.property_meal.length > 0)
      : adminbooking.filter((swine) => swine.property_meal.length > 0);
  const searchfunc = (e) => {
    setsearch(e.target.value);
    let a = adminbooking.filter(
      (swine) =>
        (swine.fullname !== null &&
          swine.fullname
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim())) ||
        swine.Contact.includes(e.target.value.toLowerCase().trim())
    );
    setsearchdata(a);
  };

  return (
    <div className="admin_dash">
      <AdminSidebar />
      <div className="admin_meal_body">
        <div className="admin_meal_body_main">
          <div style={{ background: "#fff", padding: "14px" }}>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              placeholder="Search by guest name or number"
              value={search}
              onChange={(e) => searchfunc(e)}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
            <h3 style={{ paddingTop: "15px" }}>Guests who ordered meals</h3>
          </div>

          {data
            .filter((swine) => (swine.booking_status = "checkedin"))
            .map((mapped, i) => {
              return (
                <div className="admin_meal_detail" key={i + 1}>
                  <span className="admin_meal_top bor">
                    <div className="sm_modal_information_tile">
                      <h5>Guest</h5>

                      <h6>{`${mapped.fullname} (${mapped.Contact})`}</h6>
                    </div>
                    <div className="sm_modal_information_tile">
                      <h5>Check In</h5>
                      <h6>{convertdatestr(mapped.check_in_date)}</h6>
                    </div>
                    <div className="sm_modal_information_tile">
                      <h5>Check Out</h5>
                      <h6>{convertdatestr(mapped.check_out_date)}</h6>
                    </div>
                  </span>
                  <div>
                    <h3>
                      <i>Meals Ordered</i>
                    </h3>
                    <div className="adminmeal_container bor">
                      {mapped.property_meal.map((mappe, i) => {
                        return (
                          <div key={i + 1}>
                            <h4>{mappe.name}</h4>
                            <h6>NPR {mappe.price}</h6>
                          </div>
                        );
                      })}
                    </div>

                    <div className="admin_meal_top">
                      <span>
                        <h5 style={{ fontWeight: "bolder" }}>Meal Price</h5>
                        <h6>NPR {mapped.meal_price} </h6>
                      </span>
                      <span>
                        <h5 style={{ fontWeight: "bolder" }}>Total Price</h5>
                        <h6>NPR {mapped.total_price} </h6>
                      </span>
                      <span>
                        <h5 style={{ fontWeight: "bolder" }}>Payment</h5>
                        <h6>{mapped.payment_options} </h6>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminMeal;
