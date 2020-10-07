import React from "react";
import "./index.css";
import ContributionsTable from "./ContributionsTable";
import { Typography, Divider } from "antd";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>Dashboard</Typography.Title>
      </Divider>

      <ContributionsTable />
    </div>
  );
};

export default Dashboard;
