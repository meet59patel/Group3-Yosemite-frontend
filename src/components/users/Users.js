import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useTable from '../useTable';
import UserForm from './UserForm';
import Controls from '../controls/Controls';
import Popup from '../Popup';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
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
import CloseIcon from '@material-ui/icons/Close';

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

const headCells = [
    { id: 'username', label: 'User Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'role', label: 'Role' },
    { id: 'actions', label: 'Actions', disableSorting: true },
];

function Users() {
    const classes = useStyles();

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

    // fetching user data
    const [userList, setUserList] = useState([]);
    const fetchUserList = useCallback(() => {
        axios({
            method: 'GET',
            url: 'https://yosemite-sen.herokuapp.com/users',
            headers: {},
            params: {
                language_code: 'en',
            },
        })
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    // For table part
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(userList, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value === '') return items;
                else
                    return items.filter(
                        (x) =>
                            x.username.toLowerCase().includes(target.value) ||
                            x.email.toLowerCase().includes(target.value) ||
                            x.role.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const [recordForEdit, setRecordForEdit] = useState(null);

    const addOrEdit = (user, resetForm) => {
        if (user.id === 0) {
            axios({
                method: 'POST',
                url: 'https://yosemite-sen.herokuapp.com/users',
                headers: {},
                data: user,
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
                    fetchUserList();
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
                url: `https://yosemite-sen.herokuapp.com/users/${user._id}`,
                headers: {},
                data: user,
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
                    fetchUserList();
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

    const onDelete = (email) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        axios({
            method: 'DELETE',
            url: `https://yosemite-sen.herokuapp.com/users/${email}`,
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
                fetchUserList();
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

    return (
        <div>
            <div>
                <div>
                    <Paper className={classes.pageContent}>
                        <Toolbar>
                            <Controls.Input
                                label="Search Users"
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
                                {userList &&
                                    recordsAfterPagingAndSorting().map(
                                        (item) => (
                                            <TableRow key={item._id}>
                                                <TableCell>
                                                    {item.username}
                                                </TableCell>
                                                <TableCell>
                                                    {item.email}
                                                </TableCell>
                                                <TableCell>
                                                    {item.role}
                                                </TableCell>
                                                <TableCell>
                                                    <Controls.ActionButton
                                                        color="primary"
                                                        onClick={() => {
                                                            openInPopup(item);
                                                        }}
                                                    >
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </Controls.ActionButton>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title:
                                                                    'Are you sure to delete this user?',
                                                                subTitle:
                                                                    "You can't undo this operation",
                                                                onConfirm: () => {
                                                                    onDelete(
                                                                        item.email
                                                                    );
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </Controls.ActionButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
                    <Popup
                        title="User Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <UserForm
                            recordForEdit={recordForEdit}
                            addOrEdit={addOrEdit}
                        />
                    </Popup>
                    <Notification notify={notify} setNotify={setNotify} />
                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </div>
            </div>
        </div>
    );
}

export default Users;
