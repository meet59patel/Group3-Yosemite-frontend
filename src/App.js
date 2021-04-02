import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import AdminRoutes from './views/Admin/AdminRoutes';
import FacultyRoutes from './views/Faculty/FacultyRoutes';
import StudentRoutes from './views/Student/StudentRoutes';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import SetAssignment from './views/SetAssignment';
import { useUserState } from './components/context/UserContext';
import AdminDashboard from './views/Admin/AdminDashboard';

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

function App() {
    var { isAuthenticated } = useUserState();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/admin" component={AdminDashboard} />
                    <Route path="/faculty" component={FacultyRoutes} />
                    <Route path="/student" component={StudentRoutes} />
                    <Route path="/setassignment" component={SetAssignment} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
