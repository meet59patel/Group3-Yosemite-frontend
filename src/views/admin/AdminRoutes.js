import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

function AdminRoutes(props) {
    return (
        <>
            <Route path="/" component={AdminDashboard} />
            <Route path="/users" component={AdminDashboard} />
            <Route path="/assignments" component={AdminDashboard} />
        </>
    );
}

export default AdminRoutes;
