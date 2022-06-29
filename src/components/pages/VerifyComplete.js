import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Avatar } from "@mui/material";

import { CustomButton } from "components/Utilities";
import { ReactComponent as ConfirmIcon } from "assets/images/confirm.svg";

const useStyles = makeStyles((theme) => ({
  form: theme.mixins.toolbar,
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(98.44deg, #3e5ea9 1.92%, #7eedba 122.04%)",
      borderRadius: "3rem",
      padding: "1.5rem 2.5rem",
      fontWeight: 500,
      fontSize: "1.6rem",
    },
  },
}));

const VerifyComplete = () => {
  const classes = useStyles();
  const theme = useTheme();
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        container
        lg={8}
        md={5}
        gap={2}
        xs={11}
        direction="column"
        sx={{
          padding: "4rem",
          background: "white",
          borderRadius: "10px",
          zIndex: "9999999",
          margin: "auto",
        }}
      >
        <Grid item container justifyContent="center">
          <Avatar
            sx={{
              background: "transparent",
              color: "white",
              width: 300,
              height: 250,
            }}
          >
            <ConfirmIcon />
          </Avatar>
        </Grid>

        <Grid item container justifyContent="center">
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Verification complete
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Your account is active. Please download the doctors application
            using the links below.
          </Typography>
        </Grid>

        <Grid item container justifyContent="center">
          <a
            style={{ textDecoration: "none" }}
            href="https://apps.apple.com/ng/app/heala-doctor/id1610944146"
          >
            <CustomButton
              variant="contained"
              title="App store"
              type={greenButton}
              className={classes.btn}
              sx={{ marginRight: "1rem" }}
            />
          </a>
          <a
            style={{ textDecoration: "none" }}
            href="https://play.google.com/store/apps/details?id=com.heala.doctor"
          >
            <CustomButton
              variant="contained"
              title="Play store"
              type={greenButton}
              className={classes.btn}
            />
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default VerifyComplete;
