import React from "react";
import styles from "./logoutModal.module.css";
import { Modal } from "@mantine/core";
import { logout } from "../../redux/userSlice";
import newRequest from "../../utils/newRequest";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LogoutModal = ({ openLogoutModal, setOpenLogoutModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await newRequest.get("/api/auth/logout");
      dispatch(logout());
      toast.success(res?.data?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal
      opened={openLogoutModal}
      onClose={() => setOpenLogoutModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      padding={"1.5rem"}
    >
      <div className={styles.logoutContainer}>
        <p>Are you sure you want to Logout?</p>

        <button onClick={handleLogout} className={styles.logout}>
          Yes, Logout
        </button>
        <button
          onClick={() => setOpenLogoutModal(false)}
          type="button"
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
