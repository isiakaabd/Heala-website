import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Avatar, Alert } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import { ReactComponent as HealaIcon } from "assets/images/logo.svg";
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
    { key: "Internal medicine", value: "Internal medicine" },
    { key: "Family medicine", value: "Family medicine" },
    { key: "Primary care", value: "Primary care" },
    { key: "Pediatrics", value: "Pediatrics" },
    { key: "Emergency medicine", value: "Emergency medicine" },
    { key: "Obstetrics gynecology", value: "Obstetrics gynecology" },
    { key: "Neurology", value: "Neurology" },
    { key: "Geriatrics", value: "Geriatrics" },
    { key: "Psychiatry", value: "Psychiatry" },
    { key: "Anesthesiology", value: "Anesthesiology" },
    { key: "Cardiology", value: "Cardiology" },
    { key: "Dermatology", value: "Dermatology" },
    { key: "Intensive medicine", value: "Intensive medicine" },
    { key: "Endocrinology", value: "Endocrinology" },
    { key: "Radiology", value: "Radiology" },
    { key: "Otorhinolaryngology", value: "Otorhinolaryngology" },
    { key: "Ophthalmology", value: "Ophthalmology" },
    { key: "Oncology", value: "Oncology" },
    { key: "General surgery", value: "General surgery" },
    { key: "Gynaecology", value: "Gynaecology" },
    { key: "Infectious disease", value: "Infectious disease" },
    { key: "Rheumatology", value: "Rheumatology" },
    { key: "Nephrology", value: "Nephrology" },
    { key: "Infectious disease", value: "Infectious disease" },
    { key: "Pulmonology", value: "Pulmonology" },
    { key: "Gastroenterology", value: "Gastroenterology" },
    { key: "Osteopathy", value: "Osteopathy" },
    { key: "Clinical  physiology", value: "Clinical physiology" },
    { key: "Allergology", value: "Allergology" },
    { key: "Adolescent medicine ", value: "Adolescent medicine " },
    { key: "Aviation medicine", value: "Aviation medicine" },
    { key: "Child and adolescent psychiatry", value: "Child and adolescent psychiatry" },
    { key: "occupational medicine ", value: "occupational medicine " },
    { key: "Neonatology", value: "Neonatology" },
  ];
  const gender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];
  const [alert, setAlert] = useState({});
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
    dob: "",
    image: null,
    hospital: "",
    phoneNumber: "",
    level: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string("Enter your first Name").required("First Name is Required"),
    lastName: Yup.string("Enter your last Name").required("lastName Name is Required"),
    hospital: Yup.string("Enter your hospital").required("hospital Name is Required"),
    dociId: Yup.string("Enter your dociId").required("dociId Name is Required"),
    specialization: Yup.string("Select your Specialization").required("Specialization is Required"),
    gender: Yup.string("Select your gender").required("Gender is Required"),
    image: Yup.string("Upload a single Image").required("Image is required"),
    dob: Yup.string("Enter your DOB").required("DOB us Required"),
    phoneNumber: Yup.number("Enter your Phone Number").required("Phone Number is Required"),
    level: Yup.string("Enter your Level").required("Level is Required"),
  });
  const selectOption = [
    {
      key: "House Officer",
      value: "House Officer",
    },
    {
      key: "Registrar",
      value: "Registrar",
    },
    {
      key: "Senior Registrar",
      value: "Senior Registrar",
    },
    {
      key: "Consultant",
      value: "Consultant",
    },
  ];
  const [createDoctor] = useMutation(createDoctorProfile);
  const onSubmit = async (values) => {
    const {
      dob,
      firstName,
      lastName,
      gender,
      specialization,
      image,
      phoneNumber,
      dociId,
      hospital,
      level,
    } = values;
    const correctDOB = dateMoment(dob);

    const { data, error } = await createDoctor({
      variables: {
        firstName,
        lastName,
        gender,
        specialization,
        image,
        phoneNumber,
        providerId: "61db6f8968b248001aec4fcb",
        cadre: level,
        dociId,
        hospital,
        dob: correctDOB,
      },
    });
    if (data) {
      const { _id } = data.createDoctorProfile.profile;
      localStorage.setItem("id", _id);
      handleNext();
      setAlert({
        message: "Doctor Registration Successful",
        type: "success",
      });
    }
    if (error) {
      setAlert({
        message: error.message,
        type: "error",
      });
    }
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
        direction="column"
        md={4}
        sm={12}
        gap={5}
        sx={{
          padding: "2rem",
          background: "white",
          borderRadius: "5px",
          zIndex: "999",
          margin: "auto",
        }}
      >
        {alert && Object.keys(alert).length > 0 && (
          <Alert variant="filled" severity={alert.type}>
            {alert.message}
          </Alert>
        )}
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
                  <Grid container md={12} margin="auto" gap={1}>
                    <Grid item container justifyContent="space-around" gap={2}>
                      <Grid item container md={5} sm={10}>
                        <Grid item>
                          <Typography variant="h3">Create Profile</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item container justifyContent="space-around" gap={1}>
                      <FormikControl
                        control="input"
                        name="firstName"
                        placeholder="Enter your First Name"
                        label="First Name"
                      />
                    </Grid>
                    <Grid item container justifyContent="space-around" gap={1}>
                      <FormikControl
                        control="input"
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter Your last Name"
                      />
                    </Grid>
                    <Grid item container justifyContent="space-around" gap={2}>
                      <FormikControl
                        control="select"
                        name="specialization"
                        placeholder="Select Specialization"
                        label="Specialization"
                        options={options}
                      />
                    </Grid>
                    <Grid item container justifyContent="space-around" gap={2}>
                      <FormikControl
                        control="input"
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="e.g Enter Your phone Number"
                      />
                    </Grid>
                    <Grid item container justifyContent="space-around" gap={2}>
                      <FormikControl
                        control="select"
                        name="level"
                        placeholder="Select Level"
                        label="Select Level"
                        options={selectOption}
                      />
                    </Grid>
                    {/*  */}
                    <Grid item container justifyContent="space-around" gap={2}>
                      <FormikControl
                        control="date"
                        name="dob"
                        label="DOB"
                        setFieldValue={setFieldValue}
                        setValues={setValues}
                      />
                    </Grid>
                    <Grid item container justifyContent="space-around" gap={2}>
                      <FormikControl
                        control="select"
                        name="gender"
                        label="Gender"
                        options={gender}
                        placeholder="Select Gender"
                      />
                    </Grid>
                    {/*  */}

                    <Grid item container justifyContent="space-around" gap={2}>
                      <FormikControl
                        control="input"
                        name="hospital"
                        label="Hospital"
                        placeholder="Hospital"
                      />
                    </Grid>
                    <Grid item container justifyContent="space-around">
                      <FormikControl
                        control="file"
                        name="image"
                        label="Upload Your Image"
                        setFieldValue={setFieldValue}
                      />
                    </Grid>

                    <Grid item container md={12} sm={10} margin="auto">
                      <CustomButton
                        variant="contained"
                        title="Continue"
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
PageTwo.propTypes = {
  state: PropTypes.object.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
export default PageTwo;
