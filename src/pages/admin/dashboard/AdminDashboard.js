import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/admin-nav/AdminNav";
import "./adminDashboard.css";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../../components/spinner/Spinner";
import {
  getAdminOrders,
  updateStatusOrder,
} from "../../../redux/order/order.actions";
import Order from "../../../components/order/Order";
import ORDER from "../../../redux/order/order.types";

const AdminDashboard = () => {
  const [status, setStatus] = useState("");

  const ordersAdminGet = useSelector((state) => state.ordersAdminGet);
  const { orders, loading, error } = ordersAdminGet;

  const orderUpdateStatus = useSelector((state) => state.orderUpdateStatus);
  const { success: successUpdate } = orderUpdateStatus;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.email?.role === "admin") {
      dispatch(getAdminOrders(userInfo?.email?.token?.token));
    }
  }, [dispatch, userInfo, successUpdate]);

  const handleStatusChange = (orderId, orderStatus) => {
    dispatch({ type: ORDER.ORDER_UPDATE_STATUS_RESET });
    setStatus(orderStatus);
    // console.log(orderId, orderStatus);
    dispatch(
      updateStatusOrder(orderId, orderStatus, userInfo?.email?.token?.token),
    );
  };

  return (
    <div className="adminDashboard">
      <div className="adminDashboard__container">
        <div className="adminDashboard__nav">
          <AdminNav />
        </div>
        <div className="adminDashboard__content">
          {loading ? <Spinner /> : error ? toast.error(error) : (<>
            <div className="adminDashboard__title">
              <h1>
                {orders.length
                  ? `Hi, ${userInfo?.email
                    ?.name}, you have ${orders.length} order(s) in purchase history.`
                  : "You don't have any order in history."}
              </h1>
            </div>
            <Order
              orders={orders}
              hidden={false}
              handleStatusChange={handleStatusChange}
              status={status}
            />
          </>)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
