import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolbar}>
        <Button>Yosemite Icon</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          This is empty space
        </Typography>
        <Button href="/login">Log In</Button>
      </Toolbar>
    </AppBar>
  );
}
