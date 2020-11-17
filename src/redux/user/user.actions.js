import USER from "./user.types";
import axios from "../../axios";

export const userLogin = (email, token, name, role, _id, picture) =>
  async (dispatch) => {
    try {
      dispatch(
        {
          type: USER.USER_LOGIN,
          payload: { email, token, name, role, _id, picture },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

export const userLogout = () =>
  async (dispatch) => {
    try {
      dispatch({ type: USER.USER_LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };

export const addedToWishlist = (productId, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER.USER_ADD_TO_WISHLIST_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/users/wishlist",
        { productId },
        config,
      );

      dispatch({ type: USER.USER_ADD_TO_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: USER.USER_ADD_TO_WISHLIST_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getWishlists = (authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER.USER_GET_WISHLIST_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.get(
        "/api/users/wishlist",
        config,
      );

      dispatch({ type: USER.USER_GET_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: USER.USER_GET_WISHLIST_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const removeWishlist = (productId, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER.USER_REMOVE_WISHLIST_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.put(
        `/api/users/wishlist`,
        { productId },
        config,
      );

      dispatch({ type: USER.USER_REMOVE_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: USER.USER_REMOVE_WISHLIST_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
