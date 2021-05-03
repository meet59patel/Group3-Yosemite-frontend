import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import AdminRoutes from './views/admin/AdminRoutes';
import FacultyRoutes from './views/faculty/FacultyRoutes';
import StudentRoutes from './views/Student/StudentRoutes';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import SetAssignment from './views/SetAssignment';
import ViewAssignment from './views/ViewAssignment';
import { useUserState } from './components/context/UserContext';
import AssignmentFaculty from './views/Assignment/AssignmentFaculty';
import AdminDashboard from './views/admin/AdminDashboard';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333996',
            light: '#3c44b126',
        },
        secondary: {
            main: '#f83245',
            light: '#f8324526',
        },
        background: {
            default: '#f4f5fd',
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)',
            },
        },
    },
    props: {
        MuiIconButton: {
            disableRipple: true,
        },
    },
});

const adminuser_id = '6090160683df8005f242fb61';
const facultyuser_id = '6090161683df8005f242fb62';
const studentuser_id = '609015f383df8005f242fb60';

function App() {
    var { isAuthenticated, role } = useUserState();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route path="/login">
                        {isAuthenticated ? (
                            <Redirect to={`/${role}`} />
                        ) : (
                            <LoginPage />
                        )}
                    </Route>
                    <PrivateRoute
                        path="/admin"
                        allowedRoles={['admin', 'faculty', 'student']}
                    >
                        <AdminRoutes user_id={adminuser_id} />
                    </PrivateRoute>
                    <PrivateRoute
                        path="/faculty"
                        allowedRoles={['admin', 'faculty', 'student']}
                    >
                        <FacultyRoutes user_id={facultyuser_id} />
                    </PrivateRoute>
                    <PrivateRoute
                        path="/student"
                        allowedRoles={['admin', 'faculty', 'student']}
                    >
                        <StudentRoutes user_id={studentuser_id} />
                    </PrivateRoute>
                    <Route path="/setassignment">
                        <SetAssignment />
                    </Route>
                    <PrivateRoute
                        path="/assignment"
                        allowedRoles={['admin', 'faculty', 'student']}
                    >
                        <ViewAssignment />
                    </PrivateRoute>
                </Switch>
            </Router>
        </ThemeProvider>
    );

    function PrivateRoute({ children, allowedRoles, ...rest }) {
        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated && allowedRoles.includes(role) ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}

export default App;
