import COUPON from "./coupons.types";

export const couponsCreateReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case COUPON.COUPON_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COUPON.COUPON_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        coupon: action.payload,
      };
    case COUPON.COUPON_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COUPON.COUPON_CREATE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const couponslistReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPON.COUPON_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COUPON.COUPON_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: action.payload,
      };
    case COUPON.COUPON_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const couponDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON.COUPON_DELETE_REQUEST:
      return {
        loading: true,
      };
    case COUPON.COUPON_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case COUPON.COUPON_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COUPON.COUPON_DELETE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const couponApllyToCartReducer = (
  state = { totalPrice: {} },
  action,
) => {
  switch (action.type) {
    case COUPON.COUPON_APPLY_TO_CART_REQUEST:
      return {
        loading: true,
      };
    case COUPON.COUPON_APPLY_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        totalPrice: action.payload,
      };
    case COUPON.COUPON_APPLY_TO_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COUPON.COUPON_APPLY_TO_CART_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};
