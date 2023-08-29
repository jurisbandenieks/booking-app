import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rxfrw6obup4z0hez.us.auth0.com"
      clientId="yQs1wdBM1E2iigrTz73NrOTkz4Xkp71X"
      authorizationParams={{
        redirect_uri: "http://localhost:3050/"
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
