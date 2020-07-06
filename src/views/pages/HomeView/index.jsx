import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Page from "components/Page.jsx";
import Hero from "./Hero.jsx";
import Quotes from "./Quotes.jsx";
import FAQs from "./FAQs.jsx";
import TopCoders from "./TopCoders";

const useStyles = makeStyles(() => ({
  root: {},
}));

function HomeView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Hero />
      <TopCoders />
      <FAQs />
      <Quotes />
    </Page>
  );
}

export default HomeView;
