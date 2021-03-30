import React, { useState } from "react";
import useTable from "../useTable";
import * as assignmentService from "./AssignmentService";
import Controls from "../controls/Controls";
import Popup from "../Popup";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import {
    Paper,
    makeStyles,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import AssignmentForm from "./AssignmentForm";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: "75%",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
}));

const headCells = [
    { id: "assId", label: "Assignment Id" },
    { id: "assName", label: "Name" },
    { id: "assDate", label: "Date" },
    { id: "startTime", label: "Time" },
    // { id: "duration", label: "Duration" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions", disableSorting: true },
];

export default function Assignments() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState(
        assignmentService.getAllAssignments()
    );
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
    });

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value === "") return items;
                else
                    return items.filter(
                        (x) =>
                            x.assName.toLowerCase().includes(target.value) ||
                            x.assId.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const addOrEdit = (assignment, resetForm) => {
        if (assignment.id === 0) assignmentService.insertAssignment(assignment);
        else assignmentService.updateAssignment(assignment);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setRecords(assignmentService.getAllAssignments());
        setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            type: "success",
        });
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
        assignmentService.deleteAssignment(id);
        setRecords(assignmentService.getAllAssignments());
        setNotify({
            isOpen: true,
            message: "Deleted Successfully",
            type: "error",
        });
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
                        {recordsAfterPagingAndSorting().map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.assId}</TableCell>
                                <TableCell>{item.assName}</TableCell>
                                <TableCell>
                                    {item.assDate.slice(0, 10)}
                                </TableCell>
                                <TableCell>
                                    {item.startTime.slice(11, 16)}
                                </TableCell>
                                {/* <TableCell>{item.duration}</TableCell> */}
                                <TableCell>{item.status}</TableCell>
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
                                                    "Are you sure to delete this record?",
                                                subTitle:
                                                    "You can't undo this operation",
                                                onConfirm: () => {
                                                    onDelete(item.id);
                                                },
                                            });
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton>
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



