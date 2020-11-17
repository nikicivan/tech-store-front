import React, { useEffect } from "react";
import "./wishlist.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";
import numeral from "numeral";

import UserNav from "../../../components/user-nav/UserNav";

import {
  addedToWishlist,
  getWishlists,
  removeWishlist,
} from "../../../redux/user/user.actions";

import { ratingAverage } from "../../../components/rating-average/ratingAverage";
import StarRatings from "react-star-ratings";

import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import NotInterestedRoundedIcon from "@material-ui/icons/NotInterestedRounded";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import PRODUCT from "../../../redux/product/product.types";
import { addToCart } from "../../../redux/cart/cart.actions";
import { setDrawer } from "../../../redux/drawer/drawer.actions";
import USER from "../../../redux/user/user.types";

const Wishlist = () => {
  const userGetWishlist = useSelector((state) => state.userGetWishlist);
  const { wishlists, loading, error } = userGetWishlist;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const userAddToWishlist = useSelector((state) => state.userAddToWishlist);
  const { success: successAdd } = userAddToWishlist;

  const userRemoveWishlist = useSelector((state) => state.userRemoveWishlist);
  const { success: successRemove } = userRemoveWishlist;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.email?.token?.token) {
      dispatch(getWishlists(userInfo?.email?.token?.token));
    }
  }, [dispatch, userInfo]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(getWishlists(userInfo?.email?.token?.token));
    }
  }, [dispatch, userInfo, successAdd, successRemove]);

  const handleLinkReset = () => {
    dispatch({ type: PRODUCT.PRODUCT_GET_BY_SLUG_RESET });
  };

  const handleAddToCart = (slug) => {
    dispatch(addToCart(slug, 1));
    dispatch(setDrawer(true));
  };

  const handleAddToWishlist = (id) => {
    dispatch({ type: USER.USER_REMOVE_WISHLIST_RESET });
    dispatch({ type: USER.USER_ADD_TO_WISHLIST_RESET });
    dispatch(addedToWishlist(id, userInfo?.email?.token?.token));
  };

  const handleRemoveWishlist = (id) => {
    dispatch({ type: USER.USER_REMOVE_WISHLIST_RESET });
    dispatch({ type: USER.USER_ADD_TO_WISHLIST_RESET });
    dispatch(removeWishlist(id, userInfo?.email?.token?.token));
  };

  const check = wishlists?.wishlist?.find((w) => w._id);

  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <div className="wishlist__nav">
          <UserNav />
        </div>
        <div className="wishlist__right">
          <div className="wishlist__title">
            {wishlists?.wishlist?.length > 0
              ? <h1>
                Hi, {userInfo?.email?.name}, you have {wishlists?.wishlist
                  ?.length} favorite products in wishlist.
              </h1>
              : <h1>
                Hi, {userInfo?.email
                  ?.name}, you don't have any favorite product in wishlist.
              </h1>}
          </div>
          <div className="wishlist__content">
            {loading
              ? <Spinner />
              : error
              ? toast.error(error)
              : wishlists?.wishlist?.map((w) => (
                <div className="productCard" key={w._id}>
                  <div className="productCard__container">
                    <Link
                      to={`/product/${w.slug}`}
                      title="view more"
                      onClick={handleLinkReset}
                    >
                      <img src={w?.images[0]?.url} alt={w?.title} />
                    </Link>

                    <div className="productCard__description">
                      {w?.ratings?.length > 0 ? ratingAverage(w) : <StarRatings
                        rating={0}
                        starDimension="2rem"
                        starSpacing="5px"
                        starRatedColor="purple"
                      />}
                      {w.quantity !== 0
                        ? (<div className="productCard__quantity">
                          <CheckRoundedIcon style={{ color: "#5cb85c" }} />
                          <p>Na stanju</p>
                        </div>)
                        : (<div className="productCard__quantity_2">
                          <NotInterestedRoundedIcon
                            style={{ color: " #d9534f" }}
                          />
                          <p>Nema na stanju</p>
                        </div>)}
                      <p>{truncate(w?.title, 25)}</p>
                      <h1>
                        <strong>
                          {numeral(w?.price).format("0,0.00")} RSD
                        </strong>
                      </h1>
                    </div>
                    <div className="productCard__buttons">
                      {check !== undefined
                        ? <IconButton
                          style={{ color: "red", outlineWidth: "0" }}
                          title="Ukloni proizvod iz liste omiljenih"
                          onClick={() => handleRemoveWishlist(w._id)}
                        >
                          <FavoriteRoundedIcon
                            fontSize="large"
                            style={{ color: "red" }}
                          />
                        </IconButton>
                        : <IconButton
                          style={{ color: "red", outlineWidth: "0" }}
                          onClick={() => handleAddToWishlist(w._id)}
                          title="Dodaj u listu omiljenih proizvoda"
                        >
                          <FavoriteBorderRoundedIcon
                            fontSize="large"
                            style={{ outlineWidth: "0" }}
                            title="Remove from wishlist"
                          />
                        </IconButton>}
                      <IconButton
                        style={{ color: "#000", outlineWidth: "0" }}
                        onClick={() => handleAddToCart(w?.slug)}
                        disabled={w?.quantity < 1}
                      >
                        <AddShoppingCartRoundedIcon fontSize="large" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
