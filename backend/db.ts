import mongoose from 'mongoose'
import { Task, State } from './types'

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    state: Number
})

interface TaskModel extends mongoose.Document {
  title: string
  description: string
  state: State
}

const Task = mongoose.model<TaskModel>('Task', taskSchema)

export const connectDb = () => mongoose.connect(process.env.DATABASE_URL!)

export default Task
