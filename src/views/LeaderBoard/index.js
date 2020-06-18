import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "utils/axios";
import Page from "components/Page";
import useIsMountedRef from "hooks/useIsMountedRef";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
}));

function CustomerListView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [customers, setCustomers] = React.useState(null);

  const getCustomers = React.useCallback(() => {
    axios.get("/user/").then((response) => {
      console.log(isMountedRef.current);
      if (isMountedRef.current) {
        console.log("Inside get customer");
        setCustomers(response.data);
      }
    });
  }, [isMountedRef]);

  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!customers) {
    return null;
  }

  return (
    <Page className={classes.root} title="Candidate List">
      {customers && <Results customers={customers} />}
    </Page>
  );
}

export default CustomerListView;
