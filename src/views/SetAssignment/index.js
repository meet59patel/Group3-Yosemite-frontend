import React, {useState} from 'react';
import nextId from "react-id-generator";

//material ui
import {
    Grid,
    TextField,
    IconButton,
    Button,
    InputAdornment  
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: `5px`,
        padding: `10px`
    },
    questionDescription:{
        border: `3px solid rgba(0, 0, 0, 0.38)`,
        padding: `5px`,
        margin: `10px`,
        borderRadius: `5px`
    },
    Title:{
        width: `98%`,
        margin:`1%`
        
    },
    Details:{
        margin: `5px 10px`
    } 
}));

export default function SetAssignment(){
    const classes = useStyles();
    const [form, setForm] = useState([{id: "id0"}])
    const start=1;

    const onPressDelete = (id) =>{
        console.log(id);
        setForm(form.filter((item) => item.id !== id));
    }

    return(
        <div className={classes.setAssignment} >
            <Header/>
            <h1>Set Assignment Page</h1>
            <Grid container>
                <Grid item md={3} xs={12}>
                    <h2>Faculty Profile</h2>
                    <h4>Courses</h4>
                    Other links
                </Grid>
                <Grid item md={9} >
                    <h1>Form</h1>
                    <div className={classes.questionForm}>
                        <div className={classes.questionDescription}>
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
                                className={classes.Details}
                            />
                            <TextField 
                                label="Date and Time"
                                type="datetime-local"
                                defaultValue=""
                                className={classes.Details}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField 
                                label="Duration"
                                className={classes.Details}
                                InputProps={{
                                    endAdornment: <InputAdornment >Minutes</InputAdornment>,
                                }}
                            />
                        </div>

                        {form.map((e)=>{
                            var i=start;
                            return(
                                <li key={e.id} style={{
                                    listStyle:`none`
                                }}>
                                    <QuestionBoiler id={e.id} onDelete={(e)=>onPressDelete(e)}/>
                                </li>
                            )
                        })}
                        
                        <IconButton onClick={() => {
                            console.log("pressed");
                            setForm([...form,{id: nextId()}]);}}>
                                
                            <AddIcon/>
                        </IconButton>
                        {/* {JSON.stringify(form)} */}
                        
                        <hr/>
                        
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={()=>{alert("Submitted the form!")}}>
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}