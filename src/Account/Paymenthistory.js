import React, { useEffect, useState } from "react";
import { Authaxios } from "../Components/Axios";
import { useGlobalContext } from "../Components/Context";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function Paymenthistory() {
  const [data, setdata] = useState([]);
  const history = useHistory();
  const { setmailmodal, setmailtext } = useGlobalContext();
  useEffect(() => {
    setmailmodal(true);
    setmailtext("loading");
    let source = Axios.CancelToken.source();
    const fetchdata = async () => {
      const tok = localStorage.getItem("axynghkwngasd");
      if (tok) {
        Authaxios.get("api/payment_history")
          .then((res) => {
            setdata(res.data);
            console.log(res);
            setmailmodal(false);
          })
          .catch((error) => {
            setmailmodal(false);
          });
      } else {
        setmailmodal(false);
      }
    };

    fetchdata();
    return () => {
      source.cancel();
    };
  }, [setmailmodal, setmailtext]);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100vw",
          backgroundColor: "#fff",
        }}
        className="gallery_modal_head"
      >
        <div
          className="close_personal__container"
          style={{
            padding: "10px",

            backgroundColor: "#fff",
          }}
        >
          <ArrowBackIosIcon
            onClick={() => history.goBack()}
            style={{
              width: "30px",
              height: "30px",
              color: "rgb(34, 34, 34)",
              cursor: "pointer",
            }}
          />
          <h4>Payment Info</h4>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>amount</th>
            <th>Time</th>
            <th>payment method</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mapped, i) => {
            return (
              <tr key={i + 1}>
                <td>{mapped.amount}</td>
                <td>{mapped.timestamp.slice(0, 10)}</td>
                <td>{mapped.payment_method}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Paymenthistory;
