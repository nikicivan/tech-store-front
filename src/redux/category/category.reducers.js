import CATEGORY from "./category.types";

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY.CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY.CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case CATEGORY.CATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryBySlugReducer = (
  state = { category: {}, products: [] },
  action,
) => {
  switch (action.type) {
    case CATEGORY.CATEGORY_BY_SLUG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY.CATEGORY_BY_SLUG_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
        products: action.payload.products,
      };
    case CATEGORY.CATEGORY_BY_SLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY.CATEGORY_DELETE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY.CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CATEGORY.CATEGORY_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY.CATEGORY_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY.CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };
    case CATEGORY.CATEGORY_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY.CATEGORY_UPDATE_RESET:
      return {
        category: {},
      };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY.CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY.CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };
    case CATEGORY.CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY.CATEGORY_CREATE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const categorySubsReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY.CATEGORY_SUBS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY.CATEGORY_SUBS_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case CATEGORY.CATEGORY_SUBS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY.CATEGORY_SUBS_RESET:
      return {
        categories: [],
      };
    default:
      return state;
  }
};
