import React from "react";
import { Typography, Divider, Row, Col, Card, Button } from "antd";
import { ExportOutlined, PlusCircleOutlined } from "@ant-design/icons";

import {
  Chart,
  Interval,
  Axis,
  Tooltip,
  Interaction,
  Coordinate,
  LineAdvance,
} from "bizcharts";
import "./styles.scss";

const data = {
  projectName: "Project Alpha",
  overallTasksProgress: [
    {
      type: "Unlabelled",
      percentage: 80,
    },
    {
      type: "Labelled",
      percentage: 20,
    },
  ],
  weeklyTasksProgress: [
    {
      date: "23 Sep",
      tasksCount: 8, // Refer to the number of tasks completed in a day
    },
    {
      date: "24 Sep",
      tasksCount: 11,
    },
    {
      date: "25 Sep",
      tasksCount: 15,
    },
    {
      date: "26 Sep",
      tasksCount: 17,
    },
    {
      date: "27 Sep",
      tasksCount: 16,
    },
    {
      date: "28 Sep",
      tasksCount: 14,
    },
    {
      date: "29 Sep",
      tasksCount: 10,
    },
  ],
};

const Dashboard = () => {
  const { projectName, weeklyTasksProgress, overallTasksProgress } = data;
  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>{projectName}</Typography.Title>
      </Divider>

      <div className="project-button-group">
        {/* TODO: Export Data Functionality */}
        <Button
          className="project-button"
          type="primary"
          shape="round"
          size={"large"}
          icon={<ExportOutlined />}
        >
          Export Data
        </Button>
        {/* TODO: Direct to another page to upload more tasks */}
        <Button
          className="project-button"
          type="primary"
          shape="round"
          size={"large"}
          icon={<PlusCircleOutlined />}
        >
          Add More Tasks
        </Button>
      </div>

      <Row gutter={96}>
        <Col span={12} className="chart">
          <Card title="Number of Tasks Completed This Week" bordered={false}>
            <Chart
              scale={{
                date: { alias: "Date" },
                tasksCount: { alias: "Number of Tasks Completed" },
              }}
              autoFit
              height={320}
              data={weeklyTasksProgress}
            >
              <LineAdvance
                shape="smooth"
                point
                area
                position="date*tasksCount"
              />
            </Chart>
          </Card>
        </Col>
        <Col span={12} className="chart">
          <Card
            title="Percentage of Labellled vs Unlabelled Data"
            bordered={false}
          >
            <Chart data={overallTasksProgress} height={320} autoFit>
              <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
              <Axis visible={false} />
              <Tooltip showTitle={false} />
              <Interval
                adjust="stack"
                position="percentage"
                color="type"
                shape="sliceShape"
              />
              <Interaction type="element-single-selected" />
            </Chart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
