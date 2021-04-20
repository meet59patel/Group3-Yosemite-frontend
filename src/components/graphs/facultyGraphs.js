import React from 'react';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Bar } from '@reactchartjs/react-chart.js';
import { Doughnut } from '@reactchartjs/react-chart.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
let data1 = {
    labels: ['Evaluated', 'Not Evaluated', 'Did Not Got responses'],
    datasets: [
        {
            label: '# of Submissions',
            data: [],
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

let data = {
    labels: ['Assignned', 'Submitted', 'Not Submitted'],
    datasets: [
        {
            label: '# of Students',
            data: [],
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

let options = {
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
const apiLink = 'https://yosemite-sen.herokuapp.com/stats/facultyAnswerInfo/';
class FacultyGraphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: data,
            submissions: data1,
        };
    }
    async componentDidMount() {
        let url = apiLink + this.props.paperId;
        await axios.get(url).then((res) => {
            const results = res.data;
            //console.log(results);
            data1.datasets[0].data[0] = results.evaluted;
            data1.datasets[0].data[1] = results.notEvaluted;
            data1.datasets[0].data[2] =
                results.assigned - results.evaluted - results.notEvaluted;
            data1 = JSON.parse(JSON.stringify(data1)); // DeepCopy
            data.datasets[0].data[0] = results.assigned;
            data.datasets[0].data[1] = results.evaluted + results.notEvaluted;
            data.datasets[0].data[2] =
                results.assigned - results.evaluted - results.notEvaluted;
            data = JSON.parse(JSON.stringify(data)); // DeepCopy
            this.setState({
                students: data,
                submissions: data1,
            });
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
                                    <Bar
                                        data={this.state.students}
                                        options={options}
                                    />
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
                                    <Doughnut data={this.state.submissions} />
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
