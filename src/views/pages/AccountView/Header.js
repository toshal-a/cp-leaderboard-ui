import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Button,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch } from 'react-redux';
import  { openNewMessage } from './accountSlice';
const useStyles = makeStyles(() => ({
  root: {}
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleFeedbackClick = () => {
    dispatch(openNewMessage());
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
        justify="space-between"
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Grid item>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link color="inherit" to="/app" component={RouterLink}>
              Dashboard
        </Link>
            <Typography color="textPrimary">
              Account
        </Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Settings
      </Typography>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleFeedbackClick}
          >
            Feedback
      </Button>
        </Grid>
      </Grid>
    </div>

  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
