import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

const IconLabelButtons = ({ placeholder, width, backgroundColor }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width,
        height: "100%",
      }}
    >
      <Button
        variant="contained"
        sx={{
          width,
          backgroundColor,
          textTransform: "capitalize",
          fontFamily: "Circular Std",
          fontSize: "1.6rem",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "2.4rem",
          letterSpacing: "0px",
          textAlign: "left",
          height: "100%",
        }}
        endIcon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.59961 20.4C3.59961 20.0817 3.72604 19.7765 3.95108 19.5515C4.17612 19.3264 4.48135 19.2 4.79961 19.2H19.1996C19.5179 19.2 19.8231 19.3264 20.0481 19.5515C20.2732 19.7765 20.3996 20.0817 20.3996 20.4C20.3996 20.7183 20.2732 21.0235 20.0481 21.2485C19.8231 21.4736 19.5179 21.6 19.1996 21.6H4.79961C4.48135 21.6 4.17612 21.4736 3.95108 21.2485C3.72604 21.0235 3.59961 20.7183 3.59961 20.4ZM7.55121 11.1516C7.77624 10.9266 8.08141 10.8003 8.39961 10.8003C8.71781 10.8003 9.02298 10.9266 9.24801 11.1516L10.7996 12.7032V3.59999C10.7996 3.28173 10.926 2.97651 11.1511 2.75147C11.3761 2.52642 11.6813 2.39999 11.9996 2.39999C12.3179 2.39999 12.6231 2.52642 12.8481 2.75147C13.0732 2.97651 13.1996 3.28173 13.1996 3.59999V12.7032L14.7512 11.1516C14.8619 11.037 14.9943 10.9456 15.1407 10.8827C15.2871 10.8198 15.4446 10.7867 15.6039 10.7853C15.7633 10.7839 15.9213 10.8143 16.0688 10.8746C16.2162 10.9349 16.3502 11.024 16.4629 11.1367C16.5756 11.2494 16.6647 11.3834 16.725 11.5308C16.7853 11.6783 16.8157 11.8363 16.8143 11.9957C16.8129 12.155 16.7798 12.3125 16.7169 12.4589C16.654 12.6053 16.5626 12.7377 16.448 12.8484L12.848 16.4484C12.623 16.6734 12.3178 16.7997 11.9996 16.7997C11.6814 16.7997 11.3762 16.6734 11.1512 16.4484L7.55121 12.8484C7.32624 12.6234 7.19987 12.3182 7.19987 12C7.19987 11.6818 7.32624 11.3766 7.55121 11.1516Z"
              fill="white"
            />
          </svg>
        }
      >
        {placeholder}
      </Button>
    </Stack>
  );
};

IconLabelButtons.propTypes = {
  width: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  // height: PropTypes.string.isRequired,
};

export default IconLabelButtons;
