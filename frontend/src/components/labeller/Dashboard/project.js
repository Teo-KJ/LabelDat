import React from 'react';
import './index.css';
import ReactToolTip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { Button, Menu, Dropdown, Table, Space } from 'antd';
//actual one with axios get

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
                {renderButtons(record.overallPercentage, record.projectid)}
            </Space>
        ),
    },
];

const data = componentDidMount();

componentDidMount = () => {
    axios.get('/projects')
}

const renderButtons = (overallPercentage, projectid) => {
    let labelbutton;
    let reviewbutton;
    if (overallPercentage == 100) {
        labelbutton = <Button type="link" disabled="true"> Label </Button>;
    }
    else if(overallPercentage == 0) {
        reviewbutton = <Button type="link" disabled="true"> Review </Button>;
        labelbutton = <Dropdown overlay={dropdown(projectid)}>
            <Button type="link"> Label </Button>
        </Dropdown>
    }
    else {
        labelbutton = <Dropdown overlay={dropdown(projectid)}>
        <Button type="link"> Label </Button>
        </Dropdown>
        reviewbutton = <Button type="link"> Review </Button>;
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

const Project = () => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            size="small"
            pagination={{ hideOnSinglePage: true }}
        />
    );

}

export default Project