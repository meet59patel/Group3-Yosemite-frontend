import React, { useState, useCallback, useEffect } from 'react';
import { Paper, Toolbar, Grid, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Controls from '../controls/Controls';
import Popup from '../Popup';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import {
    UserService,
    AssignmentService,
    SubmissionService,
    FacultyQnAService,
    StudentQnAService,
} from '../../services/apis.service';
import { useHistory, useParams } from 'react-router-dom';
import { useForm, Form } from '../useForm';
import Loding from '../Loding';

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
}));

const StudentQnA = (props) => {
    const classes = useStyles();
    const { user, assignment, assignment_id } = props;
    let history = useHistory();
    let { student_submission_id } = useParams();

    // handle loding state
    const [loding, setLoading] = useState(false);

    // handling modal and notif bar
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

    // fetch faculty submission and qna
    const [facultySubmission1, setFacultySubmission1] = useState();
    // fetch faculty qna list data
    let qnaFacultyList1;
    const [qnaFacultyList, setQnAFacultyList] = useState();
    const fetchQnAFacultyList = useCallback(
        async (user, assignment_id) => {
            // if (user.role === 'faculty') {
            if (assignment.length !== 0) {
                // console.log('assigment', assignment);
                // fetch submission
                let submission;
                // await setSubmissionId(assignment.faculty_submission_id);
                await SubmissionService.getSubmission(
                    assignment.faculty_submission_id
                )
                    .then(async (response) => {
                        submission = response.data;
                        setFacultySubmission1(submission);
                        // console.log('faculty sub', submission);
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
                    if (qna) {
                        qnas[qna._id] = qna;
                    }
                }
                setQnAFacultyList(qnas);
                qnaFacultyList1 = qnas;
                setLoading(true);
            }
        },
        [assignment]
    );
    useEffect(() => {
        fetchQnAFacultyList(user, assignment_id);
    }, [fetchQnAFacultyList, user, assignment_id, assignment]);

    // fetch submission submission and qna
    const [studentSubmissionId, setStudentSubmissionId] = useState();
    const [studentSubmission1, setStudentSubmission1] = useState();
    // fetch faculty qna list data
    const [qnaList, setQnAList] = useState([]);
    // save answer
    const [answer, setAnswer] = useState();

    const fetchQnAList = useCallback(
        async (user, assignment_id) => {
            await fetchQnAFacultyList();
            if (
                assignment &&
                user &&
                assignment.length !== 0 &&
                user.length !== 0 &&
                qnaFacultyList1
            ) {
                // fetch submission id
                // fetch submission
                let is_submission_found = false;
                let studentSubmissions =
                    user.role === 'student'
                        ? user.submission_list
                        : student_submission_id;
                let studentSubmission;

                if (student_submission_id) {
                    console.log('catched');
                    let tmp_sub;
                    await SubmissionService.getSubmission(student_submission_id)
                        .then((response) => {
                            tmp_sub = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    setStudentSubmissionId(tmp_sub._id);
                    setStudentSubmission1(tmp_sub);
                    studentSubmission = tmp_sub;
                    is_submission_found = true;
                } else {
                    for (const sub_id of studentSubmissions) {
                        let tmp_sub;
                        await SubmissionService.getSubmission(sub_id)
                            .then((response) => {
                                tmp_sub = response.data;
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // console.log('tmp_sub', tmp_sub);
                        if (
                            tmp_sub &&
                            tmp_sub.assignment_id === assignment_id
                        ) {
                            setStudentSubmissionId(tmp_sub._id);
                            setStudentSubmission1(tmp_sub);
                            studentSubmission = tmp_sub;
                            is_submission_found = true;
                            break;
                        }
                    }
                }

                // create new submission for student
                if (is_submission_found === false) {
                    console.log('get into created section');
                    // console.log('user', user);

                    let new_sub_id;
                    // create new submission
                    await SubmissionService.createSubmission({
                        user_id: user._id,
                        assignment_id: assignment_id,
                    })
                        .then((response) => {
                            // console.log(
                            //     'new submission created',
                            //     response.data
                            // );
                            new_sub_id = response.data.submission._id;
                        })
                        .catch((error) => {
                            console.log(
                                'error to create new submission',
                                error
                            );
                        });

                    //  add new submission id to assignment submission data
                    await AssignmentService.updateAssignment(assignment_id, {
                        push_submission_id: new_sub_id,
                    })
                        .then((response) => {
                            // console.log(
                            //     'added submission id to assignment submission list',
                            //     response.data
                            // );
                        })
                        .catch((error) => {
                            console.log('error to create sub for stu', error);
                        });

                    //  add new submission id to user data
                    await UserService.updateUser(user._id, {
                        push_assisub_id: new_sub_id,
                    })
                        .then((response) => {
                            // console.log(
                            //     'added submission id to users list',
                            //     response.data
                            // );
                        })
                        .catch((error) => {
                            console.log('error to create sub for stu', error);
                        });

                    // add faculty's qna to student's submission
                    for (let key in qnaFacultyList1) {
                        let stu_qna;
                        await StudentQnAService.createQnA({
                            qna_faculty_id: key,
                        })
                            .then((response) => {
                                // console.log(
                                //     'create new student submission',
                                //     response.data
                                // );
                                stu_qna = response.data.qna;
                            })
                            .catch((error) => {
                                console.log(
                                    'error to create qna for student new sub',
                                    error
                                );
                            });

                        await SubmissionService.updateSubmission(new_sub_id, {
                            push_qna_list_ids: stu_qna._id,
                        })
                            .then((response) => {
                                // console.log(
                                //     'add faculty qna to student submission',
                                //     response.data
                                // );
                            })
                            .catch((error) => {
                                console.log(
                                    'error to create sub for stu',
                                    error
                                );
                            });
                    }

                    // get submission for answering
                    let tmp_sub;
                    await SubmissionService.getSubmission(new_sub_id)
                        .then((response) => {
                            // console.log('finally created new submission');
                            tmp_sub = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    setStudentSubmissionId(tmp_sub._id);
                    setStudentSubmission1(tmp_sub);
                    studentSubmission = tmp_sub;
                }

                let list = [];
                await studentSubmission.qna_list_ids.forEach((qna_id) => {
                    list.push(qna_id);
                });
                // set qnas and answers
                const qnas = [];
                const ans = [];
                for (const qna_id of list) {
                    let qna;
                    await StudentQnAService.getQnA(qna_id)
                        .then((response) => {
                            qna = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    if (qna) {
                        qnas.push(qna);
                        ans[qna._id] = qna.answer;
                    }
                }
                setQnAList(qnas);
                setAnswer(ans);
                setLoading(true);
            }
        },
        [assignment.length, fetchQnAFacultyList]
    );
    useEffect(() => {
        fetchQnAList(user, assignment_id);
    }, [fetchQnAList, user, assignment_id, assignment]);

    // fixme: for new feature
    const [recordForEdit, setRecordForEdit] = useState(null);
    const addOrEdit = async (qna, resetForm) => {
        if (qna.id === 0) {
            console.alert('why creating new qna from student side');
            // todo: new features when multiple query flag option available
            // // fetch data again after update
            // fetchQnAFacultyList();
            // fetchQnAList();
        } else {
            // edit qna in database
            if (qna.role === 'faculty') {
                console.log('facu call');
                await StudentQnAService.updateQnA(qna._id, {
                    query_solved: true,
                    evaluation_status: 'done',
                    final_marks: qna.final_marks,
                })
                    .then((response) => {
                        setNotify({
                            isOpen: true,
                            message: `Query solve and update Successfully`,
                            type: 'success',
                        });
                    })
                    .catch((error) => {
                        setNotify({
                            isOpen: true,
                            message: 'Error to update solve query',
                            type: 'error',
                        });
                        console.log(error);
                    });
            } else {
                console.log('stu call');
                await StudentQnAService.updateQnA(qna._id, {
                    query_description: qna.query_description,
                    query_flag: true,
                    query_solved: false,
                    final_marks: 0,
                })
                    .then((response) => {
                        setNotify({
                            isOpen: true,
                            message: `Query raised Successfully`,
                            type: 'success',
                        });
                    })
                    .catch((error) => {
                        setNotify({
                            isOpen: true,
                            message: 'Error to raise query',
                            type: 'error',
                        });
                        console.log(error);
                    });
            }

            // todo: handle multiple queries

            // fetch data again after update
            // fetchQnAFacultyList();
            // fetchQnAList();
        }
        await fetchQnAFacultyList(user, assignment_id);
        await fetchQnAList(user, assignment_id);
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
        console.log('Why give access to studet for delete qna');
        // todo: when query delete flag option available
        // // fetch data again after update
        // fetchQnAList();
    };

    // handleAnswerChange
    const handleAnswerChange = (e, id) => {
        e.preventDefault();
        setAnswer({ ...answer, [id]: e.target.value });
    };

    const onSingleSaveAnswer = async (e, ind, id) => {
        await StudentQnAService.updateQnA(id, { answer: answer[id] })
            .then((response) => {
                console.log('qna ', id, ' submitted');
            })
            .catch((error) => {
                console.log('error qna ', id, ' not submitted');
            });
        console.log(qnaList);
        let oldQnAind = qnaList.findIndex(function (qna) {
            return qna._id === id;
        });
        console.log(oldQnAind);
        let newQnAList = qnaList;
        newQnAList[oldQnAind].answer = answer[id];
        setQnAList(newQnAList);
        setAnswer(JSON.parse(JSON.stringify(answer)));
        // onChange(e.target.value);
        console.log('qnaList[oldQnAind].answer', qnaList[oldQnAind].answer);
        console.log('answer[id]', answer[id]);
    };

    const onSaveAnswer = async () => {
        // console.log('save called');
        // console.log('saved answer', answer);
        let working_well_flag = true;
        let newQnAList = qnaList;
        for (const [ind, qna] of qnaList.entries()) {
            const key = qna._id;
            if (qna.answer !== answer[key]) {
                newQnAList[ind].answer = answer[key];
                await StudentQnAService.updateQnA(key, { answer: answer[key] })
                    .then((response) => {
                        // console.log('qna ', key, ' submitted');
                    })
                    .catch((error) => {
                        working_well_flag(false);
                        console.log('error qna ', key, ' not submitted');
                    });
            }
        }
        setQnAList(newQnAList);
        if (working_well_flag) {
            setNotify({
                isOpen: true,
                message: `Assignment Saved Successfully`,
                type: 'success',
            });
        } else {
            setNotify({
                isOpen: true,
                message: `Some Answer not Saved`,
                type: 'error',
            });
        }
    };

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    {user.role === 'student' ? (
                        <h1 style={{ color: '#333', margin: 'auto' }}>
                            Assignment {assignment.assignment_name}
                        </h1>
                    ) : (
                        <h2 style={{ color: 'grey', margin: 'auto' }}>
                            Your are Watching
                            <span style={{ color: 'black' }}>
                                {' '}
                                Student's submission{' '}
                            </span>{' '}
                            of{' '}
                            <span style={{ color: 'black' }}>
                                {assignment.assignment_name}
                            </span>
                        </h2>
                    )}
                </Toolbar>
                <hr />
                {/* {console.log('out studentSubmission1', studentSubmission1)}
                {console.log('out answer', answer)}
                {console.log('out qnaFacultyList', qnaFacultyList)}
                {console.log('out loding', loding)} */}

                {loding && qnaFacultyList && answer && studentSubmission1 ? (
                    <div>
                        <h3 style={{ color: '#333' }}>
                            Total Questions :{' '}
                            {facultySubmission1.qna_list_ids.length}
                        </h3>
                        <h3 style={{ color: '#333' }}>
                            Total Marks : {facultySubmission1.marks}
                        </h3>
                        <hr />
                        {qnaList.length &&
                            qnaFacultyList &&
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
                                        {/* {console.log('student qna', qna)} */}
                                        <Controls.Input
                                            name="question"
                                            label={'Question ' + (ind + 1)}
                                            value={
                                                qnaFacultyList[
                                                    qna.qna_faculty_id
                                                ].question
                                            }
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
                                            value={answer[qna._id]}
                                            onChange={(e) => {
                                                handleAnswerChange(e, qna._id);
                                            }}
                                            style={{
                                                width: '100%',
                                                marginBottom: '20px',
                                            }}
                                            InputProps={{
                                                readOnly:
                                                    user.role !== 'student',
                                            }}
                                            multiline
                                            rows={3}
                                            rowsMax={50}
                                        />
                                        <div>
                                            <Controls.Input
                                                name="marks"
                                                label="Total Marks"
                                                value={
                                                    qnaFacultyList[
                                                        qna.qna_faculty_id
                                                    ].marks
                                                }
                                                style={{
                                                    width: '100px',
                                                    marginBottom: '20px',
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <Controls.Input
                                                name="model_marks"
                                                label="Model Marks"
                                                value={
                                                    qna.evaluation_status ===
                                                    'done'
                                                        ? qna.model_marks
                                                        : qna.evaluation_status
                                                }
                                                style={{
                                                    width: '130px',
                                                    marginBottom: '20px',
                                                    marginLeft: '20px',
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            {user.role === 'student' && (
                                                <>
                                                    <Controls.Button
                                                        text="Raise Query"
                                                        variant="outlined"
                                                        startIcon={
                                                            <BorderColorIcon />
                                                        }
                                                        className={
                                                            classes.newButton
                                                        }
                                                        disabled={
                                                            qna.query_flag
                                                        }
                                                        onClick={() => {
                                                            openInPopup(qna);
                                                        }}
                                                        style={{
                                                            width: 'auto',
                                                            marginBottom:
                                                                '15px',
                                                            position:
                                                                'relative',
                                                            // margin: '0',
                                                            float: 'right',
                                                        }}
                                                    />
                                                    <Controls.Button
                                                        text="Save"
                                                        variant="outlined"
                                                        startIcon={
                                                            <SaveAltIcon />
                                                        }
                                                        className={
                                                            classes.newButton
                                                        }
                                                        disabled={
                                                            qna.answer ===
                                                            answer[qna._id]
                                                        }
                                                        onClick={(e) => {
                                                            onSingleSaveAnswer(
                                                                e,
                                                                ind,
                                                                qna._id
                                                            );
                                                        }}
                                                        style={{
                                                            width: 'auto',
                                                            marginBottom:
                                                                '15px',
                                                            position:
                                                                'relative',
                                                            float: 'right',
                                                        }}
                                                    />
                                                </>
                                            )}
                                            {user.role === 'faculty' &&
                                                qna.query_flag && (
                                                    <h2
                                                        style={{
                                                            float: 'right',
                                                            marginRight: '20px',
                                                            color: qna.query_solved
                                                                ? 'green'
                                                                : 'red',
                                                        }}
                                                    >
                                                        {qna.query_solved
                                                            ? 'Marks updated'
                                                            : 'Query pending'}
                                                    </h2>
                                                )}
                                        </div>
                                        {qna.query_flag && (
                                            <div
                                                style={{
                                                    background: qna.query_solved
                                                        ? 'rgba(228,245,212,0.4)'
                                                        : 'rgba(255,204,203,0.4)',
                                                    border: qna.query_solved
                                                        ? '1px solid green'
                                                        : '1px solid red',
                                                    borderRadius: '7px',
                                                    padding: '20px',
                                                }}
                                            >
                                                <Controls.Input
                                                    name="query_description"
                                                    label="Query Description"
                                                    value={
                                                        qna.query_description
                                                    }
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                {user.role !== 'student' && (
                                                    <Controls.ActionButton
                                                        // color="success"
                                                        onClick={() => {
                                                            let newItem = qna;
                                                            newItem[
                                                                'question'
                                                            ] =
                                                                qnaFacultyList[
                                                                    qna.qna_faculty_id
                                                                ].question;
                                                            newItem[
                                                                'solution'
                                                            ] =
                                                                qnaFacultyList[
                                                                    qna.qna_faculty_id
                                                                ].answer;
                                                            newItem['marks'] =
                                                                qnaFacultyList[
                                                                    qna.qna_faculty_id
                                                                ].marks;
                                                            newItem['role'] =
                                                                user.role;
                                                            openInPopup(qna);
                                                        }}
                                                        style={{
                                                            float: 'right',
                                                            padding: '12px',
                                                            marginLeft: '10px',
                                                            backgroundColor:
                                                                '#555',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        <OpenInNewIcon fontSize="small" />{' '}
                                                        Open
                                                    </Controls.ActionButton>
                                                )}
                                                <Controls.Input
                                                    name="final_marks"
                                                    label="Final Marks"
                                                    value={
                                                        qna.query_solved
                                                            ? qna.final_marks
                                                            : 'Query not Checked'
                                                    }
                                                    style={{
                                                        width: '180px',
                                                        float: 'right',
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Paper>
                                );
                            })}
                        {user.role === 'student' && (
                            <>
                                <hr />
                                <Toolbar>
                                    <div
                                        style={{
                                            margin: 'auto',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <Controls.Button
                                            text="Save Assignment"
                                            variant="outlined"
                                            startIcon={<SaveAltIcon />}
                                            className={classes.newButton}
                                            onClick={() => {
                                                onSaveAnswer();
                                            }}
                                            style={{
                                                position: 'relative',
                                                margin: '0',
                                                color: '#0D47A1',
                                                backgroundColor: '#BBDEFB',
                                                fontSize: '20px',
                                                padding: '20px 50px',
                                            }}
                                        />
                                    </div>
                                </Toolbar>
                            </>
                        )}
                    </div>
                ) : (
                    <Loding />
                )}
            </Paper>
            <Popup
                title="Raise Query"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <QueryForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
};

const initialQueryValues = {
    id: 0,
    question: '',
    solution: '',
    answer: '',
    marks: '',
    evaluation_status: 'pending',
    model_marks: 0,
    query_flag: true,
    query_description: '',
    query_solved: false,
    final_marks: 0,
    role: 'student',
};

const QueryForm = (props) => {
    const { addOrEdit, recordForEdit } = props;
    // console.log('recordForEdit', recordForEdit);
    // console.log('addOrEdit', addOrEdit);

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('query_description' in fieldValues)
            temp.query_description = fieldValues.query_description
                ? ''
                : 'This field is required.';

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
    } = useForm(initialQueryValues, true, validate);

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
                {values.role === 'faculty' || values.role === 'admin' ? (
                    <>
                        <Controls.Input
                            name="question"
                            label="Question"
                            value={values.question}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            multiline
                            disabled={true}
                            rowsMax={3}
                        />
                        <Controls.Input
                            name="solution"
                            label="Expected Answer"
                            value={values.solution}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            multiline
                            disabled={true}
                            rows={3}
                            rowsMax={5}
                        />
                        <Controls.Input
                            name="answer"
                            label="Answer"
                            value={values.answer}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            multiline
                            disabled={true}
                            rows={3}
                            rowsMax={5}
                        />
                        <Controls.Input
                            name="query_description"
                            label="Query Description"
                            value={values.query_description}
                            onChange={handleInputChange}
                            error={errors.query_description}
                            style={{ width: '100%' }}
                            multiline
                            disabled={true}
                            rowsMax={5}
                        />
                        <div
                            style={{
                                width: '100%',
                                marginTop: '20px auto',
                            }}
                        >
                            <Controls.Input
                                name="marks"
                                label="Total Marks"
                                value={values.marks}
                                onChange={handleInputChange}
                                style={{
                                    width: '130px',
                                    marginBottom: '20px',
                                }}
                                disabled={true}
                            />
                            <Controls.Input
                                name="model_marks"
                                label="Model Marks"
                                value={
                                    values.evaluation_status === 'done'
                                        ? values.model_marks
                                        : values.evaluation_status
                                }
                                onChange={handleInputChange}
                                style={{
                                    width: '130px',
                                    marginBottom: '20px',
                                }}
                                disabled={true}
                            />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                marginTop: '20px auto',
                            }}
                        >
                            <Controls.Button
                                style={{
                                    float: 'right',
                                    margin: '10px',
                                    height: '50px',
                                }}
                                type="submit"
                                text="Update Marks"
                            />
                            <Controls.Input
                                name="final_marks"
                                type="number"
                                label="Final Marks"
                                value={values.final_marks}
                                onChange={handleInputChange}
                                style={{
                                    width: '180px',
                                    float: 'right',
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <Controls.Input
                            name="query_description"
                            label="Query Description"
                            value={values.query_description}
                            onChange={handleInputChange}
                            error={errors.query_description}
                            style={{ width: '100%' }}
                            multiline
                            rows={2}
                            rowsMax={5}
                        />
                        <div
                            style={{
                                width: '100%',
                                marginTop: '20px auto',
                            }}
                        >
                            <Controls.Button
                                style={{ float: 'right' }}
                                text="Reset"
                                color="default"
                                onClick={resetForm}
                            />
                            <Controls.Button
                                style={{ float: 'right' }}
                                type="submit"
                                text="Submit"
                            />
                        </div>
                    </>
                )}
            </Grid>
        </Form>
    );
};

export default StudentQnA;
