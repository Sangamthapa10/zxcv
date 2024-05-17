import React from "react";
import { List, ListItem, ListItemIcon } from "@material-ui/core";
import FlightIcon from "@material-ui/icons/Flight";
const GuestPolicy = () => {
  return (
    <div className="policy_container">
      <div className="guest_policy">
        <h3>Guest Policy</h3>
        <span className="guest_policy_item">
          <h5>NO-COOKING, COOKING APPLIANCES, COMBUSTIBLES, OR FIREWORKS:</h5>
          <p>
            The safety of our guests, staff, and this facility is extremely
            important to us. Except for the microwave and refrigerator units
            that the hotel provides, preparation of food in guest rooms by any
            type of cooking appliances is prohibited. A minimum fee of $300.00
            will be charged for cooking in a room, including, but not limited to
            coffee makers, hot plates, toaster ovens, water heaters, rice
            cookers, combustible, open flame, barbecue grill, burners, heating
            appliance, or any other item intended for cooking. Open fires,
            flames or cooking grills, either charcoal or gas, and fireworks are
            not allowed anywhere on hotel property. A microwave is available 24
            hours for all registered guests to use in our breakfast area. Coffee
            is also available twenty-four (24) hours in the breakfast area.
          </p>
        </span>
        <span className="guest_policy_item">
          <h5>CHECK-IN REQUIREMENTS:</h5>

          <p>
            Guests must be at least 18 years of age to check in at All Seasons
            Inn & Suites. In the interests of security and to prevent fraud,
            guests are required to confirm their identity by providing their
            valid government issued photo identification (State driver’s
            license, passport, etc.) at check-in. A valid, signed, and
            pre-approved credit card in the name of the guest registration is
            also required. It is your responsibility to fully understand the
            manner in which your bank processes pre-authorizations and charges
            to your credit/debit card. Some banks hold pending authorizations
            for up to 30 business days.
          </p>
        </span>
      </div>

      <div className="cancellation_policy">
        <h3>Cancellation Policy</h3>
        <List>
          <ListItem>
            <ListItemIcon>
              <FlightIcon />
            </ListItemIcon>
            Free cancellation until 24 hours before check-in (time shown in the
            confirmation email). After that, cancel before check-in and get a
            full refund, minus the first night and service fee.
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FlightIcon />
            </ListItemIcon>
            If room key is enabled then its not refundable
          </ListItem>
        </List>
      </div>
      <div className="terms_conditions"></div>
    </div>
  );
};

export default GuestPolicy;
