/* eslint-disable max-len */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "@material-ui/core/Link";
import SvgIcon from "@material-ui/core/SvgIcon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Search as SearchIcon } from "react-feather";
import green from "@material-ui/core/colors/green";
import Chip from "@material-ui/core/Chip";
import getInitials from "utils/getInitials";

function applyFilters(contestants, query,showUnoffical) {
  return contestants.filter((contestant) => {
    let matches = true;

    if (query) {
      const properties = ["handle"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (
          contestant.party.members[0][property]
            .toLowerCase()
            .includes(query.toLowerCase())
        ) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    if(contestant.party.participantType !== 'CONTESTANT' && !showUnoffical){
      matches = false;
    }

    return matches;
  });
}

function applyPagination(contestants, page, limit) {
  return contestants.slice(page * limit, page * limit + limit);
}

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  queryField: {
    width: 500,
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  tablePagination: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  divider: {
    width: 1,
    height: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  showUnofficalField: {
    marginLeft: theme.spacing(2)
  },
}));

function StandingList({ className, contestants, problems, ...rest }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [query, setQuery] = React.useState("");
  const [showUnoffical,setShowUnoffical] = React.useState(false);

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleShowUnofficial = (event) => {
    event.persist();
    setShowUnoffical((oldShowUnoffical) => !oldShowUnoffical);
  };

  // Usually query is done on backend with indexing solutions
  const filteredcontestants = applyFilters(contestants, query, showUnoffical);
  const paginatedcontestants = applyPagination(
    filteredcontestants,
    page,
    limit
  );

  return (
    <React.Fragment>
      <AppBar position="sticky" color="inherit">
        <Box p={1} display="flex" alignItems="center">
          <TextField
            className={classes.queryField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search contestants"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <FormControlLabel
            className={classes.showUnofficalField}
            control={(
              <Checkbox
                checked={showUnoffical}
                onChange={handleShowUnofficial}
                name="showUnoffical"
              />
            )}
            label="Show Unoffical"
          />
        </Box>
      </AppBar>
      <Card className={clsx(classes.root, className)} {...rest}>
        <Divider />

        <Box overflow="auto">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Handle</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Penalty</TableCell>
                <TableCell>HackCount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedcontestants.map((contestant) => {
                return (
                  <React.Fragment key={contestant.party.members[0].handle}>
                    <TableRow>
                      <TableCell>{contestant.rank}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar className={classes.avatar}>
                            {getInitials(contestant.party.members[0].handle)}
                          </Avatar>
                          <div>
                            <Link
                              color="inherit"
                              href={`https://codeforces.com/profile/${contestant.party.members[0].handle}`}
                              target="_blank"
                              rel="noopener"
                            >
                              {contestant.party.members[0].handle}
                            </Link>
                            <Typography variant="body2" color="textSecondary">
                              {contestant.party.participantType}
                            </Typography>
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell>{contestant.points}</TableCell>
                      <TableCell>{contestant.penalty}</TableCell>
                      <TableCell>
                        <Box display="flex">
                          <Typography
                            variant="body2"
                            style={{ color: green[500] }}
                          >
                            {contestant.successfulHackCount}
                          </Typography>
                          <Divider className={classes.divider} />
                          <Typography variant="body2" color="error">
                            {contestant.unsuccessfulHackCount}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={contestant.party.members[0].handle + "Score"}
                    >
                      <TableCell colSpan={5}>
                        <Box
                          display="flex"
                          color="transparent"
                          justifyContent="center"
                        >
                          {contestant.problemResults.map((score, index) => (
                            <Chip
                              key={
                                problems[index].index +
                                contestant.party.members[0].handle
                              }
                              style={{ margin: "0 5px" }}
                              avatar={<Avatar>{problems[index].index}</Avatar>}
                              label={score.points}
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
      <AppBar color="inherit" position="sticky" style={{ bottom: 0 }}>
        <TablePagination
          component="div"
          count={filteredcontestants.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </AppBar>
    </React.Fragment>
  );
}

StandingList.propTypes = {
  className: PropTypes.string,
  contestants: PropTypes.array,
};

StandingList.defaultProps = {
  contestants: [],
};

export default StandingList;
