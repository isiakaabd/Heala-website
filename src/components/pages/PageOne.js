import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, InputAdornment, Typography } from "@mui/material";
import { CustomButton } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import LoginInput from "components/validation/LoginInput";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { signup } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";
import { setAccessToken } from "accessToken";

const useStyles = makeStyles((theme) => ({
  form: theme.mixins.toolbar,
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
}));

const PageOne = ({ handleNext }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email Required"),
    password: Yup.string("Select your role").required("Password Required").min(8),
  });

  const state = {
    email: "",
    password: "",
  };
  const [register, { error }] = useMutation(signup);
  const onSubmit = async (values) => {
    const { email, password } = values;
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
    handleNext();
  };

  return (
    <Grid item container md={6} direction="column" sx={{ padding: "2rem", borderRadius: "5px" }}>
      <Grid item>
        <Formik
          initialValues={state}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form>
                <Grid container item gap={2}>
                  {error && <Typography variant="h3">{error.message}</Typography>}
                  <Grid item container justifyContent="center" rowSpacing={1}>
                    <Grid item container justifyContent="center" md={8} sm={10}>
                      <Typography variant="h3">Create Account</Typography>
                    </Grid>
                    <Grid item container md={8} sm={10}>
                      <LoginInput
                        label="Email address"
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        hasStartIcon={false}
                      />
                    </Grid>
                    <Grid item container md={8} sm={10}>
                      <LoginInput
                        id="password"
                        label="password"
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
                    {/* <Grid
                      item
                      md={8}
                      margin="auto"
                      sm={10}
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item container alignItems="center" sx={{ flex: 1 }}>
                        <Grid item>
                          <Checkbox
                            {...label}
                            defaultChecked
                            sx={{ width: "inherit" }}
                            color="success"
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">Remember me</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="error"
                          component={Link}
                          to="forgot-password"
                          className={classes.link}
                        >
                          Forgot password?
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </Grid>

                  <Grid item container margin="auto" md={8} sm={10}>
                    <CustomButton
                      variant="contained"
                      title="continue"
                      type={greenButton}
                      className={classes.btn}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                    />
                  </Grid>
                  <Grid item container justifyContent="center" md={8} gap={1} sm={10} margin="auto">
                    <Typography variant="body1">Dont have an account?</Typography>{" "}
                    <Typography
                      variant="body1"
                      color="error"
                      component={Link}
                      to="forgot-password"
                      className={classes.link}
                    >
                      Create One
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};
export default PageOne;

PageOne.propTypes = {
  state: PropTypes.object.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
