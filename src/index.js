import { Connector } from "mqtt-react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <Connector brokerUrl="ws://bonkab.com:9001" options={{ protocol: "mqtt" }}>
      <App />
    </Connector>
  </BrowserRouter>,
  document.getElementById("root")
);
// 9001 : ws  / 1882 : mqtt
// 3.34.188.139 / ec2-3-34-188-139.ap-northeast-2.compute.amazonaws.com
// ws://bonkab.com:9001
// pub : mosquitto_pub -t test -m Hello3 -h bonkab.com
// sub : mosquitto_sub -h bonkab.com -t test
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
