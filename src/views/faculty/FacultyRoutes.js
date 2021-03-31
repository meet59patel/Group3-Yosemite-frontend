import React from 'react';
import { Route } from 'react-router';
import FacultyDashboard from './FacultyDashboard';


function FacultyRoutes(props) {
    return (
        <>
            <Route path={props.match.path} component={FacultyDashboard} />
        </>
    );
}

export default FacultyRoutes;
