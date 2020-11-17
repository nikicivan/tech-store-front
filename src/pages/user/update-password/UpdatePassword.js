import React, { useState } from "react";
import UserNav from "../../../components/user-nav/UserNav";
import "./updatePassword.css";

import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import Spinner from "../../../components/spinner/Spinner";

import Button from "@material-ui/core/Button";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser.updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("You successfully update your password");
        setPassword("");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="updatePassword">
      <div className="updatePassword__container">
        <div className="updatePassword__nav">
          <UserNav />
        </div>
        <div className="updatePassword__contentContainer">
          {loading ? <Spinner /> : (
            <div className="updatePassword__content">
              <div className="updatePassword__contentTitle">
                <h1>Password update</h1>
              </div>
              <form className="updatePassword__form" onSubmit={handleSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoFocus
                  disabled={loading}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={password.length < 6 || loading}
                >
                  Change password
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
