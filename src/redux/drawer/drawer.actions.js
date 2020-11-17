import DRAWER from "./drawer.types";

export const setDrawer = (trigger) =>
  (dispatch) => {
    try {
      dispatch({ type: DRAWER.SET_VISIBLE, payload: trigger });
    } catch (error) {
      console.log(error);
    }
  };
