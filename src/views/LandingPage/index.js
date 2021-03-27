import React from 'react';
import './index.css';
import { Grid } from '@material-ui/core';
import HeroImg from '../../assets/img/hero-img.png';
import Whyus from '../../assets/img/why-us.png';
import Header from '../../components/Header/index.js';
import { Container } from '@material-ui/core';
import DoneAllSharpIcon from '@material-ui/icons/DoneAllSharp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SportsVolleyballOutlinedIcon from '@material-ui/icons/SportsVolleyballOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SpeedIcon from '@material-ui/icons/Speed';
import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import CardMedia from '@material-ui/core/CardMedia';
import ScrollUpButton from 'react-scroll-up-button';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
const card = makeStyles({
    root: {
        minWidth: 220,
        minHeight: 215,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function LandingPage() {
    const classes = useStyles();
    const cardclass = card();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div className="App">
            <Header />
            <Grid container id="hero" alignItems="center">
                <Grid item md={6} justifyContent="center">
                    <h1>Automated Solution For Evaluating Assignments</h1>
                    <Link to="/login">
                        <Button variant="contained" className="btn-get-started">
                            Log In
                        </Button>
                    </Link>
                    <Link to="/github" target="_blank">
                        <Button variant="contained" className="btn-get-code">
                            GitHub
                        </Button>
                    </Link>
                </Grid>
                <Grid
                    item
                    md={6}
                    className="hero-img"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        src={HeroImg}
                        className="img-fluid animated"
                        width="70%"
                    />
                </Grid>
            </Grid>
            <Container className="about">
                <div className="section-title">
                    <h2>About Us</h2>
                </div>
                <Grid container alignItems="center">
                    <p>
                        <b>
                            <i>Yosemite</i>
                        </b>{' '}
                        is an Automatic Answer Checker application that checks
                        and evaluates written answers
                    </p>
                    <Grid item md={6} mr={2} justifyContent="center">
                        <List dense="true">
                            <ListItem>
                                <ListItemIcon>
                                    <DoneAllSharpIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                Provide assistance to the professors and faculty
                                members in online-based education system
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneAllSharpIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                Runs on a Machine Learning based model and looks
                                for semantic similar answers
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneAllSharpIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                Shows the similarity index and score
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={6} justifyContent="center">
                        <List dense="true">
                            <ListItem>
                                <ListItemIcon>
                                    <DoneAllSharpIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                Easy for students to manage assignments
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneAllSharpIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                Easy for teachers to evalute assignments
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneAllSharpIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                Easy to maintain assignments
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>
            <Grid container className="why-us section-bg">
                <Grid item sm={10} md={7} className="accordion-list content">
                    <h3>Most Asked Queries</h3>
                    <Accordion
                        expanded={expanded === 'panel1'}
                        onChange={handleChange('panel1')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>
                                Will this site work on Mobile phone?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Yes, you can access this site from any device
                                using any web browser
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === 'panel2'}
                        onChange={handleChange('panel2')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography className={classes.heading}>
                                Why does site ask to login again in the same
                                session
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                It may be due to unstable internet connection.
                                Please ensure that a stable internet
                                connectivity is provided.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === 'panel3'}
                        onChange={handleChange('panel3')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography className={classes.heading}>
                                How do I sign Up?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                We use your email registered with college. Log
                                In directly using your institute email or try
                                contacting your college in case of new mail
                                addition.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid
                    item
                    md={4}
                    className="img"
                    justifyContent="center"
                    alignContent="center"
                >
                    <img src={Whyus} className="img" />
                </Grid>
            </Grid>
            <Grid container className="services section-bg" alignItems="center">
                <Container>
                    <div class="section-title">
                        <h2>Features</h2>
                        <p>
                            This are the some of the main features of our
                            webapp.
                        </p>
                    </div>
                </Container>
                <Grid item xs={12} sm={6} md={3} className="icon-box">
                    <Card className={cardclass.root} variant="outlined">
                        <CardContent className="icon">
                            <SportsVolleyballOutlinedIcon
                                color="primary"
                                fontSize="large"
                            />
                            <Typography variant="h5" component="h2">
                                Access from anywhere,anytime
                            </Typography>

                            <Typography variant="body2" component="p">
                                Web based app, you only need a internet
                                connection and a device to access internet.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className="icon-box">
                    <Card className={cardclass.root} variant="outlined">
                        <CardContent>
                            <DescriptionOutlinedIcon
                                color="primary"
                                fontSize="large"
                            />
                            <Typography variant="h5" component="h2">
                                Many format supported
                            </Typography>

                            <Typography variant="body2" component="p">
                                Upload answers in any format. Free from need to
                                convert your answers to doc, txt format.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className="icon-box">
                    <Card className={cardclass.root} variant="outlined">
                        <CardContent>
                            <SpeedIcon color="primary" fontSize="large" />
                            <Typography variant="h5" component="h2">
                                Low internet usage
                            </Typography>

                            <Typography variant="body2" component="p">
                                Simple and elegant design. Save on your internet
                                data.Site load only once per page.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className="icon-box">
                    <Card className={cardclass.root} variant="outlined">
                        <CardContent>
                            <LayersOutlinedIcon
                                color="primary"
                                fontSize="large"
                            />
                            <Typography variant="h5" component="h2">
                                No need to update
                            </Typography>

                            <Typography variant="body2" component="p">
                                You don't need to download any update anytime.
                                Just visit the site and start using.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid
                container
                id="team"
                className="team section-bg"
                alignItems="center"
            >
                <Container>
                    <div class="section-title">
                        <h2>Team</h2>
                    </div>
                </Container>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Chirag Gupta
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801188</span>
                                <p>201801188@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Arkaprabha Banerjee
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801408</span>
                                <p>201801408@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Rahil Shah
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801252</span>
                                <p>201801252@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Kartavi Shah
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801426</span>
                                <p>201801426@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Archit Agrawal
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801043</span>
                                <p>201801043@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Amruthsai Jilla
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801069</span>
                                <p>201801069@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Meet Patel
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801415</span>
                                <p>201801415@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Bhagyesh Ganatra
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801047</span>
                                <p>201801047@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Ridham Suvagiya
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801006</span>
                                <p>201801006@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} className="member">
                    <Card>
                        <CardMedia
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent className="member-info">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Udit Meena
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                <span>201801095</span>
                                <p>201801095@daiict.ac.in</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <ScrollUpButton />
        </div>
    );
}
