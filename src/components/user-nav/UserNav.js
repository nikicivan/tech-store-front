import React from "react";
import "./userNav.css";

import firebase from "firebase";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import HistoryIcon from "@material-ui/icons/History";
import LockIcon from "@material-ui/icons/Lock";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { userLogout } from "../../redux/user/user.actions";
import USER from "../../redux/user/user.types";

const UserNav = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: USER.USER_GET_WISHLIST_RESET });
    firebase.auth().signOut();
    dispatch(userLogout());
    history.push("/login");
  };

  return (
    <div className="userNav">
      <div className="userNav__container">
        <Link to="/user/history">
          <div className="userNav__links">
            <HistoryIcon style={{ color: "purple" }} />
            <p>History</p>
          </div>
        </Link>
        <Link to="/user/wishlist">
          <div className="userNav__links">
            <FavoriteBorderIcon style={{ color: "purple" }} />
            <p>Wishlist</p>
          </div>
        </Link>
        <Link to="/user/password">
          <div className="userNav__links">
            <LockIcon style={{ color: "purple" }} />
            <p>Password</p>
          </div>
        </Link>
        <div className="userNav__links" onClick={logout}>
          <ExitToAppIcon style={{ color: "purple" }} />
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
