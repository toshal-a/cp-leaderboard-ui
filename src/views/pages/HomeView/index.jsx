import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Page from "components/Page.jsx";
import Hero from "./Hero.jsx";
import Testimonials from "./Quotes.jsx";

const useStyles = makeStyles(() => ({
  root: {},
}));

function HomeView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Hero />
      <Testimonials />
    </Page>
  );
}

export default HomeView;
