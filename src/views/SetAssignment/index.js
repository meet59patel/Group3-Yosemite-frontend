import React, { useState } from 'react';
import nextId from 'react-id-generator';
import axios from 'axios';
import {
    Grid,
    TextField,
    IconButton,
    Button,
    Input,
    InputAdornment,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    CircularProgress,
    Snackbar,
    Paper,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

// Components
import Header from '../../components/Header';
import QuestionBoiler from '../../components/QuestionBoiler';
import EmailList from '../../components/EmailList';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const useStyles = makeStyles((theme) => ({
    setAssignment: {
        textAlign: `center`,
    },
    questionForm: {
        display: `inline-block`,
        wdith: `80%`,
        margin: `10px`,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: `5px`,
        padding: `10px`,
    },
    questionDescription: {
        border: `3px solid rgba(0, 0, 0, 0.38)`,
        padding: `5px`,
        margin: `10px`,
        borderRadius: `5px`,
    },
    Title: {
        width: `98%`,
        margin: `1%`,
    },
    Details: {
        margin: `5px 10px`,
    },
}));

async function handleSubmit(e, setSubmitted, setSnackbarOpen) {
    e.preventDefault();
    setSubmitted(false);
    let result = {};
    let total_marks = 0;
    for (let field of e.target.elements) {
        if (field.name) {
            result[field.name] = field.value;
            if (field.name.includes('-max_score')) {
                total_marks += parseInt(field.value);
            }
        }
    }
    result['total_marks'] = total_marks;
    console.log(result);
    axios
        .post(`${SERVER_URL}questionpaper/savepaper/`, result)
        .then((res) => {
            setSnackbarOpen(1); // Snackbar Success Alert
            console.log(res);
            setSubmitted(true); // Disable Loader
            // setTimeout(() => {
            //     window.location.reload(); // Reload to Re-render form
            // TODO: Redirect to view assignment view on successful submit
            // }, 6000);
        })
        .catch((e) => {
            setSnackbarOpen(2); // Snackbar Error Alert
            console.error(e);
            setSubmitted(true); // Disable Loader
        });
    // console.log(e.target.course.value);
}

export default function SetAssignment() {
    const classes = useStyles();
    const [form, setForm] = useState([{ id: 'id0' }]);
    const [submitted, setSubmitted] = useState(true); // Control Loader
    const [snackbarOpen, setSnackbarOpen] = useState(0); // Control Snackbar
    const [dialogOpen, setDialogOpen] = useState(false);    //Control Dialog Message

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const onPressDelete = (id) => {
        console.log(id);
        setForm(form.filter((item) => item.id !== id));
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(0);
    };

    return (
        <Paper fontWeight="fontWeightRegular" className={classes.setAssignment}>
            {/* <Header /> */}
            {/* <h1>Set Assignment Page</h1> */}
            <Grid container>
                <Grid item>
                    {/* <h1>Form</h1> */}
                    <form
                        id="Assignment"
                        onSubmit={(e) => {
                            handleSubmit(e, setSubmitted, setSnackbarOpen);
                        }}
                    >
                        <div className={classes.questionForm}>
                            <div className={classes.questionDescription}>
                                <TextField
                                    variant="filled"
                                    label="Assignment Title"
                                    name="assignment_title"
                                    className={classes.Title}
                                    required
                                />
                                <TextField
                                    label="Assignment Description"
                                    name="assignment_description"
                                    className={classes.Title}
                                />
                                <TextField
                                    label="Faculty ID"
                                    name="facultyID"
                                    className={classes.Title}
                                    required
                                />
                                <TextField
                                    label="Course"
                                    name="course"
                                    className={classes.Details}
                                    required
                                />
                                <TextField
                                    label="Date and Time"
                                    name="date_time"
                                    type="datetime-local"
                                    className={classes.Details}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                                <TextField
                                    label="Duration"
                                    name="duration"
                                    className={classes.Details}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                Minutes
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            {form.map((e) => {
                                return (
                                    <li
                                        key={e.id}
                                        style={{
                                            listStyle: `none`,
                                        }}
                                    >
                                        <QuestionBoiler
                                            id={e.id}
                                            onDelete={(e) => onPressDelete(e)}
                                        />
                                    </li>
                                );
                            })}

                            <IconButton
                                onClick={() => {
                                    setForm([...form, { id: nextId() }]);
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                            {/* {JSON.stringify(form)} */}

                            <hr />

                            {!submitted ? (
                                <Grid
                                    container
                                    spacing={3}
                                    justify="center"
                                    alignItems="center"
                                    style={{
                                        height: '10vh',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Grid item>
                                        <CircularProgress size={30} />
                                    </Grid>
                                </Grid>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // type="submit"
                                    style={{margin:"auto"}}
                                    onClick={handleDialogOpen}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                        <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Add Student Email Ids</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the list of Emails to be sent to the students, you can also copy and paste the data from somewhere.
                                    
                                    <br/>
                                    <br/>
                                    <EmailList />
                                    Press Submit to send this Assignment
                                    <br/>
                                    Press Cancel to reset the list.
                                </DialogContentText>
                                
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose} color="primary">
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={handleDialogClose} 
                                    color="primary"
                                    type="submit"
                                    form="Assignment"
                                    >
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen != 0}
                autoHideDuration={10000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarOpen > 0 ? 'success' : 'error'}
                    elevation={6}
                    variant="filled"
                >
                    {snackbarOpen === 1
                        ? 'Form Submitted Successfully!'
                        : 'Error submitting form!'}
                </Alert>
            </Snackbar>
        </Paper>
    );
}
