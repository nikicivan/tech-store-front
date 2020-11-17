import axios from "../../axios";
import PRODUCT from "./product.types";

export const createProduct = (product, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_CREATE_REQUEST });
      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.post(
        "/api/products/product",
        product,
        config,
      );
      dispatch({ type: PRODUCT.PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_CREATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getProductsByCount = (count) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_GET_BY_COUNT_REQUEST });

      const { data } = await axios.get(`/api/products/${count}`);
      dispatch({ type: PRODUCT.PRODUCT_GET_BY_COUNT_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_GET_BY_COUNT_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const deleteProduct = (slug, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_DELETE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.delete(`/api/products/${slug}`, config);
      dispatch({ type: PRODUCT.PRODUCT_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_DELETE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const getProductBySlug = (slug) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_GET_BY_SLUG_REQUEST });
      const { data } = await axios.get(`/api/products/product/${slug}`);
      dispatch({ type: PRODUCT.PRODUCT_GET_BY_SLUG_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_GET_BY_SLUG_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const updateProduct = (slug, product, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_UPDATE_REQUEST });

      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.put(
        `/api/products/product/${slug}`,
        { product },
        config,
      );

      dispatch({ type: PRODUCT.PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_UPDATE_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const fetchProducts = (sort, order, page) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_FETCH_REQUEST });
      const { data } = await axios.post(
        `/api/products`,
        { sort, order, page },
      );
      dispatch({ type: PRODUCT.PRODUCT_FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_FETCH_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const fetchProductsBySold = (sort, order, page) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_FETCH_BY_SOLD_REQUEST });
      const { data } = await axios.post(
        `/api/products`,
        { sort, order, page },
      );
      dispatch({ type: PRODUCT.PRODUCT_FETCH_BY_SOLD_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_FETCH_BY_SOLD_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const fetchProductsCount = () =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_FETCH_COUNT_REQUEST });
      const { data } = await axios.get("/api/products");
      dispatch({ type: PRODUCT.PRODUCT_FETCH_COUNT_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_FETCH_COUNT_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const ratingProduct = (productId, star, authtoken) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_RATING_REQUEST });
      const config = {
        headers: {
          authtoken,
        },
      };

      const { data } = await axios.put(
        `/api/products/product/${productId}/star`,
        { star },
        config,
      );
      dispatch({ type: PRODUCT.PRODUCT_RATING_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_RATING_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };

export const relatedProducts = (productId) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_RELATED_REQUEST });

      const { data } = await axios.get(
        `/api/products/product/${productId}/related`,
      );
      dispatch({ type: PRODUCT.PRODUCT_RELATED_SUCCESS, payload: data });
    } catch (error) {
      dispatch(
        {
          type: PRODUCT.PRODUCT_RELATED_FAIL,
          payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
        },
      );
    }
  };
