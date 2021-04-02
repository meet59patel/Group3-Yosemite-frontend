import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { useLocation } from 'react-router-dom';
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
    _id: '605f16a34323c591389a4c89',
    userPic: '/static/images/avatar/1.jpg',
    username: '201801056',
    email: '201801056@daiict.ac.in',
    role: 'student',
};

function StudentDashboard() {
    const classes = useStyles();
    const path = useLocation();

    return (
        <div>
            <Header headerTitle="Admin Dashboard" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={USER}></SideMenu.SmallProfile>
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

                {path.pathname === '/student' && (
                    <Welcome name={USER.username}></Welcome>
                )}
                {path.pathname === '/student/assignments' && (
                    <Assignments user={USER} />
                )}
            </div>
        </div>
    );
}

export default StudentDashboard;
