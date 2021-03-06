import React, { Fragment } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { Button, Menu, Dropdown, Table, Card, Tooltip } from "antd";

const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    sorter: (a, b) => a.projectName.localeCompare(b.projectName),
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    sorter: (a, b) =>
      new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
  },
  {
    title: "Data Type",
    dataIndex: "itemDataType",
    sorter: (a, b) => a.itemDataType.localeCompare(b.itemDataType),
    filters: [
      { text: "Image", value: "Image" },
      { text: "Audio", value: "Audio" },
    ],
    onFilter: (value, record) => record.itemDataType.includes(value),
  },
  {
    title: "Input Type",
    dataIndex: "inputType",
    sorter: (a, b) => a.inputType.localeCompare(b.inputType),
    filters: [
      { text: "Radio", value: "Radio" },
      { text: "Checkbox", value: "Checkbox" },
    ],
    onFilter: (value, record) => record.inputType.includes(value),
  },
  {
    title: "Overall Completion Rate",
    dataIndex: "overallPercentage",
    render: (text, record) => (
      <Tooltip
        title={`${Math.ceil(
          (record.tasksCount * record.overallPercentage) / 100
        )}/${record.tasksCount} Tasks Labelled`}
      >
        {text}%
      </Tooltip>
    ),
    sorter: (a, b) => a.overallPercentage - b.overallPercentage,
  },
  {
    title: "Contribution Rate",
    dataIndex: "contributionPercentage",
    render: (text, record) => (
      <Tooltip
        title={`${record.contributionCount}/${record.tasksCount} Tasks Contributed`}
      >
        {text}%
      </Tooltip>
    ),
    sorter: (a, b) => a.contributionPercentage - b.contributionPercentage,
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
              : "There are no more tasks to label."
          }
        >
          {record.contributionCount < record.tasksCount ? (
            <Dropdown overlay={renderDropdown(record.id)}>
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
            <Link to={`/projects/${record.id}/review`}>Review</Link>
          </Button>
        </Tooltip>
      </Fragment>
    ),
  },
];

const renderDropdown = (id) => {
  return (
    <Menu className="dropdown-style">
      <Menu.Item>
        <Link to={`/projects/${id}/tasks?count=5`}>5 tasks</Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to={`/projects/${id}/tasks?count=10`}>10 tasks</Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to={`/projects/${id}/tasks?count=20`}>20 tasks</Link>{" "}
      </Menu.Item>
    </Menu>
  );
};

const ContributionsTable = ({ contributedProjects }) => {
  return (
    <Card title={<b>Your Contributions</b>} bordered={false}>
      <Table
        columns={columns}
        dataSource={contributedProjects.map((project, index) => ({
          ...project,
          key: index,
        }))}
        size="small"
        pagination={{ hideOnSinglePage: true }}
      />
    </Card>
  );
};

export default ContributionsTable;
