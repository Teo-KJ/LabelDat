import React, { useState, useEffect } from "react";
import { Typography, Divider, Row, Col, Card, Button } from "antd";
import { ExportOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import Loading from "../../shared/Loading";
import history from "../../../history";

import {
  Chart,
  Interval,
  Axis,
  Tooltip,
  Interaction,
  Coordinate,
  LineAdvance,
  Annotation,
} from "bizcharts";
import "./styles.scss";

const Dashboard = (props) => {
  const [projectAnalytics, setProjectAnalytics] = useState(null);

  useEffect(() => {
    const fetchProjectAnalytics = async () => {
      const res = await axios.get(
        `/api/projects/${props.match.params.projectId}/analytics?days=7`
      );
      const {
        labelProgress,
        overallPercentage,
        projectName,
        numTasks,
      } = res.data;

      setProjectAnalytics({
        projectName,
        numTasks,
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

  const fetchCSV = async () => {
    const res = await axios.get(
      `/api/projects/${props.match.params.projectId}/export?ext=csv`
    );

    let csvContent = "data:text/csv;charset=utf-8," + res.data;
    var encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${projectAnalytics.projectName} Label Data.csv`
    );
    document.body.appendChild(link);

    link.click();
  };

  if (!projectAnalytics) return <Loading />;

  const {
    projectName,
    weeklyTasksProgress,
    overallTasksProgress,
    numTasks,
  } = projectAnalytics;

  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>{projectName}</Typography.Title>
      </Divider>

      <div className="project-button-group">
        <Button
          disabled={
            overallTasksProgress.filter(({ type }) => type === "Labelled")[0]
              .percentage === 0
          }
          onClick={fetchCSV}
          className="project-button"
          type="primary"
          shape="round"
          size={"large"}
          icon={<ExportOutlined />}
        >
          Export Data
        </Button>

        <Button
          onClick={() =>
            history.push(`/projects/${props.match.params.projectId}/add-tasks`)
          }
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
              <Annotation.Text
                position={["50%", "50%"]}
                content={`Task Count: ${numTasks}`}
                style={{
                  lineHeight: "240px",
                  fontSize: "20",
                  fill: "#262626",
                  textAlign: "center",
                }}
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
