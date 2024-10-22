import React from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
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
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label={label}
                format="MM/dd/yyyy"
                name={name}
                value={value}
                onChange={(date) => onChange(convertToDefEventPara(name, date))}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
