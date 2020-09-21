import React, { Fragment } from "react";
import { Typography, Divider, Table, Card } from "antd";
import { Chart, Interval, Coordinate, Axis, Legend } from "bizcharts";
import { Link } from "react-router-dom";
import "./styles.scss";

const data = [
  {
    projectId: "projectA",
    projectName: "Project A",
    percentageLabelled: 30,
    dateCreated: "25 Aug 2020",
    tasksCount: 100,
  },
  {
    projectId: "projectB",
    projectName: "Project B",
    percentageLabelled: 50,
    dateCreated: "26 Aug 2020",
    tasksCount: 200,
  },
  {
    projectId: "projectC",
    projectName: "Project C",
    percentageLabelled: 70,
    dateCreated: "27 Aug 2020",
    tasksCount: 50,
  },
  {
    projectId: "projectD",
    projectName: "Project D",
    percentageLabelled: 98,
    dateCreated: "28 Aug 2020",
    tasksCount: 20,
  },
  {
    projectId: "projectE",
    projectName: "Project E",
    percentageLabelled: 5,
    dateCreated: "29 Aug 2020",
    tasksCount: 50,
  },
];

const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
    render: (text, record) => {
      return <Link to={`/projects/${record.projectId}`}>{text}</Link>;
    },
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    key: "dateCreated",
  },
  {
    title: "Total Number of Tasks",
    dataIndex: "tasksCount",
    key: "tasksCount",
  },
  {
    title: "Percentage of Tasks Labelled",
    dataIndex: "percentageLabelled",
    key: "percentageLabelled",
    render: (text) => <Fragment>{text}%</Fragment>,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>Dashboard</Typography.Title>
      </Divider>

      <Card
        title={<b>Progress of Labelling for Your Projects</b>}
        bordered={false}
        className="main-chart"
      >
        <Chart
          scale={{
            projectName: { alias: "Project Name" },
            percentageLabelled: { alias: "Percentage of Tasks Labelled (%)" },
          }}
          height={320}
          autoFit
          data={[...data].reverse()}
        >
          <Coordinate transpose />
          <Axis title name="projectName" />
          <Axis title name="percentageLabelled" />
          <Interval
            position="projectName*percentageLabelled"
            color="projectName"
          />
          <Legend reversed offsetY={2} />
        </Chart>
      </Card>

      <Card
        title={<b>Your Projects</b>}
        bordered={false}
        className="projects-table"
      >
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
