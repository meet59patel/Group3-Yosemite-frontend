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
    StudentQnAService,
    UserService,
} from '../../services/apis.service';
import { qurCellsFaculty } from '../../services/tableHeadCells';
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

const AssignmentQuery = (props) => {
    const classes = useStyles();
    const { assignment_id, user, assignment } = props;
    let history = useHistory();

    // handle loding state
    const [loding, setLoading] = useState(true);

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
                // console.log('assigment', assignment);
                // fetch faculty submission
                let submission;
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

                let faculty_qna_list = [];
                await submission.qna_list_ids.forEach((qna_id) => {
                    faculty_qna_list.push(qna_id);
                });

                const faculty_qnas = [];
                for (const qna_id of faculty_qna_list) {
                    let qna;
                    await FacultyQnAService.getQnA(qna_id)
                        .then((response) => {
                            qna = response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    if (qna) {
                        faculty_qnas[qna._id] = qna;
                    }
                }
                await setFacultyQnAList(faculty_qnas);

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
                                // console.log(error);
                            });
                        if (qna && qna.query_flag) {
                            // console.log('qna added', qna);
                            qur = qna;
                            qur['user_name'] = user.user_name;
                            qur['question'] = '123';
                            // console.log(
                            //     'facultyQnaList',
                            //     facultyQnAList,
                            //     qna.qna_faculty_id
                            // );
                            // facultyQnAList[qna.qna_faculty_id].question;
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
                        (x) =>
                            x.question.toLowerCase().includes(target.value) ||
                            x.query_description
                                .toLowerCase()
                                .includes(target.value) ||
                            x.user_name.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <h1>Assignment Queries</h1>
                </Toolbar>
                <Toolbar>
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
                </Toolbar>

                {loding ? (
                    <Loding />
                ) : (
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {qurList.length ? (
                                recordsAfterPagingAndSorting().map((item) => (
                                    <TableRow key={item._id}>
                                        {console.log(
                                            'faculty Submission',
                                            submission1
                                        )}
                                        {console.log(
                                            'faculty qna',
                                            facultyQnAList
                                        )}
                                        {console.log('item', item)}
                                        {console.log(
                                            'item.qna_faculty_id',
                                            item.qna_faculty_id
                                        )}
                                        {console.log(
                                            'facultyQnAList[item.qna_faculty_id]',
                                            facultyQnAList[item.qna_faculty_id]
                                        )}
                                        <TableCell>{item.user_name}</TableCell>
                                        <TableCell>
                                            {facultyQnAList[
                                                item.qna_faculty_id
                                            ] ? (
                                                facultyQnAList[
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
                                            {item.final_marks}
                                        </TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="success"
                                                onClick={() => {
                                                    // todo: add link for student submission
                                                    // console.log(item);
                                                    // history.push(
                                                    //     `assignment/${item._id}`
                                                    // );
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
        </>
    );
};

export default AssignmentQuery;
