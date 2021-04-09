import React from 'react';
import { Grid } from '@material-ui/core';
import { Line } from '@reactchartjs/react-chart.js';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
const data1 = {
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
            label: '# of Students',
            data: [5, 7, 8, 12, 17, 18, 20],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y-axis-1',
        },
        {
            label: '# of No Faculty',
            data: [2, 2, 5, 7, 7, 8, 8],
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-axis-2',
        },
        {
            label: '# of No Admins',
            data: [1, 1, 1, 2, 2, 2, 2],
            fill: false,
            backgroundColor: 'rgba(153, 102, 255, 1)',
            borderColor: 'rgba(153, 102, 255, 0.2)',
            yAxisID: 'y-axis-2',
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: '# of Tests',
            data: [12, 19, 3, 5, 15, 3],
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
        },
    ],
};

const options = {
    animation: {
        duration: 200, // general animation time
    },
    responsive: true,
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
class AdminGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.changeDataUsers = this.changeDataUsers.bind(this);
        this.changeDataNewUsers = this.changeDataNewUsers.bind(this);
        this.state = {
            selectedMetric: data1,
        };
    }

    changeDataUsers(event) {
        this.setState({
            selectedMetric: data1,
        });
    }
    changeDataNewUsers(event) {
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
                                                    No of Tests
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                            ></CardHeader>
                            <CardContent>
                                <Box position="relative" height="350px">
                                    <Line data={data} options={options} />
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
                                                    No of Users
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Box
                                                justifyContent="flex-end"
                                                display="flex"
                                                flexWrap="wrap"
                                            >
                                                <Button
                                                    variant="contained"
                                                    color={
                                                        this.state
                                                            .selectedMetric ===
                                                        data2
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    component={Box}
                                                    marginRight="1rem!important"
                                                    onClick={
                                                        this.changeDataUsers
                                                    }
                                                >
                                                    Users
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color={
                                                        this.state
                                                            .selectedMetric ===
                                                        data1
                                                            ? 'primary'
                                                            : 'white'
                                                    }
                                                    onClick={
                                                        this.changeDataNewUsers
                                                    }
                                                >
                                                    New Users
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                            ></CardHeader>
                            <CardContent>
                                <Box position="relative" height="350px">
                                    <Line
                                        data={this.state.selectedMetric}
                                        options={options1}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default AdminGraphs;
