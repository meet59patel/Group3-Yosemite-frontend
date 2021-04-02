import React from 'react';
import { Route } from 'react-router';
import StudentDashboard from './StudentDashboard';

function StudentRoutes(props) {
    return (
        <>
            <Route path="/" component={StudentDashboard} />
        </>
    );
}

export default StudentRoutes;
