import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AssignmentFaculty from '../Assignment/AssignmentFaculty';
import FacultyDashboard from './FacultyDashboard';

const FacultyRoutes = ({ user_id }) => {
    return (
        <>
            <Switch>
                <Route path="/faculty/assignment/:id">
                    <AssignmentFaculty user_id={user_id} />
                </Route>
                <Route path="/faculty">
                    <FacultyDashboard user_id={user_id} />
                </Route>
            </Switch>
        </>
    );
};

export default FacultyRoutes;
