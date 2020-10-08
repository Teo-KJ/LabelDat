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
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
  },
  {
    title: "Total Number of Tasks",
    dataIndex: "tasksCount",
  },
  {
    title: "Percentage of Tasks Labelled",
    dataIndex: "overallPercentage",
    render: (text) => <Fragment>{text}%</Fragment>,
  },
];

const Dashboard = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");

      if (res.status === 200) {
        if (
          res.data.data.projects.length ||
          res.data.data.contributedProjects.length
        ) {
          setProjects({
            poProjects: res.data.data.projects.map((project) => ({
              ...project,
              key: project.id,
              dateCreated: new Date(
                project.projectManagers[0].created_at
              ).toDateString(),
            })),
            contributedProjects: res.data.data.contributedProjects.map(
              (project) => ({
                ...project,
                key: project.id,
                dateCreated: new Date(project.created_at).toDateString(),
              })
            ),
          });
        } else setProjects([]);
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
        tabBarStyle={{ marginBottom: 0 }}
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
