import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Task, State } from './types'
import TaskModel, { connectDb } from './db'

const port = 4000
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/tasks', async (req, res) => {
  const tasks = await TaskModel.find().exec()

  const response = tasks
    .map(
      ({ _id, title, description, state }) => 
      ({ id: _id, title, description, state})
    )
  res.json(response)
})

app.post('/tasks', async (req, res) => {
  const { description, title }: Task = req.body

  if (description && title) {
    await TaskModel.create({ description, title, state: State.OPEN })
    res.json({ success: true })
  } else {
    res.status(400).send()
  }
})

app.patch('/tasks/:taskId', async (req, res) => {
  const isStateValid = (oldState: number | null, newState: number) => 
    (newState === 1 || newState === 2) 
      && oldState !== null
      && oldState < newState
  
  const {  state: newTaskState } = req.body
  const { taskId } = req.params

  if (taskId) {
    const task = await TaskModel.findOne({ _id: taskId }).exec()
    const taskState = task && task.state
    if (isStateValid(taskState, newTaskState)) {
      await TaskModel.updateOne({ _id: taskId }, { state: newTaskState })
      res.json({ success: true })
    }
  }

  res.status(400).send()
})

connectDb().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`))
})
