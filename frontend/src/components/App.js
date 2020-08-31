import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LabelForm from "../components/labeller/LabelForm";
import Dashboard from "../components/labeller/Dashboard";

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
