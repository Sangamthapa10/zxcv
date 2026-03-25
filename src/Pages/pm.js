import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Authaxios from "../Components/Axios";
import {Button,Dialog,DialogActions,DialogContent,DialogContentText} from "@mui/material";
const Pm = () => {
  const [open, setOpen] = useState(false);

  const history = useHistory();
  function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }

  var url_string = window.location.search.substring(1);
  var c = parse_query_string(url_string);
  useEffect(() => {
    Authaxios.post(`http://127.0.0.1:8000/api/esewa/`, {
      total: c.amt,
      rid: c.refId,
      pid: c.oid,
      book: true,
    })

      .then((res) => {
        console.log(res.data);
        if (res.data.result === "paid") {
          history.push(`/booking/confirmed/id=${c.oid}`);
        }
      })
      .catch((error) => {
        setOpen(true);
      });
  }, [c.amt, c.refId, history, c.oid]);

  // var url = new URL(url_string);
  // var c = url.searchParams.get("amt");
  const [a, seta] = React.useState(false);
  setInterval(function () {
    seta(!a);
  }, 3000);
  return (
    <div className="payment_check_body">
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Could Not Verify Payment</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)} color="primary">
            Pay at hotel
          </Button>
          <Button color="primary" autoFocus>
            Try Again
          </Button>
        </DialogActions>
      </Dialog>
      <div className="wrapper_pay_loader">
        <h1>
          Validating Payment {c.amt} {c.refId} {c.oid}
          <div className={`${a && "dots--animate"} dots`}>
            <span className="dot z"></span>
            <span className="dot f"></span>
            <span className="dot s"></span>
            <span className="dot t">
              <span className="dot l"></span>
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Pm;
