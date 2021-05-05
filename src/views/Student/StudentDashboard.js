import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Switch, Route, useLocation } from 'react-router-dom';
import AssignmentList from '../../components/assignments/AssignmentList';
import Welcome from '../../components/Welcome';
import { UserService } from '../../services/apis.service';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

function StudentDashboard({ user_id }) {
    const classes = useStyles();
    const path = useLocation();

    // fetch user
    const [user, setUser] = useState([]);
    const fetchUser = useCallback(() => {
        // console.log(user_id);
        UserService.getUser(user_id)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user_id]);
    useEffect(() => {
        fetchUser(user_id);
    }, [fetchUser, user_id]);

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
                    <Route path="/student/assignments">
                        <AssignmentList user={user} />
                    </Route>
                    <Route path="/student">
                        <Welcome name={user.user_name}></Welcome>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default StudentDashboard;
