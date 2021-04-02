import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import Users from '../../components/Users/Users';
import Assignments from '../../components/Assignments/Assignments';
import Welcome from '../../components/Welcome';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

const USER = {
    _id: '605f16fd4323c591389a4c91',
    userPic: '/static/images/avatar/1.jpg',
    username: 'Sam',
    email: 'sam@daiict.ac.in',
    role: 'faculty',
};

function AdminDashboard() {
    const classes = useStyles();
    const path = useLocation();

    return (
        <div>
            <Header headerTitle="Faculty Dashboard" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={USER}></SideMenu.SmallProfile>
                    <SideMenu.NavButton
                        text="Users"
                        to="/faculty/users"
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Assignments"
                        to="/faculty/assignments"
                    ></SideMenu.NavButton>
                    {path.pathname !== '/faculty' && (
                        <SideMenu.BackButton
                            text="Back"
                            to="/faculty"
                        ></SideMenu.BackButton>
                    )}
                </SideMenu>

                {path.pathname === '/faculty' && (
                    <Welcome name={USER.username}></Welcome>
                )}
                {path.pathname === '/faculty/users' && <Users user={USER} />}
                {path.pathname === '/faculty/assignments' && (
                    <Assignments user={USER} />
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
