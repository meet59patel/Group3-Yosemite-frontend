import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import AssignmentSubmissions from '../../components/assignments/AssignmentSubmissions';
import AssignmentQnA from '../../components/assignments/AssignmentQnA';
import AssignmentQuery from '../../components/assignments/AssignmentQuery';
import Welcome from '../../components/Welcome';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

const ASSIGNMENT = {
    assId: '123',
    assName: 'abc',
    assDate: '2021-03-19',
    startTime: '17:30',
    duration: '60', //in minutes
    statusId: '1',
};

function AssignmentAdmin(props) {
    const classes = useStyles();
    const path = useLocation();
    const { id } = useParams();
    const { user } = props;
    const paperId = id;

    return (
        <div>
            <Header headerTitle="Assignment 123 Submissions" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.AssignmentProfile assignment={ASSIGNMENT} />
                    <SideMenu.NavButton
                        text="QnA"
                        to={`/admin/assignment/${paperId}/qna`}
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Query"
                        to={`/admin/assignment/${paperId}/qur`}
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Submission"
                        to={`/admin/assignment/${paperId}/sub`}
                    ></SideMenu.NavButton>
                    <SideMenu.BackButton
                        text="Back"
                        to={
                            path.pathname === `/admin/assignment/${paperId}`
                                ? '/admin/assignments'
                                : `/admin/assignment/${paperId}`
                        }
                    ></SideMenu.BackButton>
                </SideMenu>
                <Switch>
                    <Route path="/admin/assignment/:paperId/qna">
                        <AssignmentQnA paperId={paperId} user={user} />
                    </Route>
                    <Route path="/admin/assignment/:paperId/qur">
                        <AssignmentQuery paperId={paperId} user={user} />
                    </Route>
                    <Route path="/admin/assignment/:paperId/sub">
                        <AssignmentSubmissions paperId={paperId} user={user} />
                    </Route>
                    <Route path="/admin">
                        <Welcome>{}</Welcome>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AssignmentAdmin;
