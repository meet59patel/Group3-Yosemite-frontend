import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    IconButton,
    Badge,
    makeStyles,
    MenuItem,
    Popover,
    Button,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import Popup from './Popup';
import Notification from './Notification';
import { useUserDispatch, signOut } from './context/UserContext';
import { UserService } from './../services/apis.service';
import Controls from './controls/Controls';
import { useForm, Form } from './useForm';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
    },
    logo: {
        color: 'black',
        fontSize: '25px',
        fontWeight: 'bolder',
    },
    navlist: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navitem: {
        color: 'black',
        fontSize: '15px',
        // backgroundColor: "pink",
        padding: '10px',
        margin: '10px',
    },
}));

export default function Header({ children, headerTitle = '', user }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    let userDispatch = useUserDispatch();
    let history = useHistory();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // for modal
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const addOrEdit = async (user, resetForm) => {
        await UserService.updateUser(user._id, user)
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
        handleClose();
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <Link to="/">
                            <div className={classes.logo}>Yosemite</div>
                        </Link>
                    </Grid>
                    <Grid item sm>
                        <div className={classes.navlist}>
                            {headerTitle !== '' ? (
                                <div className={classes.navitem}>
                                    {headerTitle}
                                </div>
                            ) : null}
                            {/* <div className={classes.navitem}>Faculty</div> */}
                            {/* <div className={classes.navitem}>Admin</div> */}
                        </div>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <Button aria-describedby={id} onClick={handleClick}>
                            {/* <IconButton
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            > */}
                            <AccountCircleIcon color="disabled" />
                            {/* </IconButton> */}
                        </Button>

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            style={{ background: 'transparent' }}
                        >
                            {user && (
                                <MenuItem>
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                        style={{
                                            marginTop: '5px',
                                            padding: '8px',
                                            background: 'white',
                                            textTransform: 'none',
                                        }}
                                        onClick={() => {
                                            console.log('edit profile');
                                            openInPopup(user);
                                        }}
                                        startIcon={<EditOutlinedIcon />}
                                    >
                                        Edit profile
                                    </Button>
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() => console.log('Logging out...')}
                            >
                                <GoogleLogout
                                    clientId={GOOGLE_CLIENT_ID}
                                    buttonText="Log Out"
                                    onLogoutSuccess={() => {
                                        signOut(userDispatch, history);
                                    }}
                                    onFailure={console.log}
                                />
                                {/* Log out */}
                            </MenuItem>
                        </Popover>
                    </Grid>
                </Grid>
            </Toolbar>
            <Popup
                title="Edit Profile"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </AppBar>
    );
}

const initialFValues = {
    user_name: '',
};

const UserForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('user_name' in fieldValues)
            temp.user_name = fieldValues.user_name
                ? ''
                : 'This field is required.';
        if ('email' in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ''
                : 'Email is not valid.';
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? '' : 'This field is required.';
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
    } = useForm(initialFValues, true, validate);

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
        <Form onSubmit={handleSubmit}>
            <Grid style={{ width: '500px' }}>
                <Controls.Input
                    name="user_name"
                    label="User Name"
                    value={values.user_name}
                    onChange={handleInputChange}
                    error={errors.user_name}
                    style={{ width: '95%' }}
                />
                <Controls.Input
                    name="email"
                    label="Email"
                    value={values.email}
                    // onChange={handleInputChange}
                    error={errors.email}
                    disabled={true}
                    style={{ width: '95%' }}
                />
                <Controls.Input
                    name="role"
                    label="Role"
                    value={values.role}
                    // onChange={handleInputChange}
                    // options={getRoleCollection()}
                    error={errors.role}
                    disabled={true}
                    style={{ width: '95%' }}
                />
                <div style={{ float: 'right', marginTop: '20px' }}>
                    <Controls.Button type="submit" text="Save" />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm}
                    />
                </div>
                <p
                    style={{
                        marginTop: '45px',
                        marginLeft: '20px',
                        color: 'grey',
                    }}
                >
                    refresh page after save to see changes
                </p>
            </Grid>
        </Form>
    );
};
