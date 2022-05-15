import React from "react";
import t from "prop-types";
import { Grid } from "@mui/material";
import { useStyles } from "styles/formStyles";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";

import { Card } from "components/Utilities";

const VerificationCard = ({ name, setName, title, icon }) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid
      item
      container
      md={3.5}
      xs={12}
      className={
        name ? `${classes.parentGrid} ${classes.active}` : classes.parentGrid
      }
      onClick={() => {
        setName && setName(!name);
      }}
    >
      {name && (
        <Checkbox
          defaultChecked
          color="success"
          size="large"
          sx={{ position: "absolute", top: "3rem" }}
        />
      )}
      <Card
        title={title} // "MBBS Qualification"
        /* background={theme.palette.common.lightRed} */
      >
        <Grid className={classes.iconWrapper}>{icon}</Grid>
      </Card>
    </Grid>
  );
};

VerificationCard.propTypes = {
  name: t.string.isRequired,
  setName: t.func,
  title: t.string.isRequired,
  icon: t.node.isRequired,
};

export default VerificationCard;
