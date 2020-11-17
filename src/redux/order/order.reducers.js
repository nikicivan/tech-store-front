import ORDER from "./order.types";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER.ORDER_CREATE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const ordersUserGetReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER.ORDER_USER_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER.ORDER_USER_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ORDER.ORDER_USER_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ordersAdminGetReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER.ORDER_ADMIN_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER.ORDER_ADMIN_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ORDER.ORDER_ADMIN_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderUpdateStatusReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER.ORDER_UPDATE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER.ORDER_UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER.ORDER_UPDATE_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER.ORDER_UPDATE_STATUS_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const orderCODCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER.ORDER_CREATE_COD_REQUEST:
      return {
        loading: true,
      };
    case ORDER.ORDER_CREATE_COD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER.ORDER_CREATE_COD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER.ORDER_CREATE_COD_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};
