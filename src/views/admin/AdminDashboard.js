import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import Users from '../../components/users/Users';
import { Route, Switch } from 'react-router';
import Assignments from '../../components/assignments/Assignments';
import AdminGraphs from '../../components/graphs/adminGraphs';
const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

const USER = {
    userPic: '/static/images/avatar/1.jpg',
    userName: 'Ridham Suvagiya',
    userEmail: '201801006@daiict.ac.in',
};

function AdminDashboard(props) {
    const classes = useStyles();

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
                </SideMenu>
                <AdminGraphs />
                <Users />
                <Assignments />
            </div>
        </div>
    );
}

export default AdminDashboard;
