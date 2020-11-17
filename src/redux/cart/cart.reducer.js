import CART from "./cart.types";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART.CART_ADD_ITEM:
      const item = action.payload;
      //   console.log("item", item);

      const existItem = state.cartItems?.find((x) =>
        x.product === item.product
      );

      //   console.log("exist item", existItem);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART.CART_UPDATE_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };
    case CART.CART_RESET_STORAGE:
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};

export const cartSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case CART.CART_SAVE_REQUEST:
      return {
        loading: true,
      };
    case CART.CART_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CART.CART_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CART.CART_SAVE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const cartGetReducer = (state = { cart: {} }, action) => {
  switch (action.type) {
    case CART.CART_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART.CART_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        cart: action.payload,
      };
    case CART.CART_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CART.CART_GET_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const cartEmptyReducer = (state = {}, action) => {
  switch (action.type) {
    case CART.CART_EMPTY_REQUEST:
      return {
        loading: true,
      };
    case CART.CART_EMPTY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CART.CART_EMPTY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CART.CART_EMPTY_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const cartUserAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case CART.CART_ADDRESS_REQUEST:
      return {
        loading: true,
      };
    case CART.CART_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CART.CART_ADDRESS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CART.CART_ADDRESS_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const cartCashOnDeliveryReducer = (
  state = { trigger: false },
  action,
) => {
  switch (action.type) {
    case CART.CART_CASH_ON_DELIVERY:
      return {
        ...state,
        trigger: action.payload,
      };
    default:
      return state;
  }
};
