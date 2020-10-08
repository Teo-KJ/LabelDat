import React from "react";
import "./styles.scss";
import ContributionsTable from "./ContributionsTable";
import { Typography, Divider } from "antd";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>Dashboard</Typography.Title>
      </Divider>

      <div className="projects-table">
        <ContributionsTable />
      </div>
    </div>
  );
};

export default Dashboard;
