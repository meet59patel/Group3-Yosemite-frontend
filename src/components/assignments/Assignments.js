import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
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

const headCellsAdmin = [
    // { id: 'assId', label: 'Assignment Id' },
    { id: 'subjectName', label: 'Subject Name' },
    { id: 'facultyID', label: 'Faculty ID' },
    { id: 'submissionDeadline', label: 'Submission Deadline' },
    { id: 'total', label: 'Total score' },
    // { id: 'assDate', label: 'Date' },
    // { id: 'startTime', label: 'Time' },
    // { id: "duration", label: "Duration" },
    // { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const headCellsFaculty = [
    // { id: 'assId', label: 'Assignment Id' },
    { id: 'subjectName', label: 'Subject Name' },
    // { id: 'facultyID', label: 'Faculty ID' },
    { id: 'submissionDeadline', label: 'Submission Deadline' },
    { id: 'total', label: 'Total score' },
    // { id: 'assDate', label: 'Date' },
    // { id: 'startTime', label: 'Time' },
    // { id: "duration", label: "Duration" },
    // { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

const headCellsStudent = [
    // { id: 'assId', label: 'Assignment Id' },
    { id: 'subjectName', label: 'Subject Name' },
    { id: 'facultyID', label: 'Faculty ID' },
    { id: 'submissionDeadline', label: 'Submission Deadline' },
    { id: 'total', label: 'Total score' },
    // { id: 'assDate', label: 'Date' },
    // { id: 'startTime', label: 'Time' },
    // { id: "duration", label: "Duration" },
    // { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function Assignments(props) {
    const classes = useStyles();
    const user = props.user;

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

    // fetch assignment data
    const [assiList, setAssiList] = useState([]);
    const fetchAssiList = useCallback((user) => {
        axios({
            method: 'GET',
            url:
                user.role === 'faculty'
                    ? `https://yosemite-sen.herokuapp.com/questionpaper/faculty/${user._id}`
                    : 'https://yosemite-sen.herokuapp.com/questionpaper',
            headers: {},
            params: {
                language_code: 'en',
            },
        })
            .then((response) => {
                setAssiList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        fetchAssiList(user);
        console.log(1);
    }, [fetchAssiList, user]);

    // For table part
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const headCells =
        user.role === 'admin'
            ? headCellsAdmin
            : user.role === 'faculty'
            ? headCellsFaculty
            : headCellsStudent;

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
                            x.subjectName
                                .toLowerCase()
                                .includes(target.value) ||
                            x.facultyID.toLowerCase().includes(target.value) ||
                            x.submissionDeadline
                                .toLowerCase()
                                .includes(target.value)
                    );
            },
        });
    };

    const [recordForEdit, setRecordForEdit] = useState(null);

    const addOrEdit = (assignment, resetForm) => {
        if (assignment.id === 0) {
            axios({
                method: 'POST',
                url: 'https://yosemite-sen.herokuapp.com/questions',
                headers: {},
                data: assignment,
                params: {
                    language_code: 'en',
                },
            })
                .then((response) => {
                    setNotify({
                        isOpen: true,
                        message: `Created Successfully`,
                        type: 'success',
                    });
                    fetchAssiList();
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to Create',
                        type: 'error',
                    });
                });
        } else {
            axios({
                method: 'PUT',
                url: `https://yosemite-sen.herokuapp.com/questions/${assignment._id}`,
                headers: {},
                data: assignment,
                params: {
                    language_code: 'en',
                },
            })
                .then((response) => {
                    setNotify({
                        isOpen: true,
                        message: `Edited Successfully`,
                        type: 'success',
                    });
                    fetchAssiList();
                })
                .catch((error) => {
                    setNotify({
                        isOpen: true,
                        message: 'Error to Edit',
                        type: 'error',
                    });
                });
        }
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    const onDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        axios({
            method: 'DELETE',
            url: `https://yosemite-sen.herokuapp.com/questions/${id}`,
            headers: {},
            params: {
                language_code: 'en',
            },
        })
            .then((response) => {
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'error',
                });
                fetchAssiList();
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: 'Error to delete',
                    type: 'error',
                });
                console.log(error);
            });
    };

    const gotoAssignment = (id) => {
        console.log(id);
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
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {assiList &&
                            recordsAfterPagingAndSorting().map((item) => (
                                <TableRow
                                    key={item._id}
                                    onClick={() => {
                                        gotoAssignment(item._id);
                                    }}
                                >
                                    {/* <TableCell>{item.assId}</TableCell> */}
                                    <TableCell>{item.subjectName}</TableCell>
                                    {(user.role === 'admin' ||
                                        user.role === 'student') && (
                                        <TableCell>{item.facultyID}</TableCell>
                                    )}
                                    <TableCell>
                                        {item.submissionDeadline.slice(0, 10)}
                                        {' - '}
                                        {item.submissionDeadline.slice(11, 19)}
                                    </TableCell>
                                    <TableCell>{item.total}</TableCell>
                                    <TableCell>
                                        {(user.role === 'student' ||
                                            user.role === 'admin' ||
                                            user.role === 'faculty') && (
                                            <Controls.ActionButton
                                                color="success"
                                                // onClick={() => {
                                                //     openInPopup(item);
                                                // }}
                                            >
                                                <OpenInNewIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        )}
                                        {(user.role === 'admin' ||
                                            user.role === 'faculty') && (
                                            <Controls.ActionButton
                                                color="primary"
                                                // onClick={() => {
                                                //     openInPopup(item);
                                                // }}
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        )}
                                        {(user.role === 'admin' ||
                                            user.role === 'faculty') && (
                                            <Controls.ActionButton
                                                color="secondary"
                                                // onClick={() => {
                                                //     setConfirmDialog({
                                                //         isOpen: true,
                                                //         title:
                                                //             'Are you sure to delete this Assignment?',
                                                //         subTitle:
                                                //             "You can't undo this operation",
                                                //         onConfirm: () => {
                                                //             onDelete(item.id);
                                                //         },
                                                //     });
                                                // }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Assignment Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AssignmentForm
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
}
