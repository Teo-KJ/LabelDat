import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ProjectDashboard from "./project-owner/ProjectDashboard";
import LabelForm from "./labeller/LabelForm";
import TaskCreation from "./project-owner/TaskCreation";
import MainDashboard from "./project-owner/MainDashboard";
import SignIn from "./shared/SignIn";
import SignUp from "./shared/SignUp";

function App() {
  // Insert routes here
  return (
    <BrowserRouter>
      <Route exact component={MainDashboard} path="/" />
      <Route exact component={ProjectDashboard} path="/projects/:projectId" />
      <Route exact component={SignUp} path="/signup" />
      <Route exact component={SignIn} path="/signin" />
      <Route exact component={TaskCreation} path="/taskcreation" />
      <Route exact component={LabelForm} path="/projects/:projectId/tasks" />
    </BrowserRouter>
  );
}

export default App;
