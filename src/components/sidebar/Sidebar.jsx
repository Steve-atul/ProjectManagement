import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../assets/logo.svg";
import SettingsIcon from "../../assets/setting.svg";
import BoardIcon from "../../assets/board.svg";
import AnalyticIcon from "../../assets/analytic.svg";
import { IoLogOutOutline } from "react-icons/io5";
import { LogoutModal } from "../logoutModal/LogoutModal";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <div className={styles.sidebar}>
      <div className={styles.mainHeading}>
        <div className={styles.item}>
          <img src={LogoIcon} alt="logo" />
          <h1 className={styles.mainTitle}>Pro Manage</h1>
        </div>

        <Link to={"/dashboard"} className={styles.link}>
          <div
            className={`${styles.item} ${
              pathname === "/dashboard" && styles.selectedItem
            }`}
          >
            <img src={BoardIcon} alt="board" />
            <h6 className={styles.title}>Board</h6>
          </div>
        </Link>

        <Link to={"/dashboard/analytics"} className={styles.link}>
          <div
            className={`${styles.item} ${
              pathname === "/dashboard/analytics" && styles.selectedItem
            }`}
          >
            <img src={AnalyticIcon} alt="analytic" />
            <h6 className={styles.title}>Analytics</h6>
          </div>
        </Link>

        <Link to={"/dashboard/settings"} className={styles.link}>
          <div
            className={`${styles.item} ${
              pathname === "/dashboard/settings" && styles.selectedItem
            }`}
          >
            <img src={SettingsIcon} alt="settings" />
            <h6 className={styles.title}>Settings</h6>
          </div>
        </Link>
      </div>

      <div
        className={styles.logoutDiv}
        onClick={() => setOpenLogoutModal(true)}
      >
        <IoLogOutOutline color="red" size={25} style={{ cursor: "pointer" }} />
        <button>Logout</button>
      </div>

      <LogoutModal
        openLogoutModal={openLogoutModal}
        setOpenLogoutModal={setOpenLogoutModal}
      />
    </div>
  );
};
