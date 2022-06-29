import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const useStyles = makeStyles((theme) => ({
  container: {},
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2.5rem",
      color: theme.palette.common.white,
    },
  },
  break: {
    margin: 0,
  },
}));

const PreviousButton = ({ handlePrevious }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid className={classes.container} onClick={handlePrevious}>
      <Grid container alignItems="center" className={classes.break}>
        <IconButton>
<<<<<<< HEAD
          <KeyboardBackspaceIcon className={classes.icon} />
=======
          <KeyboardBackspaceIcon color={theme.palette.common.black} className={classes.icon} />
>>>>>>> 0a4a5fb0f4fe31909fd07789829522ce2ee12b1f
        </IconButton>
        <Typography style={{ fontSize: "2rem", color: "white", cursor: "pointer" }}>
          Go Back
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PreviousButton;
PreviousButton.propTypes = {
  step: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
};
