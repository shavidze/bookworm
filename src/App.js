import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomPage";
import Login from "./components/pages/LoginPage";

const App = () => (
  <div className="ui container">
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={Login} />
  </div>
);
export default App;
