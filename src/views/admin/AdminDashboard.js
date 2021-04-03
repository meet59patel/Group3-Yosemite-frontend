import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Switch, Route, useLocation } from 'react-router-dom';
import Users from '../../components/users/Users';
import AssignmentList from '../../components/assignments/AssignmentList';
import Welcome from '../../components/Welcome';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

function AdminDashboard({ user }) {
    const classes = useStyles();
    const path = useLocation();

    return (
        <div>
            <Header headerTitle="Admin Dashboard" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={user}></SideMenu.SmallProfile>
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

                <Switch>
                    <Route path="/admin/users">
                        <Users user={user} />
                    </Route>
                    <Route path="/admin/assignments">
                        <AssignmentList user={user} />
                    </Route>
                    <Route path="/admin">
                        <Welcome name={user.username}></Welcome>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AdminDashboard;
