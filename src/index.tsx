import React from "react";
import "./Lang/i18n";
import ReactDOM from "react-dom/client";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import "./css/Custom.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <BrowserRouter basename="/Ecom">
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
