import React from 'react';
import {
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    main:{
        border: `2px solid ${theme.palette.action.disabled}`,
        padding: `5px`,
        margin: `10px`,
        marginBottom: `20px`,
        borderRadius: `5px`,
        textAlign:`left`
    },
    MaxScoreDelete:{
        display:`flex`,
        justifyContent:`space-between`,
        alignItems:`center`
    }
}));

function AnswerBoiler(props) {
    const classes=useStyles();
    return (
        <div className={classes.main} key={props.Key}>
            <div style={{display:`flex`, justifyContent:`space-between`}}>
                <h2 style={{margin:`10px 5px 10px 10px`}}>{props.Key + 1}.</h2>
                <h2 style={{margin:`10px auto 10px 10px`,}}> {props.data.question}</h2>
                <h2 style={{margin:`10px 10px 10px 5px`}}>[{props.data.marks}]</h2>
            </div>
            <TextField
                multiline
                variant="outlined"
                label= "Answer"
                name= {"ans-"+props.data._id}
                required
                rows={4}
                style={{
                    margin: `1%`,
                    width:`98%`,
                }}
            />
            </div>
    );
}

export default AnswerBoiler;