import React, { useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { PreviousButton } from "components/Utilities";
import { Create } from "components/pages";

const BecomePartner = () => {
  const [step, setStep] = useState(1);
  const handleNext = useCallback(() => {
    setTimeout(() => {
      setStep(step + 1);
    }, 3000);
  }, [step]);

  const handlePrevious = useCallback(() => {
    if (step === 1) return location.assign("https://heala.ng/doctors");
    else setStep(step - 1);
  }, [step]);

  return (
    <Grid container direction="column" gap={2}>
      {step === 1 ? (
        <Grid item container>
          <PreviousButton step={step} handlePrevious={handlePrevious} />
        </Grid>
      ) : null}

      <Grid item container direction="column" gap={5} margin="auto">
        <Create
          step={step}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          setStep={setStep}
        />
      </Grid>
    </Grid>
  );
};

export default BecomePartner;
