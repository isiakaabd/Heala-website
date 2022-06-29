import React, { useState, useCallback, useRef } from "react";
import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Create } from "components/pages";
import { scrollToTop } from "helpers/helperFuncs";
import { PreviousButton } from "components/Utilities";
import { ReactComponent as HealaIcon } from "../../assets/images/logo.svg";

const useStyles = makeStyles(() => ({
  backBtn: {
    "@media (max-width:600px)": {
      display: "none",
    },
  },
}));

const BecomePartner = () => {
  const pageTop = useRef();
  const [step, setStep] = useState(1);

  const increment = useCallback(
    (count) => () => {
      setStep(step + count);
      scrollToTop(pageTop);
    },
    [step]
  );

  // const handleNext2 = useCallback(() => {
  //   setStep(step + 2);
  // }, [step]);

  const handlePrevious = useCallback(() => {
    if (step === 1) return location.assign("https://heala.ng/doctors");
    else setStep(step - 1);
  }, [step]);

  return (
    <div ref={pageTop} style={{ width: "100%" }}>
      <Grid container direction="column" gap={2}>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems="center"
          direction="column"
          style={{ margin: "1rem 0rem" }}
        >
          {step === 1 ? (
            <Grid
              item
              style={{
                position: "absolute",
                left: "1rem",
                top: "4rem",
              }}
            >
              <div className={classes.backBtn}>
                <PreviousButton step={step} handlePrevious={handlePrevious} />
              </div>
            </Grid>
          ) : null}

          <a href="https://heala.ng/" rel="no-referrer">
            <Grid item>
              <Avatar
                sx={{
                  background: "transparent",
                  color: "white",
                  width: 150,
                  height: 100,
                }}
              >
                <HealaIcon />
              </Avatar>
            </Grid>
          </a>
        </Grid>

        <Grid item container direction="column" gap={5} margin="auto">
          <Create
            step={step}
            handleNext={increment}
            handlePrevious={handlePrevious}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(BecomePartner);
