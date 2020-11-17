import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { currentUser } from "./utils/utils";
import { userLogin } from "./redux/user/user.actions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";

const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Register = lazy(() => import("./pages/auth/register/Register"));
const Login = lazy(() => import("./pages/auth/login/Login"));
const Home = lazy(() => import("./pages/home/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() =>
  import("./pages/auth/register-complete/RegisterComplete")
);
const ForgotPassword = lazy(() =>
  import("./pages/auth/forgot-password/ForgotPassword")
);
const UserHistory = lazy(() => import("./pages/user/user-history/UserHistory"));
const Wishlist = lazy(() => import("./pages/user/wishlist/Wishlist"));
const UpdatePassword = lazy(() =>
  import("./pages/user/update-password/UpdatePassword.js")
);
const AdminDashboard = lazy(() =>
  import("./pages/admin/dashboard/AdminDashboard")
);
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category-update/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub-update/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductsList = lazy(() => import("./pages/admin/products/ProductsList"));
const ProductUpdate = lazy(() =>
  import("./pages/admin/product-update/ProductUpdate")
);
const SingleProduct = lazy(() =>
  import("./pages/single-product/SingleProduct")
);
const CategoryHome = lazy(() => import("./pages/category-home/CategoryHome"));
const SubCategoryHome = lazy(() =>
  import("./pages/sub-category-home/SubCategoryHome")
);
const ShopPage = lazy(() => import("./pages/shop-page/ShopPage"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const SideDrawer = lazy(() => import("./components/side-drawer/SideDrawer"));
const CheckoutPage = lazy(() => import("./pages/checkout-page/CheckoutPage"));
const CouponsPage = lazy(() => import("./pages/admin/coupons/CouponsPage"));
const PaymentPage = lazy(() => import("./pages/payment/PaymentPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            if (res.data) {
              dispatch(
                userLogin(
                  {
                    email: res.data.email,
                    token: idTokenResult,
                    name: res.data.name,
                    role: res.data.role,
                    _id: res.data._id,
                    picture: res.data.picture,
                  },
                ),
              );
            }
          })
          .catch(
            (error) => {
              console.log(error);
              toast.error(error.message);
            },
          );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Router>
          <Header />
          <SideDrawer />
          <ToastContainer />
          <Switch>
            <AdminRoute
              path="/admin/coupons"
              exact
              component={CouponsPage}
            />
            <AdminRoute
              path="/admin/products"
              exact
              component={ProductsList}
            />
            <AdminRoute
              path="/admin/product/:slug/edit"
              exact
              component={ProductUpdate}
            />
            <AdminRoute
              path="/admin/product"
              exact
              component={ProductCreate}
            />
            <AdminRoute
              path="/admin/sub/:slug"
              exact
              component={SubUpdate}
            />
            <AdminRoute
              path="/admin/sub"
              exact
              component={SubCreate}
            />
            <AdminRoute
              path="/admin/category/:slug"
              exact
              component={CategoryUpdate}
            />
            <AdminRoute
              path="/admin/category"
              exact
              component={CategoryCreate}
            />
            <AdminRoute
              path="/admin/dashboard"
              exact
              component={AdminDashboard}
            />
            <UserRoute path="/user/history" exact component={UserHistory} />
            <UserRoute path="/user/password" exact component={UpdatePassword} />
            <UserRoute path="/user/wishlist" exact component={Wishlist} />
            <UserRoute path="/checkout" exact component={CheckoutPage} />
            <UserRoute path="/payment" exact component={PaymentPage} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/shop" exact component={ShopPage} />
            <Route path="/product/:slug" exact component={SingleProduct} />
            <Route path="/category/:slug" exact component={CategoryHome} />
            <Route
              path="/sub-category/:slug"
              exact
              component={SubCategoryHome}
            />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route
              path="/register/complete"
              exact
              component={RegisterComplete}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
