import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = ({ task, index }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const deadline = new Date(task.deadline).getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setTimeRemaining('Deadline Passed');
        clearInterval(interval);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task.deadline]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: '8px',
            margin: '4px 0',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            ...provided.draggableProps.style,
          }}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Time Remaining: {timeRemaining}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
