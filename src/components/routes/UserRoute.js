import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import LoadingToRedirect from "./LoadingToRedirect";

const style = {
  display: "grid",
  placeItems: "center",
};

const UserRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  return userInfo?.email?.token ? (<Route {...rest} />) : (
    <div style={style}>
      <Spinner />
      <LoadingToRedirect />
    </div>
  );
};

export default UserRoute;
