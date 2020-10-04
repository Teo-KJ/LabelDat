import React, { useEffect, Fragment, useContext } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import history from "../history";
import ProjectDashboard from "./project-owner/ProjectDashboard";
import LabelForm from "./labeller/LabelForm";
import TaskCreation from "./project-owner/TaskCreation";
import MainDashboard from "./project-owner/MainDashboard";
import SignIn from "./shared/SignIn";
import SignUp from "./shared/SignUp";
import UploadFiles from "./project-owner/UploadFiles";
import { AuthContext } from "../context/auth-context";
import Loading from "./shared/Loading";
import Sidebar from "./shared/Sidebar";
import LabellerDashboard from "./labeller/Dashboard";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  const authContext = useContext(AuthContext);
  const { fetchUser } = authContext;

  //Fetch current user on every reload
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const renderRoutes = () => {
    // Fetching user
    if (!authContext.user) return <Loading />;

    // Not logged in
    if (!Object.keys(authContext.user).length) {
      return (
        <Fragment>
          {history.location.pathname === "/signup" ? (
            <Redirect to="/signup" />
          ) : (
            <Redirect to="/signin" />
          )}
          <Route exact component={SignUp} path="/signup" />
          <Route exact component={SignIn} path="/signin" />
        </Fragment>
      );
    }

    //Logged in
    const { userType } = authContext.user;
    switch (userType) {
      // Render routes for Project Owner
      case "PROJECT_OWNER":
        return (
          <Fragment>
            <Route exact component={MainDashboard} path="/" />
            <Route
              exact
              component={ProjectDashboard}
              path="/projects/:projectId"
            />
            <Route exact component={TaskCreation} path="/taskcreation" />
            <Route exact path="/uploadfiles">
              <UploadFiles dataType={"image"}></UploadFiles>
            </Route>
            <Route
              exact
              component={LabelForm}
              path="/projects/:projectId/tasks"
            />
          </Fragment>
        );
      // Render routes for Labeller
      case "LABELLER":
        return (
          <Fragment>
            <Route exact component={LabellerDashboard} path="/" />
            <Route
              exact
              component={LabelForm}
              path="/projects/:projectId/tasks"
            />
          </Fragment>
        );
      default:
        return null;
    }
  };

  // Insert routes here
  return (
    <Router history={history}>
      <Layout>
        <Sidebar />
        <Content>{renderRoutes()}</Content>
      </Layout>
    </Router>
  );
}

export default App;
