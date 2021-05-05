import React from 'react';
import { Switch, Route } from 'react-router';
import StudentDashboard from './StudentDashboard';
import AssignmentStudent from '../Assignment/AssignmentStudent';

function StudentRoutes({ user_id }) {
    return (
        <>
            <Switch>
                <Route path="/student/assignment/:id">
                    <AssignmentStudent user_id={user_id} />
                </Route>
                <Route path="/student">
                    <StudentDashboard user_id={user_id} />
                </Route>
            </Switch>
        </>
    );
}

export default StudentRoutes;
