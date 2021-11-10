import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TodoContext from '../context/todocontext'
import { updateSingleTodo, getTodo } from '../services/request';
import {success, errors} from '../services/swal_alert'

export default function DialogSelect(props: any) {
    const { handleClickOpen, open, handleClose, todoId } = props;
    const context: any = React.useContext(TodoContext)
    const state = {
        todo: '',
        dueDate: ''
    }
    const { getTodoData } = context
    const [todos, setTodo] = React.useState([])
    const [newTodo, setNewTodo] = React.useState(state)

    async function getSingleTodo() {
        const response = await getTodo(`api/data/${todoId}`)
        const data = response?.data
        setTodo(data)
    }
   

    React.useEffect(() => {
        getSingleTodo()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setNewTodo((prevState) => {
            return { ...prevState, [name]: value }
        })

    }

    async function updateTodo() {
        const response = await updateSingleTodo(`api/data/todo/${todoId}`, newTodo)
        const {status, message} = response?.data

        if(status === false){
            errors(message)
        }

        success(message)
        handleClose()
        getTodoData()
        console.log(response)

    }


    return (
        <div>
            
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Update todo task</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <TextField
                                // className={classes.todos}
                                fullWidth
                                placeholder="Create new task"
                                label="Enter task"
                                name="todo"
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                required
                                value={newTodo.todo}
                                variant="outlined"
                            // error={Boolean(touched.todo && errors.todo)}
                            // helperText={touched.todo && errors.todo}

                            >

                            </TextField>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <TextField

                                fullWidth
                                placeholder="YYYY-MM-DD"
                                label="Due Date"
                                name="dueDate"
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                required
                                value={newTodo.dueDate}
                                variant="outlined"
                            // error={Boolean(touched.todo && errors.todo)}
                            // helperText={touched.todo && errors.todo}

                            >

                            </TextField>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateTodo}>Update Task</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
