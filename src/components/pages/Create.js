import React from "react";
import { PageOne, PageTwo, Form, PageFour } from "components/pages";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { withRouter } from "react-router-dom";
import VerifyComplete from "./VerifyComplete";
const Create = ({ handleNext, step, ...rest }) => {
  switch (step) {
    case 1:
      return (
        <Grid item container sx={{ justifyContent: "center" }}>
          <PageOne handleNext={handleNext} {...rest} />
        </Grid>
      );
    case 2:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "2rem" }}>
          <PageTwo handleNext={handleNext} {...rest} />
        </Grid>
      );
    case 3:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "2rem" }}>
          <Form handleNext={handleNext} {...rest} />
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

    case 5:
      return (
        <Grid item container sx={{ justifyContent: "center", padding: "1rem" }}>
          <VerifyComplete {...rest} />
          );
        </Grid>
      );
    default:
      <PageOne handleNext={handleNext} {...rest} />;
      break;
  }
};
Create.propTypes = {
  handleNext: PropTypes.func,
};

export default withRouter(Create);
