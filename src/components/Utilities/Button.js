import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    fontFamily: "Circular Std",
    fontSize: "1.6rem",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "2.4rem",
    letterSpacing: "0px",
    textAlign: "left",
    height: "100%",
  },

  closeBtn: {
    "&.button": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.common.black,
      stroke: theme.palette.common.black,
      background: "#f2f2f2",
      borderRadius: "100%",
      padding: "0.6rem 0.3rem",
      border: "none",
      cursor: "pointer",

      "&:hover": {
        color: "red",
        stroke: "red",
      },
    },
  },
}));

export const CloseBtn = (props) => {
  const classes = useStyles();
  return (
    <button
      {...props}
      onClick={() => props.handleClick()}
      className={`button ${classes.closeBtn}`}
    >
      <CloseIcon sx={{ height: "10px", weight: "10px !important" }} />
    </button>
  );
};

const IconLabelButtons = ({
  placeholder,
  width,
  backgroundColor,
  type,
  border,
  height,
  endIcon,
}) => {
  const classes = useStyles();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width,
      }}
    >
      <Button
        sx={{ width, backgroundColor, borderRadius: border, height }}
        variant="contained"
        className={classes.button}
        endIcon={endIcon}
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
  type: PropTypes.string.isRequired,
  border: PropTypes.string,
  height: PropTypes.string,
  endIcon: PropTypes.node,
};

export default IconLabelButtons;
