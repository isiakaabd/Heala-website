import React from "react";
import { PageOne } from "components/pages/PageOne";
import PageTwo from "components/pages/PageTwo";
import PropTypes from "prop-types";
const Create = ({ step, handleNext, state, handlePrevious }) => {
  switch (step) {
    case 1:
      return <PageOne state={state} handleNext={handleNext} handlePrevious={handlePrevious} />;
    case 2:
      return <PageTwo state={state} handleNext={handleNext} handlePrevious={handlePrevious} />;
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

export default Create;
