import React from "react";
import { PageOne, PageTwo, Form } from "components/pages";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { withRouter } from "react-router-dom";
const Create = ({ step, handleNext, state, handlePrevious, ...rest }) => {
  switch (step) {
    case 1:
      return (
        <Grid item container sx={{ justifyContent: "center" }}>
          <PageOne
            state={state}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            {...rest}
          />
        </Grid>
      );
    case 2:
      return (
        <Grid item container sx={{ justifyContent: "center" }}>
          <PageTwo
            state={state}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            {...rest}
          />
        </Grid>
      );
    case 3:
      return <Form handlePrevious={handlePrevious} />;
    default:
      <PageOne state={state} handleNext={handleNext} handlePrevious={handlePrevious} {...rest} />;
      break;
  }
};
Create.propTypes = {
  state: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default withRouter(Create);
