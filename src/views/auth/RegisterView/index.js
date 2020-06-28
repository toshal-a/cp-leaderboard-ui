import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Page from "components/Page";
import RegisterForm from "./RegisterForm";
import ActivateAccountForm from './ActivateAccountForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    minHeight: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function RegisterView() {
  const classes = useStyles();
  const history = useHistory();
  const [showActivateAccount, setShowActivateAccount] = React.useState(false);

  const handleSubmitSuccess = () => {
    history.push("/login");
  };


  const handleShowActivateAccount = () => {
    setShowActivateAccount((oldShowActivateAccount) => !oldShowActivateAccount);
  };

  return (
    <Page className={classes.root} title="Login">
      <Container component="main" maxWidth="xs">
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Button
                component={RouterLink}
                to="/"
                variant="outlined"
                color="primary"
              >
                Back to home
              </Button>
            }
          />

          <CardContent className={classes.content}>
            <Box>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </Box>
            <Box mt={3}>
              <RegisterForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
            <Box>
              { showActivateAccount && <ActivateAccountForm />}
            </Box>
            <Box my={2}>
              <Divider />
            </Box>

            <Grid container>
            <Grid item xs>
                <Link  onClick={handleShowActivateAccount} variant="body2">
                  Activate your account
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {" Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
