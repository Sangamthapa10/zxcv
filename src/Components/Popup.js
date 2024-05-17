import React from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useGlobalContext } from "./Context";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Popup() {
  const { snackbar, setsnackbar, alerttext, alerttype } = useGlobalContext();
  return (
    <div>
      <Snackbar
        open={snackbar}
        autoHideDuration={600000}
        onClose={() => setsnackbar(false)}
      >
        <Alert onClose={() => setsnackbar(false)} severity={alerttype}>
          {alerttext}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Popup;
