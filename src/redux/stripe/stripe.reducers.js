import STRIPE from "./stripe.types";

export const stripeCreatePaymentIntentReducer = (
  state = { stripe: {} },
  action,
) => {
  switch (action.type) {
    case STRIPE.STRIPE_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STRIPE.STRIPE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        stripe: action.payload,
      };
    case STRIPE.STRIPE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case STRIPE.STRIPE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
