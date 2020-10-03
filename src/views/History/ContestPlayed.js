import React, { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import axios from "utils/axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import ContestCard from "../Contest/ContestList/ContestCard"

const useStyles = makeStyles((theme) => ({
  tooltipContainer: {
    maxWidth: 300,
    backgroundColor: theme.palette.background.dark,
    minWidth: 200,
    padding: theme.spacing(3)
  },
  tooltipTextStyle: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  },
  scene: {
    minWidth: 600,
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexGrow: 1,
  },
  gridItemContainer: {
    width: "80%",
    minWidth: 480
  },
}));


function RenderTooltip(props) {
  const {
    payload,
    label,
    active,
  } = props;

  const styles = useStyles();

  return(
    <Box component="div" className={styles.tooltipContainer}>
        <Typography className={styles.tooltipTextStyle}>  {payload && payload[0]?.payload.contest_name} </Typography>
        <Typography className={styles.tooltipTextStyle}> Percentile: {payload && payload[0]?.value}</Typography>
    </Box>
  )
};

const formatData = (responseData) => {

  const formattedData = responseData.map((contest) => {
    const dateObj = new Date(contest.contest_time)
    return {
      ...contest,
      timeStamp: dateObj.getTime() / 1000,
      year: dateObj.getFullYear() ,
      month: dateObj.getMonth()
    }
  })

  formattedData.sort(function(a, b) {return a.timeStamp - b.timeStamp})

  return formattedData
}

function ContestPlayed() {
  const theme = useTheme()
  const [contestsPlayed, setContestsPlayed] = useState([])
  const [contestsPlayedReverse, setContestsPlayedReverse] = useState([])
  const styles = useStyles();

  useEffect(() => {
    axios.get("https://api.cp-leaderboard.me/user/me/codeforces_played").then((response) => {
      const formattedData = formatData(response.data)
      setContestsPlayed(formattedData);
      console.log(formattedData)
      setContestsPlayedReverse([...formattedData].reverse())
    })
  }, [])

  const yAxisTicks = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

  return (
    <Card className={styles.scene}>
    <ResponsiveContainer 
        width="90%" 
        height={400}
        minWidth={600} 
    >
      <LineChart
          width={900}
          data={contestsPlayed}
          margin={{
            top: 20, 
            right: 30,
            left: 20,
            bottom: 5,
          }}
      >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis padding={{ left: 30, right: 30 }} tickLine={false} dataKey="year"/>
          <YAxis domain={[0, 1]} tickLine={false} tick={yAxisTicks} tickCount={6}/>
          <Tooltip cursor={false} content={<RenderTooltip containerStyle={styles.tooltipContainer}/>} />
          {/* <Legend /> */}
          <Line
            type="linear" 
            dataKey="contest_percentile" 
            stroke={theme.palette.primary.dark}
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={{r: 6}}
          />
      </LineChart>
    </ResponsiveContainer>
        <Divider />
        <Grid className={styles.gridContainer} container  direction={"column"}   alignContent="center" spacing={2}>
          {contestsPlayedReverse.map((contest) => {
            return (
              <Grid key={contest.id} item className={styles.gridItemContainer} >
                <ContestCard 
                  contest={{
                    id: contest.codeforces_id,
                    name: contest.contest_name,
                    startTimeSeconds: contest.timeStamp
                  }} 
                />
              </Grid>
            );
          })}
        </Grid>
      </Card>
  )
}

export default ContestPlayed;
