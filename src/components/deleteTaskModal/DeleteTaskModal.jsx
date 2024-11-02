import React from "react";
import styles from "./deleteTaskModal.module.css";
import { Modal } from "@mantine/core";
import newRequest from "../../utils/newRequest"; 
import toast from "react-hot-toast";

export const DeleteTaskModal = ({
  openDeleteTaskModal,
  setOpenDeleteTaskModal,
  taskId
}) => {

  const handleDeleteTask = async () => {
    try {
      const res = await newRequest.delete(`/api/task/${taskId}`);

      toast.success(res?.data?.message || "Task deleted successfully");

      setOpenDeleteTaskModal(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <Modal
      opened={openDeleteTaskModal}
      onClose={() => setOpenDeleteTaskModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      padding={"1.5rem"}
    >
      <div className={styles.deleteTaskContainer}>
        <p>Are you sure you want to Delete?</p>

        <button className={styles.delete} onClick={handleDeleteTask}>Yes, Delete</button>
        <button
          onClick={() => setOpenDeleteTaskModal(false)}
          type="button"
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
