import React, { useEffect, useState } from "react";
import "./registerComplete.css";

import { createOrUpdateUser } from "../../../utils/utils";

import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../../firebase";
import { toast } from "react-toastify";

import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { userLogin } from "../../../redux/user/user.actions";

const RegisterComplete = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userInfo) {
      setEmail(localStorage.getItem("emailForRegistration"));
    } else {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   validation
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href,
      );
      if (result.user.emailVerified) {
        // remove email from localstorage
        localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            dispatch(
              userLogin(
                {
                  email: res.data.data.email,
                  token: idTokenResult,
                  name: res.data.data.name,
                  role: res.data.data.role,
                  _id: res.data.data._id,
                  picture: res?.data?.data?.picture,
                },
              ),
            );
          })
          .catch(
            (error) => {
              console.log(error);
              toast.error(error.message);
            },
          );
        history.push("/");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () =>
    <form onSubmit={handleSubmit} className="registerComplete__form">
      <input
        type="email"
        value={email}
        disabled
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter your password"
      />
      <Button type="submit" variant="contained" color="primary">
        Complete Registration
      </Button>
    </form>;

  return (
    <div className="registerComplete">
      <div className="registerComplete__container">
        <div className="registerComplete__title">
          <PersonAddIcon fontSize="large" style={{ color: "#047AED" }} />
          <h1>Register</h1>
        </div>
        {completeRegistrationForm()}
      </div>
    </div>
  );
};

export default RegisterComplete;
