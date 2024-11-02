import React from "react";
import styles from "./auth.module.css";
import ArtImg from "../../assets/ArtImg.svg";
import Back from "../../assets/Back.svg";
import { Login } from "../../components/login/Login";
import { Register } from "../../components/register/Register";
import { useActiveAuthComp } from "../../providers/activeAuthComp";

const Auth = () => {
  const { activeAuthComp } = useActiveAuthComp();

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={ArtImg} alt="" className={styles.artImg} />
        <img src={Back} alt="" className={styles.back} />
        <h2>Welcome aboard my friend</h2>
        <p>just a couple of clicks and we start</p>
      </div>

      <div className={styles.rightSide}>
        {JSON.parse(activeAuthComp) === 0 ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;
