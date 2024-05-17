import React from "react";
import "./App.css";
//React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Navbar
import BigNav from "./Components/Navbar/Bignav";
import SmallNav from "./Components/Navbar/SmallNav";
//Singlepage
import Singlepage from "./Pages/Singlepage";
//Home
import Home from "./Pages/Home";
//Footers
import BigFooter from "./Components/Footer/BigFooter";
//Searchpage
import SearchPage from "./Pages/SearchPage";
//Booking
import BookingPage from "./Pages/BookingPage";
import BookingConfirmed from "./Pages/BookingConfirmed";
// Admin
import AdminStats from "./Pages/AdminPages/AdminStats";
import AdminMeal from "./Pages/AdminPages/AdminMeal";
import AdminInbox from "./Pages/AdminPages/AdminInbox";
import Paymenthistory from "./Account/Paymenthistory";
import Adminaccount from "./Pages/AdminPages/Adminaccount";
import Bookdetails from "./Pages/AdminPages/Bookdetails";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import AdminNav from "./Components/AdminComponents/AdminNav";
import HistoryTable from "./Components/AdminComponents/HistoryTable";
import AdminDash from "./Pages/AdminPages/AdminDash";
import AdminBooking from "./Pages/AdminPages/AdminBooking";
import AdminProperty from "./Pages/AdminPages/AdminProperty";
import ModalAdminRoomKey from "./Components/AdminComponents/ModalAdminRoomKey";
//Components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Account
import Login from "./Account/Login";
import Profile from "./Account/Profile";
import PersonalInfo from "./Account/PersonalInfo";
import Pwchange from "./Account/Pwchange";
import Privacy from "./Account/Privacy";
import Pm from "./Pages/pm";
import Favourite from "./Pages/Favourite";
//booking
import Booking from "./Pages/Booking";
//enlist
import Enlist from "./Pages/Enlist";
//alert
import Alertmsg from "./Components/Alert";
import Popup from "./Components/Popup";
//mdailmodal
import Mailmodal from "./Components/Mailmodal";
//website detail
import Websitedetail from "./Pages/Websitedetail";
//Suggest
import Suggest from "./Components/Suggest";
import BookForm from "./Pages/BookForm";
//searchmodal
import Searchsm from "./Components/Searchsm";
//addreview
import AddReview from "./Components/AddReview";
//errorpage
import Errorpage from "./Pages/Errorpage";
function App() {
  const uadmin = localStorage.getItem("adminuser");
  return (
    <div>
      <Router>
        <Searchsm />
        <Alertmsg />
        <Mailmodal />
        <AddReview />
        <Login />
        <Suggest />
        <Popup />
        {uadmin && <ModalAdminRoomKey />}
        <Switch>
          {/* ..adminpage start */}
          <Route exact path="/adminlogin">
            <AdminLogin />
          </Route>
          {uadmin && (
            <Route exact path="/adminproperty/inbox">
              <AdminNav />

              <AdminInbox />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/adminproperty/:amnetymodal?/:aid?">
              <AdminNav />

              <AdminProperty />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/admin/bookdetails/:id">
              <AdminNav />

              <Bookdetails />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/adminproperty/:amnetymodal?/:aid?">
              <AdminNav />

              <AdminProperty />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/adminmeal">
              <AdminNav />

              <AdminMeal />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/adminbookings">
              <AdminNav />
              <AdminBooking />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/adminhome">
              <AdminNav />
              <AdminDash />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/adminstats">
              <AdminNav />
              <AdminStats />
            </Route>
          )}

          {uadmin && (
            <Route exact path="/admindash">
              <AdminNav />

              <AdminDash />
            </Route>
          )}
          {uadmin && (
            <Route exact path="/adminhistory">
              <AdminNav />
              <HistoryTable />
            </Route>
          )}

          {uadmin && (
            <Route exact path="/adminaccount">
              <AdminNav />
              <Adminaccount />
            </Route>
          )}
          {/* adminpage ends */}
          <Route exact path="/webdetail/:page">
            <Websitedetail />
          </Route>
          <Route exact path="/account/privacy">
            <Privacy />
          </Route>
          <Route exact path="/enlistproperty">
            <Enlist />
          </Route>
          <Route exact path="/paymentVerification/">
            <Pm />
          </Route>

          <Route exact path="/checkbooking">
            <SmallNav />
            <BookForm />
          </Route>
          <Route exact path="/booking/confirmed/id=:id/contact=:contact">
            <BookingConfirmed />
          </Route>
          <Route
            exact
            path="/booking/:hotelid/checkin=:check_in/checkout=:check_out/room=:roomcount/guests=:guestcount/selected_room=:selected_room?/"
          >
            <BookingPage />
          </Route>
          <Route exact path="/profile">
            <SmallNav />
            <Profile />
          </Route>
          <Route exact path="/account/personalinfo">
            <PersonalInfo />
          </Route>
          <Route exact path="/account/security">
            <Pwchange />
          </Route>
          <Route exact path="/account/payments">
            <Paymenthistory />
          </Route>
          <Route exact path="/booking">
            <SmallNav />

            <Booking />
            {/* <UserBookings /> */}
          </Route>
          <Route exact path="/favourite">
            <SmallNav />
            <Favourite />
          </Route>
          <Route
            exact
            path="/search/:query/checkin=:check_in/checkout=:check_out/guest=:guestcount/room=:roomcount/latitude=:lat?/longitude=:lon?/filter=:filter_id?/type=:type?/guest_rating=:g_rating?/order=:ordering?"
          >
            <SmallNav />
            <SearchPage />
          </Route>
          <Route
            exact
            path="/nearby/:lat/:lon/:check_in/:check_out/:guestcount/:roomcount/"
          >
            <SmallNav />
            <SearchPage />
          </Route>
          <Route
            exact
            path="/single/:id/:name/checkin=:check_in/checkout=:check_out/guests=:guestcount/room=:roomcount/selected_room=:selectedroom?/meals=:mealid?/bookingmodal=:bookmodal?"
          >
            <SmallNav />
            <Singlepage />
          </Route>
          <Route exact path="/">
            <SmallNav />
            <BigNav />
            <Home />
          </Route>
          <Route>
            <Errorpage />
          </Route>
        </Switch>
        <BigFooter />
      </Router>
    </div>
  );
}

export default App;
