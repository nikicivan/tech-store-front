import React from "react";
import "./paymentPage.css";
import stripeKey from "../../utils/stripe";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../../components/stripe-checkout/StripeCheckout";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(stripeKey);

const PaymentPage = () => {
  return (
    <div className="paymentPage">
      <div className="paymentPage__container">
        <div className="paymentPage__title">
          <h1>Continue your purchase...</h1>
          <p><strong>For test payment use next parameters:</strong></p>
          <p><span>Visa number:</span>4242 4242 4242 4242</p>
          <p><span>MM / YY</span>04/24</p>
          <p><span>CVC / ZIP</span>242 / 42424</p>
        </div>
        <Elements stripe={promise}>
          <StripeCheckout />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
