import React, { useState } from "react";
import "./login.css";
import { createOrUpdateUser } from "../../../utils/utils.js";

import { useDispatch } from "react-redux";

import { auth, googleAuthProvider } from "../../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import MailIcon from "@material-ui/icons/Mail";
import { userLogin } from "../../../redux/user/user.actions";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const roleBasedUser = (res) => {
    // check if intended
    const intended = history.location.state;
    // console.log(intended);
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch(
            userLogin(
              {
                email: res?.data?.email,
                token: idTokenResult,
                name: res?.data?.name,
                role: res?.data?.role,
                _id: res?.data?._id,
                picture: res?.data?.picture,
              },
            ),
          );
          roleBasedUser(res);
        })
        .catch(
          (error) => {
            console.log(error);
            toast.error(error.message);
          },
        );
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
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
          roleBasedUser(res);
        })
        .catch(
          (error) => console.log(error),
        );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loginForm = () =>
    <form className="login__form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoFocus
      />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<MailIcon />}
        disabled={!email || password.length < 6}
        style={{ outlineWidth: "0" }}
      >
        Login with Email/Password
      </Button>
    </form>;

  return (
    <div className="login">
      {loading ? <Spinner /> : (
        <div className="login__container">
          <div className="login__title">
            <ExitToAppIcon
              fontSize="large"
              style={{ color: "#047AED" }}
            />
            <h1>Login</h1>
          </div>
          {loginForm()}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "1rem", outlineWidth: "0" }}
            onClick={googleLogin}
          >
            Login with Google
          </Button>
          <div className="login__footer">
            <>
              <p className="login__register">
                New customer?<span className="login__link">
                  <Link
                    to={redirect
                      ? `/register?redirect=${redirect}`
                      : "/register"}
                  >
                    Register
                  </Link>
                </span>
              </p>
            </>
            <>
              <Link to="/forgotpassword">
                <p className="login__forgotPassword">Forgot password?</p>
              </Link>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
