import React, { Fragment, useEffect, useState } from "react";
import { Typography, Divider, Table, Card, Empty, Button, Tabs } from "antd";
import { Chart, Interval, Coordinate, Axis, Legend } from "bizcharts";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.scss";
import Loading from "../../shared/Loading";
import ContributionsTable from "../../labeller/Dashboard/ContributionsTable";

const { TabPane } = Tabs;

const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    render: (text, record) => {
      return <Link to={`/projects/${record.id}`}>{text}</Link>;
    },
    sorter: (a, b) => a.projectName.localeCompare(b.projectName),
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    sorter: (a, b) =>
      new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
  },
  {
    title: "Total Number of Tasks",
    dataIndex: "tasksCount",
    sorter: (a, b) => a.tasksCount - b.tasksCount,
  },
  {
    title: "Percentage of Tasks Labelled",
    dataIndex: "overallPercentage",
    render: (text) => <Fragment>{text}%</Fragment>,
    sorter: (a, b) => a.overallPercentage - b.overallPercentage,
  },
];

const Dashboard = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");

      if (res.status === 200) {
        setProjects({
          poProjects: res.data.data.projects.map((project) => ({
            ...project,
            key: project.id,
            dateCreated: new Date(project.created_at + "+8").toDateString(),
          })),
          contributedProjects: res.data.data.contributedProjects.map(
            (project) => ({
              ...project,
              key: project.id,
              dateCreated: new Date(project.created_at + "+8").toDateString(),
            })
          ),
        });
      }
    };

    fetchProjects();
  }, []);

  const renderPOProjectsTable = () => {
    if (!projects.poProjects.length)
      return (
        <Card>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={<span>You have not created any projects.</span>}
          >
            <Button type="primary">
              <Link to="/create-project">Create Project</Link>
            </Button>
          </Empty>
        </Card>
      );

    return (
      <Card title={<b>Your Projects</b>} bordered={false}>
        <Table
          columns={columns}
          dataSource={projects.poProjects}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        />
      </Card>
    );
  };

  if (!projects) return <Loading />;

  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>Dashboard</Typography.Title>
      </Divider>

      {projects.poProjects.length ? (
        <Card
          title={<b>Progress of Labelling for Your Projects</b>}
          bordered={false}
          className="main-chart"
        >
          <Chart
            scale={{
              projectName: { alias: "Project Name" },
              overallPercentage: { alias: "Percentage of Tasks Labelled (%)" },
            }}
            height={320}
            autoFit
            data={[...projects.poProjects].reverse()}
          >
            <Coordinate transpose />
            <Axis title name="projectName" />
            <Axis title name="overallPercentage" />
            <Interval
              position="projectName*overallPercentage"
              color="projectName"
            />
            <Legend reversed offsetY={2} />
          </Chart>
        </Card>
      ) : null}

      <Tabs
        centered
        className="tabs-container"
        type="card"
        tabBarStyle={{ width: "60%", margin: "0 auto" }}
      >
        <TabPane tab="Projects" key="1" className="projects-table">
          {renderPOProjectsTable()}
        </TabPane>
        <TabPane tab="Contributions" key="2" className="projects-table">
          <ContributionsTable
            contributedProjects={projects.contributedProjects}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
