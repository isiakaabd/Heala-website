import React from "react";
import { PageOne, PageTwo, Form } from "components/pages";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
const Create = ({ step, handleNext, state, handlePrevious }) => {
  switch (step) {
    case 1:
      return <PageOne state={state} handleNext={handleNext} handlePrevious={handlePrevious} />;
    case 2:
      return <PageTwo state={state} handleNext={handleNext} handlePrevious={handlePrevious} />;
    case 3:
      return <Form handlePrevious={handlePrevious} />;
    default:
      <PageOne state={state} handleNext={handleNext} handlePrevious={handlePrevious} />;
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
