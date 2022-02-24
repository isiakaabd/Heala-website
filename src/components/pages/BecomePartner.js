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

  return (
    <Grid container direction="column" gap={5} margin="auto">
      <Create step={step} handleNext={handleNext} handlePrevious={handlePrevious} />
    </Grid>
  );
};

export default BecomePartner;
