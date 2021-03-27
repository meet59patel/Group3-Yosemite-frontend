import React from 'react';
// import Button from '@material-ui/core/Button';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';

import { useUserDispatch, signOut } from '../../components/context/UserContext';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

export default function Dashboard(props) {
  var userDispatch = useUserDispatch();

  return (
    <div className="App">
      <AppBar position="static" color="secondary">
        <Toolbar>
          {/* <Button>Log Out</Button> */}
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={() => {
              signOut(userDispatch, props.history);
            }}
            onFailure={console.log}
          />
        </Toolbar>
      </AppBar>

      <header className="App-header">
        <h1>Dashboard</h1>
        <h2>Yosemite</h2>
        <h3>Automatic Answer Checker</h3>
        <Button variant="outlined" color="inherit">
          IT314 - Group 3
        </Button>
      </header>
    </div>
  );
}
