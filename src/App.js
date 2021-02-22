import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
