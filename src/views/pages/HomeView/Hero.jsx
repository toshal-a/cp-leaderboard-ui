import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginView from "views/auth/LoginView";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 120,
    paddingBottom: 120,
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
        <Grid container alignItems="center">
          <Grid container justify="center" item xs={12} md={7} lg={8}  xl={8}>
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography variant="overline" color="secondary">
                  Introducing
                </Typography>
                <Typography variant="h1" color="textPrimary">
                  CP-Leaderboard
                </Typography>
                <Box mt={3}>
                  <Typography variant="h3" color="textSecondary">
                    A leaderboard for competitive programmers.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
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
          <Grid item xs={12} md={5} lg={4} xl={4}>
            <Box my={4}>
            <LoginView />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box pt={6}>
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
        >
          Wanna have a look at Top 10 ? 
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            color="secondary"
            component="a"
            href="https://material-ui.com/store/items/devias-kit-pro"
            variant="contained"
          >
            Click HERE !!
          </Button>
        </Box>
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
