import React from 'react'
import { useAppSelector } from '../hooks'
import TaskItem from './TaskItem'

const TaskList: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks)

  return (
    <div style={{ marginTop: '20px' }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList
