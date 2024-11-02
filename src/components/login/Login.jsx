import React, { useState } from "react";
import styles from "./login.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";

import { useActiveAuthComp } from "../../providers/activeAuthComp";
import { LoadingSVG } from "../../assets/LoadingSvg";
import hide from '../../assets/hide.png'
import view from '../../assets/view.png'
import newRequest from "../../utils/newRequest";
import { loginSuccess } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const { setActiveAuthComp } = useActiveAuthComp();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const error = {};
    setError(error);
    setErrorResponse("");

    if (!email) {
      error.emailErr = "Email is required!";
    }

    if (!password) {
      error.passwordErr = "Password is required!";
      return;
    }

    try {
      setLoading(true);

      const res = await newRequest.post("/api/auth/login", {
        email,
        password,
      });

      dispatch(loginSuccess(res?.data));
      toast.success("Logged in successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setErrorResponse(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className={styles.InpWrapper}>
          <div className={styles.mainInp}>
            <MdOutlineEmail fill="gray" size={20} />
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <span
              className={styles.passwordToggleIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <img src={hide} alt="" className={styles.iconImg} /> : <img src={view} alt="" className={styles.iconImg} />}
            </span>
          </div>
          <p className={styles.error}>{error.passwordErr}</p>
        </div>

        <p className={styles.error}>{errorResponse}</p>

        <button disabled={loading} className={styles.loginBtn} type="submit">
          {loading ? <>{LoadingSVG}</> : "Log in"}
        </button>

        <p className={styles.noAcc}>Have no account yet?</p>

        <button
          className={styles.registerBtn}
          type="button"
          onClick={() => setActiveAuthComp(1)}
        >
          Register
        </button>
      </form>
    </div>
  );
};
