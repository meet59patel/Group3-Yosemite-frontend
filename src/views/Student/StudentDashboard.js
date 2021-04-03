import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Switch, Route, useLocation } from 'react-router-dom';
import AssignmentList from '../../components/assignments/AssignmentList';
import Welcome from '../../components/Welcome';
// import SetAssignment from '../SetAssignment';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

// const USER = {
//     _id: '605f16a34323c591389a4c89',
//     userPic: '/static/images/avatar/1.jpg',
//     username: '201801056',
//     email: '201801056@daiict.ac.in',
//     role: 'student',
// };

function StudentDashboard({ user }) {
    const classes = useStyles();
    const path = useLocation();

    return (
        <div>
            <Header headerTitle="Student Dashboard" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={user}></SideMenu.SmallProfile>
                    <SideMenu.NavButton
                        text="Assignments"
                        to="/student/assignments"
                    ></SideMenu.NavButton>
                    {path.pathname !== '/student' && (
                        <SideMenu.BackButton
                            text="Back"
                            to="/student"
                        ></SideMenu.BackButton>
                    )}
                </SideMenu>
                <Switch>
                    {/* <Route path="/admin/users">
                        <Users user={user} />
                    </Route> */}
                    <Route path="/student/assignments">
                        <AssignmentList user={user} />
                    </Route>
                    <Route path="/student">
                        <Welcome name={user.username}></Welcome>
                    </Route>
                </Switch>

                {/* {path.pathname === '/student/assignments' && (
                    <SetAssignment user={user} />
                )} */}
            </div>
        </div>
    );
}

export default StudentDashboard;
