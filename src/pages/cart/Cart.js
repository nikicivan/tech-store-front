import React, { useEffect } from "react";
import "./cart.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart-item/CartItem";
import { cashOnDelivery, saveCart } from "../../redux/cart/cart.actions";

import numeral from "numeral";
import { toast } from "react-toastify";

import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import CART from "../../redux/cart/cart.types";
import COUPON from "../../redux/coupons/coupons.types";

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

const Cart = ({ history }) => {
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const cartSave = useSelector((state) => state.cartSave);
  const { success, error } = cartSave;

  const getTotalItems = () => {
    return cartItems.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count;
    }, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      history.push("/checkout");
    } else {
      toast.error(error);
    }
  }, [history, error, success]);

  const saveToDB = () => {
    // console.log(JSON.stringify(cartItems, null, 4));
    dispatch(saveCart(cartItems, userInfo?.email?.token?.token));
    dispatch({ type: CART.CART_EMPTY_RESET });
    dispatch({ type: CART.CART_GET_RESET });
    dispatch({ type: CART.CART_ADDRESS_RESET });
    dispatch({ type: COUPON.COUPON_APPLY_TO_CART_RESET });
  };

  const saveCashOrderToDB = () => {
    dispatch(cashOnDelivery(true));
    dispatch(saveCart(cartItems, userInfo?.email?.token?.token));
    dispatch({ type: CART.CART_EMPTY_RESET });
    dispatch({ type: CART.CART_GET_RESET });
    dispatch({ type: CART.CART_ADDRESS_RESET });
    dispatch({ type: COUPON.COUPON_APPLY_TO_CART_RESET });
  };

  return (
    <div className="cart">
      <div className="cart__title">
        {cartItems.length === 0
          ? <h1>
            Your basket is currently empty. <Link
              to="/"
              className="cart__link"
            >
              Continue shopping.
            </Link>
          </h1>
          : cartItems.length === 1
          ? <h1>Your basket contains 1 item</h1>
          : <h1>Your basket contains {cartItems.length} items</h1>}
      </div>
      <div className="cart__container">
        <div className="cartItem">
          {cartItems.map((cartItem, index) => (
            <CartItem
              key={index}
              cartItem={cartItem}
            />
          ))}
        </div>
        {cartItems.length > 0 && <div className="cart__summary">
          <p className="cart__summaryTitle">
            Subtotal ({getTotalItems()}) items
          </p>
          <p className="cart__summaryPrice">
            Total price: <strong>
              {numeral(getTotalPrice()).format("0,0.00")} RSD
            </strong>
          </p>
          {userInfo
            ? (<div className="cart__buttons">
              <ColorButton
                variant="contained"
                color="primary"
                style={{ outlineWidth: "0" }}
                className={classes.margin}
                onClick={saveToDB}
                disabled={!cartItems.length}
              >
                Proceed to checkout
              </ColorButton>
              <ColorButton
                variant="contained"
                color="primary"
                style={{ outlineWidth: "0" }}
                className={classes.margin}
                onClick={saveCashOrderToDB}
                disabled={!cartItems.length}
              >
                Cash on delivery
              </ColorButton>
            </div>)
            : (
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                <ColorButton
                  variant="contained"
                  color="primary"
                  style={{ outlineWidth: "0" }}
                  className={classes.margin}
                >
                  Login to checkout
                </ColorButton>
              </Link>
            )}
        </div>}
      </div>
    </div>
  );
};

export default Cart;
