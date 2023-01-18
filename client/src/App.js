import React, { useEffect, useState } from "react";
import BasicGet from "./requests/BasicGet";
import AdvancedGet from "./requests/AdvancedGet";
import Login from "./components/Login";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <BasicGet /> */}
      <AdvancedGet />
      {/* <Tester /> */}
    </div>
  );
}

export default App;
