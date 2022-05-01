import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Grid, InputAdornment, Alert, Typography, Avatar } from "@mui/material";

//import Success from "../Modal/Success";
import { setAccessToken } from "accessToken";
import { CustomButton } from "components/Utilities";
import LoginInput from "components/validation/LoginInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { signup, login } from "components/graphQL/Mutation";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ReactComponent as HealaIcon } from "assets/images/logo.svg";

const useStyles = makeStyles((theme) => ({
  form: theme.mixins.toolbar,
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
      fontSize: "1.5rem",
    },
  },
  header: {
    "&.MuiGrid-root": {
      fontSize: "2rem",
      lineHeight: "2.6rem",
      color: "#010101",
      fontWeight: "600",
    },
  },
}));

const PageOne = ({ handleNext2, handleNext, step }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email Required"),
    password: Yup.string("Select your password")
      .trim()
      .required("Password Required")
      .min(8),
    confirmPassword: Yup.string()
      .trim()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "password mismatch"),
      })
      .required("Please confirm Password"),
  });
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const x = setTimeout(() => {
      setAlert(null);
    }, 3000);
    return () => clearTimeout(x);
  }, [alert]);

  const state = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [register] = useMutation(signup);

  const [Login] = useMutation(login);
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
      enqueueSnackbar(
        <Typography style={{ fontSize: "1.2rem" }}>
          Registeration successsful
        </Typography>,
        {
          variant: "success",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "center",
            vertical: "top",
          },
        }
      );

      if (data) {
        handleNext();
      }
    } catch (err) {
      if (
        err.networkError.result.errors[0].message === "Email is already taken"
      ) {
        try {
          const { data } = await Login({
            variables: {
              email,
              password,
            },
          });

          const {
            dociId,
            email: emails,
            access_token,
            _id,
          } = data.login.account;
          localStorage.setItem("doctor_id", dociId);
          localStorage.setItem("token", access_token);
          localStorage.setItem("email", emails);
          localStorage.setItem("id", _id);

          setAccessToken(access_token);
          handleNext2();
          enqueueSnackbar(
            <Typography style={{ fontSize: "1.2rem" }}>
              Registeration successsful
            </Typography>,
            {
              variant: "success",
              preventDuplicate: true,
              anchorOrigin: {
                horizontal: "center",
                vertical: "top",
              },
            }
          );
          //setModal(true);
        } catch (err) {
          setAlert({
            message: err.message,
            type: "error",
          });
        }
      } else {
        console.log(err.message);
        setAlert({
          message: err.message,
          type: "error",
        });
      }
    }

    onsubmitProp.resetForm();
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          container
          style={{
            marginTop: "-20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              background: "transparent",
              color: "white",
              width: 150,
              height: 150,
            }}
          >
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
            padding: "4rem 3rem 3rem",
            background: "white",
            borderRadius: "5px",
            width: "750px",
            zIndex: "999",
            margin: "auto",
          }}
        >
          <Grid item>
            <Formik
              initialValues={state}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnMount={false}
            >
              {({ isSubmitting, isValid, dirty }) => {
                return (
                  <Form>
                    <Grid container item gap={4}>
                      <Grid
                        item
                        container
                        justifyContent="center"
                        rowSpacing={1}
                      >
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
                        {alert && Object.keys(alert) !== null && (
                          <Alert
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                            }}
                            variant="filled"
                            severity={alert.type}
                          >
                            {alert.message}
                          </Alert>
                        )}

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
                                onClick={() =>
                                  setShowPasswords((prev) => !prev)
                                }
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
    </>
  );
};
export default PageOne;

PageOne.propTypes = {
  handleNext: PropTypes.func,
  handleNext2: PropTypes.func,
  step: PropTypes.string,
};
