import USER from "./user.types";

export const userReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER.USER_LOGIN:
      return {
        userInfo: action.payload,
      };
    case USER.USER_LOGOUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

export const userAddToWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.USER_ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER.USER_ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        wishlists: action.payload,
      };
    case USER.USER_ADD_TO_WISHLIST_FAIL:
      return {
        loading: false,
        error: action.paylaod,
      };
    case USER.USER_ADD_TO_WISHLIST_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const userGetWishlistsReducer = (state = { wishlists: [] }, action) => {
  switch (action.type) {
    case USER.USER_GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER.USER_GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlists: action.payload,
      };
    case USER.USER_GET_WISHLIST_FAIL:
      return {
        loading: false,
        error: action.paylaod,
      };
    case USER.USER_GET_WISHLIST_RESET:
      return {
        wishlists: [],
      };
    default:
      return state;
  }
};

export const userRemoveWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.USER_REMOVE_WISHLIST_REQUEST:
      return {
        loading: true,
      };
    case USER.USER_REMOVE_WISHLIST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER.USER_REMOVE_WISHLIST_FAIL:
      return {
        loading: false,
        error: action.paylaod,
      };
    case USER.USER_REMOVE_WISHLIST_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};
