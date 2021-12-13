import React, { useState } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PreviousButton } from "components/Utilities";
import { Create } from "components/pages";
import Divider from "@mui/material/Divider";

const BecomePartner = () => {
  const useStyles = makeStyles((theme) => ({
    form: theme.mixins.toolbar,
    subheading: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
    width: {
      width: "60%",
      flexGrow: 2,
      [theme.breakpoints.down("sm")]: {
        width: "40%",
      },
    },
  }));

  const classes = useStyles();
  const state = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    Specialization: "",
    phone: "",
    plan: "",
    affliate: "",
    DOB: "",
    sex: "",
    hospital: "",
    age: "",
    medicalID: "",
  };

  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);

  const handlePrevious = () => {
    if (step === 1) return setStep(1);
    else setStep(step - 1);
  };
  const z = `${step}` >= 1 ? "red" : "";
  const y = `${step}` >= 2 ? "red" : "";
  const w = `${step}` >= 3 ? "red" : "";

  return (
    <>
      <Grid container direction="column" gap={5} width="90%" margin="auto">
        <Grid item container>
          <PreviousButton step={step} handlePrevious={handlePrevious} />
        </Grid>

        <Grid item className={classes.subheading}>
          <Typography textAlign="center" variant="h1">
            Set up your Partner Account
          </Typography>
        </Grid>
        <Grid item container sx={{ justifyContent: "center" }}>
          <Grid item container md={4} xs={4} alignItems="center">
            <Avatar sx={{ background: z }}>1</Avatar>
            <Divider light sx={{ background: z }} className={classes.width} />
          </Grid>
          <Grid item container alignItems="center" md={4} xs={4}>
            <Avatar sx={{ background: y }}>2</Avatar>
            <Divider light sx={{ background: y }} className={classes.width} />
          </Grid>
          <Grid item>
            <Avatar sx={{ background: w }}>3</Avatar>
            {/* <Divider light sx={{ background: y }} className={classes.width} /> */}
          </Grid>
        </Grid>
        <Create step={step} state={state} handleNext={handleNext} handlePrevious={handlePrevious} />
      </Grid>
    </>
  );
};

export default BecomePartner;
