import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { TextError } from "components/Utilities/TextError";
import { RequiredIcon } from "components/Typography";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  btn: {
    "&.MuiIconButton-root": {
      color: "#40424b !important",
    },
  },
}));

const Dates = ({ name, value, setFieldValue, onBlur, startDate, endDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        name={name}
        onChange={(value) => setFieldValue(name, value)}
        value={value}
        onBlur={onBlur}
        minDate={startDate}
        maxDate={endDate}
        style={{ color: "#40424b !important" }}
        renderInput={(params) => (
          <TextField {...params} sx={{ padding: "-12px" }} />
        )}
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
  const { name, label, isRequired, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>
        {label}
        {isRequired && <RequiredIcon />}
      </FormLabel>
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
