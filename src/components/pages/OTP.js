import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography, InputAdornment } from "@mui/material";
import OtpInput from "react-otp-input";
import { useTheme } from "@mui/material/styles";
import { showErrorMsg, showSuccessMsg } from "helpers/helperFuncs";
import { resetPassword } from "components/graphQL/Mutation";
import { pageOneUseStyles } from "styles/formStyles";
import * as Yup from "yup";
// import Countdown from "react-countdown";
import { CustomButton, Loader } from "components/Utilities";
import { useSnackbar } from "notistack";
import { completePasswordReset } from "components/graphQL/Mutation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMutation } from "@apollo/client";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginInput from "components/validation/LoginInput";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { Text } from "components/pages";
const OTP = () => {
  const theme = useTheme();
  const classes = pageOneUseStyles();
  const [resetPasswords] = useMutation(completePasswordReset);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const inputStyle = {
    height: "max(45px,5rem)",
    width: "min(50px, calc(70% + 100px))",
  };
  const style = {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    overflow: "hidden",
    flexWrap: "nowrap",
  };
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  const [otp, setOtp] = useState("");
  const handleChange = useCallback((e) => setOtp(e), []);
  const history = useHistory();
  const forgottenDetails = {
    password: "",
    cPassword: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string("Enter your password")
      .trim()
      .required("Password Required")
      .min(8),
    cPassword: Yup.string()
      .trim()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "password mismatch"),
      })
      .required("Please confirm Password"),
  });
  const [reset, { loading }] = useMutation(resetPassword);
  const requestNewOTP = useCallback(async () => {
    if (counter === 0) {
      setLoad(true);
      const email = localStorage.getItem("request_new_OTP_mail");
      try {
        const { data } = await reset({
          variables: {
            email,
          },
        });
        if (data?.resetPassword) {
          setLoad(false);
          showSuccessMsg(
            enqueueSnackbar,
            "New OTP has been sent to your email"
          );
        }
      } catch (err) {
        console.error(err);
        showErrorMsg(enqueueSnackbar, err.message);
      }
    }
  }, []);
  const [load, setLoad] = useState(false);
  const timeOut = 2;

  const [counter, setCounter] = useState(timeOut);
  useEffect(() => {
    if (counter > 0) {
      const x = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearTimeout(x);
    }
  }, [counter]);

  const onSubmit = async (values, onSubmitProps) => {
    const emailValue = localStorage.getItem("rest_password_email");
    const { password } = values;
    try {
      const { data } = await resetPasswords({
        variables: {
          newPassword: password,
          email: emailValue,
          otp: Number(otp),
        },
      });
      if (data) {
        localStorage.removeItem("rest_password_email");
        showSuccessMsg(enqueueSnackbar, "Password reset successful");
        localStorage.removeItem("resetPasswordAuth");
        history.replace("/");
      }
      setOtp("");
      onSubmitProps.resetForm();
    } catch (error) {
      console.error(error);
      showErrorMsg(enqueueSnackbar, err.message);
    }
  };

  return (
    <Grid
      container
      sx={{ margin: "auto", background: "#fff", borderRadius: "10px" }}
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      p={4}
      sm={5}
      xs={10}
      rowSpacing={3}
    >
      <Grid item>
        <Typography
          gutterBottom
          color="#000"
          variant="h6"
          className={classes.header}
        >
          Enter your OTP
        </Typography>
      </Grid>
      {load && (
        <Grid item>
          <Loader />
        </Grid>
      )}
      <Grid item container justifyContent="center">
        <OtpInput
          value={otp}
          containerStyle={style}
          shouldAutoFocus
          isInputNum
          inputStyle={inputStyle}
          onChange={handleChange}
          numInputs={6}
          separator={
            <span
              style={{
                width: "10px",
                height: "100%",
                textAlign: "center",
                fontSize: "min(3vw, 20px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "50px",
                // display:""
              }}
            >
              {">"}
            </span>
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={forgottenDetails}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount={false}
        >
          {({ isSubmitting, dirty, isValid }) => {
            return (
              <Form>
                <Grid container item rowGap={1}>
                  <Grid item container>
                    <LoginInput
                      id="password"
                      label="New Password"
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
                  <Grid item container>
                    <LoginInput
                      id="cPassword"
                      label="Confirm Password"
                      name="cPassword"
                      placeholder="Confirm your password"
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

                  <Grid
                    item
                    container
                    alignItems="center"
                    flexWrap="nowrap"
                    justifyContent="space-between"
                  >
                    <Grid item xs={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        style={{
                          fontSize: "clamp(1rem, 1.5vw,1.5rem)",
                          color: "#000",
                        }}
                      >
                        Please check your email to continue
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      justifySelf="flex-end"
                      style={{ cursor: "pointer" }}
                      xs={{ flex: 3 }}
                    >
                      <Text counter={counter} requestNewOTP={requestNewOTP} />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="center"
                    sm={6}
                    xs={12}
                    marginInline="auto"
                    marginBlock={3}
                  >
                    <CustomButton
                      variant="contained"
                      title="Reset Password"
                      type={greenButton}
                      className={classes.btn}
                      width="100%"
                      disabled={otp.length < 6 || !isValid || isSubmitting}
                      isSubmitting={isSubmitting}
                    />
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

export default OTP;
