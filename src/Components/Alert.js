import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";
import Alert from "@material-ui/lab/Alert";
function Alertmsg() {
  const { alerttype, alert, setalert, alerttext } = useGlobalContext();
  useEffect(() => {
    if (alert) {
      setTimeout(function one() {
        setalert(false);
      }, 6000);
    }
  });
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        zIndex: 100000000000,
        left: 0,
        width: "100%",
      }}
    >
      {alert && (
        <Alert severity={alerttype ? alerttype : "success"}>{alerttext}</Alert>
      )}
    </div>
  );
}

export default Alertmsg;
