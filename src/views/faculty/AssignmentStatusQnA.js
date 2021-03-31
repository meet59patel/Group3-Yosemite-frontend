import React from 'react';
import { makeStyles } from '@material-ui/core';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import Assignments from '../../components/Assignments/Assignments';

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

function AssignmentStatusQnA() {
    const classes = useStyles();

    return (
        <div>
            <Header headerTitle="Assignment 123 Q&A" />
            <div className={classes.appMain}>
                <SideMenu>
                    <SideMenu.AssignmentProfile assignment={ASSIGNMENT} />
                    <SideMenu.NavButton
                        text="Submission"
                        to="#"
                        active={false}
                    />
                    <SideMenu.NavButton text="Queries" to="#" active={false} />
                    <SideMenu.NavButton text="Q&A" to="#" active={true} />
                    <SideMenu.BackButton text="Back" to="#" active={false} />
                </SideMenu>
                {/* <Assignments /> */}
            </div>
        </div>
    );
}

export default AssignmentStatusQnA;
