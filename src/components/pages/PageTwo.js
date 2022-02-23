import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { createDoctorProfile } from "components/graphQL/Mutation";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { dateMoment } from "components/Utilities/Time";

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
const PageTwo = ({ handleNext }) => {
  const classes = useStyles();
  const theme = useTheme();
  const options = [
    { key: "Diagnostic", value: "diagnostic" },
    { key: "Pharmacy", value: "pharmacy" },
  ];
  const gender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  const state = {
    firstName: "",
    lastName: "",
    gender: "",
    specialization: "",
    dociId: localStorage.getItem("doctor_id"),
    cadre: "",
    image: null,
    hospital: "",
    providerId: "",
    dob: "",
    phoneNumber: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string("Enter your first Name").required("First Name is Required"),
    lastName: Yup.string("Enter your last Name").required("lastName Name is Required"),
    hospital: Yup.string("Enter your hospital").required("hospital Name is Required"),
    dociId: Yup.string("Enter your dociId").required("dociId Name is Required"),
    providerId: Yup.string("Enter your providerId").required("providerId is Required"),
    cadre: Yup.number("Enter your Cadre").required("Cadre is Required"),
    specialization: Yup.string("Select your Specialization").required("Specialization is Required"),
    gender: Yup.string("Select your gender").required("Gender is Required"),
    image: Yup.string("Upload a single Image").required("Image is required"),
    dob: Yup.string("Enter your DOB").required("DOB us Required"),
    phoneNumber: Yup.number("Enter your Phone Number").required("Phone Number is Required"),
  });

  const [createDoctor] = useMutation(createDoctorProfile);
  const onSubmit = async (values) => {
    const {
      dob,
      firstName,
      lastName,
      gender,
      specialization,
      image,
      cadre,
      phoneNumber,
      providerId,
      dociId,
      hospital,
    } = values;
    const correctDOB = dateMoment(dob);

    console.log(values);
    await createDoctor({
      variables: {
        firstName,
        lastName,
        gender,
        specialization,
        image,
        cadre,
        phoneNumber,
        providerId,
        dociId,
        hospital,
        dob: correctDOB,
      },
    });
    handleNext();
  };
  return (
    <Grid item container direction="column" md={8} gap={5} padding="3rem 0">
      <Grid item>
        <Formik
          initialValues={state}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue, setValues, isValid, dirty, errors }) => {
            console.log(errors);

            return (
              <Form>
                <Grid container md={8} margin="auto" gap={3}>
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={10}>
                      <Grid item>
                        <Typography variant="h3">Create Profile</Typography>
                      </Grid>
                    </Grid>
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
                        name="specialization"
                        placeholder="Select Specialization"
                        label="Specialization"
                        options={options}
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="e.g Enter Your phone Number"
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="cadre"
                        placeholder="Enter Cadre"
                        label="Cadre"
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="providerId"
                        label="providerId"
                        placeholder="e.g Enter Your providerId"
                      />
                    </Grid>
                  </Grid>
                  {/*  */}
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="date"
                        name="dob"
                        label="DOB"
                        setFieldValue={setFieldValue}
                        setValues={setValues}
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="select"
                        name="gender"
                        label="Gender"
                        options={gender}
                        placeholder="Select Gender"
                      />
                    </Grid>
                  </Grid>
                  {/*  */}

                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="hospital"
                        label="Hospital"
                        placeholder="Hospital"
                      />
                    </Grid>
                    <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="dociId"
                        label="HEeala-ID"
                        placeholder="Heala ID"
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="space-around" gap={2}>
                    <Grid item container md={11} sm={10}>
                      <FormikControl
                        control="file"
                        name="image"
                        label="Upload Your Image"
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    {/* <Grid item container md={5} sm={10}>
                      <FormikControl
                        control="input"
                        name="dociId"
                        label="HEeala-ID"
                        placeholder="Heala ID"
                        disabled
                      />
                    </Grid> */}
                  </Grid>

                  <Grid item container md={4} sm={5} margin="auto">
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
  );
};
PageTwo.propTypes = {
  state: PropTypes.object.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
export default PageTwo;
