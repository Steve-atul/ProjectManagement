import React, { useRef, useState } from "react";
import styles from "./editTaskModal.module.css";
import { Modal } from "@mantine/core";
import { GoDotFill } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import formatDate from "../utils/formatDate";
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";


export const EditTaskModal = ({ openEditTaskModal, setOpenEditTaskModal,taskId,task }) => {
  const { currentUser } = useSelector((state) => state.user);

  const dateRef = useRef();
  // const navigate = useNavigate();


  const openDatePicker = () => {
    if (dateRef.current) {
      dateRef.current.focus();
      dateRef.current.showPicker();
    }
  };

  var [selectedAssignee, setSelectedAssignee] = useState("");

  const [editSingleTask, setEditSingleTask] = useState({
    title: "",
    type: task?.type || "todo",
    priority: "",
    checklist: [],
    assignTo: "",
    dueDate: "",
  });

  const handleChangeTitle = (title) => {
    const newTaskData = { ...editSingleTask };
    newTaskData.title = title;
    setEditSingleTask({ ...newTaskData });
  };

  const handleChangePriority = (priority) => {
    const newTaskData = { ...editSingleTask };
    newTaskData.priority = priority;
    setEditSingleTask({ ...newTaskData });
  };

  const handleChangeAssignee = (asignee) => {
    const newTaskData = { ...editSingleTask };
    newTaskData.assignTo = asignee;
    setEditSingleTask({ ...newTaskData });
  };

  const handleAddOption = () => {
    const newTaskData = { ...editSingleTask };
    newTaskData.checklist.push({ checked: false, task: "" });
    setEditSingleTask({ ...newTaskData });
  };

  const handleChangeOptionCheckmark = (i, checkVal) => {
    const newTaskData = { ...editSingleTask };
    newTaskData.checklist[i].checked = checkVal;
    setEditSingleTask({ ...newTaskData });
  };

  const handleChangeOptionTask = (i, taskVal) => {
    const newTaskData = { ...editSingleTask };
    newTaskData.checklist[i].task = taskVal;
    setEditSingleTask({ ...newTaskData });
  };

  const handleDeleteTaskOption = (i) => {
    const newTaskData = { ...editSingleTask };
    newTaskData.checklist.splice(i, 1);
    setEditSingleTask({ ...newTaskData });
  };

  const handleChangeDueDate = (e) => {
    const newTaskData = { ...editSingleTask };
    newTaskData.dueDate = e.target.value;
    setEditSingleTask({ ...newTaskData });
  };

  const [showError, setShowError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = () => {
    setShowError(false);
    setErrorMessage("");
    setEditSingleTask({
      title: "",
      type: task?.type || "todo",
      priority: "",
      checklist: [],
      assignTo: "",
      dueDate: "",
    });
    setOpenEditTaskModal(false);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    let error = editSingleTask?.checklist.some(
      (t) => t.checked === "" || t.task === ""
    );

    if (!editSingleTask.title || !editSingleTask.type || !editSingleTask.priority) {
      error = true;
    }

    if (editSingleTask?.checklist?.length < 1) {
      setShowError(true);
      setErrorMessage("You need to have atleast 1 task.");
      return;
    }

    if (error) {
      setShowError(true);
      setErrorMessage("Please fill all the marked fields.");
      return;
    }

    setShowError(false);
    setErrorMessage("");

    try {
        const res = await newRequest.patch(`/api/task/edit/${taskId}`, editSingleTask);
      
        toast.success(res?.data?.message);

        handleReset();
        window.location.reload();

    } catch (error) {
      setShowError(true);
      setErrorMessage(error?.response?.data?.message);
      console.log(error);
    }
    setSelectedAssignee = "";
    // navigate("/dashboard");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAssignee = (email) => {
    setSelectedAssignee(email);
    setIsDropdownOpen(false);

    const newTaskData = { ...editSingleTask, assignTo: email };
    setEditSingleTask(newTaskData);
  };

  return (
    <Modal
      opened={openEditTaskModal}
      onClose={() => setOpenEditTaskModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      size={"lg"}
      padding={"1.5rem"}
    >
      <form className={styles.form} onSubmit={handleCreateTask}>
        <div className={styles.taskTitle}>
          <label htmlFor="title">
            Title <span className={styles.asterik}>*</span>
          </label>
          <input
            onChange={(e) => handleChangeTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter Task Title"
          />
        </div>

        <div className={styles.priorities}>
          <p>
            Select Priority <span className={styles.asterik}>*</span>
          </p>

          <button
            onClick={() => handleChangePriority("high")}
            type="button"
            className={`${styles.priority} ${
              editSingleTask.priority === "high" && styles.selectedPriority
            }`}
          >
            <GoDotFill fill="#ff2473" />
            <p>HIGH PRIORITY</p>
          </button>
          <button
            onClick={() => handleChangePriority("moderate")}
            type="button"
            className={`${styles.priority} ${
              editSingleTask.priority === "moderate" && styles.selectedPriority
            }`}
          >
            <GoDotFill fill="#18b0ff" />
            <p>MODERATE PRIORITY</p>
          </button>
          <button
            onClick={() => handleChangePriority("low")}
            type="button"
            className={`${styles.priority} ${
              editSingleTask.priority === "low" && styles.selectedPriority
            }`}
          >
            <GoDotFill fill="#63c05b" />
            <p>LOW PRIORITY</p>
          </button>
        </div>

        {currentUser?.myAssignies.length > 0 && (
          <div className={styles.assignTo}>
            <p>Assign to</p>

            <div
              className={styles.customDropdown}
              onChange={(e) => handleChangeAssignee(selectedAssignee)}
              name=""
              id=""
            >
              <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                {selectedAssignee ? selectedAssignee : "Add an assignee"}
              </div>
              <div
                className={`${styles.dropdownList} ${
                  isDropdownOpen ? styles.show : ""
                }`}
              >
                {currentUser?.myAssignies?.map((a) => (
                  <div key={a} className={styles.dropdownItem}>
                    <span className={styles.assigneeEmail}>{a}</span>
                    <button
                      className={styles.assignButton}
                      onClick={() => handleAssignee(a)}
                    >
                      {/* onClick={() => handleChangeAssignee(a)} */}
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className={styles.addNewTaskContainer}>
          <p>
            Checklist (
            {editSingleTask?.checklist?.reduce((acc, t) => t.checked + acc, 0)}/
            {editSingleTask?.checklist.length}){" "}
            <span className={styles.asterik}>*</span>
          </p>

          <div className={styles.allInputs}>
            {editSingleTask.checklist?.map((t, _) => (
              <div key={_} className={styles.singleInput}>
                <div className={styles.mainInp}>
                  <input
                    type="checkbox"
                    checked={t.checked}
                    onChange={(e) =>
                      handleChangeOptionCheckmark(_, e.target.checked)
                    }
                  />
                  <input
                    style={{ border: "none", outline: "none", width: "100%" }}
                    type="text"
                    className={styles.taskContent}
                    placeholder="Task content"
                    value={t?.task}
                    onChange={(e) => handleChangeOptionTask(_, e.target.value)}
                  />
                </div>
                <RiDeleteBinLine
                  size={18}
                  fill="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteTaskOption(_)}
                />
              </div>
            ))}
          </div>

          <div className={styles.addNewTask} onClick={handleAddOption}>
            <IoIosAdd size={25} />
            Add New
          </div>
        </div>

        <input
          type="date"
          name="date"
          ref={dateRef}
          style={{ visibility: "hidden", width: "1px", height: "1px" }}
          onChange={handleChangeDueDate}
        />

        {showError && <div className={styles.error}>{errorMessage}</div>}

        <div className={styles.btns}>
          <div>
            <button
              onClick={openDatePicker}
              type="button"
              className={styles.dueDateBtn}
            >
              {editSingleTask?.dueDate
                ? formatDate(editSingleTask?.dueDate)
                : "Select due date"}
            </button>
          </div>

          <div>
            <button
              onClick={handleReset}
              type="button"
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
