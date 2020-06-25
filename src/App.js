import React from "react";
import NavBar from "./components/NavBar";

import PrivateRoute from "./components/PrivateRoute";
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import HomePage from "./components/HomePage";
import CreateFormPage from "./components/CreateFormPage";
import ClientForm from "./components/ClientForm";
import FormSubmitted from "./components/FormSubmitted";

function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute
            path="/form/create/:formId"
            component={CreateFormPage}
          />
          <Route path="/form/respond/:formId" component={ClientForm} />
          <Route path="/form/submitted" component={FormSubmitted} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
