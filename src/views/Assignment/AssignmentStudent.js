import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
// import AssignmentSubmissions from '../../components/Assignments/AssignmentSubmissions';
import StudentQnA from '../../components/assignments/StudentQnA';
import StudentQuery from '../../components/assignments/StudentQuery';
import Welcome from '../../components/Welcome';
import { UserService, AssignmentService } from '../../services/apis.service';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

function AssignmentStudent(props) {
    const classes = useStyles();
    const { user_id } = props;
    const path = useLocation();
    const { id } = useParams();
    const assignment_id = id;

    // fetch user
    const [user, setUser] = useState([]);
    const fetchUser = useCallback(() => {
        // console.log(user_id);
        UserService.getUser(user_id)
            .then((res) => {
                // console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user_id]);
    useEffect(() => {
        fetchUser(user_id);
    }, [fetchUser, user_id]);

    // fetch assignment
    const [assignment, setAssignment] = useState([]);
    const fetchAssignment = useCallback(() => {
        // console.log('user from assi stude', user);
        AssignmentService.getAssignment(assignment_id)
            .then((res) => {
                // console.log(res.data);
                setAssignment(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [assignment_id]);
    useEffect(() => {
        fetchAssignment(assignment_id);
    }, [fetchAssignment, assignment_id]);

    return (
        <div>
            <Header
                headerTitle={`Student > Assignment > ${
                    assignment.assignment_name
                } ${
                    path.pathname.length > 44
                        ? path.pathname.slice(45) === 'run'
                            ? '> Questions'
                            : path.pathname.slice(45) === 'sub'
                            ? '> Submission list'
                            : '> Query list'
                        : '> Dashboard'
                } `}
            />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.AssignmentProfile assignment={assignment} />
                    <SideMenu.NavButton
                        text="Question Paper"
                        to={`/student/assignment/${assignment_id}/run`}
                    ></SideMenu.NavButton>
                    {/* TODO: put query list */}
                    {/* <SideMenu.NavButton
                        text="Query"
                        to={`/student/assignment/${assignment_id}/qur`}
                    ></SideMenu.NavButton> */}
                    <SideMenu.BackButton
                        text="Assignment list"
                        to={
                            path.pathname ===
                            `/student/assignment/${assignment_id}`
                                ? '/student/assignments'
                                : `/student/assignment/${assignment_id}`
                        }
                    ></SideMenu.BackButton>
                </SideMenu>
                <Switch>
                    <Route path="/student/assignment/:assignment_id/run">
                        <StudentQnA
                            assignment_id={assignment_id}
                            user={user}
                            assignment={assignment}
                        />
                    </Route>
                    <Route path="/student/assignment/:assignment_id/qur">
                        <StudentQuery
                            assignment_id={assignment_id}
                            user={user}
                            assignment={assignment}
                        />
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
