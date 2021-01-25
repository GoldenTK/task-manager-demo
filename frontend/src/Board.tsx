import React, { FC, useState } from 'react'
import { makeStyles, Theme, List, ListItem, Paper, Card, CardContent, Typography, Button, CardActionArea } from '@material-ui/core'
import { Task, State as TaskState } from './types'
import AddTask from './AddTask'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSelected: {
    backgroundColor: 'red'
  },
  lists: {
    display: 'flex',
    height: '100%'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 2rem'
  }
}))


const Board: FC<BoardProps> = ({ tasksData, onTaskStateChange, onTaskCreate }) => {
  const classes = useStyles()

  const tasks = {
    [TaskState.OPEN]: tasksData.filter(task => task.state === TaskState.OPEN),
    [TaskState.PENDING]: tasksData.filter(task => task.state === TaskState.PENDING),
    [TaskState.CLOSED]: tasksData.filter(task => task.state === TaskState.CLOSED)
  }

  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([])

  const taskSelected = (id: string) => selectedTaskIds.includes(id)

  const handleTaskClick = (id: string) => () => {
    const alreadySelected = taskSelected(id)
    alreadySelected && setSelectedTaskIds(selectedTaskIds.filter((taskId) => taskId !== id))
    !alreadySelected && setSelectedTaskIds([...selectedTaskIds, id])
  }

  const handleTaskMove = (taskState: TaskState) => () => {
    const taskIdsToUpdate = selectedTaskIds.filter(selectedTaskId =>
      tasks[taskState].find(task => task.id === selectedTaskId)
    )
    const newSelectedTasks = selectedTaskIds
      .filter(selectedTaskId => !taskIdsToUpdate.includes(selectedTaskId))

    onTaskStateChange(taskState, taskIdsToUpdate)
    setSelectedTaskIds(newSelectedTasks)
  }

  const taskComponent = ({ id, title, description, state }: Task) => {
    const selectedCardStyle =
      state !== TaskState.CLOSED
        && taskSelected(id)
        ? classes.cardSelected
        : ''

    return (
      <ListItem key={id} role="listitem">
        <Card>
          <CardActionArea className={selectedCardStyle} onClick={handleTaskClick(id)}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography color="textSecondary">
                -
              </Typography>
              <Typography variant="body2" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </ListItem>
    )
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.lists}>
        <div className={classes.list}>
          <Typography variant="h6">
            OPEN
          </Typography>
          <List title="open" dense component="div" role="list">
            {tasks[TaskState.OPEN].map(taskComponent)}
          </List>
        </div>
        <Button
          variant="outlined"
          size="small"
          onClick={handleTaskMove(TaskState.OPEN)}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <div className={classes.list}>
          <Typography variant="h6">
            PENDING
          </Typography>
          <List title="pending" dense component="div" role="list">
            {tasks[TaskState.PENDING].map(taskComponent)}
          </List>
        </div>
        <Button
          variant="outlined"
          size="small"
          onClick={handleTaskMove(TaskState.PENDING)}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <div className={classes.list}>
          <Typography variant="h6">
            CLOSED
          </Typography>
          <List title="closed" dense component="div" role="list">
            {tasks[TaskState.CLOSED].map(taskComponent)}
          </List>
        </div>
      </div>
      <AddTask onTaskCreate={onTaskCreate} />
    </Paper>
  )
}

interface BoardProps {
  tasksData: Task[]
  onTaskCreate: (title: string, description: string) => void
  onTaskStateChange: (taskState: TaskState, taskIds: string[]) => void
}

export default Board
