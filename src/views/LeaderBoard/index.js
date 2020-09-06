import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Page from "components/Page";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    flexGrow:1, 
    flexShrink:1, 
    flexBasis:"auto",
    height: "100%"
  },
}));

function CustomerListView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Candidate List">
      {<Results   />}
    </Page>
  );
}

export default CustomerListView;
