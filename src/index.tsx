import React from "react";

import ReactDOM from "react-dom/client";

import Router from "./route/router";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "./assets/styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
