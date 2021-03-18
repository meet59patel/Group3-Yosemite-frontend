import React from 'react';

import {
    TextField,
    IconButton,
    Button
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteIcon from '@material-ui/icons/Delete'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main:{
        border: `2px solid ${theme.palette.action.disabled}`,
        padding: `5px`,
        margin: `10px`,
        borderRadius: `5px`,
        textAlign:`left`
    },
    del:{
        display:`flex`,
        justifyContent:`space-between`,
        alignItems:`center`
    }
}));

export default function QuestionBoiler(props){
    const classes=useStyles();

    //for Modal Component on Delete
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    /************************************ */

    return(
        <div className={classes.main}>
            <TextField
                multiline
                variant="outlined"
                label= "Question"
                style={{
                    margin: `1%`,
                    width:`98%`
                }}
            />
            <TextField
                multiline
                variant="outlined"
                label= "Referral Answer"
                style={{
                    margin: `1%`,
                    width:`98%`,
                }}
            />
            <div className={classes.del}>
                <TextField
                    variant="outlined"
                    label= "Max Score"
                    style={{
                        margin: `1%`,
                        width:`15%`,
                    }}
                />
                <IconButton onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"Delete this question?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this question?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        </div>
    );
}