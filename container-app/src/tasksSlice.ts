import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
  id: number
  name: string
}

interface TasksState {
  tasks: Task[]
  nextId: number
}

const initialState: TasksState = {
  tasks: [],
  nextId: 1
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({ id: state.nextId, name: action.payload })
      state.nextId += 1
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const { id, name } = action.payload
      const task = state.tasks.find(t => t.id === id)
      if (task) {
        task.name = name
      }
    }
  }
})

export const { addTask, updateTask } = tasksSlice.actions
export default tasksSlice.reducer
