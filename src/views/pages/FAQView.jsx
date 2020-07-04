import React from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Page from "components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    height: "100%",
    paddingTop: 120,
    paddingBottom: 120,
  },
}));
const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

function FAQView() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Page className={classes.root} title="Frequently Asked Questions">
      <Container maxWidth="sm">
        <Typography align="center" variant="h1" color="textPrimary">
          We're here to help you!
        </Typography>
        <Box mt={3}>
          <Typography align="center" variant="subtitle1" color="textSecondary">
            Frequently Asked Questions
          </Typography>
        </Box>
      </Container>
      <Box mt={5}>
        <Container maxWidth="lg">
          <ExpansionPanel
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <ExpansionPanelSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography color={(expanded === "panel1") ? "primary" : 'inherit'}>
                1) How does this portal help me and why should I register?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                This portal helps you to track and compare your performance with
                your friends in coding contests.
                <br />
                It helps to self analyze your performance in a better way, as it
                ranks you based on your percentile in the contest instead of the
                rating.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <ExpansionPanelSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography color={(expanded === "panel2") ? "primary" : 'inherit'}>
                2) Are there any prizes if we top the leaderboard?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
              Currently, top performers of every month will get recognition. In future, prizes will also be made available.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <ExpansionPanelSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography color={(expanded === "panel3") ? "primary" : 'inherit'}>
                3) Can I track my performance in a particular contest?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Yes, go to the <b>Contest</b> tab -&gt;
                <br /> Select <b>Phase</b> (Before/ Coding/ System Test/
                Finished) of Contest -&gt; <br /> Click on the <b>Standings</b>{" "}
                button on the card of a contest in which you want to track your
                performance.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <ExpansionPanelSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography color={(expanded === "panel4") ? "primary" : 'inherit'}>
                4) How our score for a particular contest is calculated?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                We calculate the percentile score based upon your rank in a
                contest and update the leaderboard accordingly.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <ExpansionPanelSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <Typography color={(expanded === "panel5") ? "primary" : 'inherit'}>
                5) Why percentile-based ranking system, if we already have
                ratings and ranks?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Generally, a rating that you get in contests is based upon your
                previous performance; but rank could be quite misleading as the
                number of participants might vary in different contests. So, a
                percentile-based ranking helps in better analysis of your
                performance.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <ExpansionPanelSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
            >
              <Typography color={(expanded === "panel6") ? "primary" : 'inherit'}>
                6) I am facing some problem / I am having some suggestion. Where can I submit my queries / suggestions?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
               You can submit your queries / suggestions at <Link href={`mailto:feedback@cp-leaderboard.me`}>feedback@cp-leaderboard.me</Link> 
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Container>
      </Box>
    </Page>
  );
}

export default FAQView;
