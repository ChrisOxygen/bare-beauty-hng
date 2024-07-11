import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/main.scss";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
