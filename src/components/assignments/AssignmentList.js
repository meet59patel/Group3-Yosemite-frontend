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
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentForm from './AssignmentForm';
import {
    UserService,
    AssignmentService,
    SubmissionService,
    FacultyQnAService,
    StudentQnAService,
} from '../../services/apis.service';
import {
    assiCellsAdmin,
    assiCellsFaculty,
    assiCellsStudent,
} from '../../services/tableHeadCells';
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
    const user = props.user;
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
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
    });

    // todo: for student fetch assignment which he submitted
    // todo: also for student fetch assignment whose show flag is true
    // todo: for admin show all assignment
    // fetch assignment data
    const [assiList, setAssiList] = useState([]);
    const fetchAssiList = useCallback(async (user) => {
        if (user) {
            if (user.role === 'faculty') {
                await AssignmentService.getFacultyAssignments(user)
                    .then(async (response) => {
                        const list = response.data.assignments;
                        await setAssiList(list);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (user.role === 'student') {
                await AssignmentService.getStudentAssignments(user)
                    .then(async (response) => {
                        const list = response.data.assignments;
                        await setAssiList(list);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                await AssignmentService.getAllAssignments(user)
                    .then(async (response) => {
                        const list = response.data.assignments;
                        await setAssiList(list);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, []);
    useEffect(() => {
        fetchAssiList(user);
    }, [fetchAssiList, user]);

    // For table part
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const headCells =
        user.role === 'admin'
            ? assiCellsAdmin
            : user.role === 'faculty'
            ? assiCellsFaculty
            : assiCellsStudent;

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(assiList, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value === '') return items;
                else
                    return items.filter(
                        (x) =>
                            x.assignment_name
                                .toLowerCase()
                                .includes(target.value) ||
                            x.subject_name
                                .toLowerCase()
                                .includes(target.value) ||
                            x.faculty_id.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const [recordForEdit, setRecordForEdit] = useState(null);

    const addOrEdit = async (assignment, resetForm) => {
        // console.log('aasign', assignment);
        if (assignment.id === 0 && user) {
            // create new submission
            let new_submission;
            await SubmissionService.createSubmission({
                user_id: assignment.faculty_id,
                assignment_id: assignment.faculty_id,
            })
                .then((response) => {
                    // console.log('res', response.data);
                    new_submission = response.data.submission;
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to Create F_Submission',
                        type: 'error',
                    });
                });
            assignment.faculty_submission_id = new_submission._id;
            let new_assignment_id;
            await AssignmentService.createAssignment(assignment)
                .then((response) => {
                    setNotify({
                        isOpen: true,
                        message: `Created Successfully`,
                        type: 'success',
                    });
                    // console.log('createAssignment response', response.data);
                    new_assignment_id = response.data.assignment._id;
                    fetchAssiList();
                })
                .catch((error) => {
                    console.log('error to create new assi', error);
                    setNotify({
                        isOpen: true,
                        message: 'Error to Create',
                        type: 'error',
                    });
                });

            // console.log('created aasign', new_assignment_id);
            // update submission's assignment id to real once
            await SubmissionService.updateSubmission(new_submission._id, {
                assignment_id: new_assignment_id,
            })
                .then((response) => {
                    // console.log(
                    //     'update assignment id to submission',
                    //     response.data
                    // );
                    // studentSubmission = response.data.submission;
                })
                .catch((error) => {
                    console.log('error to create sub for stu', error);
                });

            //  add new submission id to user data
            await UserService.updateUser(user._id, {
                push_assisub_id: new_submission._id,
            })
                .then((response) => {
                    console.log(
                        'added submission id to users list',
                        response.data
                    );
                })
                .catch((error) => {
                    console.log('error to create sub for stu', error);
                });
            fetchAssiList(user);
            console.log('finallly created');
        } else {
            await AssignmentService.updateAssignment(assignment._id, assignment)
                .then((response) => {
                    setNotify({
                        isOpen: true,
                        message: `Edited Successfully`,
                        type: 'success',
                    });
                    fetchAssiList(user);
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to Edit',
                        type: 'error',
                    });
                });
        }
        fetchAssiList(user);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    const onDelete = async (assignment) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        console.log('delete assignmnet requested');
        // delete all student submittion
        for (let sub_id of assignment.submission_list_ids) {
            // delete all submissions qna
            // first fetch sub
            let submission;
            await SubmissionService.getSubmission(sub_id)
                .then((response) => {
                    submission = response.data;
                    console.log('fetched student submission');
                })
                .catch((error) => {
                    console.log('error to find sub', error);
                });
            // then delete all qna
            for (let qna_id of submission.qna_list_ids) {
                StudentQnAService.deleteQnA(qna_id)
                    .then((response) => {
                        console.log('delete qna from student submission');
                    })
                    .catch((error) => {
                        console.log('error to delete qna', error);
                    });
            }
            console.log('all student qna delete');

            // then remove this from student
            await UserService.updateUser(submission.user_id, {
                remove_assisub_id: submission._id,
            })
                .then((response) => {
                    console.log('remove submission id from student list');
                })
                .catch((error) => {
                    console.log('error to update user', error);
                });
        }

        // delete all qna from faculty
        // first fetch faculty sub
        let fsubmission;
        await SubmissionService.getSubmission(assignment.faculty_submission_id)
            .then((response) => {
                fsubmission = response.data;
                console.log('faculty submission fetched');
            })
            .catch((error) => {
                console.log('error to find sub', error);
            });
        // delete all qna from faculty qna
        for (let qna_id of fsubmission.qna_list_ids) {
            FacultyQnAService.deleteQnA(qna_id)
                .then((response) => {
                    console.log('faculty qna deleted');
                })
                .catch((error) => {
                    console.log('error to delete qna', error);
                });
        }
        // then remove this from faculty
        await UserService.updateUser(assignment.faculty_id, {
            remove_assisub_id: fsubmission._id,
        })
            .then((response) => {
                console.log('remove submission id from faculty list');
            })
            .catch((error) => {
                console.log('error to update user', error);
            });

        // delete assignment
        await AssignmentService.deleteAssignment(assignment._id)
            .then((response) => {
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'success',
                });
                console.log('assignment deleted successfully');
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: 'Error to delete',
                    type: 'error',
                });
                console.log(error);
            });
        console.log('finallly delete complete assignment');
        fetchAssiList(user);
    };

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Assignments"
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
                    {user.role !== 'student' && (
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => {
                                setOpenPopup(true);
                                setRecordForEdit(null);
                            }}
                        />
                    )}
                </Toolbar>

                {loding && assiList ? (
                    <Loding />
                ) : (
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {assiList &&
                                recordsAfterPagingAndSorting().map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            {item.assignment_name}
                                        </TableCell>
                                        <TableCell>
                                            {item.subject_name}
                                        </TableCell>
                                        {(user.role === 'admin' ||
                                            user.role === 'student') && (
                                            <TableCell>
                                                {item.faculty_id}
                                            </TableCell>
                                        )}
                                        {/* <TableCell>
                                        {item.deadline.slice(0, 10)}
                                        {' - '}
                                        {item.deadline.slice(11, 19)}
                                    </TableCell> */}
                                        {(user.role === 'admin' ||
                                            user.role === 'faculty') && (
                                            <TableCell>
                                                {item.total_marks}
                                            </TableCell>
                                        )}

                                        {(user.role === 'admin' ||
                                            user.role === 'faculty') && (
                                            <TableCell>
                                                {item.is_show
                                                    ? 'Open'
                                                    : 'Hidden'}
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            {(user.role === 'student' ||
                                                user.role === 'admin' ||
                                                user.role === 'faculty') && (
                                                <Controls.ActionButton
                                                    color="success"
                                                    onClick={() => {
                                                        history.push(
                                                            `assignment/${item._id}`
                                                        );
                                                    }}
                                                >
                                                    <OpenInNewIcon fontSize="small" />
                                                </Controls.ActionButton>
                                            )}
                                            {(user.role === 'admin' ||
                                                user.role === 'faculty') && (
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => {
                                                        openInPopup(item);
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="small" />
                                                </Controls.ActionButton>
                                            )}
                                            {(user.role === 'admin' ||
                                                user.role === 'faculty') && (
                                                <Controls.ActionButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title:
                                                                'Are you sure to delete this Assignment?',
                                                            subTitle:
                                                                "You can't undo this operation",
                                                            onConfirm: () => {
                                                                onDelete(item);
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </Controls.ActionButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </TblContainer>
                )}

                <TblPagination />
            </Paper>
            <Popup
                title="Assignment Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AssignmentForm
                    recordForEdit={recordForEdit}
                    user={user}
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
}
