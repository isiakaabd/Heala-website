import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Grid, InputAdornment, Typography } from "@mui/material";

import { CustomButton } from "components/Utilities";
import { pageOneUseStyles } from "styles/formStyles";
import LoginInput from "components/validation/LoginInput";
import { signInFormInitialState } from "helpers/mockData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SignInValidationSchema } from "helpers/formValidation";
import { logOut, signIn as onSignIn } from "helpers/helperFuncs";
import { createLogout, login } from "components/graphQL/Mutation";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getDoctorProfile, getVerificationInfo } from "components/graphQL/UseQuery";

const SignInForm = ({ changeStep }) => {
  const classes = pageOneUseStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  const [Login] = useMutation(login);
  const [fetchProfile] = useLazyQuery(getDoctorProfile);
  const [fetchVerification] = useLazyQuery(getVerificationInfo);
  const [logoutUser] = useMutation(createLogout);

  const onSubmit = async (signInData, onsubmitProp) => {
    const signInResult = await onSignIn(
      Login,
      signInData,
      enqueueSnackbar,
      Typography,
      fetchProfile,
      fetchVerification,
      onsubmitProp,
    );

    const destroyToken = async () => {
      const id = localStorage.getItem("account_id");
      await logOut(logoutUser, id);
    };

    if (signInResult === "STEP 1") changeStep(0);
    if (signInResult === "STEP 2") changeStep(1);
    if (signInResult === "STEP 3") changeStep(2);
    if (signInResult === "STEP 4") {
      changeStep(3);
      destroyToken();
    }
    if (signInResult === "STEP 5") {
      changeStep(4);
      destroyToken();
    }
  };

  return (
    <Grid item>
      <Formik
        initialValues={signInFormInitialState}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SignInValidationSchema}
        onSubmit={(values, onsubmitProp) => onSubmit(values, onsubmitProp)}
        validateOnMount={false}
      >
        {({ isSubmitting, isValid, dirty }) => {
          return (
            <Form>
              <Grid container item gap={4}>
                <Grid item container justifyContent="center" rowSpacing={1}>
                  <Grid item container justifyContent="center" md={12} sm={10} marginBottom="14px">
                    <Typography variant="h5" className={classes.header}>
                      LOGIN
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
                </Grid>

                <Grid item container margin="auto" md={12} sm={10}>
                  <CustomButton
                    variant="contained"
                    title="Sign In"
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

SignInForm.propTypes = {
  changeStep: PropTypes.func.isRequired,
};

export default SignInForm;
