import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 48,
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Testimonials({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          &quot;There are two ways to write error-free programs; only the third
          one works.
        </Typography>
        <Box mt={6} mb={3} display="flex" justifyContent="center" alignItems="center">
          <Avatar />
          <Box ml={2}>
            <Typography variant="body1" color="textPrimary">
              Alan J. Perlis
              <Typography
                color="textSecondary"
                display="inline"
                component="span"
              >
                , American Computer Scientist
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Divider />
      <Box mt={3} display="flex" justifyContent="center" alignItems="center">
        <Box ml={2}>
          <Typography variant="h4" color="textPrimary">
            Built by
          </Typography>
        </Box>

        <Box ml={2}>
          <Typography variant="body1" color="textPrimary">
            Toshal Agrawal
            <Typography color="textSecondary" display="inline" component="span">
              , IT Batch 2020
            </Typography>
          </Typography>
        </Box>

        <Box ml={2}>
          <Typography variant="body1" color="textPrimary">
            Yakshit Jain
            <Typography color="textSecondary" display="inline" component="span">
              , IT Batch 2020
            </Typography>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

Testimonials.propTypes = {
  className: PropTypes.string,
};

export default Testimonials;
