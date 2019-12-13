import React, { useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";
//Redux
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    console.log("hello");
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router />
    </Provider>
  );
};

export default App;
