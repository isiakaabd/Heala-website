import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    ...theme.typography.cardGridWrapper,
    height: "100%",
  },

  iconWrapper: {
    padding: "2rem 1rem",
    ...theme.typography.cardIconWrapper,
  },
}));

const Card = ({ title, background, children, header = "h4", padding }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ width: "100%" }}
      className={classes.gridWrapper}
    >
      <Grid item container className={classes.iconWrapper} style={{ background }}>
        {children}
      </Grid>
      <Grid item textAlign="center" sx={{ width: "100%" }}>
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
