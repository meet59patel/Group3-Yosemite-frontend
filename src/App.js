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

const AdminUser = {
    _id: localStorage.getItem('user_id') || '605f17024323c591389a4c92',
    userPic: '/static/images/avatar/1.jpg',
    username: localStorage.getItem('user_username') || 'raj',
    email: localStorage.getItem('user_email') || 'raj@daiict.ac.in',
    role: localStorage.getItem('user_role') || 'admin',
};

const FacultyUser = {
    _id: localStorage.getItem('user_id') || '605f16fd4323c591389a4c91',
    userPic: '/static/images/avatar/1.jpg',
    username: localStorage.getItem('user_username') || 'Sam',
    email: localStorage.getItem('user_email') || 'sam@daiict.ac.in',
    role: localStorage.getItem('user_role') || 'faculty',
};

const StudentUser = {
    _id: localStorage.getItem('user_id') || '605f16a34323c591389a4c89',
    userPic: '/static/images/avatar/1.jpg',
    username: localStorage.getItem('user_username') || '201801056',
    email: localStorage.getItem('user_email') || '201801056@daiict.ac.in',
    role: localStorage.getItem('user_role') || 'student',
};

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
                        <AdminRoutes user={AdminUser} />
                    </PrivateRoute>
                    <PrivateRoute
                        path="/faculty"
                        allowedRoles={['admin', 'faculty', 'student']}
                    >
                        <FacultyRoutes user={FacultyUser} />
                    </PrivateRoute>
                    <PrivateRoute
                        path="/student"
                        allowedRoles={['admin', 'faculty', 'student']}
                    >
                        <StudentRoutes user={StudentUser} />
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
