import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { useLocation } from 'react-router-dom';
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
    _id: '605f17024323c591389a4c92',
    userPic: '/static/images/avatar/1.jpg',
    username: 'raj',
    email: 'raj@daiict.ac.in',
    role: 'admin',
};

function AdminDashboard(props) {
    const classes = useStyles();
    const path = useLocation();

    return (
        <div>
            <Header headerTitle="Admin Dashboard" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={USER}></SideMenu.SmallProfile>
                    <SideMenu.NavButton
                        text="Users"
                        to="/admin/users"
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Assignments"
                        to="/admin/assignments"
                    ></SideMenu.NavButton>
                    {path.pathname !== '/admin' && (
                        <SideMenu.BackButton
                            text="Back"
                            to="/admin"
                        ></SideMenu.BackButton>
                    )}
                </SideMenu>

                {path.pathname === '/admin' && (
                    <Welcome name={USER.username}></Welcome>
                )}
                {path.pathname === '/admin/users' && <Users user={USER} />}
                {path.pathname === '/admin/assignments' && (
                    <Assignments user={USER} />
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
