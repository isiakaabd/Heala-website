import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, InputAdornment, Typography, Avatar } from "@mui/material";
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
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  header: {
    "&.MuiGrid-root": {
      fontSize: "2rem",
      lineHeight: "2.6rem",
      color: "#010101",
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
    <Grid container justifyContent="center">
      <Grid container justifyContent="center" alignItems="center">
        <Avatar sx={{ background: "transparent", color: "white", width: 150, height: 150 }}>
          <HealaIcon />
        </Avatar>
      </Grid>
      <Grid
        item
        container
        md={6}
        xs={11}
        direction="column"
        sx={{ padding: "2rem", background: "white", borderRadius: "5px" }}
      >
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
                      <Grid item container justifyContent="center" md={12} sm={10}>
                        <Typography variant="h3" className={classes.header}>
                          Create Your Account
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
                    </Grid>

                    <Grid item container margin="auto" md={12} sm={10}>
                      <CustomButton
                        variant="contained"
                        title="continue"
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
  state: PropTypes.object.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
