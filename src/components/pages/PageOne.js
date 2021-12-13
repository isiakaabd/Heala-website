import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { CustomButton } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";

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

const PageOne = ({ state, handleNext }) => {
  const classes = useStyles();
  const theme = useTheme();
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  return (
    <Grid item container direction="column" gap={5}>
      <Grid item width="80%" margin="auto" container justifyContent="left">
        <Typography variant="h3">Create Account</Typography>
      </Grid>
      <Grid item>
        <Formik initialValues={state} validateOnChange={false} validateOnMount>
          {(formik) => {
            return (
              <Form>
                <Grid container item gap={3}>
                  <Grid item container justifyContent="center" rowSpacing={2}>
                    <Grid item container md={8} sm={10}>
                      <FormikControl
                        control="input"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder=" Enter your email"
                      />
                    </Grid>
                    <Grid item container md={8} sm={10}>
                      <FormikControl
                        control="input"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        label="Password"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container md={2} sm={5} margin="auto">
                    <CustomButton
                      variant="contained"
                      title="continue"
                      type={greenButton}
                      onClick={handleNext}
                      className={classes.btn}
                      // disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
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
export default PageOne;

PageOne.propTypes = {
  state: PropTypes.object.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
