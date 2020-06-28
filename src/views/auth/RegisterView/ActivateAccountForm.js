import React from 'react';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import axios from 'utils/axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  buttonProgress: {
    color: green[500],
    position: 'relative',
    left: '50%',
    marginTop: -32,
    marginLeft: -12
  },
}));

function ActivateAccountForm({ className, ...rest }) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
        resetForm
      }) => {
        try {
          await axios.post('https://api.cp-leaderboard.me/login/resend_confirmation',{email : values.email});
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Email Sent. Check Spam folder if not in inbox.', {
            variant: 'success'
          });
          
        } catch (error) {
          const message = (error.response && error.response.data.detail) || 'Something went wrong';

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Send Activate email
            </Button>
            {isSubmitting && <CircularProgress size={32} className={classes.buttonProgress} />}
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
          </Box>
          
        </form>
      )}
    </Formik>
  );
}

export default ActivateAccountForm;
