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
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
    AssignmentService,
    SubmissionService,
    FacultyQnAService,
    AutoEvaluationService,
    UserService,
} from '../../services/apis.service';
import { subCellsFaculty } from '../../services/tableHeadCells';
import { useHistory } from 'react-router-dom';
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

export default function AssignmentList(props) {
    const classes = useStyles();
    const { assignment_id, user, assignment } = props;
    let history = useHistory();

    // handle loding state
    const [loding, setLoading] = useState(true);
    // handling modal and notif
    // const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    });

    // const [submissionId, setSubmissionId] = useState('');
    const [submission1, setSubmission1] = useState();

    // fetch submission list data
    const [subList, setSubList] = useState([]);
    const fetchSubList = useCallback(
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
                        setSubmission1(submission);
                        // console.log('sub', submission);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // fetch all submission ids
                let list = [];
                await assignment.submission_list_ids.forEach((sub_id) => {
                    list.push(sub_id);
                });

                const submissions = [];
                for (const sub_id of list) {
                    let sub;
                    await SubmissionService.getSubmission(sub_id)
                        .then((response) => {
                            sub = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    let user1;
                    await UserService.getUser(sub.user_id)
                        .then((response) => {
                            user1 = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    sub['user_name'] = user1.user_name;
                    sub['user_id'] = user1._id;
                    submissions.push(sub);
                }
                setSubList(submissions);
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

    const headCells = subCellsFaculty;
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
    } = useTable(subList, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value === '') return items;
                else
                    return items.filter(
                        (x) => console.log(x)
                        // x.user_name.toLowerCase().includes(target.value) ||
                        // x.marks.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const sendNlpEvaluation = async (assi_id) => {
        console.log('assi_id', assi_id);
        await AutoEvaluationService.evaluateAssignment(assi_id)
            .then((response) => {
                setNotify({
                    isOpen: true,
                    message: `Edited Successfully`,
                    type: 'success',
                });
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: 'Error to Edit',
                    type: 'error',
                });
            });
    };

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <h1>Assignment Submissions</h1>
                    <br />
                    <Controls.ActionButton
                        color="success"
                        onClick={() => {
                            setNotify({
                                isOpen: true,
                                message: `Added to Queue for Evaluating`,
                                type: 'success',
                            });
                            sendNlpEvaluation(submission1.assignment_id);
                        }}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            textTransform: 'none',
                        }}
                    >
                        Evaluate All
                    </Controls.ActionButton>
                </Toolbar>
                {/* <Toolbar>
                    <hr />
                </Toolbar>
                <Toolbar>
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

                {loding === false && user ? (
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {subList.length ? (
                                recordsAfterPagingAndSorting().map((item) => (
                                    <TableRow key={item._id}>
                                        {console.log('List', item)}

                                        {/* <TableCell>{item._id}</TableCell> */}
                                        <TableCell>{item.user_name}</TableCell>
                                        <TableCell>{item.marks}</TableCell>
                                        <TableCell>
                                            {item.evaluated_no_qna}/
                                            {submission1.qna_list_ids.length}
                                        </TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="success"
                                                onClick={() => {
                                                    history.push(
                                                        `/${user.role}/assignment/${assignment_id}/student/${item._id}`
                                                    );
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
                ) : (
                    <Loding />
                )}
                <TblPagination />
            </Paper>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
}
