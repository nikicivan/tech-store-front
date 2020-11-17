import SUB from "./sub.types";

export const subListReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case SUB.SUB_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUB.SUB_LIST_SUCCESS:
      return {
        loading: false,
        subs: action.payload,
      };
    case SUB.SUB_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subBySlugReducer = (state = { sub: {}, products: [] }, action) => {
  switch (action.type) {
    case SUB.SUB_BY_SLUG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUB.SUB_BY_SLUG_SUCCESS:
      return {
        loading: false,
        sub: action.payload.sub,
        products: action.payload.products,
      };
    case SUB.SUB_BY_SLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUB.SUB_DELETE_REQUEST:
      return {
        loading: true,
      };
    case SUB.SUB_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SUB.SUB_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subUpdateReducer = (state = { sub: {} }, action) => {
  switch (action.type) {
    case SUB.SUB_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUB.SUB_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        sub: action.payload,
      };
    case SUB.SUB_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUB.SUB_UPDATE_RESET:
      return {
        sub: {},
      };
    default:
      return state;
  }
};

export const subCreateReducer = (state = { sub: {} }, action) => {
  switch (action.type) {
    case SUB.SUB_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUB.SUB_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        sub: action.payload,
      };
    case SUB.SUB_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUB.SUB_CREATE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};
