// src/components/TaskBoard/TaskList.jsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const TaskList = ({ sectionId, tasks }) => {
  return (
    <Droppable droppableId={sectionId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            backgroundColor: '#f339fa',
            padding: '16px',
            borderRadius: '4px',
            minHeight: '400px',
          }}
        >
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
