import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./labeller/Dashboard";
import LabelForm from "./labeller/LabelForm/index";
import TaskCreation from "./project-owner/TaskCreation";
import SignIn from "./shared/SignIn";
import SignUp from "./shared/SignUp";
import UploadFiles from './project-owner/UploadFiles'

function App() {
  // Insert routes here
  return (
    <BrowserRouter>
      <Route exact component={Dashboard} path="/" />
      <Route exact component={SignUp} path="/signup" />
      <Route exact component={SignIn} path="/signin" />
      <Route exact component={TaskCreation} path="/taskcreation" />
      <Route exact path="/uploadfiles">
        <UploadFiles dataType={"image"}></UploadFiles>
      </Route>
      <Route exact component={LabelForm} path="/projects/:projectId/tasks" />
    </BrowserRouter>
  );
}

export default App;
