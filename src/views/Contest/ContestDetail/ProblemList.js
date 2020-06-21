import React from "react";
/* PropTypes from "prop-types";*/
import ColorHash from 'color-hash';
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: { flexGrow: 1 },
}));

function ProblemList({ problems }) {
  const classes = useStyles();
  const colorHash = new ColorHash();
  return (
   
    <Card className={clsx(classes.root)}>
      <Grid container spacing={1}>
        {problems.map((problem) => {
          return (
            <Grid key={problem.name} item lg={4} xl={3} md={4} sm={6} xs={12}>
              <Card variant="outlined">
                <Box p={2}>
                  <Box display="flex" alignItems="center">
                    <Avatar>{problem.index}</Avatar>
                    <Box ml={2}>
                      <Link
                        color="textPrimary"
                        href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                        target="_blank"
                        rel="noopener"
                        variant="h5"
                      >
                        {problem.name}
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box py={2} px={3}>
                  <Grid
                    item
                    alignItems="center"
                    container
                    justify="space-between"
                    spacing={3}
                  >
                    <Grid item>
                      <Typography variant="h5" color="textPrimary">
                        {problem.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Type
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" color="textPrimary">
                        {problem.points}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Points
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" color="textPrimary">
                        {problem.rating}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Rating
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                  <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    overflow="auto"
                  >
                        
                    {problem.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        style={{ borderColor: colorHash.hex(tag + 'CodeTeam') }}
                        variant="outlined"
                      />
                    ))}
                     
                  </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
}
/*
ProblemList.propTypes = {
  problemine: PropTypes.object.isRequired,
};*/

export default ProblemList;
