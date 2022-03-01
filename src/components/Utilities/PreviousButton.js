import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Grid, Typography } from "@mui/material";

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
  break: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "-150%",
    },
    margin: 0,
  },
}));
const PreviousButton = ({ handlePrevious }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid className={classes.container}>
      <Grid container alignItems="center" className={classes.break} onClick={handlePrevious}>
        <IconButton>
          <KeyboardBackspaceIcon color={theme.palette.common.black} className={classes.icon} />
        </IconButton>
        <Typography style={{ fontSize: "2rem", color: "white" }}>GoBack</Typography>
      </Grid>
    </Grid>
  );
};

export default PreviousButton;
PreviousButton.propTypes = {
  step: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
};
