import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import UserNav from "../../../components/user-nav/UserNav";

import { toast } from "react-toastify";
import Spinner from "../../../components/spinner/Spinner";

import "./userHistory.css";
import Order from "../../../components/order/Order";
import { getUserOrders } from "../../../redux/order/order.actions";

const UserHistory = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const ordersUserGet = useSelector((state) => state.ordersUserGet);
  const { orders, loading, error } = ordersUserGet;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.email?.token?.token) {
      dispatch(getUserOrders(userInfo?.email?.token?.token));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="userHistory">
      <div className="userHistory__container">
        <div className="userHistory__nav">
          <UserNav />
        </div>
        <div className="userHistory__content">
          {loading ? <Spinner /> : error ? toast.error(error) : (<>
            <div className="userHistory__title">
              <h1>
                {orders.length
                  ? `Hi, ${userInfo?.email
                    ?.name}, you successfully purchased ${orders.length} order(s).`
                  : "You don't have any order in history."}
              </h1>
            </div>
            <Order orders={orders} hidden={true} />
          </>)}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
