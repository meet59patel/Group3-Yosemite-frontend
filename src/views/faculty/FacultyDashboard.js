import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import FacultyGraphs from '../../components/graphs/facultyGraphs';
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

const FacultyDashboard = ({ user }) => {
    const classes = useStyles();
    const path = useLocation();

    return (
        <div>
            <Header headerTitle="Faculty Dashboard" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={user}></SideMenu.SmallProfile>
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

                <Switch>
                    <Route path="/faculty/users">
                        <Users user={user} />
                    </Route>
                    <Route path="/faculty/assignments">
                        <AssignmentList user={user} />
                    </Route>
                    <Route path="/faculty">
                        <Welcome name={user.username}></Welcome>
                        <FacultyGraphs user={user} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default FacultyDashboard;
