import React, { FC, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, makeStyles, Theme, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  inputFields: {
    display: 'flex',
    flexDirection: 'column'
  },
}))

const AddTask: FC<AddTaskProps> = ({ onTaskCreate }) => {
  const classes = useStyles()
  const [dialogState, setDialogState] = useState(false)
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()

  const handleShowDialogButtonClick = () => setDialogState(true)
  const handleDialogClose = () => setDialogState(false)

  const handleCreateTaskButtonClick = () => {
    if (title && description) {
      onTaskCreate(title, description)
      setDialogState(false)
    } else {
      setTitle('')
      setDescription('')
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.currentTarget.value)


  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.currentTarget.value)

  return (
    <>
      <Fab onClick={handleShowDialogButtonClick} size="small" color="secondary" aria-label="add">
        <Add />
      </Fab>
      <Dialog
        open={dialogState}
        keepMounted
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create task</DialogTitle>
        <DialogContent className={classes.inputFields}>
          <TextField 
            variant="outlined" 
            label="title" 
            name="title" 
            value={title} 
            onChange={handleTitleChange} 
            error={title === ''}
          />
          <TextField 
            variant="outlined" 
            label="Description" 
            name="description" 
            value={description} 
            onChange={handleDescriptionChange} 
            error={description === ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateTaskButtonClick} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

interface AddTaskProps {
  onTaskCreate: (title: string, description: string) => void
}

export default AddTask
