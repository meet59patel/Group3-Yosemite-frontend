import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AssignmentAdmin from '../Assignment/AssignmentAdmin';
import AdminDashboard from './AdminDashboard';

function AdminRoutes({ user }) {
    return (
        <>
            {/* <Route path="/" component={AdminDashboard} />
            <Route path="/users" component={AdminDashboard} />
            <Route path="/assignments" component={AdminDashboard} /> */}
            <Switch>
                <Route path="/admin/assignment/:id">
                    <AssignmentAdmin user={user} />
                </Route>
                <Route path="/admin">
                    <AdminDashboard user={user} />
                </Route>
            </Switch>
            {/* <Route path='/users' component={AdminDashboard} />
            <Route
                path='/assignments'
                component={AdminDashboard}
            /> */}
        </>
    );
}

export default AdminRoutes;
