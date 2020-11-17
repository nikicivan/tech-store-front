import React, { useEffect, useState } from "react";
import "./singleProduct.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductBySlug,
  ratingProduct,
  relatedProducts,
} from "../../redux/product/product.actions";
import Spinner from "../../components/spinner/Spinner";

import { toast } from "react-toastify";
import numeral from "numeral";
import StarRating from "react-star-ratings";

import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import NotInterestedRoundedIcon from "@material-ui/icons/NotInterestedRounded";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import IconButton from "@material-ui/core/IconButton";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductTab from "../../components/product-tab/ProductTab";
import RatingModal from "../../components/modal/RatingModal";
import PRODUCT from "../../redux/product/product.types";
import { ratingAverage } from "../../components/rating-average/ratingAverage";
import RelatedProducts from "../../components/related-products/RelatedProducts";
import { addToCart } from "../../redux/cart/cart.actions";
import { setDrawer } from "../../redux/drawer/drawer.actions";
import {
  addedToWishlist,
  getWishlists,
  removeWishlist,
} from "../../redux/user/user.actions";
import USER from "../../redux/user/user.types";

const SingleProduct = ({ match }) => {
  const slug = match.params.slug;

  // const [active, setActive] = useState(false);
  const [star, setStar] = useState(0);

  const productGetBySlug = useSelector((state) => state.productGetBySlug);
  const { product, loading, error, success: successGet } = productGetBySlug;

  const productsRelated = useSelector((state) => state.productsRelated);
  const { products, loading: loadingRelated, error: errorRelated } =
    productsRelated;

  const productRating = useSelector((state) => state.productRating);
  const { success: successRating, error: errorRating } = productRating;

  const userGetWishlist = useSelector((state) => state.userGetWishlist);
  const { wishlists } = userGetWishlist;

  const userAddToWishlist = useSelector((state) => state.userAddToWishlist);
  const { success: successAdd } = userAddToWishlist;

  const userRemoveWishlist = useSelector((state) => state.userRemoveWishlist);
  const { success: successRemove } = userRemoveWishlist;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!successGet || successRating) {
      dispatch(getProductBySlug(slug));
    } else {
      dispatch(relatedProducts(product?._id));
    }
  }, [dispatch, slug, successRating, successGet, product?._id]);

  useEffect(() => {
    if (product?.ratings && userInfo) {
      const existingRatingObject = product?.ratings?.find((elem) =>
        elem.postedBy.toString() === userInfo?.email?._id.toString()
      );
      //   console.log(existingRatingObject);
      if (existingRatingObject) {
        setStar(existingRatingObject.star);
      } else {
        setStar(0);
      }
    }
  }, [product, userInfo]);

  useEffect(() => {
    if (successRating) {
      toast.success(`Upravo ste dali ocenu za proizvod ${product?.title}`);
      dispatch({ type: PRODUCT.PRODUCT_RATING_RESET });
    } else {
      toast.error(errorRating);
    }
  }, [errorRating, product, successRating, dispatch]);

  // const toggle = () => {
  //   setActive(!active);
  // };

  useEffect(() => {
    if (userInfo) {
      dispatch(getWishlists(userInfo?.email?.token?.token));
    }
  }, [dispatch, userInfo, successAdd, successRemove]);

  const onStarClick = (newRating, name) => {
    // console.log(newRating, name);
    dispatch({ type: PRODUCT.PRODUCT_GET_BY_SLUG_RESET });
    setStar(newRating);
    dispatch(
      ratingProduct(product._id, newRating, userInfo?.email?.token?.token),
    );
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
  // console.log("check", check, product?._id);

  return (
    <div className="singleProduct">
      <div className="singleProduct__container">
        {loading ? <Spinner /> : error ? toast.error(error) : (<>
          <div className="singleProduct__image">
            <Carousel
              showArrows={true}
              autoPlay
              infiniteLoop
              showIndicators={true}
            >
              {product?.images?.map((image) => (
                <img
                  src={image.url}
                  key={image.public_id}
                  alt={image.public_id}
                />
              ))}
            </Carousel>
            <ProductTab product={product} />
          </div>
          <div className="singleProduct__info">
            <h1>{product?.title}</h1>
            {product?.ratings?.length > 0 ? ratingAverage(product) : <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StarRating
                rating={0}
                starDimension="2rem"
                starSpacing="5px"
                starRatedColor="purple"
              />
              <p
                style={{
                  marginLeft: "1rem",
                  fontSize: "smaller",
                  color: "#575757",
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
                (0)
              </p>
            </div>}
            <div className="singleProduct__detailsContainer">
              <div className="singleProduct__details">
                <p>Cena:</p>
                <p>
                  <strong>{numeral(product?.price).format("0,0.00")}</strong>
                </p>
              </div>
              <Link
                to={`/category/${product?.category?.slug}`}
                title="Vidi više"
              >
                <div className="singleProduct__details">
                  <p>Kategorija:</p>
                  <p><strong>{product?.category?.name}</strong></p>
                </div>
              </Link>

              <div className="singleProduct__details">
                <p>Pod-kategorija:</p>
                {product?.subs?.map((sub) => (
                  <Link
                    to={`/sub-category/${sub.slug}`}
                    title="Vidi više"
                    key={sub?._id}
                  >
                    <p className="singleProduct__detailsLink">
                      <strong>{sub?.name}</strong>
                    </p>
                  </Link>
                ))}
              </div>

              <div className="singleProduct__details">
                <p>Dostava proizvoda:</p>
                {product?.shipping === "Yes"
                  ? <CheckRoundedIcon
                    fontSize="large"
                    style={{ color: "green" }}
                  />
                  : <NotInterestedRoundedIcon
                    fontSize="large"
                    style={{ color: "red" }}
                  />}
              </div>
              <div className="singleProduct__details">
                <p>Dostupan u boji:</p>
                <p><strong>{product?.color}</strong></p>
              </div>
              <div className="singleProduct__details">
                {product?.quantity !== 0
                  ? <>
                    <p style={{ color: "green" }}><strong>Na stanju</strong></p>
                    <CheckRoundedIcon
                      fontSize="large"
                      style={{ color: "green" }}
                    />
                  </>
                  : <>
                    <p style={{ color: "red" }}>
                      <strong>Nema na stanju</strong>
                    </p>
                    <NotInterestedRoundedIcon
                      fontSize="large"
                      style={{ color: "red" }}
                    />
                  </>}
              </div>
              <div className="singleProduct__details2">
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
                {/* Rating modal */}
                <RatingModal
                  product={product}
                  onStarClick={onStarClick}
                  star={star}
                />
                <IconButton
                  style={{ color: "#000", outlineWidth: "0" }}
                  title="Dodaj u korpu"
                  onClick={() => handleAddToCart(product.slug)}
                  disabled={product?.quantity < 1}
                >
                  <AddShoppingCartRoundedIcon fontSize="large" />
                </IconButton>
              </div>
            </div>
          </div>
        </>)}
      </div>
      <RelatedProducts
        products={products}
        errorRelated={errorRelated}
        loadingRelated={loadingRelated}
      />
    </div>
  );
};

export default SingleProduct;
