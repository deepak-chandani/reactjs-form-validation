import React from "react";
import ReactDOM from "react-dom";
import RegisterForm from "./components/RegisterForm";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Joi Form Validation</h1>
      <div className="">
        <RegisterForm />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
