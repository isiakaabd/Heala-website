import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Formik = ({ value, onChange, placeholderText, options, ...rest }) => {
  return (
    <FormControl fullWidth>
      <label for="" sss></label>
      <Select {...rest}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Formik.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string.isRequired,
  startAdornment: PropTypes.element,
};

export default Formik;
