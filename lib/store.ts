import { create } from 'zustand'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type State = {
  tasks: Task[]
}

export type Actions = {
  addTask: (title: string, description?: string) => void
  removeTask: (id: string) => void
  updateTask: (id: string, status: Status) => void
}

export const useTaskStore = create<State & Actions>()(set => ({
  //   Initial State
  tasks: [
    {
      id: 'afdsf',
      title: 'Our first task',
      description: 'Some description',
      status: 'DONE'
    }
  ],

  //   Add Task Actions
  addTask: (title: string, description?: string) =>
    set(state => ({
      tasks: [
        ...state.tasks,
        { id: new Date().toISOString(), title, description, status: 'TODO' }
      ]
    })),

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
}))
