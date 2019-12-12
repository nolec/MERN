import React from "react";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";
//Redux
import { Provider } from "react-redux";
import store from "../store";
const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router />
    </Provider>
  );
};

export default App;
