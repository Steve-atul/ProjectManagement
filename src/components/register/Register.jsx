import React, { useState } from "react";
import styles from "./register.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { useActiveAuthComp } from "../../providers/activeAuthComp";
import { loginSuccess } from "../../redux/userSlice";
import newRequest from "../../utils/newRequest";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoadingSVG } from "../../assets/LoadingSvg";
import hide from '../../assets/hide.png'
import view from '../../assets/view.png'

export const Register = () => {
  const { setActiveAuthComp } = useActiveAuthComp();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });

  const navigate = useNavigate();

  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    const error = {};
    setError(error);
    setErrorResponse("");

    if (!username) {
      error.nameErr = "Username is required!";
    }

    if (!email) {
      error.emailErr = "Email is required!";
    }

    if (!password) {
      error.passwordErr = "Password is required!";
    }

    if (!confirmPassword) {
      error.confirmPasswordErr = "Confirm Password is required!";
      return;
    }

    if (password !== confirmPassword) {
      error.confirmPasswordErr = "Password and Confirm Password are not same!";
      return;
    }

    try {
      setLoading(true);

      const res = await newRequest.post("/api/auth/register", {
        username,
        email,
        password,
      });

      dispatch(loginSuccess(res?.data));
      toast.success("User registered successfully!");
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
      <form className={styles.form} onSubmit={handleRegister}>
        <h2>Register</h2>

        <div className={styles.InpWrapper}>
          <div className={styles.mainInp}>
            <FaRegUser fill="gray" size={20} />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className={styles.error}>{error.nameErr}</p>
        </div>

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
            style={{ cursor: 'pointer' }}
          >
            {showPassword ? <img src={hide} alt="" className={styles.iconImg} /> : <img src={view} alt="" className={styles.iconImg} />}
          </span>
          </div>
          <p className={styles.error}>{error.passwordErr}</p>
        </div>

        <div className={styles.InpWrapper}>
          <div className={styles.mainInp}>
            <MdOutlineLock fill="gray" size={20} />
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <span
          className={styles.passwordToggleIcon}
            onClick={() => setShowPassword1(!showPassword1)}
            style={{ cursor: 'pointer' }}
          >
            {showPassword1 ? <img src={hide} alt="" className={styles.iconImg} /> : <img src={view} alt="" className={styles.iconImg} />}
          </span>
          </div>
          <p className={styles.error}>{error.confirmPasswordErr}</p>
        </div>

        <p className={styles.error}>{errorResponse}</p>

        <button disabled={loading} className={styles.registerBtn} type="submit">
          {loading ? <>{LoadingSVG}</> : "Register"}
        </button>

        <p className={styles.haveAnAcc}>Have an account?</p>

        <button
          className={styles.loginBtn}
          type="button"
          onClick={() => setActiveAuthComp(0)}
        >
          Log in
        </button>
      </form>
    </div>
  );
};
