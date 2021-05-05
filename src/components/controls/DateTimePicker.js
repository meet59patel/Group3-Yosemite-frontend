import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePicker(props) {
    const classes = useStyles();
    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TextField
                id="datetime-local"
                label={label}
                name={name}
                value={value}
                onChange={(date) => onChange(convertToDefEventPara(name, date))}
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
