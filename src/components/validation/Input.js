import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import { RequiredIcon } from "components/Typography";

const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.input,
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },

  Required: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
      font: "bold",
      color: "#f44336",
    },
  },
}));

const Input = (props) => {
  const { label, name, isRequired, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid item container direction="column" gap={1}>
      <FormLabel component="legend" className={classes.FormLabel}>
        {label}
        {isRequired && <RequiredIcon />}
      </FormLabel>
      <Field id={name} name={name} className={classes.input} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};

export default Input;
