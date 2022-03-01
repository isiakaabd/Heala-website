import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    "&.MuiGrid-root": {
      padding: "3rem 0 0 0",
    },
  },
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
}));
const PreviousButton = ({ handlePrevious }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid className={classes.container}>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "-150%" }}>
        <IconButton onClick={handlePrevious}>
          <KeyboardBackspaceIcon color={theme.palette.common.black} className={classes.icon} />
        </IconButton>
        <p style={{ fontSize: "2rem", color: "white" }}>GoBack</p>
      </div>
    </Grid>
  );
};

export default PreviousButton;
PreviousButton.propTypes = {
  step: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
};
