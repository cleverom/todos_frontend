import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SignUp from './todoSignup'


const Login = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };



    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid >
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField label='Email' placeholder='Enter email' fullWidth required />
                    <TextField label='Password' placeholder='Enter password' type='password' fullWidth required />

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>

                    <Typography onClick={handleClickOpen}> Do you have an account ?

                        Sign Up

                    </Typography>
                </Paper>
            </Grid>
            {open ? (
                <SignUp handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />
            ) : null}
        </>
    )
}

export default Login