import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Header from "./layout/Header";
import Home from "../Routes/Home";
import Register from "../Routes/Register";
import Login from "../Routes/Login";

export default () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect from="/*" to="/" />
      </Switch>
    </Router>
  );
};
