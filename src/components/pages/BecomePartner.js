import React, { useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { PreviousButton } from "components/Utilities";
import { Create } from "components/pages";
import { scrollToTop } from "helpers/helperFuncs";

const BecomePartner = () => {
  const pageTop = React.useRef();
  const [step, setStep] = useState(1);

  const increment = useCallback(
    (count) => () => {
      setStep(step + count);
      scrollToTop(pageTop);
    },
    [step],
  );

  const handleNext2 = useCallback(() => {
    setStep(step + 2);
  }, [step]);

  const handlePrevious = useCallback(() => {
    if (step === 1) return location.assign("https://heala.ng/doctors");
    else setStep(step - 1);
  }, [step]);

  return (
    <div ref={pageTop}>
      <Grid container direction="column" gap={2}>
        {step === 1 ? (
          <Grid item container>
            <PreviousButton step={step} handlePrevious={handlePrevious} />
          </Grid>
        ) : null}

        <Grid item container direction="column" gap={5} margin="auto">
          <Create
            step={step}
            handleNext={increment(1)}
            handlePrevious={handlePrevious}
            setStep={setStep}
            handleNext2={increment(2)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(BecomePartner);
