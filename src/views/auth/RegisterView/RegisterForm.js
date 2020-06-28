import React from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import clsx from "clsx";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  buttonProgress: {
    color: green[500],
    position: "relative",
    left: "50%",
    marginTop: -32,
    marginLeft: -12,
  },
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        handle: "",
        password: "",
        class_type: "Other",
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required("First name is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
        handle: Yup.string().max(255).required("Codeforces handle is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().min(7).max(255).required("Password is required"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          await axios.get(
            `https://codeforces.com/api/user.info?handles=${values.handle}`
          );
          await axios.post("https://api.cp-leaderboard.me/user/", {
            email: values.email,
            full_name: values.firstName + " " + values.lastName,
            handle: values.handle,
            class_type: values.class_type,
            password: values.password,
          });
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(
            "Registered. Please check your email (Spam folder as well).",
            {
              variant: "success",
            }
          );
          onSubmitSuccess();
        } catch (error) {
          const message =
            (error.response && error.response.data.detail) ||
            (error.response && error.response.data.comment) ||
            "Something went wrong";
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
        values,
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                autoFocus
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First Name"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="firstName"
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Last Name"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="lastName"
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(touched.handle && errors.handle)}
                fullWidth
                helperText={touched.handle && errors.handle}
                label="Codeforces handle"
                name="handle"
                onBlur={handleBlur}
                onChange={handleChange}
                type="handle"
                value={values.handle}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(touched.class_type && errors.class_type)}
                fullWidth
                helperText={touched.class_type && errors.class_type}
                label="Class"
                name="class_type"
                select
                SelectProps={{ native: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                type="class_type"
                value={values.class_type}
                variant="outlined"
              >
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
                <option value="Other">Other</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Create account
              </Button>
              </Grid>
              {isSubmitting && (
                <CircularProgress
                  size={32}
                  className={classes.buttonProgress}
                />
              )}
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
          
          </Grid>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
};

RegisterForm.default = {
  onSubmitSuccess: () => {},
};

export default RegisterForm;
