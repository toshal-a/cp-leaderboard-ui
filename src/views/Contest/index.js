import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useParams } from "react-router";
/*import Sidebar from './Sidebar';*/
import axios from "axios";
import Page from "components/Page";
import useIsMountedRef from "hooks/useIsMountedRef";
import ContestList from "./ContestList";
import ContestDetail from './ContestDetail';
import Box from "@material-ui/core/Box";
import LoadingScreen from "components/LoadingScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  }
}));

function ContestView() {
  const classes = useStyles();
  const { contestId } = useParams();
  let pageRef = React.useRef(null);
  const isMountedRef = useIsMountedRef();
  const [contests, setContests] = React.useState(null);
  const getContests = React.useCallback(() => {
    axios.get("https://codeforces.com/api/contest.list").then((response) => {
      if (isMountedRef.current) {
        setContests(response.data.result);
      }
    });
  }, [isMountedRef]);

  React.useEffect(() => {
    getContests();
  }, [getContests]);

  if (!contests) {
    return <LoadingScreen/>;
  }

  return (
    <Page className={classes.root} title="Contest" ref={pageRef}>
      <Box display={contestId ? "none" : "block"}>
        <ContestList contests={contests} />
      </Box>  
      {contestId && <ContestDetail contestId={contestId} /> }
    </Page>
  );
}

export default ContestView;
