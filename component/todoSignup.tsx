import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ClearIcon from '@mui/icons-material/Clear';
import { userSignUp } from '../services/request';
import { errors, success } from '../services/swal_alert';

const Login = (props: any) => {

    const state = {
        name: "",
        email: "",
        password: ""

    }

    const { handleClose, open } = props
    const [signUpData, setSignUpData] = React.useState(state);

    const paperStyle = { padding: 20, height: '70vh', width: 380, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '16px 0' }
    const gridstyle = { cursor: 'pointer' }
    const textstyle = { margin: '2rem 0' }
    const textstyles = { margin: '0.7rem 0' }
    const cancel = { display: 'flex', justifyContent: 'flex-end', marginTop: 0, rotationPoint: '50% 50%', rotation: 'y 90deg', cursor: 'pointer' }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target

        setSignUpData((prevState) => {
            return { ...prevState, [name]: value }
        })

    }


    async function signUp() {
        const response = await userSignUp('api/signup', signUpData)

        const status = response?.status

        if (status !== 201) {
            return errors('bad credentials! try again')
        }
        handleClose()

        success('account created successfully')
        console.log(response)
    }



    return (
        <>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogContent>
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <p style={cancel} onClick={handleClose}><ClearIcon /></p>
                            <Grid  >
                                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                                <h2>Sign Up</h2>
                            </Grid>
                            <TextField onChange={handleChange} label='Full Name' style={textstyles} placeholder='Enter name' name="name" fullWidth required />
                            <TextField onChange={handleChange} label='Email' style={textstyle} placeholder='Enter Email' name="email" type='email' fullWidth required />
                            <TextField onChange={handleChange} label='Password' placeholder='Enter password' name="password" type='password' fullWidth required />

                            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={signUp} >Sign in</Button>

                            <Typography style={gridstyle} onClick={handleClose}> Already have an account ?

                                Login

                            </Typography>
                        </Paper>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Login