import React, { Fragment } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { Button, Menu, Dropdown, Table, Card, Tooltip } from "antd";

const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    width: "170px",
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    width: "170px",
  },
  {
    title: "Overall Completion Rate",
    dataIndex: "overallPercentage",
    width: "170px",
    render: (text, record) => (
      <Tooltip
        title={`${Math.floor(
          (record.tasksCount * record.overallPercentage) / 100
        )}/${record.tasksCount} Tasks Labelled`}
      >
        {text}%
      </Tooltip>
    ),
  },
  {
    title: "Contribution Rate",
    dataIndex: "contributionPercentage",
    width: "170px",
    render: (text, record) => (
      <Tooltip
        title={`${record.contributionCount}/${record.tasksCount} Tasks Contributed`}
      >
        {text}%
      </Tooltip>
    ),
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (record) => (
      <Fragment>
        <Tooltip
          title={
            record.contributionCount < record.tasksCount
              ? ""
              : "You have finshed labelling all tasks for this project."
          }
        >
          {record.contributionCount < record.tasksCount ? (
            <Dropdown overlay={renderDropdown(record.projectId)}>
              <Button type="link">Label</Button>
            </Dropdown>
          ) : (
            <Button type="link" disabled>
              Label
            </Button>
          )}
        </Tooltip>

        <Tooltip
          title={
            record.contributionCount === 0
              ? "You have not labelled any tasks yet."
              : ""
          }
        >
          <Button type="link" disabled={record.contributionCount === 0}>
            <Link to={`/projects/${record.projectId}/review`}>Review</Link>
          </Button>
        </Tooltip>
      </Fragment>
    ),
  },
];

const data = [
  {
    projectId: "projectA",
    projectName: "Project A",
    dateCreated: "09 Aug 2020",
    overallPercentage: 40,
    contributionPercentage: 0,
    contributionCount: 0,
    tasksCount: 200,
  },
  {
    projectId: "projectB",
    projectName: "Project B",
    dateCreated: "09 Aug 2020",
    overallPercentage: 40,
    contributionPercentage: 100,
    contributionCount: 200,
    tasksCount: 200,
  },
  {
    projectId: "projectC",
    projectName: "Project C",
    dateCreated: "20 Aug 2020",
    overallPercentage: 30,
    contributionPercentage: 10,
    contributionCount: 10,
    tasksCount: 100,
  },
  {
    projectId: "projectD",
    projectName: "Project D",
    dateCreated: "20 Sep 2020",
    overallPercentage: 40,
    contributionPercentage: 10,
    contributionCount: 10,
    tasksCount: 100,
  },
];

const renderDropdown = (projectId) => {
  return (
    <Menu className="dropdown-style">
      <Menu.Item>
        <Link to={`/projects/${projectId}/tasks?count=5`}>5 tasks</Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to={`/projects/${projectId}/tasks?count=10`}>10 tasks</Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to={`/projects/${projectId}/tasks?count=20`}>20 tasks</Link>{" "}
      </Menu.Item>
    </Menu>
  );
};

const ContributionsTable = () => {
  return (
    <Card title={<b>Your Contributions</b>} bordered={false}>
      <Table
        columns={columns}
        dataSource={data.map((project, index) => ({ ...project, key: index }))}
        size="small"
        pagination={{ hideOnSinglePage: true }}
      />
    </Card>
  );
};

export default ContributionsTable;
