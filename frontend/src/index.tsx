import React from "react";
import ReactDOM from "react-dom";
import { ChainId, Config, DAppProvider } from "@usedapp/core";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const config: Config = {
  readOnlyChainId: 31337,
  readOnlyUrls: {
    31337: "http://127.0.0.1:8545/",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
