import React, { useState, lazy, Suspense } from 'react'
import { useAppDispatch } from './hooks'
import { addTask } from './tasksSlice'
import TaskList from './components/TaskList'
import { loadRemote } from '@module-federation/enhanced/runtime'

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
        <Suspense fallback={<div>Loading Popup...</div>}>
          <RemoteNewTaskPopup
            onAddTask={handleAddTask}
            onClose={() => setShowPopup(false)}
          />
        </Suspense>
      )}
    </div>
  )
}

export default App
