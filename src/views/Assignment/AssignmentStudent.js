import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
// import AssignmentSubmissions from '../../components/Assignments/AssignmentSubmissions';
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

function AssignmentStudent(props) {
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
                        text="Question Paper"
                        to={`/student/assignment/${paperId}/run`}
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Query"
                        to={`/student/assignment/${paperId}/qur`}
                    ></SideMenu.NavButton>
                    <SideMenu.BackButton
                        text="Back"
                        to={
                            path.pathname === `/student/assignment/${paperId}`
                                ? '/student/assignments'
                                : `/student/assignment/${paperId}`
                        }
                    ></SideMenu.BackButton>
                </SideMenu>
                <Switch>
                    <Route path="/student/assignment/:paperId/run">
                        <AssignmentQnA paperId={paperId} user={user} />
                    </Route>
                    <Route path="/student/assignment/:paperId/qur">
                        <AssignmentQuery paperId={paperId} user={user} />
                    </Route>
                    <Route path="/student">
                        <Welcome>
                            <div>{}</div>
                        </Welcome>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AssignmentStudent;