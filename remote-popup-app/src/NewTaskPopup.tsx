import React, { useState } from 'react';

interface NewTaskPopupProps {
  onAddTask: (taskName: string) => void;
  onClose: () => void;
}

/**
 * This component is exposed via Module Federation.
 * Accepts two props:
 *  - onAddTask: callback to pass new task name
 *  - onClose: close the popup
 */
const NewTaskPopup: React.FC<NewTaskPopupProps> = ({ onAddTask, onClose }) => {
  const [taskName, setTaskName] = useState('');

  const handleAdd = () => {
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      onClose(); // close after adding
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '300px',
          margin: '100px auto',
          padding: '20px',
          background: 'white',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Create New Task</h2>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => { 
            if(e.key === 'Enter') {
              handleAdd();
            }
          }}
          style={{ width: '100%', marginBottom: '10px' }}
          placeholder="Task name"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default NewTaskPopup;
