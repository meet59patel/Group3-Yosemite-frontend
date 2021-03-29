import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import Dashboard from './views/Dashboard';
import SetAssignment from './views/SetAssignment';

import { useUserState } from './components/context/UserContext';

function App() {
  var { isAuthenticated } = useUserState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/setassignment" component={SetAssignment} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
