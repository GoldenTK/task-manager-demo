export enum State {
  OPEN,
  PENDING,
  CLOSED
}

export interface Task {
  id: string
  title: string
  description: string
  state: State
}
