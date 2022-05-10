import React from "react";
import { ErrorMessage } from "formik";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";

import { Loader } from "./Utilities";
import styled from "styled-components";
import { TextError } from "./Utilities/TextError";
import { CustomButton } from "../components/Utilities";
import { compressAndUploadImage, uploadImage } from "helpers/helperFuncs";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

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
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const errorContainer = {
  margin: "1rem 0rem",
};

const DragAndDrop = ({ name, setFieldValue, maxFiles }) => {
  const theme = useTheme();
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  const [preview, setPreview] = React.useState("");
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [progress, setProgress] = React.useState();
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
          {progress < 100 && isCompressing ? (
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
          ) : (
            preview && (
              <div style={thumb}>
                <div style={thumbInner}>
                  <img src={preview} style={img} />
                </div>
              </div>
            )
          )}
        </Grid>
      </aside>
    </div>
  );
};

export default DragAndDrop;
