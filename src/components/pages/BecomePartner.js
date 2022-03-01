import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "@mui/material";
// import { PreviousButton } from "components/Utilities";
import { Create } from "components/pages";

const BecomePartner = () => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    // const value = localStorage.get("step");
    setStep(1);
  }, []);

  const handleNext = useCallback(() => {
    setTimeout(() => {
      setStep(step + 1);
    }, 3000);
    localStorage.setItem("step", step + 1);
  }, [step]);

  const handlePrevious = useCallback(() => {
    if (step === 1) return setStep(1);
    else setStep(step - 1);
    localStorage.setItem("step", step - 1);
  }, [step]);
  // const z = `${step}` >= 1 ? "red" : "";
  // const y = `${step}` >= 2 ? "red" : "";
  // const w = `${step}` >= 3 ? "red" : "";

  return (
    <>
      <Grid container direction="column" gap={5} margin="auto">
        {/* <Grid item container>
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
   
          </Grid>
        </Grid> */}
        <Create step={step} handleNext={handleNext} handlePrevious={handlePrevious} />
      </Grid>
    </>
  );
};

export default BecomePartner;
