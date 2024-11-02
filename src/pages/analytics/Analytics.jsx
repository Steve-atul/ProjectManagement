import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { GoDotFill } from "react-icons/go";
import padStartFxn from "../../utils/padStartFxn";
import newRequest from "../../utils/newRequest";

const Analytics = () => {
  const [taskAnalytics, setTaskAnalytics] = useState({});

  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await newRequest.get(`/api/task/analytics`);
        setTaskAnalytics(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchD();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Analytics</h2>

      <div className={styles.analyticWrapper}>
        <div className={styles.analytic}>
          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              Backlog Tasks
            </p>
            <strong>{padStartFxn(taskAnalytics?.status?.backlog)}</strong>
          </div>

          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              To-do Tasks
            </p>
            <strong>{padStartFxn(taskAnalytics?.status?.todo)}</strong>
          </div>

          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              In-progress Tasks
            </p>
            <strong>{padStartFxn(taskAnalytics?.status?.progress)}</strong>
          </div>

          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              Completed Tasks
            </p>
            <strong>{padStartFxn(taskAnalytics?.status?.done)}</strong>
          </div>
        </div>

        <div className={styles.analytic}>
          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              Low Priority
            </p>
            <strong>{padStartFxn(taskAnalytics?.priority?.low)}</strong>
          </div>

          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              Moderate Priority
            </p>
            <strong>{padStartFxn(taskAnalytics?.priority?.moderate)}</strong>
          </div>

          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              High-priority
            </p>
            <strong>{padStartFxn(taskAnalytics?.priority?.high)}</strong>
          </div>

          <div className={styles.singleAnalytic}>
            <p className={styles.titleContent}>
              <GoDotFill fill="#91c5cc" />
              Due Date Tasks
            </p>
            <strong>{padStartFxn(taskAnalytics?.dueDateTasks)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
