import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
