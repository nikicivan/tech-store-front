import React, { useEffect, useState } from "react";
import "./register.css";

import { Link } from "react-router-dom";

import { auth } from "../../../firebase";
import { toast } from "react-toastify";

import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useSelector } from "react-redux";

const Register = ({ location, history }) => {
  const [email, setEmail] = useState("");

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`,
    );
    localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const registerForm = () =>
    <form onSubmit={handleSubmit} className="register__form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoFocus
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>;

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__title">
          <PersonAddIcon fontSize="large" style={{ color: "#047AED" }} />
          <h1>Register</h1>
        </div>
        {registerForm()}
        <p className="register__login">
          Already customer?<span className="register__link">
            <Link
              to={redirect ? `/login?login=${redirect}` : "/login"}
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
