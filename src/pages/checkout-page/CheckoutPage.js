import React, { useEffect, useState } from "react";
import "./checkoutPage.css";

import numeral from "numeral";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  emptyCart,
  getCart,
  resetCart,
  saveUserAddress,
} from "../../redux/cart/cart.actions";

import Spinner from "../../components/spinner/Spinner";

import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import CART from "../../redux/cart/cart.types";
import { applyCoupon } from "../../redux/coupons/coupons.actions";
import { toast } from "react-toastify";
import ORDER from "../../redux/order/order.types";
import { createCODOrder } from "../../redux/order/order.actions";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const CheckoutPage = ({ history }) => {
  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [coupon, setCoupon] = useState("");

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartCashOnDelivery = useSelector((state) => state.cartCashOnDelivery);
  const { trigger } = cartCashOnDelivery;

  const cartGet = useSelector((state) => state.cartGet);
  const { cart: cartGetFormDB } = cartGet;

  const cartEmpty = useSelector((state) => state.cartEmpty);
  const { success: successEmpty } = cartEmpty;

  const cartUserAddress = useSelector((state) => state.cartUserAddress);
  const {
    success: successUserAddress,
    loading: loadingUserAddress,
    error: errorAddress,
  } = cartUserAddress;

  const couponApplyToCart = useSelector((state) => state.couponApplyToCart);
  const {
    success: successApply,
    totalPrice,
    loading: loadingApply,
    error: errorApply,
  } = couponApplyToCart;

  const orderCODCreate = useSelector((state) => state.orderCODCreate);
  const { success: successCODCreate } = orderCODCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(userInfo?.email?.token?.token));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successUserAddress) {
      toast.success("Address updated successfully.");
    } else {
      toast.error(errorAddress);
    }
  }, [successUserAddress, errorAddress]);

  useEffect(() => {
    if (successApply) {
      toast.success(
        `You successfully apply coupon ${totalPrice?.validCoupon?.name}`,
      );
    } else {
      toast.error(errorApply);
    }
  }, [successApply, errorApply, totalPrice]);

  const handleEmptyCart = () => {
    dispatch(emptyCart(userInfo?.email?.token?.token));
    dispatch({ type: CART.CART_SAVE_RESET });
    localStorage.removeItem("cartItems");
    dispatch(resetCart());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveUserAddress(
        { address, postalCode, city, country },
        userInfo?.email?.token?.token,
      ),
    );
  };

  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    dispatch(applyCoupon({ coupon }, userInfo?.email?.token?.token));
  };

  const handlePayment = () => {
    if (!trigger) {
      dispatch({ type: ORDER.ORDER_CREATE_RESET });
      history.push("/payment");
    } else {
      dispatch({ type: ORDER.ORDER_CREATE_COD_RESET });
      dispatch(createCODOrder(trigger, userInfo?.email?.token?.token));
      if (successCODCreate) {
        dispatch(emptyCart(userInfo?.email?.token?.token));
        localStorage.removeItem("cartItems");
        dispatch(resetCart());
        history.push("/user/history");
      }
    }
  };

  return (
    <div className="checkoutPage">
      {loadingUserAddress
        ? <Spinner />
        : loadingApply
        ? <Spinner />
        : successEmpty || cartItems.length === 0
        ? <h1>
          You successfully empty your cart<Link
            to="/"
            className="checkoutPage__link"
          >
            Continue shopping.
          </Link>
        </h1>
        : (<>
          <div className="checkoutPage__container">
            <div className="checkoutPage__left">
              <div className="checkoutPage__deliveryAddress">
                <h1>Shipping address:</h1>
                <p>
                  To continue purchase (place order), you must save your
                  shipping address first.
                </p>
                <form onSubmit={handleSubmit} className="checkoutPage__form">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <ColorButton
                    variant="contained"
                    color="primary"
                    style={{
                      outlineWidth: "0",
                      width: "12rem",
                      marginLeft: "0",
                    }}
                    className={classes.margin}
                    type="submit"
                  >
                    Save Address
                  </ColorButton>
                </form>
              </div>
              <div className="checkoutPage__coupons">
                <p>Got a coupon?</p>
                <span>For demo use: DEMOPURPOSE</span>
                <form
                  onSubmit={handleSubmitCoupon}
                  className="checkoutPage__couponForm"
                >
                  <input
                    type="text"
                    value={coupon}
                    placeholder="Place coupon name"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <ColorButton
                    variant="contained"
                    color="primary"
                    style={{
                      outlineWidth: "0",
                      width: "12rem",
                      marginLeft: "0",
                    }}
                    className={classes.margin}
                    disabled={!successUserAddress}
                    onClick={handleSubmitCoupon}
                  >
                    Apply
                  </ColorButton>
                </form>
              </div>
            </div>
            <div className="checkoutPage__right">
              <h1>Order sumary</h1>
              <p className="checkoutPage__numberOfProducts">
                {cartGetFormDB?.products?.length} products
              </p>
              {cartGetFormDB?.products?.map((p, i) => (
                <div key={i} className="checkoutPage__listOfProducts">
                  <p>{p.product.title} ({p.color})</p>
                  <p>
                    {p.count} * {numeral(p.product.price).format("0,0.00")} =
                    <strong>
                      {numeral(p.count * p.product.price).format("0,0.00")} RSD
                    </strong>
                  </p>
                </div>
              ))}
              {successApply
                ? <p className="checkoutPage__totalPrice">
                  Total price: {numeral(totalPrice?.totalAfterDiscount).format(
                    "0,0.00",
                  )} RSD
                </p>
                : <p className="checkoutPage__totalPrice">
                  Total price: {numeral(cartGetFormDB?.cartTotal).format(
                    "0,0.00",
                  )} RSD
                </p>}

              <div className="checkoutPage__buttons">
                <ColorButton
                  variant="contained"
                  color="primary"
                  style={{ outlineWidth: "0", width: "12rem", marginLeft: "0" }}
                  className={classes.margin}
                  disabled={!successUserAddress}
                  onClick={handlePayment}
                >
                  Place order
                </ColorButton>
                <ColorButton
                  variant="contained"
                  color="primary"
                  style={{ outlineWidth: "0", width: "12rem", marginLeft: "0" }}
                  className={classes.margin}
                  onClick={handleEmptyCart}
                >
                  Empty cart
                </ColorButton>
              </div>
            </div>
          </div>
        </>)}
    </div>
  );
};

export default CheckoutPage;
