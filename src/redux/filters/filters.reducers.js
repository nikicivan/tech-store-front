import FILTERS from "./filters.types";

export const filtersTextReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case FILTERS.FILTERS_QUERY_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export const filtersSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FILTERS.FILTERS_TEXT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FILTERS.FILTERS_TEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case FILTERS.FILTERS_TEXT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
