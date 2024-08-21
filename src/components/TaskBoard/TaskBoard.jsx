import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import TaskForm from '../TaskForm';
import { db } from '../../firebase';
import '../Components.css'
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
    const taskRef = doc(db, 'tasks', task.id);

    const updatedHistory = [
      ...task.history,
      { status: destination.droppableId, timestamp: new Date().toISOString() },
    ];

    await updateDoc(taskRef, {
      status: destination.droppableId,
      history: updatedHistory,
    });
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
      <div className='heading'><p>Todo</p><p>In Progress</p><p>Completed</p></div>
        <div style={{ display: 'flex',  justifyContent: 'space-between' }}>
          <TaskList sectionId="todo" tasks={tasks.filter((task) => task.status === 'todo')} />
          <TaskList sectionId="inprogress" tasks={tasks.filter((task) => task.status === 'inprogress')} />
          <TaskList sectionId="completed" tasks={tasks.filter((task) => task.status === 'completed')} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
