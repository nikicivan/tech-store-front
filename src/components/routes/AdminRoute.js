import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../utils/utils";

const style = {
  display: "grid",
  placeItems: "center",
};

const AdminRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (userInfo?.email?.token) {
      currentAdmin(userInfo.email.token.token)
        .then((res) => {
          //   console.log("current admin response", res);
          setMessage(true);
        })
        .catch((error) => {
          console.log(error);
          setMessage(false);
        });
    }
  }, [userInfo]);

  return message ? (<Route {...rest} />) : (
    <div style={style}>
      <Spinner />
      <LoadingToRedirect />
    </div>
  );
};

export default AdminRoute;
