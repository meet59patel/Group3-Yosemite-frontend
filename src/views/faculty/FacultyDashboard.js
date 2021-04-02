import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import Assignments from '../../components/assignments/Assignments';
import FacultyGraphs from '../../components/graphs/facultyGraphs';
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

function AdminDashboard() {
    const classes = useStyles();

    return (
        <div>
            <Header headerTitle="Faculty Dashboard" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={USER}></SideMenu.SmallProfile>
                    <SideMenu.NavButton
                        text="Create Assignment"
                        to="#"
                        active={true}
                    ></SideMenu.NavButton>
                </SideMenu>
                <FacultyGraphs />
                <Assignments />
            </div>
        </div>
    );
}

export default AdminDashboard;
