import React, { useState, useEffect } from "react";
import { Authaxios } from "../../Components/Axios";
import { useGlobalContext } from "../../Components/Context";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import "./CSS/AdminProperty.css";
// tab components
import PropertyDetails from "../../Components/AdminComponents/AdminPropertyComponents/PropertyDetails";
import BookingSettings from "../../Components/AdminComponents/AdminPropertyComponents/BookingSettings";
import Axios from "axios";
function AdminProperty() {
  const [property, setaproperty] = useState([]);
  const [loading, setloading] = useState(false);
  const { admin_priceref } = useGlobalContext();
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      if (property.length === 0) {
        Authaxios.get("/api/owner_property")
          .then((res) => {
            setaproperty(res.data);

            setloading(true);
          })
          .catch((error) => {
            alert("try again later");
          });
      }
    };
    fetchdata();
    return () => {
      source.cancel();
    };
  }, [property]);
  const [tab, settab] = useState(0);
  const pricetab = () => {
    settab(0);
    window.scrollTo({
      top: admin_priceref.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  return (
    <div className="admin_dash">
      <AdminSidebar />
      {loading && (
        <div className="admin_property_body">
          <div>
            <h1>{property.Name}</h1>
            <div className="admin_tab_container">
              <div className="admin_tab_panel">
                <div className="admin_tab_panel_body">
                  <span
                    onClick={() => settab(0)}
                    className={`${
                      tab === 0 && "admin_tab_panel_active"
                    } admin_tab`}
                  >
                    Property Details
                  </span>
                  <span
                    onClick={() => settab(1)}
                    className={`${
                      tab === 1 && "admin_tab_panel_active"
                    } admin_tab`}
                  >
                    Booking Setttings
                  </span>
                  <span
                    onClick={pricetab}
                    className={`${
                      tab === 2 && "admin_tab_panel_active"
                    } admin_tab`}
                  >
                    Pricing
                  </span>
                  <span
                    onClick={() => settab(3)}
                    className={`${
                      tab === 3 && "admin_tab_panel_active"
                    } admin_tab`}
                  >
                    Availability
                  </span>
                </div>
              </div>
              {/* <div className="admin_property_uprofile">
            <div className="admin_propertydp">
              <img className="adp" src={property.hotel_dp.img} alt="a" />
            </div>
            <span className="admin_pname">{property.Name}</span>
          </div>

          <div className="admin_property_main">
            <TextField value={property.Address} />
          </div> */}
              <div className="admin_tab_result">
                {tab === 1 ? (
                  <BookingSettings data={property} />
                ) : (
                  <PropertyDetails data={property} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProperty;
