import React from 'react';
import { Route } from 'react-router';
import FacultyDashboard from './FacultyDashboard';

function FacultyRoutes(props) {
    return (
        <>
            <Route path="/" component={FacultyDashboard} />
        </>
    );
}

export default FacultyRoutes;
