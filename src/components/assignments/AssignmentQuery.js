import React, { useEffect, useState, useCallback } from 'react';
import useTable from '../useTable';
import Controls from '../controls/Controls';
import Popup from '../Popup';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import {
    Paper,
    makeStyles,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
    Grid,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
    AssignmentService,
    SubmissionService,
    FacultyQnAService,
    StudentQnAService,
    UserService,
} from '../../services/apis.service';
import { qurCellsFaculty } from '../../services/tableHeadCells';
import { useHistory } from 'react-router-dom';
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

const AssignmentQuery = (props) => {
    const classes = useStyles();
    const { assignment_id, user, assignment } = props;
    let history = useHistory();

    // handle loding state
    const [loding, setLoading] = useState(true);

    // handling modal and notif bar
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    });

    // fetch faculty submission and qna
    // const [facultySubmission1, setFacultySubmission1] = useState();
    // fetch faculty qna list data
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
                        // setFacultySubmission1(submission);
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
                            // setLoading(true);
                        })
                        .catch((error) => {
                            console.log(error);
                            // setLoading(true);
                        });
                    if (qna) {
                        qnas[qna._id] = qna;
                    }
                }
                setQnAFacultyList(qnas);
                // setLoading(false);
            }
        },
        [assignment]
    );
    useEffect(() => {
        fetchQnAFacultyList(user, assignment_id);
    }, [fetchQnAFacultyList, user, assignment_id, assignment]);

    // const [submissionId, setSubmissionId] = useState('');
    const [submission1, setSubmission1] = useState();

    // fetch submission list data
    const [subList, setSubList] = useState([]);
    const [facultyQnAList, setFacultyQnAList] = useState([]);
    const [qurList, setQurList] = useState([]);
    const fetchSubList = useCallback(
        async (user, assignment_id) => {
            // if (user.role === 'faculty') {
            if (assignment.length !== 0) {
                // fetch all student submission ids
                let list = [];
                await assignment.submission_list_ids.forEach((sub_id) => {
                    list.push(sub_id);
                });

                // fetch all student submission and qna
                const submissions = [];
                let quries = [];
                for (const sub_id of list) {
                    // fetch submission
                    let sub;
                    await SubmissionService.getSubmission(sub_id)
                        .then((response) => {
                            sub = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    // fetch user
                    let user;
                    await UserService.getUser(sub.user_id)
                        .then((response) => {
                            user = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    // fetch submissin's qna
                    for (const qna_id of sub.qna_list_ids) {
                        let qur, qna;
                        await StudentQnAService.getQnA(qna_id)
                            .then((response) => {
                                // console.log(response.data);
                                qna = response.data;
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        if (qna && qna.query_flag) {
                            qur = qna;
                            qur['user_name'] = user.user_name;
                            quries.push(qur);
                        }
                    }
                    sub['user_name'] = user.user_name;
                    submissions.push(sub);
                }
                setSubList(submissions);
                setQurList(quries);
                setLoading(false);
            }
        },
        [assignment]
    );
    useEffect(() => {
        fetchSubList(user, assignment_id);
    }, [fetchSubList, user, assignment_id, assignment]);

    // For table part
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const headCells = qurCellsFaculty;
    // user.role === 'admin'
    //     ? assiCellsAdmin
    //     : user.role === 'faculty'
    //     ? assiCellsFaculty
    //     : assiCellsStudent;

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(qurList, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value === '') return items;
                else
                    return items.filter(
                        (x) => console.log(x)
                        // x.status.toLowerCase().includes(target.value) ||
                        // x.user_name.toLowerCase().includes(target.value) ||
                        // x.question.toLowerCase().includes(target.value)
                    );
            },
        });
    };

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
            console.log('edit query', qna);
            await StudentQnAService.updateQnA(qna._id, {
                query_solved: true,
                is_evaluated: true,
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

            // todo: handle multiple queries
        }
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        fetchSubList();
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <h1>Assignment Queries</h1>
                </Toolbar>
                {/* <Toolbar>
                    <hr />
                </Toolbar> */}
                {/* <Toolbar>
                    <Controls.Input
                        label="Search Submission"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar> */}

                {loding ? (
                    <Loding />
                ) : (
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {qurList.length && qnaFacultyList ? (
                                recordsAfterPagingAndSorting().map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            {item.query_solved ? (
                                                <Controls.ActionButton
                                                    size="small"
                                                    color="success"
                                                    style={{
                                                        fontSize: '12px',
                                                        margin: 0,
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Solved
                                                </Controls.ActionButton>
                                            ) : (
                                                <Controls.ActionButton
                                                    size="small"
                                                    color="secondary"
                                                    style={{
                                                        fontSize: '12px',
                                                        margin: 0,
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Pending
                                                </Controls.ActionButton>
                                            )}
                                        </TableCell>

                                        <TableCell>{item.user_name}</TableCell>
                                        <TableCell>
                                            {qnaFacultyList[
                                                item.qna_faculty_id
                                            ] ? (
                                                qnaFacultyList[
                                                    item.qna_faculty_id
                                                ].question
                                            ) : (
                                                <p style={{ color: 'red' }}>
                                                    not found !!! talk to
                                                    faculty/admin
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.query_description}
                                        </TableCell>
                                        <TableCell>
                                            {item.final_marks} /{' '}
                                            {
                                                qnaFacultyList[
                                                    item.qna_faculty_id
                                                ].marks
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="success"
                                                onClick={() => {
                                                    let newItem = item;
                                                    newItem['question'] =
                                                        qnaFacultyList[
                                                            item.qna_faculty_id
                                                        ].question;
                                                    newItem['solution'] =
                                                        qnaFacultyList[
                                                            item.qna_faculty_id
                                                        ].answer;
                                                    newItem['marks'] =
                                                        qnaFacultyList[
                                                            item.qna_faculty_id
                                                        ].marks;
                                                    openInPopup(item);
                                                }}
                                            >
                                                <OpenInNewIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <h2>Not found any submission</h2>
                            )}
                        </TableBody>
                    </TblContainer>
                )}
                <TblPagination />
            </Paper>
            <Popup
                title="Query Tab"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <QueryForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

const initialQueryValues = {
    id: 0,
    question: '',
    solution: '',
    answer: '',
    marks: '',
    is_evaluated: false,
    model_marks: 0,
    query_flag: true,
    query_description: '',
    query_solved: false,
    final_marks: 0,
};

const QueryForm = (props) => {
    const { addOrEdit, recordForEdit } = props;
    // console.log('recordForEdit', recordForEdit);
    // console.log('addOrEdit', addOrEdit);

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        // if ('query_description' in fieldValues)
        //     temp.query_description = fieldValues.query_description
        //         ? ''
        //         : 'This field is required.';

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
                            values.is_evaluated
                                ? values.model_marks
                                : 'Not evaluated'
                        }
                        onChange={handleInputChange}
                        style={{
                            width: '130px',
                            marginBottom: '20px',
                        }}
                        disabled={true}
                    />

                    {/* <Controls.Button
                        style={{ float: 'right', marginTop: '16px' }}
                        text="Reset"
                        color="default"
                        onClick={resetForm}
                    /> */}
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
            </Grid>
        </Form>
    );
};

export default AssignmentQuery;
