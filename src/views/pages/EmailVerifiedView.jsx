import React, { useState } from "react";
import axios from 'axios';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import LoadingScreen from 'components/LoadingScreen';
import { Link as RouterLink, useParams } from "react-router-dom";
import Page from "components/Page.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    paddingTop: 80,
    paddingBottom: 80,
  },
  image: {
    maxWidth: "100%",
    width: 560,
    maxHeight: 300,
    height: "auto",
  },
}));

function EmailVerifiedView() {
  const classes = useStyles();
  const theme = useTheme();
  const [detail,setDetail] = useState("");
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const { confirmationToken } = useParams();

  React.useEffect(() =>{
    axios.get(`https://api.cp-leaderboard.me/login/confirm_email/${confirmationToken}`).then((response) => {
      console.log()
        setDetail("Email Verified");
      
    }).catch((error)=>{
      setDetail("Email couldn't be verified");
    });
  },[confirmationToken]);

  if (!detail) {
    return <LoadingScreen />;
  }

  return (
    <Page className={classes.root} title="Email Verified">
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? "h4" : "h1"}
          color="textPrimary"
        >
          {detail}
        </Typography>

        <Box mt={6} display="flex" justifyContent="center">
          <img
            alt="Under development"
            className={classes.image}
            src="/static/images/undraw_confirmed_81ex.svg"
          />
        </Box>
        <Box mt={6} display="flex" justifyContent="center">
          <Button
            color="secondary"
            component={RouterLink}
            to="/login"
            variant="outlined"
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    </Page>
  );
}

export default EmailVerifiedView;
