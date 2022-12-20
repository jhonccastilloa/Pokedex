import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//React router
import { HashRouter } from "react-router-dom";
//Redux
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
);
