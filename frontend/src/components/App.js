import React, { useEffect, Fragment, useContext } from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import ProjectDashboard from "./project-owner/ProjectDashboard";
import LabelForm from "./labeller/LabelForm";
import ProjectCreation from "./project-owner/ProjectCreation";
import MainDashboard from "./project-owner/MainDashboard";
import SignIn from "./shared/SignIn";
import SignUp from "./shared/SignUp";
import TaskCreation from "./project-owner/TaskCreation";
import { AuthContext } from "../context/auth-context";
import Loading from "./shared/Loading";
import Sidebar from "./shared/Sidebar";
import Landing from "./shared/Landing";
import LabellerDashboard from "./labeller/Dashboard";
import ProjectLabelReview from "./labeller/ProjectLabelReview";
import Profile from "./shared/Profile";
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
          <Route exact component={Landing} path="/" />
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
            <Route exact component={Profile} path="/profile" />
            <Route exact component={ProjectCreation} path="/create-project" />
            <Route
              exact
              component={TaskCreation}
              path="/projects/:projectId/add-tasks"
            />
            <Route
              exact
              component={ProjectDashboard}
              path="/projects/:projectId"
            />
            <Route
              exact
              component={LabelForm}
              path="/projects/:projectId/tasks"
            />
            <Route
              exact
              component={ProjectLabelReview}
              path="/projects/:projectId/review"
            />
          </Fragment>
        );
      // Render routes for Labeller
      case "LABELLER":
        return (
          <Fragment>
            <Route exact component={LabellerDashboard} path="/" />
            <Route exact component={Profile} path="/profile" />
            <Route
              exact
              component={LabelForm}
              path="/projects/:projectId/tasks"
            />
            <Route
              exact
              component={ProjectLabelReview}
              path="/projects/:projectId/review"
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
        <Sidebar
          key={authContext.user ? Object.keys(authContext.user).length : null}
        />
        <Content>{renderRoutes()}</Content>
      </Layout>
    </Router>
  );
}

export default App;
