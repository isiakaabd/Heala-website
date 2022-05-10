import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { FormLabel, Grid } from "@mui/material";

import { RequiredIcon } from "components/Typography";
import { TextError } from "components/Utilities/TextError";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

const CheckBox = ({ name, color, size, checked, onChange }) => {
  return (
    <Checkbox
      name={name}
      checked={checked}
      color={color}
      size={size}
      onChange={onChange}
      sx={{ marginRight: "0.5rem" }}
    />
  );
};

const SingleCheckbox = ({ name, label, isRequired, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" gap={1}>
      <Field name={name} as={CheckBox} {...rest} />
      <FormLabel className={classes.FormLabel}>
        {label}
        {isRequired && <RequiredIcon />}
      </FormLabel>
    </Grid>
  );
};

export default SingleCheckbox;
