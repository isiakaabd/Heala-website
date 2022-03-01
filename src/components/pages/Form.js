import React, { useState } from "react";
import { Grid, FormLabel, Typography, Avatar, Alert } from "@mui/material";
import { Card, CustomButton } from "components/Utilities";
import { createDoctorVerification } from "components/graphQL/Mutation";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { dateMoment } from "components/Utilities/Time";
import { ReactComponent as LicenseIcon } from "assets/images/licenses.svg";
import { ReactComponent as HealaIcon } from "assets/images/logo.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as ReferenceIcon } from "assets/images/reference.svg";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    "&.MuiCard-root": {
      width: "100%",
      height: "15.8rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      background: "white",
      marginRight: "5rem",
      "&:hover": {
        boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
        cursor: "pointer",
      },
      "&:active": {
        background: "#fafafa",
      },
      "& .MuiCardContent-root .MuiTypography-h5": {
        textDecoration: "none !important",
        textTransform: "uppercase",
      },
    },
  },
  form: theme.mixins.toolbar,
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      color: theme.palette.common.black,

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },

  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardGrid: {
    justifyContent: "center",
    alignItems: "center",
    height: "25.8rem",
  },
  flexContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    width: "100%",

    padding: "2rem 4rem",
    "&:first-child": {
      borderBottom: ".5px solid #F8F8F8",
    },
  },
  lightGreen: {
    color: theme.palette.common.green,
  },

  lightRed: {
    color: theme.palette.common.red,
  },
  mainContainer: {
    flexDirection: "column",
    width: "100%",
    background: "white",
    borderRadius: "2rem",
    boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  },
  infoBadge: {
    "&.MuiGrid-item": {
      padding: ".2rem 2rem",
      borderRadius: "1.5rem",
      display: "flex",
      alignItems: "center",
      color: theme.palette.common.red,
      background: theme.palette.common.lightRed,
      border: `2px dashed ${theme.palette.common.red}`,
    },
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  parentGrid: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
    },
  },
  cardIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "3rem",
    },
  },
  active: {
    "&> *": {
      background: "#ECF6F3 !important",
    },
  },
}));

