import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { parseCookies } from '../services/request'
import jwt from 'jwt-decode'
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import cookie from 'react-cookies'
import { useRouter } from "next/router";


const useStyles = makeStyles({
    back: {
        backgroundColor: "#0E86D4"

    },
    toolbar: {
        textAlign: "center",
        height: 80

    },
    heading: {
        margin: "auto"
    },
    text: {
        padding: ".5rem 1rem",
        cursor: 'pointer'
    }
});

interface Users {

    name: string,
    id: string,
    email: string,
    token: string | never

}


const Header = () => {
    const classes = useStyles();

    const cookies = parseCookies();
    
    const token: string  | undefined | any   = cookies?.user;

    const user: Users = jwt(token)

    const first = user.name.split(" ")[0]
    const second = user.name.split(" ")[1]

    let f = first[0].toUpperCase()
    let s = second[0].toUpperCase()


    const router = useRouter()

    function logout() {
        cookie.remove("user", {
            path: '/'
        })

        router.push('/todoLogin')
    }
    return (
        <>
            <AppBar className={classes.back} position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.heading} variant="h5" align="center">EukaPay Task Management</Typography>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                                <Avatar sx={{ bgcolor: deepPurple[400] }} {...bindTrigger(popupState)}>{`${f}${s}`}</Avatar>
                                <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Typography className={classes.text} onClick={logout} >logout</Typography>
                                </Popover>
                            </div>
                        )}
                    </PopupState>
                </Toolbar>
            </AppBar >
        </>
    )
}


export default Header;