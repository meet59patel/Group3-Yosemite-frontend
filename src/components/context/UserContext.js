import React from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS_ADMIN':
            return { ...state, isAuthenticated: true, role: 'admin' };
        case 'LOGIN_SUCCESS_STUDENT':
            return { ...state, isAuthenticated: true, role: 'student' };
        case 'LOGIN_SUCCESS_FACULTY':
            return { ...state, isAuthenticated: true, role: 'faculty' };
        case 'SIGN_OUT_SUCCESS':
            return { ...state, isAuthenticated: false, role: '' };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function UserProvider({ children }) {
    var [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: !!localStorage.getItem('google_token'),
        role: localStorage.getItem('user_role'),
    });

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    var context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return context;
}

function useUserDispatch() {
    var context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

function loginUser(dispatch, history, response, routerState) {
    localStorage.setItem('google_token', response.tokenId);
    // console.log(response.tokenId);
    console.log(response.profileObj.name);
    console.log(response.profileObj.email);

    axios
        .get(`${SERVER_URL}users/${response.profileObj.email}`)
        .then((result) => {
            console.log(result.data);
            const userData = result.data;
            const link =
                (routerState && routerState.from) || `/${userData.role}`;
            if (userData.role === 'admin') {
                dispatch({ type: 'LOGIN_SUCCESS_ADMIN' });
                setUserDataLocalStorage(userData);
                // localStorage.setItem('user_role', userData.role);
                // history.push('/admin');
                history.replace(link);
            } else if (userData.role === 'student') {
                dispatch({ type: 'LOGIN_SUCCESS_STUDENT' });
                setUserDataLocalStorage(userData);
                // localStorage.setItem('user_role', userData.role);
                // history.push('/student');
                history.replace(link);
            } else if (userData.role === 'faculty') {
                dispatch({ type: 'LOGIN_SUCCESS_FACULTY' });
                setUserDataLocalStorage(userData);
                // localStorage.setItem('user_role', userData.role);
                // history.push('/faculty');
                history.replace(link);
            } else {
                // User Role not defined. Handle profile creation
                history.push('/login');
            }
        });
}

function signOut(dispatch, history) {
    deleteUserDataLocalStorage();
    dispatch({ type: 'SIGN_OUT_SUCCESS' });
    history.push('/');
}

function setUserDataLocalStorage(userData) {
    localStorage.setItem('user_id', userData._id);
    localStorage.setItem('user_username', userData.username);
    localStorage.setItem('user_email', userData.email);
    localStorage.setItem('user_role', userData.role);
}

function deleteUserDataLocalStorage() {
    localStorage.removeItem('google_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
}
