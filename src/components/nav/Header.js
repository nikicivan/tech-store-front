import React, { useEffect, useState } from "react";
import "./header.css";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

import CART from "../../redux/cart/cart.types";
import COUPON from "../../redux/coupons/coupons.types";
import SearchFilters from "../search-filters/SearchFilters";
import USER from "../../redux/user/user.types";
import { getWishlists } from "../../redux/user/user.actions";
import { cashOnDelivery } from "../../redux/cart/cart.actions";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userGetWishlist = useSelector((state) => state.userGetWishlist);
  const { wishlists } = userGetWishlist;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.email?.token?.token) {
      dispatch(getWishlists(userInfo?.email?.token?.token));
    }
  }, [dispatch, userInfo]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    dispatch({ type: CART.CART_ADDRESS_RESET });
    dispatch({ type: COUPON.COUPON_APPLY_TO_CART_RESET });
    dispatch({ type: CART.CART_SAVE_RESET });
    dispatch({ type: CART.CART_EMPTY_RESET });
    dispatch({ type: CART.CART_GET_RESET });
    dispatch({ type: CART.CART_ADDRESS_RESET });
    dispatch({ type: COUPON.COUPON_APPLY_TO_CART_RESET });
    dispatch(cashOnDelivery(false));
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch({ type: USER.USER_REMOVE_WISHLIST_RESET });
    dispatch({ type: USER.USER_ADD_TO_WISHLIST_RESET });
    history.push("/user/wishlist");
  };

  return (
    <div className="header">
      <div className="header__left">
        <Link to="/">
          <h1>Tech-store</h1>
        </Link>
      </div>
      <SearchFilters />
      <div className="header__bag">
        <IconButton
          className="header__bagIcon"
          style={{ outlineWidth: "0" }}
          onClick={handleWishlist}
        >
          <StyledBadge
            badgeContent={wishlists?.wishlist?.length}
            color="secondary"
          >
            <FavoriteRoundedIcon
              style={{ color: "white" }}
              fontSize="large"
            />
          </StyledBadge>
        </IconButton>
      </div>
      <Link to="/shop">
        <IconButton style={{ outlineWidth: "0" }}>
          <StoreRoundedIcon style={{ color: "#fff" }} fontSize="large" />
        </IconButton>
      </Link>
      <div className="header__options" onClick={toggle}>
        {userInfo
          ? (
            <div className="header__profile">
              <p className="header__signin">
                Hello, {userInfo?.email?.name}
              </p>
              {/* <ExpandMoreIcon style={{ color: "white" }} /> */}
              <Avatar
                src={userInfo?.email?.picture}
                name={userInfo?.email?.name}
              />
              {isActive && <div className="header__dropdown">
                {userInfo?.email?.role === "user"
                  ? (<>
                    <Link to="/user/history">
                      <p className="header__profileDropdown">Dashboard</p>
                    </Link>
                  </>)
                  : (<>
                    <Link to="/admin/dashboard">
                      <p className="header__profileDropdown">Dashboard</p>
                    </Link>
                  </>)}
              </div>}
            </div>
          )
          : <Link to="/login">
            <div className="header__optionSignin">
              <PersonIcon style={{ color: "white" }} />
              <p className="header__signin">Signin</p>
            </div>
          </Link>}
      </div>

      <Link to="/cart">
        <div className="header__bag">
          <IconButton
            className="header__bagIcon"
            style={{ outlineWidth: "0" }}
            onClick={reset}
          >
            <StyledBadge badgeContent={cartItems.length} color="secondary">
              <ShoppingBasketIcon
                style={{ color: "white" }}
                fontSize="large"
              />
            </StyledBadge>
          </IconButton>
        </div>
      </Link>
    </div>
  );
};

export default Header;
