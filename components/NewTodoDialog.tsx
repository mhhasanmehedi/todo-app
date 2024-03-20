'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useTaskStore } from '@/lib/store'

const NewTodoDialog = () => {
  const addTask = useTaskStore(state => state.addTask)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const { title, description } = Object.fromEntries(formData)

    if (
      typeof title !== 'string' ||
      title === '' ||
      typeof description !== 'string'
    )
      return

    addTask(title, description)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='rounded bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-900'>
          + Add New Todo
        </button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            What do you want to get done today?
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className='grid gap-4 py-4'
          id='todo-form'
        >
          <div className='grid grid-cols-4 items-center gap-4'>
            <Input
              id='title'
              name='title'
              placeholder='Todo Title...'
              className='col-span-4'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Textarea
              id='description'
              name='description'
              placeholder='Description...'
              className='col-span-4'
            />
          </div>
        </form>

        <DialogFooter>
          <DialogTrigger asChild>
            <button
              type='submit'
              form='todo-form'
              className='rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700'
            >
              Add Todo
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewTodoDialog
