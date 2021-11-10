import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

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
    }
});
const Header = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.back} position="static">
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.heading} variant="h5" align="center">EukaPay</Typography>
                <Avatar sx={{ bgcolor: deepPurple[400] }}>CE</Avatar>
            </Toolbar>
        </AppBar>
    )
}


export default Header;
