import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
    },
    smallProfile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '300px',
        width: '80%',
        borderRadius: '10px',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow:
            '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        textAlign: 'center',
        margin: '25px 0',
    },
});

export default function SideMenu({ children, ...restProps }) {
    const classes = useStyles();
    return <div className={classes.sideMenu}>{children}</div>;
}

SideMenu.NavButton = function NavButton({ children, text, to }) {
    return (
        <NavLink
            to={to}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px 30px',
                margin: '15px auto',
                width: '70%',
                textDecoration: 'none',
                color: 'black',
                borderRadius: '10px',
                backgroundColor: '#e0e0e0',
                boxShadow:
                    '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
            }}
            activeStyle={{ color: '#fff', backgroundColor: '#1976D2' }}
        >
            {text}
        </NavLink>
    );
};

SideMenu.BackButton = function BackButton({ children, text, to }) {
    return (
        <NavLink
            to={to}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '70px',
                textDecoration: 'none',
                color: 'black',
            }}
        >
            <KeyboardBackspaceIcon />
            &nbsp;&nbsp;{text}
        </NavLink>
    );
};

SideMenu.SmallProfile = function SmallProfile({ children, user }) {
    const classes = useStyles();
    return (
        <div className={classes.smallProfile}>
            <Avatar
                className={classes.userPic}
                alt={user.username}
                src={user.userPic}
                style={{
                    height: '140px',
                    width: '140px',
                    margin: '0px auto',
                    fontSize: '50px',
                }}
            />
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {user.username}
            </div>
            <div>{user.email}</div>
            {children}
        </div>
    );
};

SideMenu.AssignmentProfile = function AssignmentProfile({
    children,
    assignment,
}) {
    const classes = useStyles();
    // let status = getStatusCollection();
    return (
        <div className={classes.smallProfile} style={{ height: '250px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Assignment #{assignment.assId}
            </div>
            <div style={{}}>{'Name: ' + assignment.assName}</div>
            <div style={{}}>
                {'Date: ' + assignment.assDate + ' ' + assignment.startTime}
            </div>
            <div style={{}}> {'Duration: ' + assignment.duration + ' min'}</div>
            {/* <div style={{}}>
                {"Status: " + status[assignment.statusId - 1].title}
            </div> */}
            {children}
        </div>
    );
};
