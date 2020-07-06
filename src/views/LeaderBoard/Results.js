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
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Search as SearchIcon } from "react-feather";
import getInitials from "utils/getInitials";

const tabs = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "FE",
    label: "FE (FIRST YEAR)",
  },
  {
    value: "SE",
    label: "SE (SECOND YEAR)",
  },
  {
    value: "TE",
    label: "TE (THIRD YEAR)",
  },
  {
    value: "BE",
    label: "BE (FOURTH YEAR)",
  },
  {
    value: "Other",
    label: "OTHER",
  },
];

const sortOptions = [
  {
    value: "avg_percent|desc",
    label: "Average Percentile (high to low)",
  },
  {
    value: "avg_percent|asc",
    label: "Average Percentile (low to high)",
  },
  {
    value: "aggr_percent|desc",
    label: "Aggregate Percentile (high to low)",
  },
  {
    value: "aggr_percent|asc",
    label: "Aggregate Percentile (low to high)",
  },
  {
    value: "contests_played|asc",
    label: "Contests Played (low to high)",
  },
  {
    value: "contests_played|desc",
    label: "Contests Played (high to low)",
  },
];

function applyFilters(customers, query, filters) {
  return customers.filter((customer) => {
    let matches = true;

    if (query) {
      const properties = ["email", "full_name"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && customer["class_type"] !== key) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(customers, sort) {
  const [orderBy, order] = sort.split("|");
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
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
    bottom: 0,
  },
  sortField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200,
  },
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState("all");
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState(sortOptions[0].value);
  const [filters, setFilters] = React.useState({
    FE: null,
    SE: null,
    TE: null,
    BE: null,
    Other: null,
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      FE: null,
      SE: null,
      TE: null,
      BE: null,
      Other: null,
    };

    if (value !== "all") {
      updatedFilters[value] = true;
    }
    setFilters(updatedFilters);
    setCurrentTab(value);
    setPage(0);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, query, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

  return (
    <React.Fragment>
      <AppBar position="static" color="transparent">
        <Tabs
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          indicatorColor="primary"
          value={currentTab}
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
            placeholder="Search candidates"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            className={classes.sortField}
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
      </AppBar>
      <Card className={clsx(classes.root, className)} {...rest}>
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
              {paginatedCustomers.map((customer, index) => {
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>{index+1}</TableCell>
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
      <AppBar
        position="sticky"
        color="inherit"
        className={classes.tablePagination}
      >
        <TablePagination
          component="div"
          count={filteredCustomers.length}
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

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};

Results.defaultProps = {
  customers: [],
};

export default Results;
