import React from "react";
import _ from "lodash";
import clsx from "clsx";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Search as SearchIcon } from "react-feather";

import ContestCard from "./ContestCard";

const tabs = [
  {
    value: "BEFORE",
    label: "BEFORE",
  },
  {
    value: "CODING",
    label: "CODING",
  },
  {
    value: "PENDING_SYSTEM_TEST",
    label: "PENDING SYSTEM TEST",
  },
  {
    value: "SYSTEM_TEST",
    label: "SYSTEM TEST",
  },
  {
    value: "FINISHED",
    label: "FINISHED",
  },
];

const contestTypes = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "CF",
    name: "CF",
  },
  {
    id: "ICPC",
    name: "ICPC",
  },
  {
    id: "IOI",
    name: "IOI",
  },
];

function applyFilters(contests, query, filters) {
  return contests.filter((contest) => {
    let matches = true;

    if (query && !contest.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.phase && contest.phase !== filters.phase) {
      matches = false;
    }

    if (filters.contestType && filters.contestType !== contest.type) {
      matches = false;
    }
    return matches;
  });
}

function applyPagination(contests, page, limit) {
  return contests.slice(page * limit, page * limit + limit);
}

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1},
  queryField: {
    width: 500,
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  tablePagination: {
    bottom: 0,
  },
  typeField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200,
  },
  gridContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexGrow: 1,
  }
}));

const ContestList = React.memo(({ className, contests, setContests, ...rest }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState({
    phase: "BEFORE",
    contestType: null,
  });
  const [reverse, setReverse] = React.useState(true)
  const [reverseContests, setReverseContests] = React.useState([])
  const [filteredContests, setFilteredContests]  = React.useState(applyFilters(reverseContests, query, filters))
  const [paginatedContests, setPaginatedContests] = React.useState(applyPagination(filteredContests, page, limit))

  React.useEffect(() => {
    setReverseContests(_.cloneDeep(contests).reverse())
  }, [contests])

  React.useEffect(() => {
    if (filters.phase === "BEFORE") {
      setReverse(true)
    }
    else {
      setReverse(false)
    }
  }, [filters])

  React.useEffect(() => {
    if (reverse) {
      setFilteredContests(applyFilters(reverseContests, query, filters))
    }
    else {
      setFilteredContests(applyFilters(contests, query, filters))
    }
  }, [contests, reverseContests, reverse, query, filters])

  React.useEffect(() => {
    setPaginatedContests(applyPagination(filteredContests, page,limit))
  }, [filteredContests, page, limit])

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleTabsChange = (event, value) => {
    event.persist();
    setFilters((prevFilters) => ({
      ...prevFilters,
      phase: value,
    }));
  };
  const handleContestTypeChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      contestType: value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions.
  return (
    <React.Fragment>
      <AppBar position="static" color="transparent">
        <Tabs
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          indicatorColor="primary"
          value={filters.phase}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
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
            placeholder="Search contests"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            className={classes.typeField}
            label="Contest Type"
            name="contestType"
            onChange={handleContestTypeChange}
            select
            SelectProps={{ native: true }}
            value={filters.contestType || "all"}
            variant="outlined"
          >
            {contestTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </TextField>
        </Box>
      </AppBar>
      <Card className={clsx(classes.root, className)} {...rest}>
        <Divider />
        <Grid className={classes.gridContainer} container  direction={"column"}   alignContent="center" spacing={2}>
          {paginatedContests.map((contest) => {
            return (
              <Grid key={contest.id} item  >
                <ContestCard contest={contest} />
              </Grid>
            );
          })}
        </Grid>
      </Card>
      <AppBar
        position="sticky"
        color="inherit"
        className={classes.tablePagination}
      >
        <TablePagination
          component="div"
          count={filteredContests.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </AppBar>
    </React.Fragment>
  );
});

ContestList.propTypes = {
  className: PropTypes.string,
  contests: PropTypes.array,
};

ContestList.defaultProps = {
  contests: [],
};

export default ContestList;