const Forms = () => {
  const [alert, setAlert] = useState({});
  const classes = useStyles();
  const theme = useTheme();
  const [createVerification, { error }] = useMutation(createDoctorVerification);
  const onSubmit = async (values, onSubmitProps) => {
    console.log(values);
    const {
      degree,
      degreeImage,
      license,
      expire,
      licenseImage,
      licenseType,
      gYear,
      gImage,
      FacebookName,
      InstagramName,
      doctorName,
      referenceCode,
      doctorEmail,
      doctorPosition,
      doctorInstitution,
    } = values;

    const year = dateMoment(gYear);
    const expires = dateMoment(expire);
    // onSubmitProps.resetForm();
    const { data } = await createVerification({
      variables: {
        degree, //
        image: degreeImage,
        number: license,
        expiryDate: expires,
        licenseImage, //
        type: licenseType,
        graduation: year, //
        graduationImage: gImage,
        facebook: FacebookName,
        instagram: InstagramName,
        doctorName: doctorName,
        reference: referenceCode,
        profileId: localStorage.getItem("id"),
        doctorEmail,
        doctorPosition, //
        doctorInstitution, //
      },
    });
    if (data) {
      setAlert({
        message: "Registration Successfull",
        type: "success",
      });
    }
    if (error) {
      setAlert({
        message: "something went wrong",
        type: "error",
      });
    }
  };

  const options = [{ key: "MDCN", value: "MDCN" }];
  const initialValues = {
    degree: "",
    degreeImage: "",
    license: "",
    expire: "",
    licenseImage: "",
    licenseType: "",
    gYear: "",
    gImage: "",
    FacebookName: "",
    InstagramName: "",
    doctorName: "",
    referenceCode: "",
    // ExdoctorName: "",
    doctorEmail: "",
    doctorPosition: "",
    doctorInstitution: "",
  };

  const validationSchema = Yup.object({
    degreeImage: Yup.string("Enter Degree Image "),
    license: Yup.string("Enter license date "),
    expire: Yup.string("Enter expiry date "),
    licenseImage: Yup.string("Enter your license Image "),
    gYear: Yup.string("Enter your Year Book "),
    licenseType: Yup.string("Enter your license Type "),
    gImage: Yup.string("Enter your Year Book Image"),
    InstagramName: Yup.string("Enter your Instagram Name"),
    FacebookName: Yup.string("Enter your Facebook Name"),
    degree: Yup.string("Enter your degree"),
    doctorInstitution: Yup.string("Enter your Doctor Institution"),
    doctorPosition: Yup.string("Enter your Doctor Position"),
    doctorEmail: Yup.string("Enter your Doctor Email"),
    // ExdoctorName: Yup.string("Enter your External doctor Name").required(
    //   " External doctor Name is Required",
    // ),
    referenceCode: Yup.string("Enter your Reference Code"),
    doctorName: Yup.string("Select your Doctor Name"),
  });
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  const [qualification, setQualification] = useState(true);
  const [license, setLicense] = useState(false);
  const [yearBook, setYearBook] = useState(false);
  const [alumni, setAlumni] = useState(false);
  const [reference, setReference] = useState(false);
  const [externalReference, setExternalReference] = useState(false);

  return (
    <Grid container gap={1}>
      <Grid container justifyContent="center" alignItems="center">
        <Avatar sx={{ background: "transparent", color: "white", width: 150, height: 150 }}>
          <HealaIcon />
        </Avatar>
      </Grid>

      <Grid
        item
        container
        md={11}
        sm={12}
        direction="column"
        gap={5}
        sx={{
          padding: "3rem",
          background: "white",
          borderRadius: "5px",
          zIndex: "999",
          margin: "auto",
        }}
      >
        <Grid item>
          <Typography textAlign="center" variant="h1">
            Doctor Verification
          </Typography>
          <Typography variant="body1" textAlign="center" style={{ lineHeight: 1.85 }}>
            Select at least 2 verification method
          </Typography>
          <Typography variant="h6" textAlign="center" color="green">
            (Qualification and any other)
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          rowGap={3}
          spacing={3}
          sx={{ width: "100%", margin: "auto" }}
        >
          <Grid
            item
            container
            md={3.5}
            xs={5.5}
            className={
              qualification ? `${classes.parentGrid} ${classes.active}` : classes.parentGrid
            }
            onClick={() => {
              setQualification(!qualification);
            }}
          >
            <Card title="Qualification" background={theme.palette.common.lightRed}>
              <Grid className={classes.iconWrapper}>
                <CalendarIcon
                  color="error"
                  fill={theme.palette.common.red}
                  className={classes.cardIcon}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            md={3.5}
            xs={5.5}
            className={license ? `${classes.parentGrid} ${classes.active}` : classes.parentGrid}
            onClick={() => setLicense(!license)}
          >
            <Card title="License" background={theme.palette.common.lightRed}>
              <LicenseIcon
                // color="error"
                fill={theme.palette.common.red}
                // className={classes.cardIcon}
              />
              {/* <CalendarIcon
                  color="error"
                  fill={theme.palette.common.red}
                  className={classes.cardIcon}
                /> */}
            </Card>
          </Grid>
          <Grid
            item
            md={3.5}
            xs={5.5}
            className={yearBook ? `${classes.parentGrid} ${classes.active}` : classes.parentGrid}
            onClick={() => {
              setYearBook(!yearBook);
            }}
          >
            <Card title="Year Book" background={theme.palette.common.lightRed}>
              <CalendarIcon
                color="error"
                fill={theme.palette.common.red}
                className={classes.cardIcon}
              />
            </Card>
          </Grid>

          {/* second container */}
          <Grid
            md={3.5}
            xs={5.5}
            item
            className={alumni ? `${classes.parentGrid} ${classes.active}` : classes.parentGrid}
            onClick={() => {
              setAlumni(!alumni);
            }}
          >
            <Card title="Alumni Association" background={theme.palette.common.lightRed}>
              {/* <Grid item className={classes.iconWrapper}> */}
              <CalendarIcon
                color="error"
                fill={theme.palette.common.red}
                className={classes.cardIcon}
              />
              {/* </Grid> */}
            </Card>
          </Grid>
          {/* 2b */}
          <Grid
            item
            md={3.5}
            xs={5.5}
            className={reference ? `${classes.parentGrid} ${classes.active}` : classes.parentGrid}
            onClick={() => {
              setReference(!reference);
            }}
          >
            <Card title="Heala Reference" background={theme.palette.common.lightRed}>
              <CalendarIcon
                color="error"
                fill={theme.palette.common.red}
                className={classes.cardIcon}
              />
            </Card>
          </Grid>
          {/* 3b */}
          <Grid
            item
            md={3.5}
            xs={5.5}
            className={
              externalReference ? `${classes.parentGrid} ${classes.active}` : classes.parentGrid
            }
            onClick={() => {
              setExternalReference(!externalReference);
            }}
          >
            <Card title="External Reference" background={theme.palette.common.lightRed}>
              <ReferenceIcon color="error" className={classes.cardIcon} />
            </Card>
          </Grid>
        </Grid>

        <Grid item className={classes.infoBadge} gap={2}>
          <ErrorRoundedIcon />
          <Typography variant="h6">
            This will contain the status message regarding the verification process of the HCP
          </Typography>
        </Grid>

        <Grid item>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnMount
          >
            {({ setValues, setFieldValue, isSubmitting, dirty, isValid, errors }) => {
              console.log(errors);

              return (
                <Form>
                  {qualification ? (
                    <>
                      <Grid
                        item
                        container
                        md={12}
                        sm={12}
                        direction="column"
                        justifyContent="space-between"
                        gap={1}
                        marginBottom={4}
                      >
                        <Typography variant="h2">Qualification</Typography>

                        <Grid item container justifyContent="space-between" gap={1}>
                          <Grid item container md={5} sm={10}>
                            <FormikControl
                              control="input"
                              name="degree"
                              placeholder="BSc Surgery"
                              label="Degree"
                            />
                          </Grid>
                          <Grid item container md={5} sm={10}>
                            <FormikControl
                              control="date"
                              name="year"
                              label="Year"
                              setFieldValue={setFieldValue}
                              setValues={setValues}
                            />
                          </Grid>
                        </Grid>
                        <FormLabel component="legend" className={classes.FormLabel}>
                          Upload Your Qualification
                        </FormLabel>
                        <Grid
                          container
                          sx={{
                            height: "200 px",
                            border: "2px dashed #CCCCCC",
                          }}
                        >
                          <Grid item container>
                            <Grid
                              container
                              item
                              direction="column"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <label
                                htmlFor="contained-button-file"
                                style={{ textAlign: "center" }}
                              >
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <FormikControl
                                    control="file"
                                    name="degreeImage"
                                    setFieldValue={setFieldValue}
                                  />
                                </div>
                                {/* <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    name="Qualification"
                                    style={{ display: "none" }}
                                  />
                                  <Button
                                    variant="contained"
                                    component="span"
                                    className={classes.uploadBtn}
                                  >
                                    Upload Photo
                                  </Button> */}
                                <Grid marginTop="1.5rem">
                                  {" "}
                                  <Typography textAlign="center" variant="h6">
                                    Drag and Drop and Image or
                                  </Typography>
                                  <Typography textAlign="left" variant="h6" color="error">
                                    Browse
                                  </Typography>
                                </Grid>
                              </label>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}

                  {/*  */}
                  {license ? (
                    <>
                      <Grid
                        item
                        container
                        md={12}
                        sm={12}
                        direction="column"
                        justifyContent="space-between"
                        gap={3}
                        marginBottom={4}
                      >
                        <Typography variant="h2">License</Typography>
                        <Grid item container justifyContent="space-between" spacing={3}>
                          <Grid item container md={12} sm={10}>
                            <FormikControl
                              control="input"
                              name="license"
                              placeholder="Enter license number"
                              label="License Number"
                            />
                          </Grid>
                          <Grid item container justifyContent="space-between" gap={2}>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="select"
                                name="licenseType"
                                placeholder="Select License Type"
                                label="Type"
                                options={options}
                              />
                            </Grid>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="date"
                                name="expire"
                                label="Expiry Date"
                                setFieldValue={setFieldValue}
                                setValues={setValues}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <FormLabel component="legend" className={classes.FormLabel}>
                          Upload Your License
                        </FormLabel>
                        <Grid
                          item
                          container
                          sx={{ height: "200 px", border: "2px dashed #CCCCCC" }}
                        >
                          <Grid item container alignItems="center">
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <label
                                htmlFor="contained-button-file"
                                style={{ textAlign: "center" }}
                              >
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <FormikControl
                                    control="file"
                                    name="licenseImage"
                                    setFieldValue={setFieldValue}
                                  />
                                </div>

                                <Grid marginTop="1.5rem">
                                  <Typography textAlign="center" variant="h6">
                                    Drag and Drop and Image or
                                  </Typography>
                                  <Typography textAlign="left" variant="h6" color="error">
                                    Browse
                                  </Typography>
                                </Grid>
                              </label>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}

                  {/* yearbook */}
                  {yearBook ? (
                    <>
                      <Grid
                        item
                        container
                        md={12}
                        xs={12}
                        direction="column"
                        justifyContent="space-between"
                        gap={3}
                        marginBottom={4}
                      >
                        <Typography variant="h2">Year Book</Typography>
                        <Grid item container justifyContent="space-between" spacing={3}>
                          <Grid item container justifyContent="start">
                            <FormikControl
                              control="date"
                              name="gYear"
                              label="Graduation year"
                              setFieldValue={setFieldValue}
                              setValues={setValues}
                            />
                          </Grid>
                        </Grid>
                        <FormLabel component="legend" className={classes.FormLabel}>
                          Upload Your Yearbook
                        </FormLabel>
                        <Grid
                          item
                          container
                          justifyContent="center"
                          sx={{ height: "200 px", border: "2px dashed #CCCCCC" }}
                        >
                          <Grid item container alignItems="center" justifyContent="center">
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <label
                                htmlFor="contained-button-file"
                                style={{ textAlign: "center" }}
                              >
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <FormikControl
                                    control="file"
                                    name="gImage"
                                    setFieldValue={setFieldValue}
                                  />
                                </div>

                                <Grid marginTop="1.5rem">
                                  <Typography textAlign="left" variant="h6">
                                    Drag and Drop and Image or
                                  </Typography>
                                  <Typography textAlign="left" variant="h6" color="error">
                                    Browse
                                  </Typography>
                                </Grid>
                              </label>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}

                  {/* Alumni Association */}
                  {alumni ? (
                    <>
                      <Grid
                        item
                        container
                        md={12}
                        sm={12}
                        direction="column"
                        justifyContent="space-between"
                        gap={3}
                        marginBottom={4}
                      >
                        <Typography variant="h2">Alumni Association</Typography>
                        <Grid item container justifyContent="space-between" gap={3}>
                          <Grid item container sm={10} md={12}>
                            <FormikControl
                              control="input"
                              name="FacebookName"
                              placeholder="Enter facebook group name"
                              label="Facebook Group Name"
                            />
                          </Grid>
                          <Grid item container sm={10} md={12}>
                            <FormikControl
                              control="input"
                              name="InstagramName"
                              placeholder="Enter group instagram handle"
                              label="Instagram Handle"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                  {/* refrence */}
                  {reference ? (
                    <>
                      <Grid
                        item
                        container
                        md={12}
                        sm={12}
                        direction="column"
                        justifyContent="space-between"
                        gap={3}
                        marginBottom={4}
                      >
                        <Typography variant="h2">Reference From Doctor on Heala</Typography>
                        <Grid item container justifyContent="space-between" spacing={3}>
                          <Grid item container md={12} sm={10}>
                            <FormikControl
                              control="input"
                              name="referenceCode"
                              placeholder="Enter reference code"
                              label="Reference Code"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}

                  {/* external reference */}
                  {externalReference ? (
                    <>
                      <Grid
                        item
                        container
                        md={12}
                        sm={12}
                        direction="column"
                        justifyContent="space-between"
                        gap={3}
                        marginBottom={4}
                      >
                        <Typography variant="h2">External Reference</Typography>
                        <Grid item container justifyContent="space-between" spacing={1}>
                          <Grid item container justifyContent="space-between" gap={2}>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="input"
                                name="doctorName"
                                placeholder="Enter Doctor's name"
                                label="Doctor's name"
                              />
                            </Grid>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="input"
                                name="doctorInstitution"
                                label="Doctor's institution"
                                placeholder="e.g Federal Teaching hospital Akure"
                              />
                            </Grid>
                          </Grid>
                          <Grid item container justifyContent="space-between" gap={3}>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="input"
                                name="doctorPosition"
                                label="Doctor's Position"
                                placeholder="e.g Dentist"
                              />
                            </Grid>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="input"
                                name="doctorEmail"
                                disabled
                                label=" Doctor's Email"
                                placeholder="Enter email"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                  {alert && Object.keys(alert).length > 0 && (
                    <Alert variant="filled" sx={{ textAlign: "center" }} severity={alert.type}>
                      {alert.message}
                    </Alert>
                  )}

                  <Grid item md={12} container sm={10}>
                    <CustomButton
                      variant="contained"
                      title=" Save Record"
                      type={greenButton}
                      className={classes.btn}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                    />
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

export default Forms;
