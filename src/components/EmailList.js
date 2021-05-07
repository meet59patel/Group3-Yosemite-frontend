// import classes from '*.module.css';
import { Chip, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { isValidElement, useState } from 'react';
import Button from './controls/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    button: {
        height: `30px`,
        padding: `20px`,
    },
}));

function EmailList(props) {
    const classes = useStyles();

    const [emailData, setEmailData] = useState([]); //items
    const [value, setValue] = useState(''); //value - of the email input
    const [error, setError] = useState({
        bool: false,
        text: '',
    }); //error

    const isValid = (email) => {
        let errorString = null;

        if (isInList(email)) {
            errorString = `${email} has already been added.`;
        }

        if (!isEmail(email)) {
            errorString = `${email} is not a valid email address.`;
        }

        if (errorString) {
            setError({
                bool: true,
                text: errorString,
            });

            return false;
        }

        return true;
    };

    const isInList = (email) => {
        return emailData.includes(email);
    };

    const isEmail = (email) => {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        setError({
            bool: false,
            text: '',
        });
    };

    const handleKeyDown = (event) => {
        if (['Enter', 'Tab', ','].includes(event.key)) {
            event.preventDefault();

            let val = value.trim();

            if (val && isValid(val)) {
                setEmailData([...emailData, val]);
                setValue('');
            }
        }
    };

    const handleDeleteEmail = (deleteId) => {
        setEmailData((emails) =>
            emailData.filter((email) => email !== deleteId)
        );
    };

    const handlePaste = (event) => {
        event.preventDefault();

        let paste = event.clipboardData.getData('text');
        let emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);
        if (emails) {
            let toBeAdded = emails.filter((email) => !isInList(email));
            if (toBeAdded !== null) setEmailData([...emailData, ...toBeAdded]);
        }
        console.log(emails);
    };

    return (
        <div>
            <TextField
                error={error.bool}
                autoFocus
                margin="dense"
                label="Enter Email ids"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                variant="outlined"
                onPaste={handlePaste}
                size="small"
                helperText={error.text}
                fullWidth
            />
            <div className={classes.root}>
                {emailData.length ? (
                    emailData.map((email, index) => {
                        return (
                            <li key={index}>
                                <Chip
                                    label={email}
                                    onDelete={() => handleDeleteEmail(email)}
                                    className={classes.chip}
                                />
                            </li>
                        );
                    })
                ) : (
                    <p>Enter Email Ids to see a list here</p>
                )}
            </div>
            <p>{value}</p>
        </div>
    );
}

export default EmailList;
