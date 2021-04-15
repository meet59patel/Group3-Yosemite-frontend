import { makeStyles, Paper } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import { AssignmentService, QnAService } from '../../services/apis.service';
import ViewAssignment from '../../views/ViewAssignment';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}));

const AssignmentQnA = (props) => {
    const classes = useStyles();
    const { paperId, user } = props;

    // fetch assignment data
    // const [questionList, setQuestionList] = useState([]);
    // const fetchAssiList = useCallback((user, paperId) => {
    //     if (user.role === 'student') {
    //         AssignmentService.getAssignmentAllQuestion(paperId)
    //             .then((response) => {
    //                 setQuestionList(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } else {
    //         QnAService.getPaperQnA(paperId)
    //             .then((response) => {
    //                 setQuestionList(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, []);
    // useEffect(() => {
    //     fetchAssiList(user, paperId);
    // }, [fetchAssiList, user, paperId]);

    return (
        <Paper className={classes.pageContent}>
            <ViewAssignment userID={user} questionPaperID={paperId}/>
            {/* <h1>AssignmentQnA</h1>
            <ol>
                {questionList &&
                    questionList.map((question, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>
                                            Qustion :
                                        </span>{' '}
                                        {question.question}
                                    </div>
                                    {user.role !== 'student' && (
                                        <div>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Answer :
                                            </span>{' '}
                                            {question.ansByFaculty}
                                        </div>
                                    )}
                                    {user.role === 'student' && (
                                        <div>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Answer :
                                            </span>{' '}
                                            {}
                                        </div>
                                    )}
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>
                                            Marks :
                                        </span>{' '}
                                        {question.marks}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ol> */}
        </Paper>
    );
};

export default AssignmentQnA;
