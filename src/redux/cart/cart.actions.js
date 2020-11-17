import CART from "./cart.types";
import axios from "../../axios";

export const addToCart = (slug, count) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/products/product/${slug}`);
      dispatch({
        type: CART.CART_ADD_ITEM,
        payload: {
          product: data._id,
          subs: data.subs,
          sold: data.sold,
          images: data.images,
          rating: data.rating,
          numReviews: data.numReviews,
          title: data.title,
          description: data.description,
          price: data.price,
          shipping: data.shipping,
          quantity: data.quantity,
          color: data.color,
          brand: data.brand,
          category: data.category,
          slug: data.slug,
          ratings: data.ratings,
          reviews: data.reviews,
          count,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems),
      );
    } catch (error) {
      console.log(error);
    }
  };

export const updateCart = () =>
  async (dispatch) => {
    try {
      const data = JSON.parse(localStorage.getItem("cartItems"));

      dispatch({ type: CART.CART_UPDATE_ITEM, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const resetCart = () =>
  async (dispatch) => {
    try {
      dispatch({ type: CART.CART_RESET_STORAGE });
    } catch (error) {
      console.log(error);
    }
  };

export const saveCart = (cart, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: CART.CART_SAVE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/carts",
        { cart },
        config,
      );

      dispatch({ type: CART.CART_SAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CART.CART_SAVE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getCart = (authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: CART.CART_GET_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.get("/api/carts", config);

      dispatch({ type: CART.CART_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CART.CART_GET_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const emptyCart = (authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: CART.CART_EMPTY_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.delete("/api/carts", config);

      dispatch({ type: CART.CART_EMPTY_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CART.CART_EMPTY_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const saveUserAddress = (
  { address, postalCode, city, country },
  authtoken,
) =>
  async (dispatch) => {
    try {
      dispatch({ type: CART.CART_ADDRESS_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/carts/address",
        { address, postalCode, city, country },
        config,
      );

      dispatch({ type: CART.CART_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CART.CART_ADDRESS_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const cashOnDelivery = (trigger) =>
  (dispatch) => {
    try {
      dispatch({ type: CART.CART_CASH_ON_DELIVERY, payload: trigger });
    } catch (error) {
      console.log(error);
    }
  };
