import React from 'react';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import AdminDashboard from '../admin/AdminDashboard';
import FacultyDashboard from '../faculty/FacultyDashboard';
import AssignmentStatusSubmission from '../faculty/AssignmentStatusSubmission';
import AssignmentStatusQuery from '../faculty/AssignmentStatusQuery';
import AssignmentStatusQnA from '../faculty/AssignmentStatusQnA';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333996',
            light: '#3c44b126',
        },
        secondary: {
            main: '#f83245',
            light: '#f8324526',
        },
        background: {
            default: '#f4f5fd',
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)',
            },
        },
    },
    props: {
        MuiIconButton: {
            disableRipple: true,
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AdminDashboard />
            <FacultyDashboard />
            <AssignmentStatusSubmission />
            <AssignmentStatusQuery />
            <AssignmentStatusQnA />
        </ThemeProvider>
    );
}

export default App;
