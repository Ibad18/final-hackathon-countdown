// src/components/TaskBoard/TaskBoard.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import TaskForm from '../TaskForm';
import { db } from '../../firebase';
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTasks(taskData);
    });
    return unsubscribe;
  }, []);

  const addTask = async (task) => {
    await addDoc(collection(db, 'tasks'), task);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const task = tasks.find((task) => task.id === draggableId);
    await updateDoc(doc(db, 'tasks', task.id), { status: destination.droppableId });
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h2>To Do</h2>
            <TaskList sectionId="todo" tasks={tasks.filter((task) => task.status === 'todo')} />
          </div>
          <div>
            <h2>In Progress</h2>
            <TaskList sectionId="inprogress" tasks={tasks.filter((task) => task.status === 'inprogress')} />
          </div>
          <div>
            <h2>Completed</h2>
            <TaskList sectionId="completed" tasks={tasks.filter((task) => task.status === 'completed')} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
