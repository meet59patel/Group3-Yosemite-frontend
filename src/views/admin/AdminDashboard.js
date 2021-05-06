import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Switch, Route, useLocation } from 'react-router-dom';
import Users from '../../components/users/Users';
import AdminGraphs from '../../components/graphs/adminGraphs';
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

function AdminDashboard({ user_id }) {
    const classes = useStyles();
    const path = useLocation();

    // fetch user
    const [user, setUser] = useState([]);
    const fetchUser = useCallback(() => {
        UserService.getUser(user_id)
            .then((res) => {
                // console.log(res.data);
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
                headerTitle={`Admin Dashboard ${
                    path.pathname.length > 7
                        ? '> ' + path.pathname.slice(7) + ' list'
                        : ''
                } `}
            />
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
                            text="Dashboard"
                            to="/admin"
                        ></SideMenu.BackButton>
                    )}
                </SideMenu>
                <Switch>
                    <Route path="/admin/users">
                        <Users user={user} role={user.role} />
                    </Route>
                    <Route path="/admin/assignments">
                        <AssignmentList user={user} />
                    </Route>
                    <Route path="/admin">
                        <Welcome name={user.user_name}></Welcome>
                        <AdminGraphs />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AdminDashboard;
