import React, { useEffect, useState } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import './index.css';
import { Descriptions, Pagination } from 'antd';

const Profile = (props) => {
    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            const res = await axios.get(
                `/api/profile`
            );
            setProfileInfo({
                name: res.data.data2.name,
                username: res.data.data2.username,
                userid: res.data.data2.id,
                signupdate: res.data.data2.signupdate,
                contributionP: res.data.data.contributionPercentage,
                projects: res.data.data.projects.map((project) => ({
                    ...project,
                    key: project.projectName,
                    projectName: project.projectName,
                    user: project.overallPercentage.username,
                    contributionPercentage: project.overallPercentage.contributionPercentage,
                })),
            });
        };
        fetchProfileInfo();
    }, []);

    const columns = [
        {
            title: "Project Name",
            dataIndex: "projectName",
        },
        {
            title: "Username",
            dataIndex: "user",
        },
        {
            title: "Contribution",
            dataIndex: "contributionPercentage",
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
    ];


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    function createTable() {
        profileInfo.projects.map(() => (
            <Table columns={columns} dataSource={profileInfo.projects} onChange={onChange} pagination={{ hideOnSinglePage: true }} />
        ))
    }

    return (

        <Descriptions bordered>
            <Descriptions.Item label="Name">{profileInfo.name}</Descriptions.Item>
            <Descriptions.Item label="Username">{profileInfo.username}</Descriptions.Item>
            <Descriptions.Item label="User ID">{profileInfo.id}</Descriptions.Item>
            <Descriptions.Item label="Sign Up Date" span={3}>{profileInfo.signupdate}</Descriptions.Item>
            <Descriptions.Item label="Leaderboard" layout="vertical" >
                {createTable()}
            </Descriptions.Item>
        </Descriptions>
    );
}

export default Profile;