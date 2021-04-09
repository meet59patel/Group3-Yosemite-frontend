import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AssignmentFaculty from '../Assignment/AssignmentFaculty';
import FacultyDashboard from './FacultyDashboard';

const FacultyRoutes = ({ user }) => {
    return (
        <>
            <Switch>
                <Route path="/faculty/assignment/:id">
                    <AssignmentFaculty user={user} />
                </Route>
                <Route path="/faculty">
                    <FacultyDashboard user={user} />
                </Route>
            </Switch>
        </>
    );
};

export default FacultyRoutes;
