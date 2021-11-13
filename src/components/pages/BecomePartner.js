import React, { useState } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Create from "components/pages/Create";

const BecomePartner = () => {
  const useStyles = makeStyles((theme) => ({
    form: theme.mixins.toolbar,
    avatar: {},
    subheading: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
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
  };

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };
  const handlePrevious = () => {
    setStep(step - 1);
  };
  //   style={
  //       {step==1? color:"green"}
  //   }
  const z = `${step}` >= 1 ? "red" : "";
  const y = `${step}` >= 2 ? "red" : "";
  const w = `${step}` >= 3 ? "red" : "";

  return (
    <>
      <div className={classes.form}></div>
      <div className={classes.form}></div>
      <Grid container direction="column" gap={5} width="80%" margin="auto">
        <Grid item className={classes.subheading}>
          <Typography textAlign="center" variant="h1">
            Set up your Partner Account
          </Typography>
        </Grid>
        <Grid item container justifyContent="space-around">
          <Avatar sx={{ background: z }}>1</Avatar>
          <Avatar sx={{ background: y }}>2</Avatar>
          <Avatar sx={{ background: w }}>3</Avatar>
        </Grid>
        <Create step={step} state={state} handleNext={handleNext} handlePrevious={handlePrevious} />
      </Grid>
    </>
  );
};

export default BecomePartner;
