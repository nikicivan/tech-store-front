import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./forgotPassword.css";

import { auth } from "../../../firebase";
import { toast } from "react-toastify";

import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import Spinner from "../../../components/spinner/Spinner";

const ForgotPassword = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    };
    await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      }).catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div className="forgotPassword">
      <div className="forgotPassword__container">
        {loading && <Spinner />}
        <div className="forgotPassword__title">
          <LockIcon fontSize="large" style={{ color: "#047AED" }} />
          <h1>Forgot password?</h1>
        </div>
        <form onSubmit={handleSubmit} className="forgotPassword__form">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!email}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
