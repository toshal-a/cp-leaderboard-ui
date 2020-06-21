import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
    paddingBottom: 200,
    [theme.breakpoints.down("md")]: {
      paddingTop: 60,
      paddingBottom: 60,
    },
  },
  image: {
    perspectiveOrigin: "left center",
    transformStyle: "preserve-3d",
    perspective: 1500,
    "& > img": {
      maxWidth: "90%",
      height: "auto",
      transform: "rotateY(-35deg) rotateX(15deg)",
      backfaceVisibility: "hidden",
      boxShadow: theme.shadows[16],
    },
  },
  shape: {
    position: "absolute",
    top: 0,
    left: 0,
    "& > img": {
      maxWidth: "90%",
      height: "auto",
    },
  },
}));

function Hero({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="overline" color="secondary">
                Introducing
              </Typography>
              <Typography variant="h1" color="textPrimary">
                LeaderBored
              </Typography>
              <Box mt={3}>
                <Typography variant="h3" color="textSecondary">
                  A leaderboard for competitive programmers.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box position="relative">
              <div className={classes.image}>
                <img
                  alt="Presentation"
                  src="/static/home/undraw_visual_data_b1wx.svg"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string,
};

export default Hero;
