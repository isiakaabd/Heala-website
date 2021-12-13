import React, { useState, Fragment } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Grid, Typography, Box } from "@mui/material";
import { Card, CustomButton } from "components/Utilities";
import { ReactComponent as LicenseIcon } from "assets/images/licenses.svg";
// import { ReactComponent as YearBookIcon } from "assets/images/yearbook.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
// import { ReactComponent as TimerIcon } from "assets/images/timer.svg";
// import { ReactComponent as AlumniIcon } from "assets/images/alumni.svg";
import { ReactComponent as ReferenceIcon } from "assets/images/reference.svg";
// import { ReactComponent as QualificationIcon } from "assets/images/qualification.svg";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
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
  const classes = useStyles();
  const theme = useTheme();
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    console.log(values);
    onSubmitProps.resetForm();
  };
  const checkbox2 = [
    { key: "select an option", value: " " },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const options = [
    { key: "select an option", value: " " },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const initialValues = {
    Name: "",
    Date: "",
    License: "",
    Qualification: "",
    LicenseType: "",
    LicenseExpiryDate: "",
    licenseImage: "",
    graduationYear: "",
    yearBookImage: "",
    FacebookName: "",
    InstagramName: "",
    referenceCode: "",
    DoctorName: "",
    DoctorInstitution: "",
    Doctorposition: "",
    DoctorEmail: "",
  };
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
    <Fragment>
      {/* <div className={classes.form}></div> */}
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          gap={5}
          width="90%"
          margin="auto"
        >
          <Grid item>
            <Typography textAlign="center" variant="h1">
              HCP Verification
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
              //   validationSchema={validationSchema}
              validateOnChange={false}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form>
                    {qualification ? (
                      <>
                        <Grid
                          item
                          container
                          md={8}
                          sm={12}
                          direction="column"
                          justifyContent="space-between"
                          gap={3}
                          marginBottom={4}
                        >
                          <Typography variant="h2">Qualification</Typography>

                          <Grid item container justifyContent="space-between" gap={3}>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="select"
                                name="Name"
                                placeholder="Select Name"
                                label="Type"
                                options={options}
                              />
                            </Grid>
                            <Grid item container md={5} sm={10}>
                              <FormikControl
                                control="select"
                                placeholder="Choose Date"
                                name="Date"
                                label="Expiry Date"
                                options={checkbox2}
                              />
                            </Grid>
                          </Grid>
                          <FormLabel component="legend" className={classes.FormLabel}>
                            Upload Your Qualification
                          </FormLabel>
                          <Grid
                            item
                            container
                            sx={{ height: "200px", border: "2px dashed #CCCCCC" }}
                          >
                            <Grid item container alignItems="center">
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
                                  <Input
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
                                  </Button>
                                  <Grid marginTop="1.5rem">
                                    {" "}
                                    <Typography textAlign="center" variant="h6">
                                      Drag and Drop and Image or
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="error">
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
                          md={8}
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
                                name="License"
                                placeholder="Enter license number"
                                label="License Number"
                              />
                            </Grid>
                            <Grid item container justifyContent="space-between" gap={3}>
                              <Grid item container md={5} sm={10}>
                                <FormikControl
                                  control="select"
                                  name="LicenseType"
                                  placeholder="Select Name"
                                  label="Type"
                                  options={options}
                                />
                              </Grid>
                              <Grid item container md={5} sm={10}>
                                <FormikControl
                                  control="select"
                                  placeholder="Choose Date"
                                  name="LicenseExpiryDate"
                                  label="Expiry Date"
                                  options={checkbox2}
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
                            sx={{ height: "200px", border: "2px dashed #CCCCCC" }}
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
                                  <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    name="licenseImage"
                                    style={{ display: "none" }}
                                  />
                                  <Button
                                    variant="contained"
                                    component="span"
                                    className={classes.uploadBtn}
                                  >
                                    Upload Photo
                                  </Button>
                                  <Grid marginTop="1.5rem">
                                    {" "}
                                    <Typography textAlign="center" variant="h6">
                                      Drag and Drop and Image or
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="error">
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
                          md={8}
                          xs={12}
                          direction="column"
                          justifyContent="space-between"
                          gap={3}
                          marginBottom={4}
                        >
                          <Typography variant="h2">Year Book</Typography>
                          <Grid item container justifyContent="space-between" spacing={3}>
                            <Grid item container justifyContent="space-between">
                              <Grid item container md={5} sm={10}>
                                <FormikControl
                                  control="select"
                                  name="graduationYear"
                                  placeholder="Select Name"
                                  label="Graduation Year"
                                  options={options}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <FormLabel component="legend" className={classes.FormLabel}>
                            Upload Your Yearbook
                          </FormLabel>
                          <Grid
                            item
                            container
                            justifyContent="center"
                            sx={{ height: "200px", border: "2px dashed #CCCCCC" }}
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
                                  <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    name="yearBookImage"
                                    style={{ display: "none" }}
                                  />
                                  <Button
                                    variant="contained"
                                    component="span"
                                    className={classes.uploadBtn}
                                  >
                                    Upload Photo
                                  </Button>
                                  <Grid marginTop="1.5rem">
                                    {" "}
                                    <Typography textAlign="center" variant="h6">
                                      Drag and Drop and Image or
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="error">
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
                          md={8}
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
                          md={8}
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
                          md={8}
                          sm={12}
                          direction="column"
                          justifyContent="space-between"
                          gap={3}
                          marginBottom={4}
                        >
                          <Typography variant="h2">External Reference</Typography>
                          <Grid item container justifyContent="space-between" spacing={3}>
                            <Grid item container justifyContent="space-between" gap={3}>
                              <Grid item container md={5} sm={10}>
                                <FormikControl
                                  control="input"
                                  name="DoctorName"
                                  placeholder="Enter Doctor's name"
                                  label="Doctor's name"
                                />
                              </Grid>
                              <Grid item container md={5} sm={10}>
                                <FormikControl
                                  control="input"
                                  name="DoctorInstitution"
                                  label="Doctor's institution"
                                  placeholder="e.g Federal Teaching hospital Akure"
                                />
                              </Grid>
                            </Grid>
                            <Grid item container justifyContent="space-between" gap={3}>
                              <Grid item container md={5} sm={10}>
                                <FormikControl
                                  control="input"
                                  name="Doctorposition"
                                  label="Doctor's Position"
                                  placeholder="e.g Dentist"
                                />
                              </Grid>
                              <Grid item container md={5} sm={10}>
                                <FormikControl
                                  control="input"
                                  name="DoctorEmail"
                                  label=" Doctor's Email"
                                  placeholder="Enter email"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    ) : null}
                    {(qualification || yearBook || reference) && (
                      <Grid item md={2} sm={10} container>
                        <CustomButton
                          variant="contained"
                          title=" Save Record"
                          type={greenButton}
                          // onClick={handleDialogClose}
                          className={classes.btn}
                          // disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                        />
                      </Grid>
                    )}
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Forms;
