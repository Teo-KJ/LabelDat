import React, { useState, useEffect } from "react";
import { Typography, Divider, Row, Col, Card, Button } from "antd";
import { ExportOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import Loading from "../../shared/Loading";

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

const Dashboard = (props) => {
  const [projectAnalytics, setProjectAnalytics] = useState(null);

  useEffect(() => {
    const fetchProjectAnalytics = async () => {
      const res = await axios.get(
        `/api/projects/${props.match.params.projectId}/analytics?days=7`
      );
      const { labelProgress, overallPercentage, projectName } = res.data;

      setProjectAnalytics({
        projectName,
        overallTasksProgress: [
          {
            type: "Unlabelled",
            percentage: 100 - overallPercentage,
          },
          {
            type: "Labelled",
            percentage: overallPercentage,
          },
        ],
        weeklyTasksProgress: labelProgress.map(({ labelCount, date }) => ({
          labelCount,
          date: new Date(date).toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
        })),
      });
    };

    fetchProjectAnalytics();
  }, [props.match.params.projectId]);

  if (!projectAnalytics) return <Loading />;
  const {
    projectName,
    weeklyTasksProgress,
    overallTasksProgress,
  } = projectAnalytics;

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
                labelCount: { alias: "Number of Tasks Completed", min: 0 },
              }}
              autoFit
              height={320}
              data={weeklyTasksProgress}
            >
              <LineAdvance
                shape="smooth"
                point
                area
                position="date*labelCount"
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
