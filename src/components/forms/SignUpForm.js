import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Grid, InputAdornment, Typography } from "@mui/material";

import { setAccessToken } from "accessToken";
import { CustomButton } from "components/Utilities";
import { pageOneUseStyles } from "styles/formStyles";
import { signup } from "components/graphQL/Mutation";
import { signUpInitialState } from "helpers/mockData";
import { signUp as onSignUp } from "helpers/helperFuncs";
import LoginInput from "components/validation/LoginInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SignUpValidationSchema } from "helpers/formValidation";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUpForm = ({ changeStep }) => {
  const classes = pageOneUseStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  const [register] = useMutation(signup);

  const onSubmit = async (signUpData, onsubmitProp) => {
    const signUpResult = await onSignUp(
      register,
      signUpData,
      setAccessToken,
      enqueueSnackbar,
      Typography,
      changeStep,
      onsubmitProp
    );
    if (signUpResult === true) {
      changeStep(1);
    }
  };

  return (
    <Grid item>
      <Formik
        initialValues={signUpInitialState}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SignUpValidationSchema}
        onSubmit={(values, onsubmitProp) => onSubmit(values, onsubmitProp)}
        validateOnMount={false}
      >
        {({ isSubmitting, isValid, dirty }) => {
          return (
            <Form>
              <Grid container item gap={4}>
                <Grid item container justifyContent="center" rowSpacing={1}>
                  <Grid
                    item
                    container
                    justifyContent="center"
                    md={12}
                    sm={10}
                    marginBottom="14px"
                  >
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
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
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
                          {showPasswords ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
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
                    disabled={!(dirty || isValid) || isSubmitting}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

SignUpForm.propTypes = {
  changeStep: PropTypes.func,
};

export default SignUpForm;
