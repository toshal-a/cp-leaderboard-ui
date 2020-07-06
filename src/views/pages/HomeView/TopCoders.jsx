import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import getInitials from "utils/getInitials";
import LoadingScreen from "components/LoadingScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 128,
  },
  browseButton: {
    marginLeft: theme.spacing(2),
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
}));

function TopCoders({ className, ...rest }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [topcoders, setTopcoders] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios
      .get("https://api.cp-leaderboard.me/user/top?sortBy=avg_percent")
      .then((response) => {
        setTopcoders(response.data);
      });
  });

  if (!topcoders) {
    return <LoadingScreen />;
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography variant="h1" align="center" color="textPrimary">
          Wanna checkout the Top Coders?
        </Typography>
        <Box mt={6} display="flex" justifyContent="center" alignItems="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={handleClickOpen}
          >
            Have a look!
          </Button>
        </Box>
      </Container>
      <Dialog
        PaperProps={{
          classes: {
            root: classes.card,
          },
        }}
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar className={classes.appBar} color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" className={classes.title}>
              Top Coders
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Card >
            <Divider />
            <Box overflow="auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Codeforces Handle</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>
                      Average <br /> Percentile
                    </TableCell>
                    <TableCell>
                      Aggregate <br /> Percentile
                    </TableCell>
                    <TableCell>
                      Contest <br /> Played
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topcoders.map((customer, index) => {
                    return (
                      <TableRow hover key={customer.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar className={classes.avatar}>
                              {getInitials(customer.full_name)}
                            </Avatar>
                            <div>
                              {customer.full_name}
                              <Typography variant="body2" color="textSecondary">
                                {customer.email}
                              </Typography>
                            </div>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Link
                            color="inherit"
                            href={`https://codeforces.com/profile/${customer.handle}`}
                            target="_blank"
                            rel="noopener"
                          >
                            {customer.handle}
                          </Link>
                        </TableCell>
                        <TableCell>{customer.class_type}</TableCell>
                        <TableCell>
                          {customer.avg_percent ? customer.avg_percent : "--"}
                        </TableCell>
                        <TableCell>
                          {customer.aggr_percent ? customer.aggr_percent : "--"}
                        </TableCell>
                        <TableCell>
                          {customer.contests_played
                            ? customer.contests_played
                            : "--"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Container>
      </Dialog>
    </div>
  );
}

TopCoders.propTypes = {
  className: PropTypes.string,
};

export default TopCoders;
