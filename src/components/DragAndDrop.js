import React from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Loader } from "./Utilities";
import styled from "styled-components";
import { compressAndUploadImage, uploadImage } from "helpers/helperFuncs";

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
  border-color: #777171;
  border-style: dashed;
  background-color: #fafafa;
  color: #777171;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: 16,
// };

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
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

const DragAndDrop = ({ name, setFieldValue, maxFiles }) => {
  const [preview, setPreview] = React.useState("");
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [progress, setProgress] = React.useState();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: "image/*",
    maxFiles: maxFiles,
    onDrop: (acceptedFiles) => {
      compressAndUploadImage(
        acceptedFiles[0],
        uploadImage,
        setPreview,
        name,
        setFieldValue,
        setProgress,
        setIsCompressing,
      );
    },
  });

  return (
    <div>
      <div className="container">
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <Typography>Drag and drop your file(s), or click to select files</Typography>
        </Container>
      </div>
      <aside style={{ marginTop: "1.5rem" }}>
        <Grid item>
          {progress < 100 || isCompressing ? (
            <Grid container item direction="row" justifyContent="center" alignItems="center">
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

DragAndDrop.propTypes = {
  name: PropTypes.string,
  setFieldValue: PropTypes.func,
  maxFiles: PropTypes.number,
};

export default DragAndDrop;
