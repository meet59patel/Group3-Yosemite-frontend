import React, { useState, useCallback, useEffect } from 'react';
import { AssignmentService, QnAService } from '../../services/apis.service';

const AssignmentQnA = (props) => {
    const { paperId, user } = props;

    // fetch assignment data
    const [questionList, setQuestionList] = useState([]);
    const fetchAssiList = useCallback((user, paperId) => {
        if (user.role === 'student') {
            AssignmentService.getAssignmentAllQuestion(paperId)
                .then((response) => {
                    setQuestionList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            QnAService.getPaperQnA(paperId)
                .then((response) => {
                    setQuestionList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    useEffect(() => {
        fetchAssiList(user, paperId);
    }, [fetchAssiList, user, paperId]);

    return (
        <div>
            <h1>AssignmentQnA</h1>
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
            </ol>
        </div>
    );
};

export default AssignmentQnA;
