import React from 'react';

//material ui
import {
    Grid,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//componenets
import Header from '../../components/Header';
import QuestionBoiler from '../../components/QuestionBoiler';

const useStyles = makeStyles((theme) => ({
    setAssignment: {
        textAlign: `center`
    },
    questionForm:{
        display: `inline-block`,
        wdith: `80%`,
        margin: `10px`,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: `5px`,
        padding: `10px`
    },
    Title:{
        width: `100%`,
        
    }   
}));

export default function SetAssignment(){
    const classes = useStyles();

    return(
        <div className={classes.setAssignment} >
            <Header/>
            <h1>Set Assignment Page</h1>
            <Grid container>
                <Grid item md={3}>
                    <h2>Faculty Profile</h2>
                    <h4>Courses</h4>
                    Other links
                </Grid>
                <Grid item md={9} >
                    <h1>Form</h1>
                    <div className={classes.questionForm}>
                        <TextField 
                            variant="filled" 
                            label="Assignment Title"
                            className={classes.Title}
                        />
                        <TextField 
                            label="Assignment Description"
                            className={classes.Title}
                        />
                        <TextField 
                            label="Course"
                            style={{margin: `0 10px`}}
                        />
                        <TextField 
                            label="Date and Time"
                            style={{margin: `0 10px`}}
                        />
                        <TextField 
                            label="Duration"
                            style={{margin: `0 10px`}}
                        />
                    </div>
                    <QuestionBoiler/>
                </Grid>
            </Grid>
        </div>
    )
}