import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./Styles/index.css";
import App from "./Containers/App";
import store from "./Redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
