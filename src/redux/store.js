import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userAddToWishlistReducer,
  userGetWishlistsReducer,
  userReducer,
  userRemoveWishlistReducer,
} from "./user/user.reducer";
import {
  categoryBySlugReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListReducer,
  categorySubsReducer,
  categoryUpdateReducer,
} from "./category/category.reducers";
import {
  subBySlugReducer,
  subCreateReducer,
  subDeleteReducer,
  subListReducer,
  subUpdateReducer,
} from "./sub/sub.reducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productGetBySlugReducer,
  productRatingReducer,
  productsFetchBySoldReducer,
  productsFetchCountReducer,
  productsFetchReducer,
  productsGetByCountReducer,
  productsRelatedReducer,
  productUpdateReducer,
} from "./product/product.reducers";

import {
  filtersSearchReducer,
  filtersTextReducer,
} from "./filters/filters.reducers";
import {
  cartCashOnDeliveryReducer,
  cartEmptyReducer,
  cartGetReducer,
  cartReducer,
  cartSaveReducer,
  cartUserAddressReducer,
} from "./cart/cart.reducer";
import { drawerReducer } from "./drawer/drawer.reducer";
import {
  couponApllyToCartReducer,
  couponDeleteReducer,
  couponsCreateReducer,
  couponslistReducer,
} from "./coupons/coupons.reducers";
import { stripeCreatePaymentIntentReducer } from "./stripe/stripe.reducers";
import {
  orderCODCreateReducer,
  orderCreateReducer,
  ordersAdminGetReducer,
  ordersUserGetReducer,
  orderUpdateStatusReducer,
} from "./order/order.reducers";

const reducer = combineReducers({
  user: userReducer,
  userAddToWishlist: userAddToWishlistReducer,
  userGetWishlist: userGetWishlistsReducer,
  userRemoveWishlist: userRemoveWishlistReducer,
  categoryList: categoryListReducer,
  categoryBySlug: categoryBySlugReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categorySubs: categorySubsReducer,
  subList: subListReducer,
  subBySlug: subBySlugReducer,
  subDelete: subDeleteReducer,
  subUpdate: subUpdateReducer,
  subCreate: subCreateReducer,
  productCreate: productCreateReducer,
  productsGetByCount: productsGetByCountReducer,
  productDelete: productDeleteReducer,
  productGetBySlug: productGetBySlugReducer,
  productUpdate: productUpdateReducer,
  productsFetch: productsFetchReducer,
  productsFetchBySold: productsFetchBySoldReducer,
  productsFetchCount: productsFetchCountReducer,
  productRating: productRatingReducer,
  productsRelated: productsRelatedReducer,
  filtersText: filtersTextReducer,
  filtersSearch: filtersSearchReducer,
  cart: cartReducer,
  cartSave: cartSaveReducer,
  cartGet: cartGetReducer,
  cartEmpty: cartEmptyReducer,
  cartUserAddress: cartUserAddressReducer,
  cartCashOnDelivery: cartCashOnDeliveryReducer,
  drawer: drawerReducer,
  couponCreate: couponsCreateReducer,
  couponsList: couponslistReducer,
  couponDelete: couponDeleteReducer,
  couponApplyToCart: couponApllyToCartReducer,
  stripeCreatePaymentIntent: stripeCreatePaymentIntentReducer,
  orderCreate: orderCreateReducer,
  ordersUserGet: ordersUserGetReducer,
  ordersAdminGet: ordersAdminGetReducer,
  orderUpdateStatus: orderUpdateStatusReducer,
  orderCODCreate: orderCODCreateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
