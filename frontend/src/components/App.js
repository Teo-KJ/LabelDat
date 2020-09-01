import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./labeller/Dashboard";
import LabelForm from "./labeller/LabelForm";

function App() {
  // Insert routes here
  return (
    <BrowserRouter>
      <Route exact component={Dashboard} path="/" />
      <Route exact component={LabelForm} path="/projects/:projectId/tasks" />
    </BrowserRouter>
  );
}

export default App;
