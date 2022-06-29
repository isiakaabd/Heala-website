import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { Grid, Checkbox, InputAdornment, Typography } from "@mui/material";
import { CustomButton, Modals } from "components/Utilities";
import LoginInput from "components/validation/LoginInput";
import { signInFormInitialState } from "helpers/mockData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SignInValidationSchema } from "helpers/formValidation";
import { logOut, signIn as onSignIn } from "helpers/helperFuncs";
import { showErrorMsg, showSuccessMsg } from "helpers/helperFuncs";
import { pageOneUseStyles } from "styles/formStyles";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  createLogout,
  login,
  resetPassword,
} from "components/graphQL/Mutation";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  getDoctorProfile,
  getVerificationInfo,
} from "components/graphQL/UseQuery";
import useAuth from "helpers/useAuth";
const SignInForm = ({ changeStep }) => {
  const classes = pageOneUseStyles();
  const theme = useTheme();
  const { _, setAuth } = useAuth();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [reset] = useMutation(resetPassword);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
      fetchProfile,
      fetchVerification,
      onsubmitProp
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
  const forgottenDetails = {
    email: "",
  };

  const onSubmitForgottenPassword = async (values) => {
    const { email } = values;
    try {
      const { data } = await reset({
        variables: {
          email,
        },
      });
      if (data?.resetPassword) {
        const { email } = data.resetPassword.account;
        showSuccessMsg(enqueueSnackbar, "Password reset email sent");
        localStorage.setItem("rest_password_email", email);
        localStorage.setItem("request_new_OTP_mail", email);
        localStorage.setItem("resetPasswordAuth", true);
        setAuth(true);
        history.push("/otp");
      }
    } catch (err) {
      console.error(err);
      showErrorMsg(enqueueSnackbar, err.message);
    }
  };
  const validationSchema1 = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const [forgottenPassWordModal, setForgottenPassWordModal] = useState(false);
  const handleForgottenPasswordModalClose = () =>
    setForgottenPassWordModal(false);
  const handleForgottenPasswordModalOpen = () =>
    setForgottenPassWordModal(true);

  return (
    <>
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
                <Grid container item gap={3}>
                  <Grid item container justifyContent="center" rowSpacing={1}>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      md={12}
                      sm={10}
                      marginBottom="14px"
                    >
                      <Typography variant="h6" className={classes.header}>
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
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid
                      container
                      alignItems="center"
                      flexWrap="nowrap"
                      justifyContent="space-between"
                    >
                      <Grid item container alignItems="center">
                        <Checkbox
                          {...label}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "min(28, 5vw)",
                            },
                          }}
                          color="success"
                        />

                        <Typography
                          variant="span"
                          sx={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
                        >
                          Remember me
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography
                          variant="span"
                          color="error"
                          onClick={handleForgottenPasswordModalOpen}
                          to="forgot-password"
                          className={classes.link}
                          noWrap
                          sx={{
                            fontSize: "clamp(1rem, 2vw, 1.4rem)",
                            cursor: "pointer",
                          }}
                        >
                          Forgot password?
                        </Typography>
                      </Grid>
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

      <Modals
        isOpen={forgottenPassWordModal}
        title=""
        rowSpacing={5}
        handleClose={handleForgottenPasswordModalClose}
      >
        <Formik
          initialValues={forgottenDetails}
          onSubmit={onSubmitForgottenPassword}
          validateOnBlur={false}
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container gap={4}>
                  <Grid item container>
                    <FormikControl
                      control="input"
                      name="email"
                      label="Email Address"
                      placeholder="Enter Email Address"
                    />
                  </Grid>

                  <Grid item container>
                    <CustomButton
                      title="Reset Password"
                      width="100%"
                      className={classes.btn}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                      type={greenButton}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};

SignInForm.propTypes = {
  changeStep: PropTypes.func,
};

export default SignInForm;
