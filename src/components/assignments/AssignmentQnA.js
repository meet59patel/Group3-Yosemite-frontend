import React, { useState, useCallback, useEffect } from 'react';
import {
    Paper,
    Toolbar,
    Button,
    Grid,
    makeStyles,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import Controls from '../controls/Controls';
import Popup from '../Popup';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import {
    FacultyQnAService,
    SubmissionService,
    AssignmentService,
} from '../../services/apis.service';
import { useHistory } from 'react-router-dom';
import { useForm, Form } from '../useForm';
import Loding from '../Loding';
import EmailList from '../EmailList';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%',
    },
    newButton: {
        position: 'absolute',
        right: '10px',
    },
    emailButton: {
        position: 'absolute',
        left: '10px',
    },
}));

const AssignmentQnA = (props) => {
    const classes = useStyles();
    const { assignment_id, user, assignment } = props;
    let history = useHistory();

    // handle loding state
    const [loding, setLoading] = useState(true);

    // handling modal and notif
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
    });

    const [submissionId, setSubmissionId] = useState('');
    const [submission1, setSubmission1] = useState(false);

    // Email Dialogue
    const [openEmailPopup, setOpenEmailPopup] = useState(false);

    // fetch qna list data
    const [qnaList, setQnAList] = useState([]);
    const fetchQnAList = useCallback(
        async (user, assignment_id) => {
            // if (user.role === 'faculty') {
            if (assignment.length !== 0) {
                // console.log('assigment', assignment);
                // fetch submission
                let submission;
                await setSubmissionId(assignment.faculty_submission_id);
                await SubmissionService.getSubmission(
                    assignment.faculty_submission_id
                )
                    .then(async (response) => {
                        submission = response.data;
                        setSubmission1(submission);
                        // console.log('sub', submission);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                let list = [];
                await submission.qna_list_ids.forEach((qna_id) => {
                    list.push(qna_id);
                });

                const qnas = [];
                for (const qna_id of list) {
                    let qna;
                    await FacultyQnAService.getQnA(qna_id)
                        .then((response) => {
                            qna = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    qnas.push(qna);
                }
                setQnAList(qnas);
                // update to assignemnt total
                await AssignmentService.updateAssignment(assignment._id, {
                    total_marks: submission.marks,
                })
                    .then((response) => {})
                    .catch((error) => {
                        console.log(
                            'Error to update total marks at assignment',
                            error
                        );
                    });
                setLoading(false);
            }
        },
        [assignment]
    );
    useEffect(() => {
        fetchQnAList(user, assignment_id);
    }, [fetchQnAList, user, assignment_id, assignment]);

    // fixme
    const [recordForEdit, setRecordForEdit] = useState(null);
    const addOrEdit = async (qna, resetForm) => {
        if (qna.id === 0) {
            let new_qna_id;
            // add qna to database
            await FacultyQnAService.createQnA(qna)
                .then((response) => {
                    new_qna_id = response.data.qna._id;
                    setNotify({
                        isOpen: true,
                        message: `QnA created Successfully`,
                        type: 'success',
                    });
                    // fetchQnAList();
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to create',
                        type: 'error',
                    });
                    console.log(error);
                });

            // add qna id from submission's qna list
            console.log('add sub', submission1);
            await SubmissionService.updateSubmission(submissionId, {
                push_qna_list_ids: new_qna_id,
                marks:
                    parseInt(submission1.marks, 10) + parseInt(qna.marks, 10),
            })
                .then((response) => {
                    console.log('submission"s qna added done');
                    setSubmission1(response.data.submission);
                    setNotify({
                        isOpen: true,
                        message: `added Successfully`,
                        type: 'success',
                    });
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to add',
                        type: 'error',
                    });
                    console.log(error);
                });

            // todo: add this qna from all submission of this assignment
        } else {
            // first fetch old qna, to get old marks
            let qnaOld;
            await FacultyQnAService.getQnA(qna._id)
                .then((response) => {
                    qnaOld = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            // edit qna in database
            await FacultyQnAService.updateQnA(qna._id, qna)
                .then((response) => {
                    setNotify({
                        isOpen: true,
                        message: `QnA edited Successfully`,
                        type: 'success',
                    });
                    // fetchQnAList();
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to edit',
                        type: 'error',
                    });
                    console.log(error);
                });

            await SubmissionService.updateSubmission(submissionId, {
                marks:
                    parseInt(submission1.marks, 10) -
                    parseInt(qnaOld.marks, 10) +
                    parseInt(qna.marks, 10),
            })
                .then((response) => {
                    setSubmission1(response.data.submission);
                    setNotify({
                        isOpen: true,
                        message: `edited Successfully`,
                        type: 'success',
                    });
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to edit',
                        type: 'error',
                    });
                    console.log(error);
                });

            // todo: add this qna from all submission of this assignment
        }

        // fetch data again after update
        fetchQnAList();

        // update to assignemnt total
        // await AssignmentService.updateAssignment({
        //     total_marks: submission1.marks,
        // }).catch((error) => {
        //     console.log('Error', error);
        // });

        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    // fixme
    const onDelete = async (qna) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        // remove qna from database
        await FacultyQnAService.deleteQnA(qna._id)
            .then((response) => {
                console.log('fac sub del done');
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'error',
                });
                // fetchQnAList();
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: 'Error to delete',
                    type: 'error',
                });
                console.log(error);
            });

        // remove qna id from submission's qna list
        await SubmissionService.updateSubmission(submissionId, {
            remove_qna_list_ids: qna._id,
            marks: parseInt(submission1.marks, 10) - parseInt(qna.marks, 10),
        })
            .then((response) => {
                console.log('submission"s qna del done :(');
                setSubmission1(response.data.submission);
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'error',
                });
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: 'Error to delete',
                    type: 'error',
                });
                console.log(error);
            });

        // todo: remove this qna from all submission of this assignment
        // update to assignemnt total
        // await AssignmentService.updateAssignment({
        //     total_marks: submission1.marks,
        // }).catch((error) => {
        //     console.log('Error', error);
        // });

        // fetch data again after update
        fetchQnAList();
    };

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <h1>AssignmentQnA</h1>
                    <br />
                    <Controls.Button
                        text="Add New Question"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar>
                <hr />
                {submission1.qna_list_ids && (
                    <h2>Total Questions : {submission1.qna_list_ids.length}</h2>
                )}
                <h2>Total Marks : {submission1.marks}</h2>
                <hr />
                {loding ? (
                    <Loding />
                ) : (
                    <div>
                        {qnaList.length ? (
                            qnaList.map((qna, ind) => {
                                return (
                                    <Paper
                                        key={qna._id}
                                        style={{
                                            margin: '20px 0',
                                            padding: '20px 10px',
                                            border: '1px solid black',
                                        }}
                                    >
                                        <Controls.Input
                                            name="question"
                                            label={'Question ' + (ind + 1)}
                                            value={qna.question}
                                            style={{
                                                width: '100%',
                                                marginBottom: '20px',
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            multiline
                                        />
                                        <br />
                                        <Controls.Input
                                            name="answer"
                                            label="answer"
                                            value={qna.answer}
                                            style={{
                                                width: '100%',
                                                marginBottom: '20px',
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            multiline
                                            rows={3}
                                            rowsMax={50}
                                        />
                                        <div>
                                            <Controls.Input
                                                name="marks"
                                                label="Total Marks"
                                                value={qna.marks}
                                                style={{
                                                    width: '100px',
                                                    marginBottom: '20px',
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />

                                            <Controls.ActionButton
                                                color="secondary"
                                                style={{
                                                    padding: '10px 15px',
                                                    margin: '5px',
                                                    textTransform: 'none',
                                                    float: 'right',
                                                }}
                                                startIcon={
                                                    <CloseIcon fontSize="small" />
                                                }
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title:
                                                            'Are you sure to delete this Question?',
                                                        subTitle:
                                                            "You can't undo this operation",
                                                        onConfirm: () => {
                                                            onDelete(qna);
                                                        },
                                                    });
                                                }}
                                            >
                                                {'Delete'}
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                    openInPopup(qna);
                                                }}
                                                style={{
                                                    padding: '10px 15px',
                                                    margin: '5px',
                                                    textTransform: 'none',
                                                    float: 'right',
                                                }}
                                                startIcon={
                                                    <EditOutlinedIcon fontSize="small" />
                                                }
                                            >
                                                {'Edit'}
                                            </Controls.ActionButton>
                                        </div>
                                    </Paper>
                                );
                            })
                        ) : (
                            <h1>No QnA Found</h1>
                        )}
                        <Toolbar>
                            <div style={{ margin: 'auto' }}>
                                <Controls.Button
                                    text="Add New Question"
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    className={classes.newButton}
                                    onClick={() => {
                                        setOpenPopup(true);
                                        setRecordForEdit(null);
                                    }}
                                    style={{
                                        position: 'relative',
                                        margin: '0',
                                    }}
                                />
                                <Controls.Button
                                    text="Send Email"
                                    variant="outlined"
                                    endIcon={<SendIcon />}
                                    color="primary"
                                    className={classes.emailButton}
                                    onClick={() => {
                                        setOpenEmailPopup(true);
                                    }}
                                />
                            </div>
                        </Toolbar>
                    </div>
                )}
            </Paper>
            <Popup
                title="Assignment Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <QnAForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
            </Popup>

            <Dialog
                open={openEmailPopup}
                onClose={() => {
                    setOpenEmailPopup(false);
                }}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Add Student Email Ids
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the list of Emails to be sent to the students, you
                        can also copy and paste the data from somewhere.
                        <br />
                        <br />
                        <EmailList />
                        Press Submit to send this Assignment
                        <br />
                        Press Cancel to reset the list.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenEmailPopup(false);
                        }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            console.log('Sending mail...');
                            setOpenEmailPopup(false);
                            axios
                                .post(`${SERVER_URL}emails/`, {
                                    emails: ['201801415@daiict.ac.in'],
                                })
                                .then((res) => {
                                    console.log(res);
                                    setNotify({
                                        isOpen: true,
                                        message: `Email Sent Successfully`,
                                        type: 'success',
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            // <ADD Snackbar of email success>
                        }}
                        color="primary"
                        type="submit"
                        form="Assignment"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
};

const initialFQnAValues = {
    id: 0,
    question: '',
    answer: '',
    marks: 0,
};

const QnAForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('question' in fieldValues)
            temp.question = fieldValues.question
                ? ''
                : 'This field is required.';
        if ('marks' in fieldValues)
            temp.marks = fieldValues.marks ? '' : 'This field is required.';

        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === '');
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFQnAValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
            });
    }, [recordForEdit, setValues]);

    return (
        <Form onSubmit={handleSubmit} style={{ width: '700px' }}>
            <Grid container>
                <Controls.Input
                    name="question"
                    label="Question"
                    value={values.question}
                    onChange={handleInputChange}
                    error={errors.question}
                    style={{ width: '100%' }}
                    multiline
                    rowsMax={5}
                />
                <Controls.Input
                    name="answer"
                    label="Answer"
                    value={values.answer}
                    onChange={handleInputChange}
                    error={errors.answer}
                    style={{ width: '100%' }}
                    multiline
                    rows={4}
                    rowsMax={13}
                />
                <Grid item xs={6}>
                    <Controls.Input
                        type="number"
                        name="marks"
                        label="Marks"
                        value={values.marks}
                        onChange={handleInputChange}
                        error={errors.marks}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div style={{ marginTop: '20px', float: 'right' }}>
                        <Controls.Button type="submit" text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
};

export default AssignmentQnA;
