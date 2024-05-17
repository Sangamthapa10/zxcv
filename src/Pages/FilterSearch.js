import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Customaxios from "../Components/Axios";

function FilterSearch() {
  const { lat } = useParams();
  const { lon } = useParams();
  const [searchdata, setsearchdata] = useState([]);

  useEffect(() => {
    Customaxios.get(
      `/api/property/?latitude=${Math.floor(lon)}&longitude=${Math.floor(lat)}`
    )
      .then((res) => {
        const one = res.data;
        const two = one.results;
        setsearchdata(two);
      })
      .catch((error) => {
        setsearchdata([]);
      });
  }, [lat, lon]);
  return (
    <div>
      {searchdata.map((mapped) => {
        const { Name, hotel_dp } = mapped;
        return (
          <div>
            <img className="card_img" src={hotel_dp} alt={Name} />
          </div>
        );
      })}
    </div>
  );
}

export default FilterSearch;
