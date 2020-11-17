import STRIPE from "./stripe.types";
import axios from "../../axios";

export const createPayment = (authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: STRIPE.STRIPE_CREATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };
      const { data } = await axios.post(
        "/api/stripe/create-payment-intent",
        {},
        config,
      );
      dispatch({ type: STRIPE.STRIPE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: STRIPE.STRIPE_CREATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
