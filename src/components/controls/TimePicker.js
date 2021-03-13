import React from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label={label}
                name={name}
                value={value}
                onChange={(time) => onChange(convertToDefEventPara(name, time))}
                KeyboardButtonProps={{
                    "aria-label": "change time",
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
