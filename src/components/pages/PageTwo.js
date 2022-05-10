import React from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";

import { Formik, Form } from "formik";
import { CustomButton } from "components/Utilities";
import { pageTwoUseStyles } from "styles/formStyles";
import { onPageTwoFormSubmit } from "helpers/helperFuncs";
import FormikControl from "components/validation/FormikControl";
import { pageTwoValidationSchema } from "helpers/formValidation";
import { createDoctorProfile } from "components/graphQL/Mutation";
import {
  genderOptions,
  pageTwoIntialValues,
  selectLevelOption,
  specializationOptions,
} from "helpers/mockData";

const PageTwo = ({ handleNext }) => {
  const classes = pageTwoUseStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [endDateLimit, setEndDataLimit] = React.useState("");

  React.useEffect(() => {
    setEndDataLimit(Date.now());
  }, []);

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  const [createDoctor] = useMutation(createDoctorProfile);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          container
          direction="column"
          md={4}
          sm={12}
          gap={5}
          sx={{
            padding: "4rem 3rem 3rem",
            background: "white",
            marginBottom: "5rem !important",
            borderRadius: "5px",
            zIndex: "999",
            margin: "auto",
          }}
        >
          <Grid item>
            <Formik
              initialValues={pageTwoIntialValues}
              validationSchema={pageTwoValidationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              validateOnMount={false}
              onSubmit={(values) =>
                onPageTwoFormSubmit(
                  values,
                  createDoctor,
                  enqueueSnackbar,
                  Typography,
                  handleNext
                )
              }
            >
              {({ isSubmitting, setFieldValue, setValues, isValid, dirty }) => {
                return (
                  <Form>
                    <Grid container md={12} margin="auto" gap={3}>
                      <Grid
                        item
                        container
                        justifyContent="center"
                        marginBottom="14px"
                        gap={2}
                      >
                        <Grid
                          item
                          container
                          justifyContent="center"
                          md={5}
                          sm={10}
                        >
                          <Grid item>
                            <Typography variant="h5">CREATE PROFILE</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={1}
                      >
                        <FormikControl
                          control="input"
                          name="firstName"
                          placeholder="Enter your First Name"
                          label="First Name"
                          isRequired
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={1}
                      >
                        <FormikControl
                          control="input"
                          name="lastName"
                          label="Last Name"
                          placeholder="Enter Your last Name"
                          isRequired
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={2}
                      >
                        <FormikControl
                          control="select"
                          name="specialization"
                          placeholder="Select Specialization"
                          label="Specialization"
                          options={specializationOptions}
                          isRequired
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={2}
                      >
                        <FormikControl
                          control="input"
                          name="phoneNumber"
                          label="Phone Number"
                          placeholder="e.g Enter Your phone Number"
                          isRequired
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={2}
                      >
                        <FormikControl
                          control="select"
                          name="level"
                          placeholder="Select Level"
                          label="Select Level"
                          options={selectLevelOption}
                          isRequired
                        />
                      </Grid>
                      {/*  */}
                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={2}
                      >
                        <FormikControl
                          control="date"
                          name="dob"
                          label="DOB"
                          setFieldValue={setFieldValue}
                          setValues={setValues}
                          isRequired
                          endDate={endDateLimit}
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={2}
                      >
                        <FormikControl
                          control="select"
                          name="gender"
                          label="Gender"
                          options={genderOptions}
                          placeholder="Select Gender"
                          isRequired
                        />
                      </Grid>
                      {/*  */}

                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        gap={2}
                      >
                        <FormikControl
                          control="input"
                          name="hospital"
                          label="Hospital/organization"
                          placeholder="Hospital/organization"
                        />
                      </Grid>
                      <Grid item container justifyContent="space-around">
                        <FormikControl
                          control="file"
                          name="image"
                          label="Upload Your Image"
                          setFieldValue={setFieldValue}
                          isRequired
                        />
                      </Grid>

                      <Grid item container md={12} sm={10} margin="auto">
                        <CustomButton
                          variant="contained"
                          title="Continue"
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
        </Grid>
      </Grid>
    </>
  );
};

PageTwo.propTypes = {
  handleNext: PropTypes.func.isRequired,
  setStep: PropTypes.func,
};
export default PageTwo;
