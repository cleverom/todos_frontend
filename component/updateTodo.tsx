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
import { success, errors } from '../services/swal_alert'


interface ITodoContextInterface {
    open: boolean,
    handleClickOpen: (id: string) => void;
    handleClose:  (reason?: string | undefined) => void,
    todoId: string,
}

interface dataType {
    todo: string,
    dueDate: string,
}

interface ITodoContext {
    data: dataType[],
    getTodoData: (data?: dataType) => void
}


export default function DialogSelect(props: ITodoContextInterface) {
    const { open, handleClose, todoId } = props;
    const context: ITodoContext = React.useContext(TodoContext)
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
        const { status, message } = response?.data

        if (status === false) {
            errors(message)
        }

        success(message)
        handleClose()
        getTodoData()
        

    }


    return (
        <div>

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Update todo task</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <TextField
                                fullWidth
                                placeholder="Create new task"
                                label="Enter task"
                                name="todo"
                                onChange={handleChange}
                                required
                                value={newTodo.todo}
                                variant="outlined"
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

                                required
                                value={newTodo.dueDate}
                                variant="outlined"
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
