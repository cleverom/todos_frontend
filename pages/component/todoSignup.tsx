import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Login=(props: any)=>{

    const {handleClose, open} = props

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const gridstyle={align:'center'}
    return(
        <>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Update todo task</DialogTitle>
                <DialogContent>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid  >
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter email' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
        </DialogContent>
        </Dialog>
        </>
    )
}

export default Login