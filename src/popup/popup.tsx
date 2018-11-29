import * as $ from "jquery";
import "../css/app.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

$(() => {
  ReactDOM.render(<App name="Derui" />, document.getElementById("popup-entry"));
});
