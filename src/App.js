import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import ScrollToView from "components/ScrollToView";
import { Container } from "@mui/material";
import BecomePartner from "components/pages/BecomePartner";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <Container>
          <div className="container">
            <ScrollToView>
              <Switch>
                <section className="sectionStyles">
                  <Route exact path={["/", "/partners/form"]} component={BecomePartner} />
                </section>
              </Switch>
            </ScrollToView>
          </div>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
