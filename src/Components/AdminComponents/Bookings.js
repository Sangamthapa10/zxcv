import React, { useEffect, useState } from "react";
import { Authaxios, Customnaxios } from "../Axios";
import { useGlobalContext } from "../Context";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createMuiTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { purple, red, blue } from "@mui/material/colors";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    prim: red,
    secondary: blue,
  },
});

const Booked = () => {
 
};

export default Booked;
