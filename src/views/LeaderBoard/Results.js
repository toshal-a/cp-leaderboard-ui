/* eslint-disable max-len */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
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
import { withStyles } from '@material-ui/core/styles';

import ConfirmationDialogRaw from "./SortModal";
import FilterDialogRaw from "./FilterModal";
import LoadingScreen from "components/LoadingScreen";
import getInitials from "utils/getInitials";
import axios from "utils/axios";

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
    value: "avg_percent|avg_percentile|desc",
    label: "Average Percentile (high to low)",
  },
  {
    value: "avg_percent|avg_percentile|asc",
    label: "Average Percentile (low to high)",
  },
  {
    value: "aggr_percent|aggr_percentile|desc",
    label: "Aggregate Percentile (high to low)",
  },
  {
    value: "aggr_percent|aggr_percentile|asc",
    label: "Aggregate Percentile (low to high)",
  },
  {
    value: "contests_played|contests_played|asc",
    label: "Contests Played (low to high)",
  },
  {
    value: "contests_played|contests_played|desc",
    label: "Contests Played (high to low)",
  },
];

const monthOptions = [
  {
    value: "0",
    label: "None",
  },
  {
    value: "7",
    label: "July",
  },
  {
    value: "8",
    label: "August",
  },
  {
    value: "9",
    label: "September",
  },
  {
    value: "10",
    label: "October",
  }
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
  gridItem: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
}));

function Results({ className,...rest }) {

  const [customers, setCustomers] = React.useState(null);
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState("all");
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState(sortOptions[0].value);
  const [month, setMonth] = React.useState(monthOptions[0].value);
  const [filters, setFilters] = React.useState({
    FE: null,
    SE: null,
    TE: null,
    BE: null,
    Other: null,
  });
  const getCustomers = () => {
    if (month === "0") {
      axios.get("https://api.cp-leaderboard.me/user/?limit=200").then((response) => {
          setCustomers(response.data);
      })
   }
   else {
    axios.get("https://api.cp-leaderboard.me/user/month?year=2020&limit=200&month="
        + month.toString()).then((response) => {
      setCustomers(response.data);
    })
   }
  }

  React.useEffect(()=>{
      setCustomers(null)
      getCustomers()
    }
  , [month]);

  const [openFilterModal, setOpenFilterModal] = React.useState(false);
  
  const handleFilterModalOpen = () => {
    setOpenFilterModal(true);
  };

  const handleFilterModalClose = (newMonthValue) => {
    setOpenFilterModal(false)

    if (newMonthValue) {
      setMonth(newMonthValue);
    }
  }

  const [openSortModal, setOpenSortModal] = React.useState(false);

  const handleSortModalOpen = () => {
    setOpenSortModal(true)
  }

  const handleSortModalClose = (newSortValue) => {
    setOpenSortModal(false)

    if (newSortValue) {
      setSort(newSortValue);
    }
  }

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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };


  const FilterButton = withStyles({
    root: {
      padding: '18.5px 14px',
      lineHeight: "inherit",
      display: "inline",
      width: "100%",  
      flexShrink: 1,
      flexGrow: 1,
    },
  })(Button);

  const applySort = (customers, sort) => {
    const [orderBy, orderByOne, order] = sort.split("|");
    const comparator = (month ===  "0") ? getComparator(order, orderBy) : getComparator(order, orderByOne);
    const stabilizedThis = customers.map((el, index) => [el, index]);
  
    stabilizedThis.sort((a, b) => {
      // eslint-disable-next-line no-shadow
      const order = comparator(a[0], b[0]);
  
      if (order !== 0) return order;
  
      return a[1] - b[1];
    });
  
    return stabilizedThis.map((el) => el[0]);
  }

  if (customers) {
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
        <Grid container>
          <Grid item xs className={classes.gridItem}>
          <TextField
            fullWidth
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
          </Grid>
          <Grid item xs className={classes.gridItem}>
          <FilterButton 
            variant="outlined" 
            fullWidth
            disableElevation
            onClick = {handleFilterModalOpen}>
              Filter
          </FilterButton>
          </Grid>
          <Grid item xs className={classes.gridItem}>
          <FilterButton 
            fullWidth
            variant="outlined"    
            disableElevation
            onClick = {handleSortModalOpen}>
              Sort
          </FilterButton>
          </Grid>
        </Grid>
      </AppBar>
      <ConfirmationDialogRaw 
        id="sort-modal"
        keepMounted
        open={openSortModal}
        onClose={handleSortModalClose}
        value={sort}
      />
      <FilterDialogRaw 
        id="filter-modal"
        keepMounted
        open={openFilterModal}
        onClose={handleFilterModalClose}
        value={month}
      />

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
                    <TableCell>{index+1 + page*limit}</TableCell>
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
                      {month === "0" ? (customer.avg_percent ? customer.avg_percent : "--") : null}
                      {month !== "0" ? (customer.avg_percentile? customer.avg_percentile: "--") : null}
                    </TableCell>
                    <TableCell>
                      {month === "0" ? (customer.aggr_percent ? customer.aggr_percent : "--") : null}
                      {month !== "0" ? (customer.aggr_percentile? customer.aggr_percentile: "--") : null}
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
  else 
  {
    return (
        <LoadingScreen />
    );   

  }
}

Results.propTypes = {
  className: PropTypes.string,
};

export default Results;
