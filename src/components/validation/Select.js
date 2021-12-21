import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.input,
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
      paddingBottom: "1rem",
    },
  },
}));

export const Formiks = ({ value, name, onChange, children, label, options, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Select name={name} displayEmpty value={value} onChange={onChange}>
        {children}
      </Select>
      <ErrorMessage name={name} component={TextError} />
    </FormControl>
  );
};

Formiks.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

const Selects = (props) => {
  const classes = useStyles();
  const { name, label, options, placeholder } = props;

  return (
    <>
      <Field name={name} as={Formiks} label={label} className={classes.input}>
        <MenuItem value="">{placeholder}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.key}
          </MenuItem>
        ))}
      </Field>
    </>
  );
};

Selects.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Selects;
