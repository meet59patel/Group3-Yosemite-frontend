import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import Users from '../../components/users/Users';
import AssignmentList from '../../components/assignments/AssignmentList';
import Welcome from '../../components/Welcome';
import { UserService } from '../../services/apis.service';
import FacultyGraphs from '../../components/graphs/facultyGraphs';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

const FacultyDashboard = ({ user_id }) => {
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
            <Header
                headerTitle={`Faculty Dashboard ${
                    path.pathname.length > 9
                        ? '> ' + path.pathname.slice(9) + ' list'
                        : ''
                } `}

                // {`Faculty Dashboard ${
                //     path.pathname !== '/faculty'
                //         ? ('> ' + path.pathname.slice(9) + 'list')

                //  : ''`}
            />
            {user && (
                <div className={classes.appMain}>
                    <SideMenu>
                        <SideMenu.SmallProfile
                            user={user}
                        ></SideMenu.SmallProfile>
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
                                text="Dashboard"
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
                            <Welcome name={user.user_name}></Welcome>
                        </Route>
                    </Switch>
                </div>
            )}
        </div>
    );
};

export default FacultyDashboard;
