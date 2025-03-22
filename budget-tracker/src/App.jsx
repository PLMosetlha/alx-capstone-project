import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BudgetTracker from "./BudgetTracker";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BudgetTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
