import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, CardContent, CardHeader, Divider, Box } from '@mui/material';
import { createTodo } from '../services/request'
import TodoContext from '../context/todocontext'
import { success, errors } from '../services/swal_alert'


const useStyles = makeStyles({
    root: {
        marginBottom: 16,
        padding: 16,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.12), 0px 6px 10px 0px rgba(0,0,0,0.15), 0px 1px 18px 0px rgba(0,0,0,0.6)"
    },
    button: {
        marginTop: 16
    },
    input: {
        marginTop: '15rem',
    },

    cardContent: {
        padding: 40

    },
    todos: {
        marginTop: '2rem',
        width: '50%',
        marginLeft: "22rem"

    },
    dueDate: {
        marginTop: '3rem',
        marginLeft: "22rem",
        width: '50%',

        justifyContent: 'center'

    },
    createButton: {

    }

});

interface dataType {
    todo: string,
    dueDate: string,
}



function form() {
    const classes = useStyles()
    const context: any = useContext(TodoContext)
    const { getTodoData } = context


    return (
        <Formik

            initialValues={{
                todo: '',
                dueDate: '',
            }}
            validationSchema={Yup.object().shape({
                todo: Yup.string().min(3, 'todo is too short').max(200, 'todo is too long'),
                dueDate: Yup.date(),
            })}
            onSubmit={async (data: dataType, { resetForm }) => {
                console.log(data)
                if (data.todo === '' || data.dueDate === '') {
                    return errors('please enter a valid todo')
                }
                const response: any = await createTodo('api/data/todo', data)
                const { status, message } = response?.data

                if (status === false) {
                    return errors(message)
                }

                success(message)
                resetForm({ data: '' })
                getTodoData()



            }}
        >{
                ({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form autoComplete="off" onSubmit={handleSubmit} noValidate className={classes.root}>
                        <Card>
                            <CardHeader
                                subheader="Create a new task"
                                title="Create Task"
                                data-cy="h1"
                            />
                            <Divider />
                            <CardContent className={classes.cardContent}>
                                <Grid container spacing={3}>
                                    <Grid container spacing={3}>
                                        <TextField
                                            className={classes.todos}
                                            data-cy="todo"
                                            fullWidth
                                            placeholder="Create new task"
                                            label="Enter task"
                                            name="todo"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            value={values.todo}
                                            variant="outlined"
                                            error={Boolean(touched.todo && errors.todo)}
                                            helperText={touched.todo && errors.todo}

                                        >

                                        </TextField>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <TextField

                                            className={classes.dueDate}
                                            data-cy="dueDate"
                                            fullWidth
                                            label="Due date"
                                            placeholder="YYYY-MM-DD"
                                            name="dueDate"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            value={values.dueDate}
                                            variant="outlined"
                                            error={Boolean(touched.dueDate && errors.dueDate)}
                                            helperText={touched.dueDate && errors.dueDate}

                                        >

                                        </TextField>
                                    </Grid>

                                </Grid>

                            </CardContent>
                            <Box display='flex' justifyContent='center' p={2}>
                                <Button color='primary' data-cy="btn" className={classes.createButton} variant="contained" type='submit' disabled={isSubmitting}>
                                    Create Todo
                                </Button>
                            </Box>

                        </Card>

                    </form>
                )
            }

        </Formik>
    )
}


export default form;


