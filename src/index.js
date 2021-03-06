import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store/index";
import { Provider } from "react-redux";

render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);

if (window.Cypress) {
	window.store = store;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
