import React from "react";
import { ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Loader } from "./Utilities";
import styled from "styled-components";
import { CloseBtn } from "./Utilities/Button";
import { TextError } from "./Utilities/TextError";
import { CustomButton } from "../components/Utilities";
import {
  compressAndUploadImage,
  showErrorMsg,
  showSuccessMsg,
  uploadImage,
} from "helpers/helperFuncs";

// const getColor = (props) => {
//   if (props.isDragAccept) {
//     return "#00e676";
//   }
//   if (props.isDragReject) {
//     return "#ff1744";
//   }
//   if (props.isFocused) {
//     return "#2196f3";
//   }
//   return "#eeeeee";
// };

const Container = styled.div`
  min-height: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #777171;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  backgroundColor: "#eaeaea",
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
  position: "relative",
};

const thumbInner = {
  display: "flex",
  backgroundColor: "#eaeaea",
  minWidth: 0,
  overflow: "hidden",
  position: "relative",
};

const img = {
  display: "block",
  backgroundColor: "#eaeaea",
  width: "auto",
  height: "100%",
};

const errorContainer = {
  margin: "1rem 0rem",
};

const DragAndDrop = ({ name, setFieldValue, maxFiles }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [preview, setPreview] = React.useState("");
  const [progress, setProgress] = React.useState();
  const [isCompleted, setIsCompleted] = React.useState(null);
  const [isCompressing, setIsCompressing] = React.useState(false);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: "image/*",
    maxFiles: maxFiles,
    autoFocus: true,
    onDrop: (acceptedFiles) => {
      setProgress(1);

      compressAndUploadImage(
        acceptedFiles[0],
        uploadImage,
        setPreview,
        name,
        setFieldValue,
        setProgress,
        setIsCompressing
      );
    },
  });

  return (
    <div>
      <div className="container">
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <Typography>
            Drag and drop your file(s), or click to select files or Click on the
            button below
          </Typography>
          <Grid
            item
            container
            justifyContent="center"
            style={{ marginTop: "15px" }}
          >
            <CustomButton
              variant="contained"
              title=" Select file(s)"
              type={greenButton}
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            />
          </Grid>
        </Container>
      </div>
      <div style={errorContainer}>
        <ErrorMessage name={name} component={TextError} />
      </div>
      <aside style={{ marginTop: "1.5rem" }}>
        <Grid item>
          {progress < 100 || isCompressing ? (
            <Grid
              container
              item
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography display={"inline"}>
                {isCompressing ? "Compressing file" : "Uploading file"}
              </Typography>
              <Loader />
            </Grid>
          ) : preview && isCompleted !== "failed" ? (
            <div style={thumb}>
              <Grid
                sx={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  zIndex: "5",
                }}
              >
                <CloseBtn
                  handleClick={() => {
                    setFieldValue(name, null);
                    setPreview("");
                  }}
                />
              </Grid>
              <div style={thumbInner}>
                <img src={preview} style={img} />
              </div>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </aside>
    </div>
  );
};

DragAndDrop.propTypes = {
  name: PropTypes.string,
  setFieldValue: PropTypes.func,
  maxFiles: PropTypes.number,
};

export default DragAndDrop;
