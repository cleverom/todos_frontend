import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import TodoContext from '../context/todocontext'
import UpdateTodo from './updateTodo'
import { deleteTodo, changeTodoStatus } from '../services/request';
import { success, errors } from '../services/swal_alert'


const useStyles = makeStyles({
    container: {
        padding: 16
    },
    type: {
        textAlign: 'center',
    },
    items: {
        color: 'white'
    }
});

function TodoList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [todoId, setTodoId] = React.useState('');

    const [todoList, setTodo] = React.useState([])

    const context: any = useContext(TodoContext)

    const { getTodoData } = context


    React.useEffect(() => {
        getTodoData()

    }, [])

    React.useEffect(() => {

        setTodo(context.data)

    }, [context.data])

    const handleClickOpen = (id: string) => {
        setTodoId(id)
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    async function deleteSingleTodo(id: string) {
        const response = await deleteTodo(`api/data/${id}`)
        const { status, message } = response?.data
        if (status === false) {
            errors(message)
        }

        success(message)
        getTodoData()
        console.log(response)

    }

    async function changeStatus(done: boolean, id: string) {
        console.log(!done)
        const data = {
            done: !done
        }
        console.log(data)
        const response = await changeTodoStatus(`api/data/status/${id}`, data)
        const {status, message} = response?.data

        if (status === false) {
            errors(message)
        }

        success(message)

        getTodoData()
        console.log(response)

    }


    return (
        <>
            <Container className={classes.container} maxWidth="md">
                {!todoList.length
                    ?
                    <Typography className={classes.type} variant="h6" color="error">No Current Task At The Moment</Typography>
                    :
                    (<List>
                        {todoList.map((item: any) => {
                            return (
                                <ListItem className={classes.items} key={item.id} button>
                                    <ListItemIcon >
                                        <Checkbox
                                            className={classes.items}
                                            key={item.id}
                                            checked={item.done}
                                            onClick={() => changeStatus(item.done, item.id)}
                                            // onChange={(e)=>handleChange(item.id, e)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </ListItemIcon>

                                    <ListItemText primary={item.todo} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="edit" >
                                            <EditIcon className={classes.items} onClick={() => handleClickOpen(item.id)} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" >
                                            <DeleteIcon className={classes.items} onClick={() => deleteSingleTodo(item.id)} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>)
                }
            </Container>
            {open ? (
                <UpdateTodo handleClickOpen={handleClickOpen} todoId={todoId} open={open} handleClose={handleClose} />
            ) : null}
        </>
    )

}


export default TodoList;
