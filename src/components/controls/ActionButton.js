import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5),
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        },
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        },
    },
    success: {
        backgroundColor: '#dcedc8',
        '& .MuiButton-label': {
            color: theme.palette.success.dark,
        },
    },
}));

export default function ActionButton(props) {
    const { color, children, onClick, ...other } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
            {...other}
        >
            {children}
        </Button>
    );
}
