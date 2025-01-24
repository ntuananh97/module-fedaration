import React, { useState } from 'react'
import { updateTask } from '../tasksSlice'
import { useAppDispatch } from '../hooks'

interface Task {
  id: number
  name: string
}

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(task.name)

  const handleEdit = () => setIsEditing(true)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(updateTask({ id: task.id, name: editName }))
      setIsEditing(false)
    }
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      {isEditing ? (
        <input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleEdit}>{task.name}</span>
      )}
    </div>
  )
}

export default TaskItem
