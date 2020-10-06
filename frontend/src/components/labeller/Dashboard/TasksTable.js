import React from 'react';
import './index.css';
import ReactToolTip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { Button, Menu, Dropdown, Table, Space } from 'antd';

//temporary file with fake data

const columns = [
    {
        title: 'Project Name',
        dataIndex: 'projectname',
        width: '360px',
    },
    {
        title: 'Date Created',
        dataIndex: 'datecreated',
        width: '170px',
    },
    {
        title: 'Amount Completed',
        dataIndex: 'overallPercentage',
        width: '170px',
        render: (text, record) => <td data-for='custom-color' data-tip={
            ((record.overallPercentage / 100) * record.taskscount).toFixed(0)
            + "/" + record.taskscount + " Tasks Done"}>
            <ReactToolTip className="hover-style" id='custom-color' place='right' border
                textColor='#fff' backgroundColor='#00B7E0' borderColor='#00B7E0' />
            {text}%</td>,
    },
    {
        title: 'Your Contributions',
        dataIndex: 'contributionPercentage',
        width: '170px',
        render: (text, record) => <td data-for='custom-color' data-tip={
            ((record.contributionPercentage / 100) * record.taskscount).toFixed(0)
            + "/" + record.taskscount + " Tasks Contributed"}>
            <ReactToolTip className="hover-style" id='custom-color' place='right' border
                textColor='#fff' backgroundColor='#00B7E0' borderColor='#00B7E0' />
            {text}%</td>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (record) => (
            <Space >
                {renderButtons(record.label, record.review, record.projectid)}
            </Space>
        ),
    },
];

const data = [
    {
        projectid: 'test',
        projectname: 'lolxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        datecreated: '09 Aug 2020',
        overallPercentage: 40,
        contributionPercentage: 10,
        taskscount: 200,
        label: true, review: true
    },
    {
        projectid: 'test2', projectname: 'ddd', datecreated: '09 Aug 2020', overallPercentage: 40,
        contributionPercentage: 10, taskscount: 200, label: true, review: false
    },
    {
        projectid: 'test3', projectname: 'ssss', datecreated: '20 Aug 2020', overallPercentage: 30,
        contributionPercentage: 10, taskscount: 100, label: false, review: true
    },
    {
        projectid: 'test4', projectname: 'qqq', datecreated: '20 Sep 2020', overallPercentage: 40,
        contributionPercentage: 10, taskscount: 100, label: true, review: true
    }
]

const renderButtons = (label, review, projectid) => {
    let labelbutton;
    let reviewbutton;
    if (label) {
        labelbutton = <Dropdown overlay={dropdown(projectid)}>
            <Button type="link"> Label </Button>
        </Dropdown>
    }
    else {
        labelbutton = <Button type="link" disabled="true"> Label </Button>;
    }
    if (review) {
        reviewbutton = <Button type="link"> Review </Button>;
    }
    else {
        reviewbutton = <Button type="link" disabled="true"> Review </Button>;
    }
    return (
        <div>
            {labelbutton}
            {reviewbutton}
        </div>
    )
}

const dropdown = (projectId) => {
    return (
        <Menu className="dropdown-style">
            <Menu.Item> <Link to={`/projects/:${projectId}/tasks?count=5`}>5 tasks</Link> </Menu.Item>
            <Menu.Item> <Link to={`/projects/:${projectId}/tasks?count=10`}>10 tasks</Link> </Menu.Item>
            <Menu.Item> <Link to={`/projects/:${projectId}/tasks?count=20`}>20 tasks</Link> </Menu.Item>
        </Menu>
    )
}

const CTable = () => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            size="small"
            pagination={{ hideOnSinglePage: true }}
        />
    );

}

export default CTable 