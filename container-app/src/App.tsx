import React, { useState, lazy,  } from 'react'
import { useAppDispatch } from './hooks'
import { addTask } from './tasksSlice'
import TaskList from './components/TaskList'
import { loadRemote } from '@module-federation/enhanced/runtime'
import RemoteComponentWrapper from './components/RemoteComponentWrapper'

// @ts-ignore
const RemoteNewTaskPopup = lazy(() => loadRemote('remote/remote-app'))

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showPopup, setShowPopup] = useState(false)

  const handleAddTask = (taskName: string) => {
    dispatch(addTask(taskName))
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>
      <button onClick={() => setShowPopup(true)}>Create Task</button>

      <TaskList />

      {showPopup && (
        <RemoteComponentWrapper>
          <RemoteNewTaskPopup
            onAddTask={handleAddTask}
            onClose={() => setShowPopup(false)}
          />
        </RemoteComponentWrapper>
      )}
    </div>
  )
}

export default App
