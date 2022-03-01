import React from "react";
import { PageOne, PageTwo, Form, PageFour } from "components/pages";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { withRouter } from "react-router-dom";
const Create = ({ step, handleNext, setStep, ...rest }) => {
  switch (step) {
    case 1:
      return (
        <Grid item container sx={{ justifyContent: "center" }}>
          <PageOne handleNext={handleNext} setStep={setStep} {...rest} />
        </Grid>
      );
    case 2:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "2rem" }}>
          <PageTwo handleNext={handleNext} setStep={setStep} {...rest} />
        </Grid>
      );
    case 3:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "2rem" }}>
          <Form handleNext={handleNext} setStep={setStep} {...rest} />
          );
        </Grid>
      );
    case 4:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "1rem" }}>
          <PageFour {...rest} />
          );
        </Grid>
      );
    default:
      <PageOne handleNext={handleNext} {...rest} />;
      break;
  }
};
Create.propTypes = {
  step: PropTypes.number,
  handleNext: PropTypes.func,
  setStep: PropTypes.func,
};

export default withRouter(Create);
