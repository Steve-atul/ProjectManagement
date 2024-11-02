import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import numToMonth from "../../utils/numToMonth";
import { Card } from "../../components/card/Card";
import { IoPeopleOutline } from "react-icons/io5";
import { AddPeopleModal } from "../../components/addPeopleModal/AddPeopleModal";
import { useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import newRequest from "../../utils/newRequest";

const Dashboard = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const [opened, { open, close }] = useDisclosure();
  const { currentUser } = useSelector((state) => state.user);

  const [changeTimePeriod, setChangeTimePeriod] = useState("week");
  const [allTasks, setAllTasks] = useState([]);

  
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await newRequest.get(`/api/task/?filter=${changeTimePeriod}`);
      setAllTasks(res?.data);
    };
    fetchTasks();
  }, [changeTimePeriod]);

  



  const groupedTasks = allTasks.reduce((acc, task) => {
    if (!acc[task.type]) {
      acc[task.type] = [];
    }
    acc[task.type].push(task);
    return acc;
  }, {});

  const tasksArray = {
    backlog: groupedTasks["backlog"] || [],
    todo: groupedTasks["todo"] || [],
    progress: groupedTasks["progress"] || [],
    done: groupedTasks["done"] || [],
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1 style={{ fontSize: "1.4rem", textTransform: "capitalize" }}>
          Welcome! {currentUser?.username}
        </h1>
        <p style={{ color: "gray", fontSize: "1.2rem" }}>
          {date} {numToMonth(month)}, {year}
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.miniContent}>
          <p className={styles.board}>Board</p>

          <div className={styles.addPeople} onClick={open}>
            <IoPeopleOutline />
            <p>Add People</p>
          </div>

          <AddPeopleModal open={open} close={close} opened={opened} />
        </div>

        <select
          style={{ outline: "none", padding: "0 0.3rem" }}
          value={changeTimePeriod}
          onChange={(e) => setChangeTimePeriod(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className={styles.mainCards}>
        <Card name="Backlog" tasks={tasksArray.backlog} />
        <Card name="To do" tasks={tasksArray.todo} />
        <Card name="In progress" tasks={tasksArray.progress} />
        <Card name="Done" tasks={tasksArray.done} />
      </div>
    </div>
  );
};

export default Dashboard;



