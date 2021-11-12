import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import Header from "components/navbar/Header";
import Footer from "components/navbar/Footer";
import Forms from "components/pages/Form";
import ScrollToView from "components/ScrollToView";
import { Container } from "@mui/material";
import BecomePartner from "components/pages/BecomePartner";

const App = () => {
  const sectionStyles = {
    paddingBottom: "5rem",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#fbfbfb",
  };
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <Container maxWidth="false" disableGutters>
          <div className="container">
            <Header />
            <ScrollToView>
              <Switch>
                <section style={sectionStyles}>
                  <Route exact path="/home" render={() => <div>Home</div>} />
                  <Route exact path="/about" render={() => <div>About</div>} />
                  <Route exact path="/careers" render={() => <div>Careers</div>} />
                  <Route exact path="/partners/form" component={BecomePartner} />
                  <Route exact path="/contact" component={Forms} />
                </section>
              </Switch>
            </ScrollToView>
            <Footer />
          </div>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
