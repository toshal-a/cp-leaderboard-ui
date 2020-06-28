import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import CodeIcon from "@material-ui/icons/Code";
import Label from "components/Label";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

function getPhaseLabel(contestType) {
  const map = {
    BEFORE: {
      text: "BEFORE",
      color: "info",
    },
    CODING: {
      text: "CODING",
      color: "success",
    },
    PENDING_SYSTEM_TEST: {
      text: "PENDING_SYSTEM_TEST",
      color: "warning",
    },
    SYSTEM_TEST: {
      text: "SYSTEM_TEST",
      color: "warning",
    },
    FINISHED: {
      text: "FINISHED",
      color: "error",
    },
  };
  const { text, color } = map[contestType];

  return <Label color={color}>{text}</Label>;
}

const useStyles = makeStyles((theme) => ({
  card: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

function ContestCard({ contest, className, ...rest }) {
  const history = useHistory();
  const classes = useStyles();
  const handleContestClick = (e) => {
    e.preventDefault();
    history.push(`/app/contest/${contest.id}`);
  };
  return (
    <Card className={clsx(className)} variant="outlined" {...rest}>
      <Box className={classes.card}>
        <Box p={2}>
          <Box display="flex" alignItems="center">
            <Avatar>
              <CodeIcon />
            </Avatar>
            <Box ml={2}>
              <Link
                color="textPrimary"
                href={`https://codeforces.com/contests/${contest.id}`}
                target="_blank"
                rel="noopener"
                variant="h5"
              >
                {contest.name}
              </Link>
            </Box>
          </Box>
        </Box>
        <Box flexGrow={1} />
        <Box py={2} px={1}>
          <Grid
            item
            alignItems="center"
            container
            justify="space-around"
            spacing={3}
            wrap="nowrap"
          >
            <Grid item>
              <Typography variant="h5" color="textPrimary" align="center">
                {contest.type}
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Type
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="textPrimary" align="center">
                {moment
                  .unix(contest.startTimeSeconds)
                  .format("DD-MM-YYYY HH:mm")}
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Start Time
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="textPrimary" align="center">
                {(contest.durationSeconds / 3600).toString() + "H"}
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Duration
              </Typography>
            </Grid>
          </Grid>
        </Box>
       
        <Divider />
        <Box py={2} pl={2} pr={3} display="flex" alignItems="center">
          {getPhaseLabel(contest.phase)}
          <Box flexGrow={1} />
          <Button
            onClick={handleContestClick}
            variant="outlined"
            color="default"
            disabled={
              contest.phase === "CODING" || contest.phase === "FINISHED"
                ? false
                : true
            }
          >
            Standings
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

ContestCard.propTypes = {
  className: PropTypes.string,
  contest: PropTypes.object.isRequired,
};

export default ContestCard;
