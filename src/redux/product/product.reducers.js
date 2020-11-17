import PRODUCT from "./product.types";

export const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT.PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT.PRODUCT_CREATE_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const productsGetByCountReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_GET_BY_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_GET_BY_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };
    case PRODUCT.PRODUCT_GET_BY_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT.PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productGetBySlugReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_GET_BY_SLUG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_GET_BY_SLUG_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT.PRODUCT_GET_BY_SLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT.PRODUCT_GET_BY_SLUG_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT.PRODUCT_UPDATE_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};

export const productsFetchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_FETCH_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };
    case PRODUCT.PRODUCT_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productsFetchBySoldReducer = (
  state = { products: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_FETCH_BY_SOLD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_FETCH_BY_SOLD_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };
    case PRODUCT.PRODUCT_FETCH_BY_SOLD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productsFetchCountReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_FETCH_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_FETCH_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        count: action.payload,
      };
    case PRODUCT.PRODUCT_FETCH_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productRatingReducer = (state = { ratings: [] }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_RATING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_RATING_SUCCESS:
      return {
        loading: false,
        success: true,
        ratings: action.payload,
      };
    case PRODUCT.PRODUCT_RATING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT.PRODUCT_RATING_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const productsRelatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_RELATED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.PRODUCT_RELATED_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };
    case PRODUCT.PRODUCT_RELATED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
