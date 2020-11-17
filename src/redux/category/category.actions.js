import axios from "../../axios";
import CATEGORY from "./category.types";

export const getCategories = () =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY.CATEGORY_LIST_REQUEST });

      const { data } = await axios.get("/api/category");
      dispatch({ type: CATEGORY.CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CATEGORY.CATEGORY_LIST_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getCategoryBySlug = (slug) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY.CATEGORY_BY_SLUG_REQUEST });

      const { data } = await axios.get(`/api/category/${slug}`);

      dispatch({ type: CATEGORY.CATEGORY_BY_SLUG_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CATEGORY.CATEGORY_BY_SLUG_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const deleteCategory = (slug, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY.CATEGORY_DELETE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.delete(`/api/category/${slug}`, config);
      dispatch({ type: CATEGORY.CATEGORY_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CATEGORY.CATEGORY_DELETE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const updateCategory = (slug, category, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY.CATEGORY_UPDATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.put(
        `/api/category/${slug}`,
        category,
        config,
      );

      dispatch({ type: CATEGORY.CATEGORY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CATEGORY.CATEGORY_UPDATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const createCategory = (category, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY.CATEGORY_CREATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/category",
        category,
        config,
      );
      dispatch({ type: CATEGORY.CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CATEGORY.CATEGORY_CREATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getSubsCategories = (id) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY.CATEGORY_SUBS_REQUEST });

      const { data } = await axios.get(`/api/category/subs/${id}`);
      dispatch({ type: CATEGORY.CATEGORY_SUBS_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: CATEGORY.CATEGORY_SUBS_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
