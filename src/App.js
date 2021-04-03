import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import AdminRoutes from './views/admin/AdminRoutes';
import FacultyRoutes from './views/faculty/FacultyRoutes';
import StudentRoutes from './views/Student/StudentRoutes';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import SetAssignment from './views/SetAssignment';
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
    _id: '605f17024323c591389a4c92',
    userPic: '/static/images/avatar/1.jpg',
    username: 'raj',
    email: 'raj@daiict.ac.in',
    role: 'admin',
};

const FacultyUser = {
    _id: '605f16fd4323c591389a4c91',
    userPic: '/static/images/avatar/1.jpg',
    username: 'Sam',
    email: 'sam@daiict.ac.in',
    role: 'faculty',
};

const StudentUser = {
    _id: '605f16a34323c591389a4c89',
    userPic: '/static/images/avatar/1.jpg',
    username: '201801056',
    email: '201801056@daiict.ac.in',
    role: 'student',
};

function App() {
    var { isAuthenticated } = useUserState();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/admin">
                        <AdminRoutes user={AdminUser} />
                    </Route>
                    <Route path="/faculty">
                        <FacultyRoutes user={FacultyUser} />
                    </Route>
                    <Route path="/student">
                        <StudentRoutes user={StudentUser} />
                    </Route>
                    <Route path="/setassignment">
                        <SetAssignment />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
