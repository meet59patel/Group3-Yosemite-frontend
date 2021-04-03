import React from 'react';

import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        textAlign: 'center',
        fontSize: '25px',
    },
}));

function Welcome({ children, name = '' }) {
    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}>
            <h1>
                Welcome to Yosemite{' '}
                <span style={{ color: '#1976D2' }}>{name}</span>
            </h1>
            <div>{children}</div>
        </Paper>
    );
}

export default Welcome;
