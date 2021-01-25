import React, { FC, useEffect, useState } from 'react'
import Board from './Board'
import { Task, State as TaskState } from './types'
import callApi, { RequestMethod } from './api'
import Toast from './Toast'

const Home: FC = () => {
  const [tasksData, setTasksData] = useState<Task[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [reloadData, setReloadData] = useState(false)

  useEffect(() => {
    callApi<Task[]>('tasks', RequestMethod.GET).then((data) => setTasksData(data))
      .catch(() => setErrorMessage('Something went wrong'))
  }, [reloadData])

  const handleTaskStateChange = async (taskState: TaskState, taskIds: string[]) => {
    const newTaskState = taskState + 1
    await Promise.all(
      taskIds.map(taskId =>
        callApi<Task[]>(`tasks/${taskId}`, RequestMethod.PATCH, { state: newTaskState })
      )).catch(() => setErrorMessage('Something went wrong'))
    setReloadData(!reloadData)
  }

  const handleTaskCreation = (title: string, description: string) => {
    callApi<Task[]>('tasks', RequestMethod.POST, { title, description })
      .then(() => setReloadData(!reloadData))
      .catch(() => setErrorMessage('Something went wrong'))
  }

  const handleToastClose = () => setErrorMessage('')

  return (
    <>
      <Board
        tasksData={tasksData}
        onTaskCreate={handleTaskCreation}
        onTaskStateChange={handleTaskStateChange}
      />
      <Toast
        open={!!errorMessage}
        onClose={handleToastClose}
        type="error"
      >
        {errorMessage}
      </Toast>
    </>
  )
}

export default Home
