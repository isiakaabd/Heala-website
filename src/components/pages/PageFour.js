import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Avatar } from "@mui/material";
import { ReactComponent as HealaIcon } from "assets/images/logo.svg";
import { ReactComponent as ConfirmIcon } from "assets/images/confirm.svg";
import { CustomButton } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
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

const PageFour = () => {
  const classes = useStyles();
  const theme = useTheme();
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.primary.dark,
  };

  return (
    <Grid container justifyContent="center">
      <Grid item container style={{ justifyContent: "center" }}>
        <Avatar sx={{ background: "transparent", color: "white", width: 150, height: 150 }}>
          <HealaIcon />
        </Avatar>
      </Grid>
      <Grid
        item
        container
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
          <Avatar sx={{ background: "transparent", color: "white", width: 300, height: 250 }}>
            <ConfirmIcon />
          </Avatar>
        </Grid>
        <Grid item container gap={2} sx={{ border: "1px solid black" }}>
          <Grid item container justifyContent="center">
            <Typography variant="h1">Thank you for Signing up</Typography>
          </Grid>
          <Grid item container justifyContent="center">
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Your account is currently being reviewed. We will send an email with the status of
              your verification in a few days. In the meantime, check out our{" "}
              <Typography
                variant="body2"
                component={Link}
                style={{
                  color: theme.palette.success.main,
                }}
                to="https://heala.ng/privacy-policy"
                className={classes.link}
              >
                Privacy policy
              </Typography>{" "}
              and{" "}
              <Typography
                variant="body2"
                component={Link}
                style={{
                  color: theme.palette.common.green,
                }}
                to="https://heala.ng/terms"
                className={classes.link}
              >
                Terms{" "}
              </Typography>
              for more information
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={5} justifyContent="center">
          <CustomButton
            component={Link}
            variant="contained"
            title="Go to website"
            type={greenButton}
            to="https://heala.ng"
            className={classes.btn}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PageFour;
