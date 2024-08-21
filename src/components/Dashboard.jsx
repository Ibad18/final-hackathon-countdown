import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "todo" },
    { id: 2, title: "Task 2", status: "inprogress" },
    { id: 3, title: "Task 3", status: "completed" },
  ]);

  const moveTask = (id, status) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  const [, dropTodo] = useDrop({
    accept: "TASK",
    drop: () => ({ status: "todo" }),
  });

  const [, dropInProgress] = useDrop({
    accept: "TASK",
    drop: () => ({ status: "inprogress" }),
  });

  const [, dropCompleted] = useDrop({
    accept: "TASK",
    drop: () => ({ status: "completed" }),
  });

  return (
    <div className="dashboard">
      <div className="section" ref={dropTodo}>
        <h2>To Do</h2>
        {tasks.filter(task => task.status === "todo").map(task => (
          <Task key={task.id} task={task} moveTask={moveTask} />
        ))}
      </div>
      <div className="section" ref={dropInProgress}>
        <h2>In Progress</h2>
        {tasks.filter(task => task.status === "inprogress").map(task => (
          <Task key={task.id} task={task} moveTask={moveTask} />
        ))}
      </div>
      <div className="section" ref={dropCompleted}>
        <h2>Completed</h2>
        {tasks.filter(task => task.status === "completed").map(task => (
          <Task key={task.id} task={task} moveTask={moveTask} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
