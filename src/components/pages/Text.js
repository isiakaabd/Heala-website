import React from "react";
import { Typography } from "@mui/material";

const Text = ({ counter, requestNewOTP }) => {
  return (
    <Typography
      onClick={requestNewOTP}
      // className={classes.typo}
      sx={
        counter === 0
          ? {
              textDecoration: "underline",
              cursor: "hand",
              color: "red",
              whiteSpace: "nowrap",
              fontSize: "clamp(1rem, 1.5vw,1.5rem)",
            }
          : ""
      }
    >
      {counter === 0 ? "Resend OTP" : counter}
    </Typography>
  );
};

export default Text;
