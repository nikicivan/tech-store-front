import React, { useEffect } from "react";
import "./productCard.css";
import numeral from "numeral";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { ratingAverage } from "../../components/rating-average/ratingAverage";
import StarRatings from "react-star-ratings";

import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import NotInterestedRoundedIcon from "@material-ui/icons/NotInterestedRounded";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import PRODUCT from "../../redux/product/product.types";
import { addToCart } from "../../redux/cart/cart.actions";
import { setDrawer } from "../../redux/drawer/drawer.actions";
import {
  addedToWishlist,
  getWishlists,
  removeWishlist,
} from "../../redux/user/user.actions";
import USER from "../../redux/user/user.types";

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const userGetWishlist = useSelector((state) => state.userGetWishlist);
  const { wishlists } = userGetWishlist;

  const userAddToWishlist = useSelector((state) => state.userAddToWishlist);
  const { success: successAdd } = userAddToWishlist;

  const userRemoveWishlist = useSelector((state) => state.userRemoveWishlist);
  const { success: successRemove } = userRemoveWishlist;

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const dispatch = useDispatch();

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

  const handleAddToWishlist = (e) => {
    if (!userInfo?.email?.token?.token) {
      toast.error("You must be logged in to use Favorites.");
    }
    dispatch({ type: USER.USER_REMOVE_WISHLIST_RESET });
    dispatch({ type: USER.USER_ADD_TO_WISHLIST_RESET });
    e.preventDefault();
    dispatch(addedToWishlist(product._id, userInfo?.email?.token?.token));
  };

  const handleRemoveWishlist = (e) => {
    dispatch({ type: USER.USER_REMOVE_WISHLIST_RESET });
    dispatch({ type: USER.USER_ADD_TO_WISHLIST_RESET });
    e.preventDefault();
    dispatch(removeWishlist(product._id, userInfo?.email?.token?.token));
  };

  const check = wishlists?.wishlist?.find((w) => w._id === product?._id);

  return (
    <div className="productCard">
      <div className="productCard__container">
        <Link
          to={`/product/${product.slug}`}
          title="view more"
          onClick={handleLinkReset}
        >
          <img src={product?.images[0]?.url} alt={product?.title} />
        </Link>

        <div className="productCard__description">
          {product?.ratings?.length > 0 ? ratingAverage(product) : <StarRatings
            rating={0}
            starDimension="2rem"
            starSpacing="5px"
            starRatedColor="purple"
          />}
          {product.quantity !== 0
            ? (<div className="productCard__quantity">
              <CheckRoundedIcon style={{ color: "#5cb85c" }} />
              <p>Na stanju</p>
            </div>)
            : (<div className="productCard__quantity_2">
              <NotInterestedRoundedIcon style={{ color: " #d9534f" }} />
              <p>Nema na stanju</p>
            </div>)}
          <p>{truncate(product.title, 25)}</p>
          <h1>
            <strong>{numeral(product.price).format("0,0.00")} RSD</strong>
          </h1>
        </div>
        <div className="productCard__buttons">
          {check !== undefined
            ? <IconButton
              style={{ color: "red", outlineWidth: "0" }}
              title="Ukloni proizvod iz liste omiljenih"
              onClick={handleRemoveWishlist}
            >
              <FavoriteRoundedIcon
                fontSize="large"
                style={{ color: "red" }}
              />
            </IconButton>
            : <IconButton
              style={{ color: "red", outlineWidth: "0" }}
              onClick={handleAddToWishlist}
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
            onClick={() => handleAddToCart(product.slug)}
            disabled={product?.quantity < 1}
          >
            <AddShoppingCartRoundedIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
