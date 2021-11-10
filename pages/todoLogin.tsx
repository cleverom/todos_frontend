import React, {useReducer} from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SignUp from '../component/todoSignup'
import { reducer } from '../context/todoReducer';
import { userLogin } from '../services/request';
import { errors, success } from '../services/swal_alert';
import { useCookies } from "react-cookie"
import { useRouter } from "next/router";


const Login = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 380, margin: "88px auto" }
    // const avatarStyle = { marginTop: '10rem' }
    const btnstyle = { margin: '3rem 0' }
    const textstyle = { margin: '4rem 0' }
    const signText = { color: 'blue', cursor: 'pointer' }
    const h = { color: 'blue', textAlign: 'center' }

    const states = {
        email: "",
        password: ""

    }
    
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [loginData, setLoginData] = React.useState(states);
    const [cookie, setCookie] = useCookies(["user"])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target

        setLoginData((prevState) => {
            return { ...prevState, [name]: value }
        })

    }

    async function login() {
        const response = await userLogin('api/login', loginData)
        const {status, token} = response?.data

        if(status === false){
            return errors('login failed')
        }
        setCookie("user", token, {
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          })

        //   if (status === true) {
          
            router.push('/privateSection');
        
        //   }

        success('welcome to your todo page')

        console.log(response)
    }

    console.log(loginData)




    return (
        <>
            <Grid >
                <Paper elevation={10} style={paperStyle}>
                    {/* <Grid style={avatarStyle}> */}
                        <Typography variant="h5" align='center' >EukaPay Task Management</Typography>
                        <h2 style={h}>Sign In</h2>
                    {/* </Grid> */}
                    <TextField label='Email' placeholder='Enter email' style={textstyle} onChange={handleChange} name="email" fullWidth required />
                    <TextField label='Password' placeholder='Enter password' onChange={handleChange} name="password" type='password' fullWidth required />

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={login}>Sign in</Button>

                    <Typography style={signText} onClick={handleClickOpen}> Do you have an account ?

                        <span style={signText}>Sign Up</span>

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

