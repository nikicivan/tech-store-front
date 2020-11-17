import DRAWER from "./drawer.types";

export const drawerReducer = (state = { trigger: false }, action) => {
  switch (action.type) {
    case DRAWER.SET_VISIBLE:
      return {
        trigger: action.payload,
      };
    default:
      return state;
  }
};
