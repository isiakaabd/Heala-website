import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
<<<<<<< HEAD
import { Grid, Typography } from "@mui/material";

=======
import { Grid, Typography, Avatar, Alert } from "@mui/material";
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f
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
<<<<<<< HEAD
  const id = localStorage.getItem("heala_id");
  const [endDateLimit, setEndDataLimit] = useState("");

  useEffect(() => {
    setEndDataLimit(Date.now());
  }, []);
=======
  useEffect(() => {
    setStep(2);
  }, [setStep]);
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
    {
      key: "Child and adolescent psychiatry",
      value: "Child and adolescent psychiatry",
    },
    { key: "occupational medicine ", value: "occupational medicine " },
    { key: "Neonatology", value: "Neonatology" },
  ];
  const gender = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];
  const [alert, setAlert] = useState({});
  const [setModal] = useState(false);
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
<<<<<<< HEAD

  const [createDoctor] = useMutation(createDoctorProfile);

=======
  const state = {
    firstName: "",
    lastName: "",
    gender: "",
    specialization: "",
    dociId: localStorage.getItem("doctor_id"),
    dob: "01/01/1900",
    image: null,
    hospital: "",
    phoneNumber: "",
    level: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string("Enter your first Name").trim().required("First Name is Required"),
    lastName: Yup.string("Enter your last Name").trim().required("lastName Name is Required"),
    hospital: Yup.string("Enter your hospital").trim().required("hospital Name is Required"),
    dociId: Yup.string("Enter your dociId").trim().required("dociId Name is Required"),
    specialization: Yup.string("Select your Specialization")
      .trim()
      .required("Specialization is Required"),
    gender: Yup.string("Select your gender").required("Gender is Required"),
    image: Yup.string("Upload a single Image")
      .required("Image is required")
      .typeError("Image is required"),
    dob: Yup.string("Enter your DOB").required("DOB is Required"),
    phoneNumber: Yup.number("Enter your Phone Number").required("Phone Number is Required"),
    level: Yup.string("Enter your Level").trim().required("Level is Required"),
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
    try {
      const { data } = await createDoctor({
        variables: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          gender,
          specialization,
          image,
          phoneNumber,
          providerId: "61db6f8968b248001aec4fcb",
          cadre: level,
          dociId,
          hospital: hospital.trim(),
          dob: correctDOB,
        },
      });
      const { _id } = data.createDoctorProfile.profile;
      localStorage.setItem("id", _id);
      enqueueSnackbar(
        <Typography style={{ fontSize: "1.2rem" }}>Doctor Registeration successsful</Typography>,
        {
          variant: "success",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "center",
            vertical: "top",
          },
        },
      );
      handleNext();
      setModal(true);
    } catch (err) {
      setAlert({
        message: err.networkError.result.errors[0].message,
        type: "error",
      });
    }
  };
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f
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
              validateOnChange={true}
              validateOnBlur={true}
              validateOnMount={false}
              onSubmit={(values) =>
                onPageTwoFormSubmit(
                  { healaId: id, ...values },
                  createDoctor,
                  enqueueSnackbar,
                  handleNext
                )
              }
            >
              {({ isSubmitting, setFieldValue, setValues, isValid, dirty }) => {
                return (
                  <Form>
<<<<<<< HEAD
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
=======
                    <Grid container md={12} margin="auto" gap={1}>
                      <Grid item container justifyContent="center" marginBottom="14px" gap={2}>
                        <Grid item container justifyContent="center" md={5} sm={10}>
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f
                          <Grid item>
                            <Typography variant="h5">CREATE PROFILE</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item container justifyContent="space-around" gap={1}>
                        <FormikControl
                          control="input"
                          name="firstName"
                          placeholder="Enter your First Name"
                          label="First Name"
                          isRequired
                        />
                      </Grid>
                      <Grid item container justifyContent="space-around" gap={1}>
                        <FormikControl
                          control="input"
                          name="lastName"
                          label="Last Name"
                          placeholder="Enter Your last Name"
                          isRequired
                        />
                      </Grid>
                      <Grid item container justifyContent="space-around" gap={2}>
                        <FormikControl
                          control="select"
                          name="specialization"
                          placeholder="Select Specialization"
                          label="Specialization"
                          options={specializationOptions}
                          isRequired
                        />
                      </Grid>
                      <Grid item container justifyContent="space-around" gap={2}>
                        <FormikControl
                          control="input"
                          name="phoneNumber"
                          label="Phone Number"
                          placeholder="e.g Enter Your phone Number"
                          isRequired
                        />
                      </Grid>
                      <Grid item container justifyContent="space-around" gap={2}>
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
                      <Grid item container justifyContent="space-around" gap={2}>
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
                      <Grid item container justifyContent="space-around" gap={2}>
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

                      <Grid item container justifyContent="space-around" gap={2}>
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
