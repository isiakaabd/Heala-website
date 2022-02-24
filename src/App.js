import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import ScrollToView from "components/ScrollToView";
import BecomePartner from "components/pages/BecomePartner";
import { setAccessToken } from "./accessToken";

const sectionStyles = {
  minHeight: "100vh",
  maxWidth: "100vw",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const App = () => {
  const [state, setstate] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccessToken(token);
    setstate(false);
  }, []);
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <div className="secV"></div>

        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            alignItems: "center",
          }}
        >
          <ScrollToView style={{ justifyContent: "center" }}>
            <Switch>
              {!state && (
                <section style={sectionStyles}>
                  <Route exact path={["/", "/partners/form"]} component={BecomePartner} />
                </section>
              )}
            </Switch>
          </ScrollToView>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
