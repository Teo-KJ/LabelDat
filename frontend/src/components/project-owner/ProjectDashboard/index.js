import React from "react";
import { Typography, Divider, Row, Col, Card } from "antd";

import { Chart, Interval } from "bizcharts";
import "./styles.scss";

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>Insert Project Name Here</Typography.Title>
      </Divider>
      <Row gutter={96}>
        <Col span={8} className="chart">
          <Card title="Chart Title" bordered={false}>
            <Chart height={320} autoFit data={data}>
              <Interval position="genre*sold" />
            </Chart>
          </Card>
        </Col>
        <Col span={8} className="chart">
          <Card title="Chart Title" bordered={false}>
            <Chart height={320} autoFit data={data}>
              <Interval position="genre*sold" />
            </Chart>
          </Card>
        </Col>
        <Col span={8} className="chart">
          <Card title="Chart Title" bordered={false}>
            <Chart height={320} autoFit data={data}>
              <Interval position="genre*sold" />
            </Chart>
          </Card>
        </Col>
      </Row>

      <Row gutter={96}>
        <Col span={12} className="chart">
          <Card title="Chart Title" bordered={false}>
            <Chart height={320} autoFit data={data}>
              <Interval position="genre*sold" />
            </Chart>
          </Card>
        </Col>
        <Col span={12} className="chart">
          <Card title="Chart Title" bordered={false}>
            <Chart height={320} autoFit data={data}>
              <Interval position="genre*sold" />
            </Chart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
