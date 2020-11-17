import axios from "../../axios";
import SUB from "./sub.types";

export const getSubs = () =>
  async (dispatch) => {
    try {
      dispatch({ type: SUB.SUB_LIST_REQUEST });

      const { data } = await axios.get("/api/sub");
      dispatch({ type: SUB.SUB_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: SUB.SUB_LIST_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getSubBySlug = (slug) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUB.SUB_BY_SLUG_REQUEST });

      const { data } = await axios.get(`/api/sub/${slug}`);
      dispatch({ type: SUB.SUB_BY_SLUG_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: SUB.SUB_BY_SLUG_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const deleteSub = (slug, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUB.SUB_DELETE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.delete(`/api/sub/${slug}`, config);
      dispatch({ type: SUB.SUB_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: SUB.SUB_DELETE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const updateSub = (slug, sub, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUB.SUB_UPDATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.put(
        `/api/sub/${slug}`,
        sub,
        config,
      );

      dispatch({ type: SUB.SUB_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: SUB.SUB_UPDATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const createSub = (sub, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUB.SUB_CREATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/sub",
        sub,
        config,
      );
      dispatch({ type: SUB.SUB_CREATE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch(
        {
          type: SUB.SUB_CREATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
