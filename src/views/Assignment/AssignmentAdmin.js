import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import AssignmentSubmissions from '../../components/assignments/AssignmentSubmissions';
import AssignmentQnA from '../../components/assignments/AssignmentQnA';
import AssignmentQuery from '../../components/assignments/AssignmentQuery';
import Welcome from '../../components/Welcome';
import { AssignmentService } from '../../services/apis.service';

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
        minHeight: '100vh',
    },
});

function AssignmentAdmin(props) {
    const classes = useStyles();
    const path = useLocation();
    const { id } = useParams();
    const { user } = props;
    const assignment_id = id;

    // fetch assignment
    const [assignment, setAssignment] = useState([]);
    const fetchAssignment = useCallback(() => {
        // console.log(assignment_id);
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
            <Header headerTitle={`${assignment.assignment_name} Submissions`} />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.AssignmentProfile assignment={assignment} />
                    <SideMenu.NavButton
                        text="QnA"
                        to={`/admin/assignment/${assignment_id}/qna`}
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Query"
                        to={`/admin/assignment/${assignment_id}/qur`}
                    ></SideMenu.NavButton>
                    <SideMenu.NavButton
                        text="Submission"
                        to={`/admin/assignment/${assignment_id}/sub`}
                    ></SideMenu.NavButton>
                    <SideMenu.BackButton
                        text="Back"
                        to={
                            path.pathname ===
                            `/admin/assignment/${assignment_id}`
                                ? '/admin/assignments'
                                : `/admin/assignment/${assignment_id}`
                        }
                    ></SideMenu.BackButton>
                </SideMenu>
                <Switch>
                    <Route path="/admin/assignment/:assignment_id/qna">
                        <AssignmentQnA
                            assignment_id={assignment_id}
                            user={user}
                            assignment={assignment}
                        />
                    </Route>
                    <Route path="/admin/assignment/:assignment_id/qur">
                        <AssignmentQuery
                            assignment_id={assignment_id}
                            user={user}
                            assignment={assignment}
                        />
                    </Route>
                    <Route path="/admin/assignment/:assignment_id/sub">
                        <AssignmentSubmissions
                            assignment_id={assignment_id}
                            user={user}
                            assignment={assignment}
                        />
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
