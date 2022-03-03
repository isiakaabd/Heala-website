import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, InputAdornment, Alert, Typography, Avatar } from "@mui/material";
import { ReactComponent as HealaIcon } from "assets/images/logo.svg";
import { CustomButton } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import LoginInput from "components/validation/LoginInput";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signup } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";
import { setAccessToken } from "accessToken";

const useStyles = makeStyles((theme) => ({
  form: theme.mixins.toolbar,
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
      fontSize : "1.5rem"
    },
  },
  header: {
    "&.MuiGrid-root": {
      fontSize: "2rem",
      lineHeight: "2.6rem",
      color: "#010101",
      fontWeight:"600",
    },
  },
}));

const PageOne = ({ handleNext }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email Required"),
    password: Yup.string("Select your password").required("Password Required").min(8),
    confirmPassword: Yup.string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "password mismatch"),
      })
      .required("Please confirm Password"),
  });
  const [alert, setAlert] = useState({});
  const state = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [register] = useMutation(signup);

  const onSubmit = async (values, onsubmitProp) => {
    const { email, password } = values;
    try {
      const { data } = await register({
        variables: {
          email,
          password,
        },
      });

      const { dociId, email: emails, access_token } = data.signup.account;
      localStorage.setItem("doctor_id", dociId);
      localStorage.setItem("token", access_token);
      localStorage.setItem("email", emails);
      setAccessToken(access_token);

      setAlert({
        message: "Registration Successfull",
        type: "success",
      });
      handleNext();
    } catch (err) {
      setAlert({
        message: err.networkError.result.errors[0].message,
        type: "error",
      });
    }

    onsubmitProp.resetForm();
  };

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        container
        style={{ marginTop: "-10%", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar sx={{ background: "transparent", color: "white", width: 150, height: 150 }}>
          <HealaIcon />
        </Avatar>
      </Grid>
      <Grid
        item
        container
        md={5}
        xs={11}
        direction="column"
        sx={{
          padding: "2rem",
          background: "white",
          borderRadius: "10px",
          width: "650px",
          zIndex: "9999999",
          margin: "auto",
        }}
      >
        {alert && Object.keys(alert).length > 0 && (
          <Alert
            sx={{ justifyContent: "center", alignItems: "center" }}
            variant="filled"
            severity={alert.type}
          >
            {alert.message}
          </Alert>
        )}
        <Grid item>
          <Formik
            initialValues={state}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount={false}
          >
            {({ isSubmitting, isValid, dirty, values }) => {
              return (
                <Form>
                  <Grid container item gap={2}>
                    <Grid item container justifyContent="center" rowSpacing={1}>
                      <Grid item container justifyContent="center" md={12} sm={10}>
                        <Typography variant="h5" className={classes.header}>
                          CREATE YOUR ACCOUNT
                        </Typography>
                      </Grid>
                      <Grid item container md={12} sm={10}>
                        <LoginInput
                          label="Email"
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          hasStartIcon={false}
                        />
                      </Grid>
                      <Grid item container md={12} sm={10}>
                        <LoginInput
                          id="password"
                          label="Password"
                          name="password"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          hasStartIcon={false}
                          endAdornment={
                            <InputAdornment
                              position="end"
                              onClick={() => setShowPassword((prev) => !prev)}
                              style={{ cursor: "pointer" }}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>
                          }
                        />
                      </Grid>

                      <Grid item container md={12} sm={10}>
                        <LoginInput
                          id="confirmPassword"
                          label="Confirm Password"
                          name="confirmPassword"
                          placeholder="Enter your password again"
                          type={showPasswords ? "text" : "password"}
                          hasStartIcon={false}
                          endAdornment={
                            <InputAdornment
                              position="end"
                              onClick={() => setShowPasswords((prev) => !prev)}
                              style={{ cursor: "pointer" }}
                            >
                              {showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </InputAdornment>
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid item container margin="auto" md={12} sm={10}>
                      <CustomButton
                        variant="contained"
                        title="Create My Account"
                        type={greenButton}
                        className={classes.btn}
                        isSubmitting={isSubmitting}
                        disabled={!(dirty || isValid)}
                      />
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PageOne;

PageOne.propTypes = {
  handleNext: PropTypes.func.isRequired,
};
