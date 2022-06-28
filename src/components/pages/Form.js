import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { Grid, FormLabel, Typography } from "@mui/material";

import { useStyles } from "styles/formStyles";
import DragAndDrop from "components/DragAndDrop";
import { Card, CustomButton } from "components/Utilities";
import { getUsertypess } from "components/graphQL/UseQuery";
import { FormValidationSchema } from "helpers/formValidation";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import FormikControl from "components/validation/FormikControl";
import { createDoctorVerification } from "components/graphQL/Mutation";
import { ReactComponent as LicenseIcon } from "assets/images/licenses.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as ReferenceIcon } from "assets/images/reference.svg";
import {
  getSelectedCertification,
  onPageThreeSubmit,
} from "helpers/helperFuncs";
import {
  requirementValues,
  step3FromInitialValues,
} from "../../helpers/mockData";
import VerificationCard from "components/cards/VerificationCard";

const Forms = ({ handleNext }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const theme = useTheme();
  const [createVerification] = useMutation(createDoctorVerification);
  const [dateNow, setDateNow] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setDateNow(Date.now());
  }, []);

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  const options = [{ key: "MDCN", value: "MDCN" }];

  const [qualification, setQualification] = useState(false);
  const [license] = useState(true);
  const [yearBook, setYearBook] = useState(false);
  const [alumni, setAlumni] = useState(false);
  const [reference, setReference] = useState(false);
  const [externalReference, setExternalReference] = useState(false);
  const [dropDown, setDropDown] = useState([]);
  const [selectedCert, setSelectedCert] = useState([]);

  React.useEffect(() => {
    const selectedCertifications = getSelectedCertification({
      qualification: qualification,
      license: license,
      yearBook: yearBook,
      alumni: alumni,
      reference: reference,
      externalReference: externalReference,
    });
    setSelectedCert(selectedCertifications);
  }, [qualification, license, yearBook, alumni, reference, externalReference]);

  const { data: da } = useQuery(getUsertypess, {
    variables: {
      userTypeId: "61ed2354e6091400135e3d94",
    },
  });

  useEffect(() => {
    if (da) {
      const datas = da.getUserTypeProviders.provider;
      setDropDown(
        datas &&
          datas.map((i) => {
            return { key: i.name, value: i._id };
          })
      );
    }
  }, [da]);

  return (
    <Grid container gap={1}>
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
          <Typography
            variant="body1"
            textAlign="center"
            style={{ lineHeight: 1.85 }}
          >
            Select at least 2 verification method
          </Typography>
          <Typography variant="h6" textAlign="center" color="green">
            (Medical licence and any other)
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
          {[
            {
              id: 1,
              name: license,
              setName: () => null,
              title: "Medical License",
              icon: (
                <CalendarIcon
                  color="error"
                  fill={theme.palette.common.red}
                  className={classes.cardIcon}
                />
              ),
            },
            {
              id: 2,
              name: qualification,
              setName: setQualification,
              title: "MBBS Qualification",
              icon: (
                <CalendarIcon
                  color="error"
                  fill={theme.palette.common.red}
                  className={classes.cardIcon}
                />
              ),
            },
            {
              id: 3,
              name: yearBook,
              setName: setYearBook,
              title: "Year Book",
              icon: (
                <CalendarIcon
                  color="error"
                  fill={theme.palette.common.red}
                  className={classes.cardIcon}
                />
              ),
            },
            {
              id: 4,
              name: alumni,
              setName: setAlumni,
              title: "Alumni Association",
              icon: (
                <CalendarIcon
                  color="error"
                  fill={theme.palette.common.red}
                  className={classes.cardIcon}
                />
              ),
            },
            {
              id: 5,
              name: reference,
              setName: setReference,
              title: "Heala Partner",
              icon: (
                <CalendarIcon
                  color="error"
                  fill={theme.palette.common.red}
                  className={classes.cardIcon}
                />
              ),
            },
            {
              id: 6,
              name: externalReference,
              setName: setExternalReference,
              title: "External Reference",
              icon: (
                <ReferenceIcon color="error" className={classes.cardIcon} />
              ),
            },
          ].map((card, idx) => {
            return (
              <VerificationCard
                key={idx}
                name={card.name}
                setName={card.setName}
                title={card.title}
                icon={card.icon}
              />
            );
          })}
        </Grid>

        {selectedCert.length > 0 ? (
          ""
        ) : (
          <Grid item className={classes.infoBadge} gap={2}>
            <ErrorRoundedIcon />
            <Typography variant="h6">
              Please select at least two verification methods (Medical licence
              and any other verification method).
            </Typography>
          </Grid>
        )}

        {/* ========= FORM SECTION ========= */}
        <Grid item>
          <Formik
            initialValues={step3FromInitialValues}
            onSubmit={(values, onsubmitProp) =>
              onPageThreeSubmit(
                values,
                selectedCert,
                enqueueSnackbar,
                requirementValues,
                createVerification,
                handleNext,
                onsubmitProp,
                checked
              )
            }
            validationSchema={FormValidationSchema}
            validateOnChange={false}
            validateOnMount={false}
            validateOnBlur={false}
          >
            {({ setValues, setFieldValue, isSubmitting, dirty, isValid }) => {
              return (
                <Form>
                  {/* ========= LICENSE FORM ========= */}
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
                        <Typography variant="h2">
                          Medical License (MDCN)
                        </Typography>
                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          spacing={3}
                        >
                          <Grid item container md={12} sm={10}>
                            <FormikControl
                              control="input"
                              name="license"
                              placeholder="Enter license number"
                              label="License Number"
                            />
                          </Grid>
                          <Grid
                            item
                            container
                            justifyContent="space-between"
                            gap={2}
                          >
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
                                startDate={dateNow}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <FormLabel
                          component="legend"
                          className={classes.FormLabel}
                        >
                          Upload Your License
                        </FormLabel>
                        <DragAndDrop
                          name="licenseImage"
                          setFieldValue={setFieldValue}
                          maxFiles={1}
                        />
                      </Grid>
                    </>
                  ) : null}

                  {/* ========= MBBS QUALIFICATION FORM ========= */}
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
                        <Typography variant="h2">
                          Medical Qualification (MBBS)
                        </Typography>

                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          gap={1}
                        >
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
                              endDate={dateNow}
                            />
                          </Grid>
                        </Grid>
                        <FormLabel
                          component="legend"
                          className={classes.FormLabel}
                        >
                          Upload Your Qualification
                        </FormLabel>
                        <DragAndDrop
                          name="degreeImage"
                          setFieldValue={setFieldValue}
                          maxFiles={1}
                        />
                      </Grid>
                    </>
                  ) : null}

                  {/* ========= YEARBOOK FORM ========= */}
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
                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          spacing={3}
                        >
                          <Grid item container justifyContent="start">
                            <FormikControl
                              control="date"
                              name="gYear"
                              label="Graduation year"
                              setFieldValue={setFieldValue}
                              setValues={setValues}
                              endDate={dateNow}
                            />
                          </Grid>
                        </Grid>
                        <FormLabel
                          component="legend"
                          className={classes.FormLabel}
                        >
                          Upload Your Yearbook
                        </FormLabel>
                        <DragAndDrop
                          name="gImage"
                          setFieldValue={setFieldValue}
                          maxFiles={1}
                        />
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
                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          gap={3}
                        >
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
                  {/* Heala refrence */}
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
                        <Typography variant="h2">Heala partner</Typography>
                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          spacing={3}
                        >
                          <Grid item container md={12} sm={10}>
                            <FormikControl
                              control="select"
                              name="referenceCode"
                              placeholder="Select reference "
                              label="Partner hospital"
                              options={dropDown}
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
                        gap={2}
                        marginBottom={4}
                      >
                        <Typography variant="h2">External Reference</Typography>
                        <Grid item md={12}>
                          <Grid
                            item
                            container
                            marginBottom={2}
                            justifyContent="space-between"
                          >
                            <Grid item md={5} sm={10}>
                              <FormikControl
                                control="input"
                                name="doctorName"
                                placeholder="Enter Doctor's name"
                                label="Doctor's name"
                              />
                            </Grid>
                            <Grid item md={5} sm={10}>
                              <FormikControl
                                control="input"
                                name="doctorInstitution"
                                label="Doctor's institution"
                                placeholder="e.g Federal Teaching hospital Akure"
                              />
                            </Grid>
                          </Grid>
                          <Grid item container justifyContent="space-between">
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

                  <Grid
                    sx={{
                      marginBottom: "2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      color="success"
                      size="large"
                      sx={{ marginRight: "0.5rem" }}
                    />
                    <Typography>
                      By clicking the "Save Record" button, you state that you
                      have read, understood and agree to our{" "}
                      <a
                        href="https://heala.ng/terms/#imp"
                        rel="no-referrer"
                        target="_blank"
                      >
                        Terms and Conditions
                      </a>
                    </Typography>
                  </Grid>

                  <Grid item md={12} container sm={10}>
                    <CustomButton
                      variant="contained"
                      title=" Save Record"
                      type={greenButton}
                      className={classes.btn}
                      isSubmitting={isSubmitting}
                      disabled={!dirty || !isValid}
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
Forms.propTypes = {
  handleNext: PropTypes.func.isRequired,
};
