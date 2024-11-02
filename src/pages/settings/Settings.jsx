import React, { useState } from "react";
import styles from "./settings.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoadingSVG } from "../../assets/LoadingSvg";

import hide from '../../assets/hide.png'
import view from '../../assets/view.png'

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState({
    usernameErr: "",
    emailErr: "",
    oldPasswordErr: "",
    newPasswordErr: "",
  });

  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    const error = {};
    setError(error);
    setErrorResponse("");

    if (!username) {
      error.usernameErr = "Username is required!";
    }

    if (!email) {
      error.emailErr = "Email is required!";
    }

    if (!oldPassword && newPassword) {
      error.oldPasswordErr = "Old Password is required!";
      //   return;
    }

    if (oldPassword && !newPassword) {
      error.newPasswordErr = "New Password is required!";
      return;
    }

    if (oldPassword.length > 1 && oldPassword === newPassword) {
      error.newPasswordErr = "Old and new Password are same!";
      return;
    }

    if (!oldPassword && !newPassword) {
      if (email === currentUser.email || username === currentUser.username) {
        setErrorResponse("Nothing to update!");
        return;
      }
    }

    try {
      console.log(username, email, oldPassword, newPassword);
      setLoading(true);
      const res = await newRequest.put("/api/user/update", {
        username,
        email,
        oldPassword,
        newPassword,
      });

      toast.success(res?.data?.message);
      setLoading(false);
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log("error");
      setErrorResponse(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Settings</h2>

      <form className={styles.form} onSubmit={handleUpdateSettings}>
        <div className={styles.InpWrapper}>
          <div className={styles.mainInp}>
            <FaRegUser fill="gray" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className={styles.error}>{error.usernameErr}</p>
        </div>

        <div className={styles.InpWrapper}>
          <div className={styles.mainInp}>
            <MdOutlineEmail fill="gray" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className={styles.error}>{error.emailErr}</p>
        </div>

        <div className={styles.InpWrapper}>
          <div className={styles.mainInp}>
            <MdOutlineLock fill="gray" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span
              className={styles.passwordToggleIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <img src={hide} alt="" className={styles.iconImg} /> : <img src={view} alt="" className={styles.iconImg} />}
            </span>
          </div>
          <p className={styles.error}>{error.oldPasswordErr}</p>
        </div>

        <div className={styles.InpWrapper}>
          <div className={styles.mainInp}>
            <MdOutlineLock fill="gray" size={20} />
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className={styles.passwordToggleIcon}
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword ? <img src={hide} alt="" className={styles.iconImg} /> : <img src={view} alt="" className={styles.iconImg} />}
            </span>
          </div>
          <p className={styles.error}>{error.newPasswordErr}</p>
        </div>

        <p className={styles.error}>{errorResponse}</p>

        <button disabled={loading} className={styles.updateBtn} type="submit">
          {loading ? <>{LoadingSVG}</> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
