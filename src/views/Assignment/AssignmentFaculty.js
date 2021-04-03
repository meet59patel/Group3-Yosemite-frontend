import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import AssignmentSubmissions from '../../components/Assignments/AssignmentSubmissions';
import AssignmentQnA from '../../components/Assignments/AssignmentQnA';
import AssignmentQuery from '../../components/Assignments/AssignmentQuery';
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

function AssignmentFaculty(props) {
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
                        to={`/faculty/assignment/${paperId}/qna`}
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Query"
                        to={`/faculty/assignment/${paperId}/qur`}
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Submission"
                        to={`/faculty/assignment/${paperId}/sub`}
                    ></SideMenu.NavButton>
                    <SideMenu.BackButton
                        text="Back"
                        to={
                            path.pathname === `/faculty/assignment/${paperId}`
                                ? '/faculty/assignments'
                                : `/faculty/assignment/${paperId}`
                        }
                    ></SideMenu.BackButton>
                </SideMenu>
                <Switch>
                    <Route path="/faculty/assignment/:paperId/qna">
                        <AssignmentQnA paperId={paperId} user={user} />
                    </Route>
                    <Route path="/faculty/assignment/:paperId/qur">
                        <AssignmentQuery paperId={paperId} user={user} />
                    </Route>
                    <Route path="/faculty/assignment/:paperId/sub">
                        <AssignmentSubmissions paperId={paperId} user={user} />
                    </Route>
                    <Route path="/faculty">
                        <Welcome>{}</Welcome>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AssignmentFaculty;
