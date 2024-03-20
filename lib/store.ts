import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type State = {
  tasks: Task[]
  draggedTask: string | null
}

export type Actions = {
  addTask: (title: string, description?: string) => void
  dragTask: (id: string | null) => void
  removeTask: (id: string) => void
  updateTask: (id: string, status: Status) => void
}

export const useTaskStore = create<State & Actions>()(
  persist(
    set => ({
      //   Initial State
      tasks: [],
      draggedTask: null,

      //   Add Task Actions
      addTask: (title: string, description?: string) =>
        set(state => ({
          tasks: [
            ...state.tasks,
            { id: new Date().toISOString(), title, description, status: 'TODO' }
          ]
        })),

      // Drag Task Actions
      dragTask: (id: string | null) => set({ draggedTask: id }),

      // Remove Task Actions
      removeTask: (id: string) =>
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        })),

      // Update Task Actions
      updateTask: (id: string, status: Status) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, status } : task
          )
        }))
    }),
    {
      name: 'task-store',
      skipHydration: true
    }
  )
)
