import React, { useRef, useState } from "react";
import styles from "./addTaskModal.module.css";
import { Modal } from "@mantine/core";
import { GoDotFill } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import formatDate from "../utils/formatDate";
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";


export const AddTaskModal = ({ openAddTaskModal, setOpenAddTaskModal }) => {
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

  const [singleTask, setSingleTask] = useState({
    title: "",
    type: "todo",
    priority: "",
    checklist: [],
    assignTo: "",
    dueDate: "",
  });

  const handleChangeTitle = (title) => {
    const newTaskData = { ...singleTask };
    newTaskData.title = title;
    setSingleTask({ ...newTaskData });
  };

  const handleChangePriority = (priority) => {
    const newTaskData = { ...singleTask };
    newTaskData.priority = priority;
    setSingleTask({ ...newTaskData });
  };

  const handleChangeAssignee = (asignee) => {
    const newTaskData = { ...singleTask };
    newTaskData.assignTo = asignee;
    setSingleTask({ ...newTaskData });
  };

  const handleAddOption = () => {
    const newTaskData = { ...singleTask };
    newTaskData.checklist.push({ checked: false, task: "" });
    setSingleTask({ ...newTaskData });
  };

  const handleChangeOptionCheckmark = (i, checkVal) => {
    const newTaskData = { ...singleTask };
    newTaskData.checklist[i].checked = checkVal;
    setSingleTask({ ...newTaskData });
  };

  const handleChangeOptionTask = (i, taskVal) => {
    const newTaskData = { ...singleTask };
    newTaskData.checklist[i].task = taskVal;
    setSingleTask({ ...newTaskData });
  };

  const handleDeleteTaskOption = (i) => {
    const newTaskData = { ...singleTask };
    newTaskData.checklist.splice(i, 1);
    setSingleTask({ ...newTaskData });
  };

  const handleChangeDueDate = (e) => {
    const newTaskData = { ...singleTask };
    newTaskData.dueDate = e.target.value;
    setSingleTask({ ...newTaskData });
  };

  const [showError, setShowError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = () => {
    setShowError(false);
    setErrorMessage("");
    setSingleTask({
      title: "",
      type: "todo",
      priority: "",
      checklist: [],
      assignTo: "",
      dueDate: "",
    });
    setOpenAddTaskModal(false);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    let error = singleTask?.checklist.some(
      (t) => t.checked === "" || t.task === ""
    );

    if (!singleTask.title || !singleTask.type || !singleTask.priority) {
      error = true;
    }

    if (singleTask?.checklist?.length < 1) {
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
      const res = await newRequest.post("/api/task/create", singleTask);
      toast.success(res?.data?.message);
     
      handleReset();
      // window.location.reload();
            window.location=window.location;


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
  };

  return (
    <Modal
      opened={openAddTaskModal}
      onClose={() => setOpenAddTaskModal(false)}
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
              singleTask.priority === "high" && styles.selectedPriority
            }`}
          >
            <GoDotFill fill="#ff2473" />
            <p>HIGH PRIORITY</p>
          </button>
          <button
            onClick={() => handleChangePriority("moderate")}
            type="button"
            className={`${styles.priority} ${
              singleTask.priority === "moderate" && styles.selectedPriority
            }`}
          >
            <GoDotFill fill="#18b0ff" />
            <p>MODERATE PRIORITY</p>
          </button>
          <button
            onClick={() => handleChangePriority("low")}
            type="button"
            className={`${styles.priority} ${
              singleTask.priority === "low" && styles.selectedPriority
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
            {singleTask?.checklist?.reduce((acc, t) => t.checked + acc, 0)}/
            {singleTask?.checklist.length}){" "}
            <span className={styles.asterik}>*</span>
          </p>

          <div className={styles.allInputs}>
            {singleTask.checklist?.map((t, _) => (
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
              {singleTask?.dueDate
                ? formatDate(singleTask?.dueDate)
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
