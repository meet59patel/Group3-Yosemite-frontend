import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import Dashboard from './views/Dashboard';

import { useUserState } from './components/context/UserContext';

function App() {
    var { isAuthenticated } = useUserState();

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route
                    path="/github"
                    component={() => {
                        window.location.href =
                            'https://github.com/meet59patel/Group3-Yosemite-frontend';
                        return null;
                    }}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
