import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { Grid, Typography, Box, Tab, Tabs, AppBar } from "@mui/material";

import SignUpForm from "components/forms/SignUpForm";
import SignInForm from "components/forms/SignInForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const PageOne = ({ handleNext }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    ["account_id", "email", "heala_id", "profile_id", "token"].map((text) =>
      localStorage.setItem(text, "")
    );
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Box
          sx={{
            bgcolor: "background.paper",
            width: 500,
            margin: "2rem 0rem",
            borderRadius: "5px",
            margin: "0rem 1rem",
          }}
        >
          <AppBar position="static" sx={{ borderRadius: "5px" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="SIGN UP" {...a11yProps(0)} />
              <Tab label="SIGN IN" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/*  WRITE CONTEXT TO MANAGE NEXT STEP ETC. to avoid PROP DRILLING */}
              <SignUpForm changeStep={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <SignInForm changeStep={handleNext} />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Grid>
    </>
  );
};
export default PageOne;

PageOne.propTypes = {
  handleNext: PropTypes.func,
  handleNext2: PropTypes.func,
  step: PropTypes.string,
};
