import React, { useEffect, useState } from "react";
import "./stripeCheckout.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";

import { createPayment } from "../../redux/stripe/stripe.actions";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { createOrder } from "../../redux/order/order.actions";
import { emptyCart, resetCart } from "../../redux/cart/cart.actions";

const cartStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckout = () => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const stripeCreatePaymentIntent = useSelector((state) =>
    state.stripeCreatePaymentIntent
  );
  const { stripe: stripePayment, error: errorPayment } =
    stripeCreatePaymentIntent;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success: successCreate } = orderCreate;

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createPayment(userInfo?.email?.token?.token));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successCreate) {
      dispatch(emptyCart(userInfo?.email?.token?.token));
      localStorage.removeItem("cartItems");
      dispatch(resetCart());
    }
  }, [dispatch, successCreate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(
      stripePayment.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: e.target.name.value,
          },
        },
      },
    );
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      dispatch(createOrder(payload, userInfo?.email?.token?.token));
      // console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    //   listen for changes in the card element
    //   and dispay any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment Successfull.{" "}
        <Link to="/user/history">
          <span className="result-message">
            Click, to see it in your purchase history.
          </span>
        </Link>
      </p>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={error || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <Spinner /> : "Pay"}
          </span>
        </button>
        <br />
        {error &&
          <div className="card-error" id="card-error" role="alert">
            {error}
          </div>}
        {errorPayment &&
          <div className="card-error" id="card-error" role="alert">
            {errorPayment}
          </div>}
      </form>
    </>
  );
};

export default StripeCheckout;
