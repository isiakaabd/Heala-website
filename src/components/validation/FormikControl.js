import React from "react";
import { Input, Selects, Checkbox, Calendars } from "components/validation";

import PropTypes from "prop-types";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
    case "select":
      return <Selects {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "date":
      return <Calendars {...rest} />;
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
};
export default FormikControl;
