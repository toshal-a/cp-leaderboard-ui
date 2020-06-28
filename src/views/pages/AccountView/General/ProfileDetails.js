import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Gravatar from "react-gravatar";

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

function ProfileDetails({ user, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar className={classes.avatar}>
            <Gravatar email={user.email} />
          </Avatar>
          <Link
            color="inherit"
            href={`https://codeforces.com/profile/${user.handle}`}
            target="_blank"
            rel="noopener"
          >
            <Typography
              className={classes.name}
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              {`${user.full_name}`}
            </Typography>
          </Link>
          <Typography color="textSecondary" variant="h1">
            {user.overall_score}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default ProfileDetails;
