import React from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    IconButton,
    Badge,
    makeStyles,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link, Redirect } from 'react-router-dom';

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
                        <IconButton>
                            <PowerSettingsNewIcon
                                fontSize="small"
                                onClick={<Redirect to="/" />}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
