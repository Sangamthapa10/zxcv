import React, { useContext, useState, useRef } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //datepicker
  const [bigdate, setbigdate] = useState(false);
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: tomorrow,
      key: "selection",
    },
  ]);
  //alert
  const [alert, setalert] = useState(false);
  const [alerttext, setalerttext] = useState("");
  const [alerttype, setalerttype] = useState("");
  const [snackbar, setsnackbar] = useState(false);
  //alert ends
  const roomref = useRef();
  const desc = useRef();
  const amneties = useRef();
  const rating = useRef();
  const map = useRef();
  const weather = useRef();
  const mapbar = useRef();
  const mealref = useRef();
  // tourdetail scroll indicator ref
  const container = useRef();
  const ldetail = useRef();
  const highlight = useRef();
  const plan = useRef();
  const include = useRef();
  const exclude = useRef();
  const tourscrollbar = useRef();

  const [search_loading, setsearch_loading] = useState(true);
  const [mealid, setmealid] = useState("");
  const [userdetail, setuserdetail] = useState([]);
  const [login, setlogin] = useState(false);
  const [guestcount, setguestcount] = useState(1);
  const [selectid, setselectid] = useState("");
  const [selectname, setselectname] = useState("");
  const [roomselectid, setroomselectid] = useState(0);
  const [suggestmodal, setsuggestmodal] = useState(false);
  const [roomcount, setroomcount] = useState(1);
  const [date, setdate] = useState("");
  const [checkin_date, setcheckin_date] = useState("");
  const [checkout_date, setcheckoutdate] = useState("");
  const [lat, setlat] = useState("");
  const [lon, setlon] = useState("");
  const [homedata, sethomedata] = useState([]);
  const [sloading, setsloading] = useState(true);
  const [modal, setmodal] = useState(false);
  const [allroom_modal, setallroom_modal] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  // singlepage
  const [limg, setlimg] = useState([]);
  const [amnetymodal, setamnetymodal] = useState(false);
  const [singlepage, setsinglepage] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [img_gallery, setimg_gallery] = useState(false);
  const [img_gallerydata, setimg_gallerydata] = useState([]);
  const [imgid, setimgid] = useState("");
  const [m_detail, setm_detail] = useState(false);
  const [imgmodal, setimgmodal] = useState(false);
  const [bookwdac, setbookwdac] = useState(false);
  //singlepage smroomoptins
  const [smselectroom, setselectroom] = useState("");
  const [smmeal, setsmmeal] = useState([]);
  //singlepage meal
  const [selectedmeal, setselectedmeal] = useState([]);
  //singlepage booking available detail
  const [sbookingdetail, setsbookingdetail] = useState([]);
  // singlepage ends
  //Login
  const [resetpw, setresetpw] = useState(false);
  const [otp, setotp] = useState("");

  //profile start
  const [cinfo_open, setcinfo_open] = useState(false);

  //profile end
  // Searchpage
  const [modalfilter, setmodalfilter] = useState(false);
  const [searchdata, setsearchdata] = useState([]);
  const [filter_data, setfilterdata] = useState([]);
  const [max, setmax] = useState(2000);
  const [min, setmin] = useState(100);
  const [value, setValue] = useState([100, 2000]);
  const [maplat, setmaplat] = useState("");
  const [maplon, setmaplon] = useState("");
  const [searchbymap, setsearchbymap] = useState(false);
  // Searchpage ends
  // Admin
  const admin_priceref = useRef();
  const [adminsidebar, setadminsidebar] = useState(false);
  const [adminbooking, setadminbooking] = useState([]);
  const [property_overview, setproperty_overview] = useState([]);
  const [chartdata, setchartdata] = useState([]);
  const [keymodal, setkeymodal] = useState(false);
  const [keydata, setkeydata] = useState([]);
  const [adminimg, setadminimg] = useState(false);
  const [sidebar, setsidebar] = useState(false);
  const [reqadmin, setreqadmin] = useState(false);
  const [adminreqdata, setadminreqdata] = useState([]);

  //roomkey
  const [keyformmodal, setkeyformmodal] = useState(false);
  const [admin_important, setadmin_important] = useState(0);
  //adminmodal
  const [mselect, setmselect] = useState("");

  // Adminends
  const [stour, setstour] = useState({
    tour: [],
    package: [],
  });
  const [dailymodal, setdailymodal] = useState(false);
  //auth
  const [signin, setsignin] = useState(false);
  const [booknow, setbooknow] = useState(false);
  //navbar

  const bignavref = useRef();
  const [datemodal, setdatemodal] = useState(false);
  const [inputvalue, setinputvalue] = useState("");
  //smtrip
  const [smtrip_bmodal, setsmtrip_bmodal] = useState(false);
  //booking confirmed
  const [bookingconfirmed, setbookingconfirmed] = useState({
    data: [],
    fetcherror: false,
  });
  //mdailmodal
  const [mailmodal, setmailmodal] = useState(false);
  const [mailtext, setmailtext] = useState("");
  // search small
  const [smpicker, setsmpicker] = useState("date");
  // booking
  const [bmealadd, setbmealadd] = useState([]);
  const [addreview, setaddreview] = useState({
    modal: false,
    id: "",
  });
  return (
    <AppContext.Provider
      value={{
        sbookingdetail,
        setsbookingdetail,
        selectedmeal,
        setselectedmeal,
        bookwdac,
        setbookwdac,
        inputvalue,
        setinputvalue,
        cinfo_open,
        setcinfo_open,
        adminsidebar,
        setadminsidebar,
        value,
        setValue,
        addreview,
        setaddreview,
        img_gallerydata,
        setimg_gallerydata,
        bigdate,
        setbigdate,
        bmealadd,
        setbmealadd,
        mselect,
        setmselect,
        adminreqdata,
        setadminreqdata,
        reqadmin,
        setreqadmin,
        smmeal,
        setsmmeal,
        smselectroom,
        setselectroom,
        smpicker,
        setsmpicker,
        state,
        setState,
        imgmodal,
        setimgmodal,
        limg,
        setlimg,
        amnetymodal,
        setamnetymodal,
        snackbar,
        setsnackbar,
        imgid,
        setimgid,
        activeStep,
        setActiveStep,

        mailtext,
        setmailtext,
        sidebar,
        setsidebar,
        mailmodal,
        setmailmodal,
        adminimg,
        setadminimg,
        alerttype,
        setalerttype,
        alert,
        setalert,
        alerttext,
        setalerttext,
        admin_important,
        setadmin_important,
        keyformmodal,
        setkeyformmodal,
        keydata,
        setkeydata,
        keymodal,
        setkeymodal,
        resetpw,
        setresetpw,
        bookingconfirmed,
        setbookingconfirmed,
        modalfilter,
        setmodalfilter,

        max,
        min,
        setmax,
        setmin,
        searchdata,
        setsearchdata,
        filter_data,
        setfilterdata,

        admin_priceref,
        smtrip_bmodal,
        setsmtrip_bmodal,
        datemodal,
        setdatemodal,
        booknow,
        setbooknow,
        signin,
        bignavref,
        setsignin,
        dailymodal,
        setdailymodal,
        stour,
        setstour,
        otp,
        setotp,
        tourscrollbar,
        container,
        ldetail,
        highlight,
        plan,
        include,
        exclude,
        m_detail,
        setm_detail,
        img_gallery,
        setimg_gallery,
        searchbymap,
        setsearchbymap,
        maplat,
        setmaplat,
        maplon,
        setmaplon,
        chartdata,
        setchartdata,
        property_overview,
        setproperty_overview,
        adminbooking,
        setadminbooking,
        search_loading,
        setsearch_loading,
        mealref,
        mapbar,
        mealid,
        setmealid,
        desc,
        amneties,
        weather,
        map,
        rating,

        dropdown,
        setdropdown,
        roomref,

        allroom_modal,
        setallroom_modal,
        modal,
        setmodal,
        sloading,
        setsloading,
        homedata,
        sethomedata,
        lat,
        setlat,
        lon,
        setlon,
        checkin_date,
        setcheckin_date,
        checkout_date,
        setcheckoutdate,
        date,
        setdate,
        roomselectid,
        roomcount,
        setroomcount,
        setroomselectid,
        selectid,
        setselectid,
        selectname,
        setselectname,
        userdetail,
        setuserdetail,
        singlepage,
        guestcount,
        setguestcount,
        setsinglepage,
        login,
        setlogin,
        suggestmodal,
        setsuggestmodal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
