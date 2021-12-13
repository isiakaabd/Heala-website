import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
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
const PageTwo = ({ state, handleNext }) => {
  const classes = useStyles();
  const theme = useTheme();
  const options = [
    { key: "select an option", value: " " },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const gender = [
    { key: "select an option", value: " " },
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  return (
    <Grid item container direction="column" gap={5}>
      <Grid item>
        <Formik initialValues={state} validateOnChange={false} validateOnMount>
          {(formik) => {
            return (
              <Form>
                <Grid container gap={3}>
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={10}>
                      <Grid item>
                        <Typography variant="h3">Create Profile</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container md={5} sm={10}></Grid>
                  </Grid>
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="firstName"
                        placeholder="Enter your First Name"
                        label="First Name"
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter Your last Name"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="select"
                        name="Specialization"
                        placeholder="e.g Dentistry"
                        label="Specialization"
                        options={options}
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="phone"
                        label="Phone Number"
                        placeholder="e.g Enter Your phone Number"
                      />
                    </Grid>
                  </Grid>
                  {/*  */}
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="DOB"
                        placeholder="e.g 11/12/1987"
                        label="Date of Birth"
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="age"
                        label="Age"
                        placeholder="e.g Enter Your Age"
                      />
                    </Grid>
                  </Grid>
                  {/*  */}
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={12}>
                      <FormikControl
                        control="select"
                        name="plan"
                        label="Plan"
                        options={options}
                        placeholder="Select Plan"
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="select"
                        name="affliate"
                        placeholder="Affliate"
                        label="Affliate"
                        options={options}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={12}>
                      <FormikControl
                        control="select"
                        name="sex"
                        label="Gender"
                        options={gender}
                        placeholder="Select Plan"
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="medicalID"
                        placeholder="Medical ID"
                        label="Medical ID"
                      />
                    </Grid>
                  </Grid>

                  <Grid item container md={11} margin="auto">
                    <FormikControl
                      control="input"
                      name="hospital"
                      label="Hospital"
                      placeholder="Hospital"
                    />
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
PageTwo.propTypes = {
  state: PropTypes.object.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
export default PageTwo;
