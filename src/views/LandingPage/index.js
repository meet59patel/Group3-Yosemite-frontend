import React from 'react';
import logo from '../../logo.svg';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import HeroImg from '../../assets/img/hero-img.png';
import Header from '../../components/Header';

export default function LandingPage() {
  return (
    <div className="App">
      <Header />
      <Grid container>
        <Grid item md={6}>
          <h1>Automated Solution For Evaluating Assignments</h1>
        </Grid>
        <Grid item md={6}>
          <img src={HeroImg} width="100%" />
        </Grid>
      </Grid>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Yosemite</h1>
        <h3>Automatic Answer Checker</h3>
        <Button variant="outlined" color="inherit">
          IT314 - Group 3
        </Button>
      </header>
    </div>
  );
}
