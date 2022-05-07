import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import { FormControl, FormLabel, Grid, Avatar, Button, Typography } from "@mui/material";
import { Loader } from "components/Utilities";
import { compressAndUploadImage, uploadImage } from "../../helpers/helperFuncs";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      borderRadius: "5px",
      fontSize: "1.4rem",
      color: theme.palette.common.black,

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },
}));

export const Formiks = ({ name, setFieldValue, onBlur }) => {
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState();
  const [isCompressing, setIsCompressing] = React.useState(false);
  const classes = useStyles();

  const onChange = async (e) => {
    const file = e.target.files[0];
    console.log("fired!!!");
    compressAndUploadImage(
      file,
      uploadImage,
      setPreview,
      name,
      setFieldValue,
      setProgress,
      setIsCompressing,
    );
  };

  const fileRef = useRef(null);
  return (
    <Grid container spacing={2} alignItems="center">
      {progress < 100 || isCompressing ? (
        <Grid container item direction="row" justifyContent="center" alignItems="center">
          <Typography display={"inline"}>
            {isCompressing ? "Compressing image" : "Uploading image"}
          </Typography>
          <Loader />
        </Grid>
      ) : (
        <>
          <Grid item>
            <FormControl fullWidth>
              <Grid item container>
                <input
                  accept="image/*"
                  onChange={onChange}
                  type="file"
                  name={name}
                  onBlur={onBlur}
                  hidden
                  ref={fileRef}
                />
                <Button
                  variant="contained"
                  onClick={() => fileRef.current.click()}
                  component="span"
                  className={classes.uploadBtn}
                >
                  Upload Photo
                </Button>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item>
            {progress < 100 ? <Loader progres={progress} /> : preview && <Avatar src={preview} />}
          </Grid>
        </>
      )}
    </Grid>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  setFieldValue: PropTypes.func,
};

const Files = (props) => {
  const { name, label, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field name={name} as={Formiks} label={label} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

Files.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Files;
