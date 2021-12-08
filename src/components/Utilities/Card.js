import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    ...theme.typography.cardGridWrapper,
    "@media (max-width:600px)": {
      width: "12rem",
      maxWidth: "100%",
      height: "20rem",
    },
  },

  iconWrapper: {
    ...theme.typography.cardIconWrapper,
  },
}));

const Card = ({ title, background, children, header = "h4", padding }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.gridWrapper}
      style={{ padding: padding ? padding : "2rem 1rem" }}
    >
      <Grid item container className={classes.iconWrapper} style={{ background }}>
        {children}
      </Grid>
      <Grid item textAlign="center">
        <Typography variant={header}>{title}</Typography>
      </Grid>
    </Grid>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  background: PropTypes.string,
  header: PropTypes.string,
  children: PropTypes.node,
  padding: PropTypes.string,
};

export default Card;
