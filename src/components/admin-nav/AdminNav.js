import React from "react";
import "./adminNav.css";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import COUPON from "../../redux/coupons/coupons.types";
import { userLogout } from "../../redux/user/user.actions";
import ORDER from "../../redux/order/order.types";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
// import MoneyIcon from "@material-ui/icons/Money";
import LockIcon from "@material-ui/icons/Lock";
import CategoryIcon from "@material-ui/icons/Category";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const AdminNav = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = () => {
    dispatch({ type: COUPON.COUPON_CREATE_RESET });
    dispatch({ type: COUPON.COUPON_DELETE_RESET });
  };

  const handleDashboard = () => {
    dispatch({ type: ORDER.ORDER_UPDATE_STATUS_RESET });
    history.push("/admin/dashboard");
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch(userLogout());
    history.push("/login");
  };

  return (
    <div className="adminNav">
      <div className="adminNav__container">
        <div className="adminNav__links" onClick={handleDashboard}>
          <DashboardIcon style={{ color: "purple" }} />
          <p>Dashboard</p>
        </div>
        <Link to="/admin/product">
          <div className="adminNav__links">
            <CategoryIcon style={{ color: "purple" }} />
            <p>Single Product</p>
          </div>
        </Link>
        <Link to="/admin/products">
          <div className="adminNav__links">
            <ListIcon style={{ color: "purple" }} />
            <p>Products</p>
          </div>
        </Link>
        <Link to="/admin/category">
          <div className="adminNav__links">
            <ListIcon style={{ color: "purple" }} />
            <p>Categories</p>
          </div>
        </Link>
        <Link to="/admin/sub">
          <div className="adminNav__links">
            <ListIcon style={{ color: "purple" }} />
            <p>Sub-Category</p>
          </div>
        </Link>
        <Link to="/admin/coupons" onClick={handleClick}>
          <div className="adminNav__links">
            <CardGiftcardIcon style={{ color: "purple" }} />
            <p>Coupons</p>
          </div>
        </Link>
        <Link to="/admin/password">
          <div className="adminNav__links">
            <LockIcon style={{ color: "purple" }} />
            <p>Update password</p>
          </div>
        </Link>
        <div className="adminNav__links" onClick={logout}>
          <ExitToAppIcon style={{ color: "purple" }} />
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
