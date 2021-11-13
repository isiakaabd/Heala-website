import React from "react";
import PropTypes from "prop-types";
import FormLabel from "@mui/material/FormLabel";
import { Grid, Typography } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
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
const PageTwo = ({ state, handleNext, handlePrevious }) => {
  const classes = useStyles();
  const theme = useTheme();
  const options = [
    { key: "select an option", value: " " },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  console.log(state);
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };
  return (
    <Grid item container direction="column" gap={5}>
      <Grid item>
        <Typography variant="h4">Create Account</Typography>
      </Grid>
      <Grid item>
        <Formik initialValues={state} validateOnChange={false} validateOnMount>
          {(formik) => {
            return (
              <Form>
                <Grid container gap={3}>
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
                        control="input"
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
                  <Grid item justifyContent="space-around" container gap={2}>
                    <Grid item container md={5}>
                      <FormLabel
                        component="legend"
                        className={classes.FormLabel}
                        sx={{ paddingBottom: "1rem" }}
                      >
                        Upload Your Qualification
                      </FormLabel>
                      <Grid
                        item
                        container
                        justifyContent="space-around"
                        sx={{ height: "200px", border: "2px dashed #CCCCCC" }}
                      >
                        <Grid item md display="flex" alignItems="center" justifyContent="center">
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <label htmlFor="contained-button-file" style={{ textAlign: "center" }}>
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
                    <Grid item md={5}></Grid>
                  </Grid>
                  <Grid item container justifyContent="space-around" gap={3}>
                    <Grid item container md={2} sm={5}>
                      <CustomButton
                        variant="contained"
                        title="Previous"
                        type={greenButton}
                        onClick={handlePrevious}
                        className={classes.btn}
                        // disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                      />
                    </Grid>
                    <Grid item container md={2} sm={5}>
                      <CustomButton
                        variant="contained"
                        title="continue"
                        type={greenButton}
                        onClick={() => alert("what Next?")}
                        className={classes.btn}
                        // disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* </Grid> */}
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
