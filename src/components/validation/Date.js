import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import { TextField, Grid, FormLabel } from "@mui/material";
import PropTypes from "prop-types";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { makeStyles } from "@mui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  btn: {
    "&.MuiButtonBase-root": {
      color: "#40424b !important",
    },
  },
}));

const Dates = ({ name, value, setFieldValue, onBlur }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        name={name}
        onChange={(value) => setFieldValue(name, value)}
        value={value}
        onBlur={onBlur}
        renderInput={(params) => <TextField {...params} sx={{ padding: "-12px" }} />}
      />
    </LocalizationProvider>
  );
};

Dates.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
  onBlur: PropTypes.func,
};

const DateComponent = (props) => {
  const { name, label, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field name={name} as={Dates} label={label} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

DateComponent.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default DateComponent;
