import ORDER from "./order.types";
import axios from "../../axios";

export const createOrder = (stripeResponse, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER.ORDER_CREATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/orders",
        { stripeResponse },
        config,
      );

      dispatch({ type: ORDER.ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: ORDER.ORDER_CREATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getUserOrders = (authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER.ORDER_USER_GET_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.get(
        "/api/orders",
        config,
      );

      dispatch({ type: ORDER.ORDER_USER_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: ORDER.ORDER_USER_GET_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getAdminOrders = (authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER.ORDER_ADMIN_GET_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.get(
        "/api/orders/admin",
        config,
      );

      dispatch({ type: ORDER.ORDER_ADMIN_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: ORDER.ORDER_ADMIN_GET_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const updateStatusOrder = (orderId, orderStatus, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER.ORDER_UPDATE_STATUS_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.put(
        "/api/orders/admin",
        { orderId, orderStatus },
        config,
      );

      dispatch({ type: ORDER.ORDER_UPDATE_STATUS_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: ORDER.ORDER_UPDATE_STATUS_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const createCODOrder = (trigger, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER.ORDER_CREATE_COD_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/orders/cod",
        { trigger },
        config,
      );

      dispatch({ type: ORDER.ORDER_CREATE_COD_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: ORDER.ORDER_CREATE_COD_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
