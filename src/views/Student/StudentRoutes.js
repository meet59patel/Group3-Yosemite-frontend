import React from 'react';
import { Switch, Route } from 'react-router';
import StudentDashboard from './StudentDashboard';
import AssignmentStudent from '../Assignment/AssignmentStudent';

function StudentRoutes({ user }) {
    return (
        <>
            <Switch>
                <Route path="/student/assignment/:id">
                    <AssignmentStudent user={user} />
                </Route>
                <Route path="/student">
                    <StudentDashboard user={user} />
                </Route>
            </Switch>
        </>
    );
}

export default StudentRoutes;
