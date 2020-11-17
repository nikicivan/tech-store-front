import COUPON from "./coupons.types";
import axios from "../../axios";

export const createCoupon = ({ name, expired, discount }, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: COUPON.COUPON_CREATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/coupons",
        { name, expired, discount },
        config,
      );

      dispatch({ type: COUPON.COUPON_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: COUPON.COUPON_CREATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getCoupons = (authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: COUPON.COUPON_LIST_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.get(
        "/api/coupons",
        config,
      );

      dispatch({ type: COUPON.COUPON_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: COUPON.COUPON_LIST_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const removeCoupon = (id, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: COUPON.COUPON_DELETE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.delete(
        `/api/coupons/${id}`,
        config,
      );

      dispatch({ type: COUPON.COUPON_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: COUPON.COUPON_DELETE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const applyCoupon = (coupon, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: COUPON.COUPON_APPLY_TO_CART_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        `/api/coupons/user/cart`,
        { coupon },
        config,
      );

      dispatch({ type: COUPON.COUPON_APPLY_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: COUPON.COUPON_APPLY_TO_CART_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
