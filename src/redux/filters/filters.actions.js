import FILTERS from "./filters.types";
import axios from "../../axios";

export const searchText = (text) => ({
  type: FILTERS.FILTERS_QUERY_TEXT,
  payload: text,
});

export const fetchProductsByFilter = (arg) =>
  async (dispatch) => {
    try {
      dispatch({ type: FILTERS.FILTERS_TEXT_REQUEST });

      const { data } = await axios.post(
        `/api/products/search/filters`,
        arg,
      );
      dispatch({ type: FILTERS.FILTERS_TEXT_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: FILTERS.FILTERS_TEXT_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
