import React, { useState } from 'react';
import axios from 'utils/axios';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  Backdrop,
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Paper,
  Portal,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {
  X as XIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon
} from 'react-feather';
import { closeNewMessage } from '../accountSlice';
import QuillEditor from 'components/QuillEditor';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: `calc(100% - ${theme.spacing(6)}px)`,
    maxHeight: `calc(100% - ${theme.spacing(6)}px)`,
    width: 600,
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(3),
    outline: 'none',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 500
  },
  fullScreen: {
    height: '100%',
    width: '100%'
  },
  input: {
    width: '100%'
  },
  editor: {
    flexGrow: 1,
    '& .ql-editor': {
      minHeight: 300
    }
  },
  action: {
    marginRight: theme.spacing(1)
  }
}));

function Feedback() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { newMessageOpen } = useSelector((state) => state.account);
  const { user } = useSelector((state) => state.login);
  const [fullScreen, setFullScreen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [title,setTitle] = useState('');

  const handleChange = (value) => {
    setMessageBody(value);
  };

  const handleTitle = (e) => {
      setTitle(e.target.value);
  }

  const handleExitFullScreen = () => {
    setFullScreen(false);
  };

  const handleEnterFullScreen = () => {
    setFullScreen(true);
  };

  const handleClose = () => {
    dispatch(closeNewMessage());
  };

  const handleSubmit = () => {
      console.log(user.full_name+title+messageBody);
    axios.post(`https://api.cp-leaderboard.me/user/feedback?userName=${user.full_name}&title=${title}&feedback=${messageBody}`).then((response)=>{
        enqueueSnackbar('Feedback Sent', {
            variant: 'success'
          });
    });
  }

  if (!newMessageOpen) {
    return null;
  }

  return (
    <Portal>
      <Backdrop open={fullScreen} />
      <Paper
        className={clsx(
          classes.root,
          { [classes.fullScreen]: fullScreen }
        )}
        elevation={12}
      >
        <Box
          bgcolor="background.dark"
          display="flex"
          alignItems="center"
          py={1}
          px={2}
        >
          <Typography
            variant="h5"
            color="textPrimary"
          >
            New Feedback
          </Typography>
          <Box flexGrow={1} />
          {fullScreen ? (
            <IconButton onClick={handleExitFullScreen}>
              <SvgIcon fontSize="small">
                <MinimizeIcon />
              </SvgIcon>
            </IconButton>
          ) : (
            <IconButton onClick={handleEnterFullScreen}>
              <SvgIcon fontSize="small">
                <MaximizeIcon />
              </SvgIcon>
            </IconButton>
          )}
          <IconButton onClick={handleClose}>
            <SvgIcon fontSize="small">
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Box>
        <Box p={2}>
          <Input
            className={classes.input}
            disableUnderline
            placeholder="Title"
            onChange={handleTitle}
            value={title}
          />
        </Box>
        <Divider />
        <QuillEditor
          className={classes.editor}
          onChange={handleChange}
          placeholder="Leave a message"
          value={messageBody}
        />
        <Divider />
        <Box
          display="flex"
          alignItems="center"
          py={1}
          px={2}
        >
          <Button
            color="secondary"
            variant="contained"
            className={classes.action}
            onClick={handleSubmit}
          >
            Send
          </Button>
         
        </Box>
      </Paper>
    </Portal>
  );
}

export default Feedback;
