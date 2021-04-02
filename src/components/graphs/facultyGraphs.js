import React from 'react';
import { Grid } from '@material-ui/core';
import { Line } from '@reactchartjs/react-chart.js';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Bar } from '@reactchartjs/react-chart.js';
import { Doughnut } from '@reactchartjs/react-chart.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
const data1 = {
    labels: ['Evaluated', 'Not Evaluated', 'Did Not Got responses'],
    datasets: [
        {
            label: '# of Submissions',
            data: [5, 4, 6],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
const data2 = {
    labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ],
    datasets: [
        {
            label: '# of New Users',
            data: [10, 19, 30, 5, 12, 3, 15],
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
        },
    ],
};

const data = {
    labels: ['Assignned', 'Submitted', 'Not Submitted'],
    datasets: [
        {
            label: '# of Students',
            data: [15, 9, 6],
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};
const options1 = {
    scales: {
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
            },
            {
                type: 'linear',
                display: false,
                position: 'right',
                id: 'y-axis-2',
            },
        ],
    },
};
class FacultyGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.changeDataUsers = this.changeDataUsers.bind(this);
        this.changeDataNewUsers = this.changeDataNewUsers.bind(this);
        this.state = {
            selectedMetric: data1,
        };
    }

    changeDataUsers(event) {
        console.log('Users');
        console.log(this.state.selectedMetric);
        this.setState({
            selectedMetric: data1,
        });
    }
    changeDataNewUsers(event) {
        console.log('New Users');
        console.log(this.state.selectedMetric);
        this.setState({
            selectedMetric: data2,
        });
    }
    render() {
        return (
            <Container maxWidth={false} component={Box} mt={10}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        pr={2}
                        component={Box}
                        marginBottom="3rem!important"
                    >
                        <Card>
                            <CardHeader
                                subheader={
                                    <Grid
                                        container
                                        component={Box}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Grid item xs="auto">
                                            <Box
                                                component={Typography}
                                                variant="h4"
                                                marginBottom="0!important"
                                            >
                                                <Box component="span">
                                                    No of Students
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                            ></CardHeader>
                            <CardContent>
                                <Box position="relative" height="350px">
                                    <Bar data={data} options={options} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        component={Box}
                        marginBottom="3rem!important"
                    >
                        <Card>
                            <CardHeader
                                subheader={
                                    <Grid
                                        container
                                        component={Box}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Grid item xs="auto">
                                            <Box
                                                component={Typography}
                                                variant="h4"
                                                marginBottom="0!important"
                                            >
                                                <Box component="span">
                                                    No of Submissions
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                            ></CardHeader>
                            <CardContent>
                                <Box position="relative" height="350px">
                                    <Doughnut data={data1} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default FacultyGraphs;
