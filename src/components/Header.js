import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    IconButton,
    Badge,
    makeStyles,
    Menu,
    MenuItem,
    Button,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { useUserDispatch, signOut } from './context/UserContext';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
    },
    logo: {
        color: 'black',
        fontSize: '25px',
        fontWeight: 'bolder',
    },
    navlist: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navitem: {
        color: 'black',
        fontSize: '15px',
        // backgroundColor: "pink",
        padding: '10px',
        margin: '10px',
    },
}));

export default function Header({ children, headerTitle = '' }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    let userDispatch = useUserDispatch();
    let history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <Link to="/">
                            <div className={classes.logo}>Yosemite</div>
                        </Link>
                    </Grid>
                    <Grid item sm>
                        <div className={classes.navlist}>
                            {headerTitle !== '' ? (
                                <div className={classes.navitem}>
                                    {headerTitle}
                                </div>
                            ) : null}
                            {/* <div className={classes.navitem}>Faculty</div> */}
                            {/* <div className={classes.navitem}>Admin</div> */}
                        </div>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            {/* <IconButton
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            > */}
                            <PowerSettingsNewIcon fontSize="small" />
                            {/* </IconButton> */}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => console.log('Logging out...')}
                            >
                                <GoogleLogout
                                    clientId={GOOGLE_CLIENT_ID}
                                    buttonText="Log Out"
                                    onLogoutSuccess={() => {
                                        signOut(userDispatch, history);
                                    }}
                                    onFailure={console.log}
                                />
                                {/* Log out */}
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
