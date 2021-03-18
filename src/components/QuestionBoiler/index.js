import React from 'react';

import {
    TextField
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function QuestionBoiler(props){
    const classes=useStyles();
    return(
        <div>
            <TextField
                variant="outlined"
                label= "Question"
            />
            <TextField
                variant="outlined"
                label= "Max Score"
            />
            <TextField
                variant="outlined"
                label= "Referral Answer"
            />
        </div>
    );
}