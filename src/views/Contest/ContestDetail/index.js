import axios from "axios";
import React from "react";
/*import PropTypes from "prop-types";*/
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import useIsMountedRef from "hooks/useIsMountedRef";
import { useHistory } from "react-router-dom";
import ProblemList from "./ProblemList";
import StandingList from "./StandingList";
import LoadingScreen from "components/LoadingScreen";

const ContestDetail = (props) => {
  const { contestId } = props;
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [invalue, setInvalue] = React.useState(true);
  let contestDetailRef = React.createRef();
  const isMountedRef = useIsMountedRef();
  const [contestdetail, setContestdetail] = React.useState(null);
  const getContestDetail = React.useCallback(() => {
    axios
      .get(
        `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=25`
      )
      .then((response) => {
        if (isMountedRef.current) {
          setContestdetail(response.data.result);
        }
      });
  }, [isMountedRef, contestId]);

  React.useEffect(() => {
    getContestDetail();
  }, [getContestDetail]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setInvalue(false);
  };

  const handleBack = () => {
    history.goBack();
  };

  if (!contestdetail) {
    return <LoadingScreen />;
  }

  return (
    <Slide
      direction="down"
      in={invalue}
      onExit={handleBack}
      mountOnEnter
      unmountOnExit
    >
      <div ref={contestDetailRef}>
        <AppBar position="static" color="transparent">
          <Toolbar variant="dense">
            <IconButton
              onClick={handleClose}
              size="medium"
              edge="start"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
            <Typography noWrap variant="h5" color="textPrimary">
              {contestdetail.contest.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position="sticky" color="inherit">
          <Tabs
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            value={value}
          >
            <Tab value={0} label="Problems" />
            <Tab value={1} label="Standings" />
          </Tabs>
        </AppBar>

        <Box display={value === 0 ? "block" : "none"}>
          {" "}
          <ProblemList problems={contestdetail.problems} />
        </Box>

        <Box display={value === 1 ? "block" : "none"}>
          <StandingList
            contestants={contestdetail.rows}
            problems={contestdetail.problems}
          />
        </Box>
      </div>
    </Slide>
  );
};

export default ContestDetail;
