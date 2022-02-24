import React from "react";
import { PageOne, PageTwo, Form } from "components/pages";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { withRouter } from "react-router-dom";
const Create = ({ step, handleNext, ...rest }) => {
  switch (step) {
    case 1:
      return (
        <Grid item container sx={{ justifyContent: "center" }}>
          <PageOne handleNext={handleNext} {...rest} />
        </Grid>
      );
    case 2:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "2rem 2rem" }}>
          <PageTwo handleNext={handleNext} {...rest} />
        </Grid>
      );
    case 3:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "2rem 2rem" }}>
          <Form />
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
};

export default withRouter(Create);
