import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinearProgress, makeStyles, Paper,Snackbar,Button, Grid, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import AnswerBoiler from '../../components/AnswerBoiler';
require('dotenv').config();

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
console.log(process.env.REACT_APP_SERVER_URL);
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333996',
            light: '#3c44b126',
        },
        secondary: {
            main: '#f83245',
            light: '#f8324526',
        },
        background: {
            default: '#f4f5fd',
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)',
            },
        },
    },
    props: {
        MuiIconButton: {
            disableRipple: true,
        },
    },
});

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
});

async function handleSubmit(e, setSubmitted, setSnackbarOpen, question_paper_id,user_id, questionData) {
    e.preventDefault();
    setSubmitted(false);
    for (let row of questionData) {
        let result = {};
        result['studentID'] = user_id;
        result['questionID'] = row._id;
        result['questionPaperID'] = question_paper_id;
        
        //default set to 0 and false
        result['marks_by_model'] = 0;
        result['final_marks'] = 0;
        result['is_evaluated'] = false;
        result['query_flag'] = false;
        
        for (let field of e.target.elements) {
            if (field.name.includes(`${row._id}`)) {
                result['ans'] = field.value;
            }
        }
        console.log(result);
    
    axios
        .post(`${SERVER_URL}answers`, result)
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
   }
}
const USER = {
    userPic: '/static/images/avatar/1.jpg',
    userName: 'Ridham Suvagiya',
    userEmail: '201801006@daiict.ac.in',
};


function ViewAssignment(props) {
    const classes = useStyles();
    const [questionData,setQuestionData] = useState([]);
    const [questionPaperData, setQuestionPaperData] = useState([]);
    const [submitted, setSubmitted] = useState(true);
    const [dateString, setDateString] = useState('');
    const [totalMarks, setTotalMarks] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(0); // Control Snackbar

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(0);
    };

    //TODO:
    //QuestionPaper id from props but for now i have implemented static url
    //let question_paper_id = props.questionPaperID;
    //let user_id = props.userID
    let question_paper_id = '605f1c24d36f8b94df32f9b6';
    let question_paper_id_data = {}
    let user_id = '605f16a34323c591389a4c89'; //201801056
    const renderQuestions = (val,index) => {
        if(questionData===[]){
            return (<LinearProgress/>)
        }
        return   (
            <div key={index}>
                <AnswerBoiler Key={index} data={val} />
            </div>
        )
    }

    useEffect(()=>{
        axios.get(SERVER_URL+'questionpaper/'+question_paper_id)
        .then((response)=>{
            if(response.status===200){   
                console.log("Status OK!")
                setQuestionData(response.data)
                checkTotal()
            }
            else{
                console.log("ERROR: "+response.status+" , "+response.statusText)
            }
        })
        .catch((err) => console.log.err)
    },[])

    useEffect(()=>{
        axios.get(SERVER_URL+'questionpaper/')
        .then((response)=>{
            if(response.status===200){   
                console.log("Status OK! - questionPaperData")
                console.log(response.data)
                addPaperInfo(response.data)

            }
            else{
                console.log("ERROR: "+response.status+" , "+response.statusText)
            }
        })
        .catch((err) => console.log.err)
    },[])

    const addPaperInfo = (data) => {
        for( let field of data){
            if(field._id === question_paper_id){
                question_paper_id_data = field
                console.log('question_paper_id_data: '+ question_paper_id_data)
                setQuestionPaperData(question_paper_id_data);
                break;
            }
        }
    }

    const loadDate = () => {
        console.log(questionPaperData.submissionDeadline)
        let date = new Date(questionPaperData.submissionDeadline);
        console.log(date.toString());
        setDateString(date.toString());
    }
    useEffect(()=>{
        loadDate();
    },[questionPaperData])

    const checkTotal = () => {
        let sum=0;
        for(let data of questionData){
            sum+=parseInt(data.marks);
        }
        console.log(sum);
        console.log(questionData)
        setTotalMarks(sum);
    }

    useEffect(()=>{
        checkTotal();
    },[questionData])
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header headerTitle="View Assignment" />
                <h1 style={{textAlign:'center'}}>View Assignment Page</h1>
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.SmallProfile user={USER}></SideMenu.SmallProfile>
                    
                </SideMenu>
                <Paper className={classes.pageContent}>
                    {/* ENTER ASSIGNMENT TITLE BELOW */}
                    <h2>Assignment Name: </h2>
                    <div>
                        {/* ENTER ASSIGNMENT DESCRIPTION AND OTHER DETAILS BELOW */}
                        <h3>Assignment Description: </h3>
                        <h3>Subject Name: {questionPaperData.subjectName}</h3>
                        <h3>Faculty Name: </h3>
                        <h3>Maximum Marks: {totalMarks}</h3>
                        <h3>Submission Date: {dateString}</h3>
                        
                        <form
                            onSubmit={(e) => {
                                handleSubmit(e, setSubmitted, setSnackbarOpen, question_paper_id, user_id,questionData);
                            }}
                        >
                            <div>
                                {questionData.map(renderQuestions)}
                            </div>
                            <div style={{display:'flex'}}>
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
                                        type="submit"
                                        style={{margin:"auto"}}
                                    >
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
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
                                ? 'Answers Submitted Successfully!'
                                : 'Error submitting form!'}
                        </Alert>
                    </Snackbar>
                </Paper>
            </div>
        </ThemeProvider>
    );
}

export default ViewAssignment;