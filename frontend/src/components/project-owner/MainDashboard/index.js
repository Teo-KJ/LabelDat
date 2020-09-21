import React from "react";
import { Typography, Divider, Row, Col, Card } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Chart, Interval } from "bizcharts";
import "./styles.scss";

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
];

const style = { background: "#0092ff", padding: "8px 0" };

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>
          Dashboard <HomeOutlined />
        </Typography.Title>
      </Divider>

      <Card title="Chart Title" bordered={false} className="main-chart">
        <Chart height={320} autoFit data={data}>
          <Interval position="genre*sold" />
        </Chart>
      </Card>
    </div>
  );
};

export default Dashboard;
