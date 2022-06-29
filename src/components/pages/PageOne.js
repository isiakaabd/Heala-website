import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
<<<<<<< HEAD
import SwipeableViews from "react-swipeable-views";
import { Grid, Typography, Box, Tab, Tabs, AppBar } from "@mui/material";
import SignUpForm from "components/forms/SignUpForm";
import SignInForm from "components/forms/SignInForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
=======
import { Grid, InputAdornment, Alert, Typography, Avatar } from "@mui/material";
//import Success from "../Modal/Success";
import { setAccessToken } from "accessToken";
import { CustomButton } from "components/Utilities";
import LoginInput from "components/validation/LoginInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { signup, login } from "components/graphQL/Mutation";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ReactComponent as HealaIcon } from "assets/images/logo.svg";
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const PageOne = ({ handleNext }) => {
  const theme = useTheme();
<<<<<<< HEAD
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    ["account_id", "email", "heala_id", "profile_id", "token"].map((text) =>
      localStorage.setItem(text, "")
    );
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
=======
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  const validationSchema = Yup.object({
    email: Yup.string().trim().email("Enter a valid email").required("Email Required"),
    password: Yup.string("Select your password").trim().required("Password Required").min(8),
    confirmPassword: Yup.string()
      .trim()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "password mismatch"),
      })
      .required("Please confirm Password"),
  });
  const [alert, setAlert] = useState(null);
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
        <Typography style={{ fontSize: "1.2rem" }}>Registeration successsful</Typography>,
        {
          variant: "success",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "center",
            vertical: "top",
          },
        },
      );

      if (data) {
        handleNext();
      }
    } catch (err) {
      if (err.networkError.result.errors[0].message === "Email is already taken") {
        try {
          const { data } = await Login({
            variables: {
              email,
              password,
            },
          });

          const { dociId, email: emails, access_token, _id } = data.login.account;
          localStorage.setItem("doctor_id", dociId);
          localStorage.setItem("token", access_token);
          localStorage.setItem("email", emails);
          localStorage.setItem("id", _id);

          setAccessToken(access_token);
          handleNext2();
          enqueueSnackbar(
            <Typography style={{ fontSize: "1.2rem" }}>Registeration successsful</Typography>,
            {
              variant: "success",
              preventDuplicate: true,
              anchorOrigin: {
                horizontal: "center",
                vertical: "top",
              },
            },
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
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Box
          sx={{
            bgcolor: "background.paper",
            width: 500,
            margin: "2rem 0rem",
            borderRadius: "5px",
            margin: "0rem 1rem",
          }}
        >
          <AppBar position="static" sx={{ borderRadius: "5px" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
<<<<<<< HEAD
              <Tab label="SIGN UP" {...a11yProps(0)} />
              <Tab label="SIGN IN" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/*  WRITE CONTEXT TO MANAGE NEXT STEP ETC. to avoid PROP DRILLING */}
              <SignUpForm changeStep={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <SignInForm changeStep={handleNext} />
            </TabPanel>
          </SwipeableViews>
        </Box>
=======
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
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f
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
