import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

function AdminRoutes(props) {
    return (
        <>
            <Route path="/" component={AdminDashboard} />
        </>
    );
}

export default AdminRoutes;
