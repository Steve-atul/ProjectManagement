import React, { useEffect, useState } from "react";
import styles from "./publicSharedTask.module.css";
import LogoIcon from "../../assets/logo.svg";
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { LoadingSVG } from "../../assets/LoadingSvg";

const PublicSharedTask = () => {
  const { taskId } = useParams();

  const [task, setTask] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await newRequest.get(`/api/task/${taskId}`);
        setTask(res?.data);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong!");
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <img src={LogoIcon} alt="logo" />
        <h1 className={styles.mainTitle}>Pro Manage</h1>
      </div>

      {loading ? (
        <p className={styles.loader}>{LoadingSVG}</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.mainTask}>
          <div className={styles.singleTask}>
            <div className={styles.topbar}>
              <div className={styles.taskPriority}>
                <GoDotFill
                  fill={
                    task?.priority === "low"
                      ? "#63c05b"
                      : task.priority === "moderate"
                      ? "#18b0ff"
                      : "#ff2473"
                  }
                  size={20}
                />
                <p className={styles.priority}>{task?.priority} PRIORITY</p>

                {task.assignedTo && (
                  <p title={task?.assignedTo} className={styles.assignedTo}>
                    {task.assignedTo.slice(0, 2)}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.header}>
              <h1 title={task?.title} className={styles.taskName}>
                {task?.title}
              </h1>

              <div className={styles.checklistArea}>
                <p>
                  Checklist (
                  {task?.checklist?.reduce((acc, t) => t.checked + acc, 0)}/
                  {task?.checklist?.length})
                </p>
              </div>
            </div>

            <div className={styles.allInputs}>
              {task?.checklist?.map((t) => (
                <div className={styles.singleInput} key={t._id}>
                  <input type="checkbox" readOnly checked={t?.checked} />
                  <p className={styles.taskContent}>{t?.task}</p>
                </div>
              ))}
            </div>

            {task.dueDate && (
              <div className={styles.bottomBar}>
                <p className={styles.dueDate}>Due Date</p>
                <button className={styles.btn}>{task?.dueDate}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicSharedTask;
